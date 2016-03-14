require("strings_en_GB")
require("ubus")

function is_gateway_device_provisioned()
	local ret, timeout = 60000

	local conn = ubus.connect(nil, timeout)
	if not conn then
		return false
	end

	ret = conn:call("flow_device_manager", "is_gateway_device_provisioned", {})
	conn:close()
	return ret["provision_status"]
end

function provision()
	local name = cgilua.POST.device_name
	local regcode = cgilua.POST.device_reg_code
	local deviceType = nil
	local licenseeId = nil
	local licenseeSecret = nil
	local timeout = 60000
	local id, ret, provision_status_code

	-- Connect to ubus
	local conn = ubus.connect(nil, timeout)
	if not conn then
		return 254
	end

	-- Get deviceType and licenseeId from provision.cfg
	local file = io.open("/etc/lwm2m/provision.cfg", "r")
	if not file then
		conn:close()
		return 1
	end

	while true do
		local line = file:read("*l")

		if line == nil then break end

		deviceType_found = string.find(line, "DeviceType")
		if deviceType_found ~= nil then
			deviceType_string = line:match('%b\"\"')
			deviceType = deviceType_string:gsub("\"", "")
		end

		licenseeId_found = string.find(line, "LicenseeId")
		if licenseeId_found ~= nil then
			licenseeId_string = line:match('%b\"\"')
			licenseeId = licenseeId_string:gsub("\"", "")
		end

		licenseeSecret_found = string.find(line, "LicenseeSecret")
		if licenseeSecret_found ~= nil then
			licenseeSecret_string = line:match('%b\"\"')
			licenseeSecret = licenseeSecret_string:gsub("\"", "")
		end
	end

	id = tonumber(licenseeId)

	if (not deviceType or not id or not licenseeSecret) then
		conn:close()
		return 1
	end

	-- Call provision gateway device function registered on ubus
	ret = conn:call("flow_device_manager", "provision_gateway_device", {device_name = name,
		device_type = deviceType, licensee_id = id, fcap = regcode,
		licensee_secret = licenseeSecret})

	if ret ~= nil then
		provision_status_code = ret["provision_status"]
	else
		provision_status_code = 255
	end

	conn:close()
	return provision_status_code
end
