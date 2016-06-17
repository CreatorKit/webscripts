require("utils")

local uci = utils.get_uci()

function get_current_network()
	local current_network_data = {}
	current_network_data["current_network"] = ""
	current_network_data["conn_error"] = ""
	current_network_data["enc_type"] = ""
	if uci.get("wireless", "sta") then
		current_network_data["current_network"] = uci.get("wireless", "sta", "ssid")
		current_network_data["enc_type"] = utils.map_enc_from_uci_type(uci.get("wireless", "sta", "encryption"))
	end
	return current_network_data
end
