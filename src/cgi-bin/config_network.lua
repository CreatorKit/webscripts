require("utils")

local uci = utils.get_uci()

function get_network_config()
	local network_config_data = {}
	network_config_data["success"] = true
	if(uci.get("wireless", "sta")) then
		local config = {}
		config["ssid"] = uci.get("wireless", "sta", "ssid")
		config["encryption"] = utils.map_enc_from_uci_type(uci.get("wireless", "sta", "encryption"))
		config["addr_method"] = "dhcp"
		network_config_data["config"] = config

		local wifi_device
		uci.foreach("wireless", "wifi-device", function(s)
			wifi_device = s['.name']
		end)
		network_config_data["mac"] = uci.get("wireless", wifi_device, "macaddr")

		local bus = require("ubus")
		local ubus = bus.connect()
		status = ubus:call("network.interface.sta", "status", {})
		if status then
			if status["up"] then
				network_config_data["last_connect_status"] = "CONNECTED"
			else
				network_config_data["last_connect_status"] = "NOT_CONNECTED"
			end
		else
			network_config_data["success"] = false
		end
	else
	network_config_data["last_connect_status"] = "NO_NETWORK_CONFIGURED"
	end
	return network_config_data
end
