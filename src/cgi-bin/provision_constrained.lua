--[[
Copyright (c) 2016, Imagination Technologies Limited and/or its affiliated group companies
and/or licensors

All rights reserved.

Redistribution and use in source and binary forms, with or without modification, are permitted
provided that the following conditions are met:

1. Redistributions of source code must retain the above copyright notice, this list of conditions
   and the following disclaimer.

2. Redistributions in binary form must reproduce the above copyright notice, this list of
   conditions and the following disclaimer in the documentation and/or other materials provided
   with the distribution.

3. Neither the name of the copyright holder nor the names of its contributors may be used to
   endorse or promote products derived from this software without specific prior written
   permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR
IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND
FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR
CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL
DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE,
DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY,
WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY
WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
--]]

require("ubus")

function provision_constrained()
	local action_type = cgilua.POST.config_action
	local selected_device_id_array = cgilua.POST.device_id
	local tempTable = {}
	local timeout = 70000
	local key_string, fcap_code, key_found, device_id, licensee_code, ret, constrained_dev_id,
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

	-- Get fcap and device id from flow_access.cfg
	local file = io.open("/etc/lwm2m/flow_access.cfg", "r")
	if not file then
		conn:close()
		return 1
	end

	while true do
		local line = file:read("*l")

		if line == nil then break end

		key_found = string.find(line, "FCAP")
		if key_found ~= nil then
			key_string = line:match('%b\"\"')
			fcap_code = key_string:gsub("\"", "")
		end

		key_found = string.find(line, "DeviceID")
		if key_found ~= nil then
			key_string = line:match('%b\"\"')
			device_id = key_string:gsub("\"", "")
		end
	end

	-- Get licensee id from provision.cfg
	local file = io.open("/etc/lwm2m/provision.cfg", "r")
	if not file then
		conn:close()
		return 1
	end

	while true do
		local line = file:read("*l")

		if line == nil then break end

		key_found = string.find(line, "LicenseeId")
		if key_found ~= nil then
			key_string = line:match('%b\"\"')
			licensee_code = key_string:gsub("\"", "")
		end
	end

	licensee_code = tonumber(licensee_code);

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
		ret = conn:call("device_manager", "provision_constrained_device", {fcap = fcap_code,
			licensee_id = licensee_code, device_type = constrained_dev_type,
			client_id = constrained_dev_id, parent_id = device_id, timeout = timeout})

		if ret ~= nil then
			provision_status_code = ret["status"]
		else  -- ubus timeout
			provision_status_code = 255
		end
	end

	conn:close()
	return provision_status_code
end
