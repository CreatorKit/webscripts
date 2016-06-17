require("network_scan")
require("current_network")

function get_network_list()
	local network_list = {}
	local scanlist = get_scanlist()
	for i, cell in ipairs(scanlist) do
		network_list[i] = {}
		network_list[i]["name"] = cell.ssid
		network_list[i]["encryption"] = cell.enc
		current_network_data = get_current_network()
		if current_network_data["current_network"] == cell.ssid then
			network_list[i]["remembered"] = "1"
		else
			network_list[i]["remembered"] = "0"
		end
	end
	return network_list
end
