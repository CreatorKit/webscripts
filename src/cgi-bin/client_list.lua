require("strings_en_GB")
require("ubus")

function get_client_list()
	local ret, timeout = 60000

	local conn = ubus.connect(nil, timeout)
	if not conn then
		return false
	end

	ret = conn:call("flow_device_manager", "get_client_list", {})
	conn:close()
	return ret["clients"]
end
