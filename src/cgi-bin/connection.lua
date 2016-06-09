require("os")
require("utils")

local uci = utils.get_uci()

function configure_network(network, encryption, key)
	if not uci.get("wireless", "sta") then
		local device
		uci.foreach("wireless", "wifi-device", function(s)
			device = s['.name']
		end)
		uci.set("wireless", "sta", "wifi-iface")
		uci.set("wireless", "sta", "device", device)
		uci.set("wireless", "sta", "network", "sta")
		uci.set("wireless", "sta", "mode", "sta")
	end
	uci.set("wireless", "sta", "ssid", network)
	uci.set("wireless", "sta", "encryption", utils.map_enc_to_uci_type(encryption))
	if key then
		uci.set("wireless", "sta", "key", key)
	else
		uci.delete("wireless", "sta", "key")
	end
	uci.save("wireless")
	uci.commit("wireless")
end

function set_network_manual(network, encryption, key)
	local success, error_msg
	if not utils.isValidSsid(network) then
		error_msg = "INVALID_SSID"
		success = false
	elseif not utils.isValidEncType(encryption) then
		error_msg = "INVALID_ENCRYPTION"
		success = false
	elseif not utils.isValidPasswd(key, encryption) then
		error_msg = "INVALID_PASSWORD"
		success = false
	else
		configure_network(network, encryption, key)
		success = true
		error_msg = nil
	end
	local data = {}
	data["success"] = success
	data["error_msg"] = error_msg
	return data
end

function set_network()
	local network_name, enc_type = string.match(cgilua.POST.ssid, "(.+)=(.+)")
	local password = cgilua.POST.password
	configure_network(network_name, enc_type, password)
end

function connect()
	os.execute("/etc/init.d/network restart >/dev/null 2>&1")
	--os.execute("killall netifd >/dev/null 2>&1")
	--os.execute("netifd & >/dev/null 2>&1")
	local connect_data = {}
	connect_data["success"] = false
	if uci.get("wireless", "sta", "ssid") then
		local bus = require("ubus")
		local ubus = bus.connect()
		status = ubus:call("network.interface.sta", "status", {})
		if status then
			connect_data["success"] = status["up"]
		end
	else
		connect_data["error_msg"] = "NO_NETWORK_CONFIGURED"
	end
	return connect_data
end
