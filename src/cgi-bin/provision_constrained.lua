require("ubus")

function provision_constrained()
	local action_type = cgilua.POST.config_action
	local selected_device_id_array = cgilua.POST.device_id
	local tempTable = {}
	local timeout = 60000
	local fcap_string, fcap_code, fcap_found, ret, constrained_dev_id,
		provision_status_code, constrained_dev_type = "Unknown device"

	if type(selected_device_id_array) == "string"
	then
		table.insert(tempTable, selected_device_id_array)
		selected_device_id_array = tempTable
	end

	-- Connect to ubus
	local conn = ubus.connect(nil, timeout)
	if not conn then
		return 254
	end

	-- Get fcap from flow_access.cfg
	local file = io.open("/etc/lwm2m/flow_access.cfg", "r")
	if not file then
		conn:close()
		return 1
	end

	while true do
		local line = file:read("*l")

		if line == nil then break end

		fcap_found = string.find(line, "FCAP")
		if fcap_found ~= nil then
			fcap_string = line:match('%b\"\"')
			fcap_code = fcap_string:gsub("\"", "")
		end
	end


	local count = table.getn(selected_device_id_array)
	for i = 1, count do
		-- Get device type from device id
		constrained_dev_id = selected_device_id_array[i]
		if constrained_dev_id == "ButtonDevice" then
			constrained_dev_type = "FlowCreatorButton"
		elseif constrained_dev_id == "LedDevice" then
			constrained_dev_type = "FlowCreatorLED"
		end

		if (not fcap_code or not constrained_dev_type) then
			conn:close()
			return 1
		end

		-- Call provision constrained device function registered on ubus
		ret = conn:call("flow_device_manager", "provision_constrained_device", {fcap = fcap_code,
			licensee_id = 7, device_type = constrained_dev_type,  client_id = constrained_dev_id})

		if ret ~= nil then
			provision_status_code = ret["status"]
		else  -- ubus timeout
			provision_status_code = 255
		end
	end

	conn:close()
	return provision_status_code
end
