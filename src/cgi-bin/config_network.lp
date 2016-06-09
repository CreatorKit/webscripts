<?lua
require("utils")
if utils.check_output_format() then
	json = require("json")
	require("connection")
	if (utils.lowercase(cgilua.QUERY.action) == "set_config") then
		data = set_network_manual(cgilua.POST.manual_ssid, cgilua.POST.encryption, cgilua.POST.enc_manual_password)
	elseif (utils.lowercase(cgilua.QUERY.action) == "connect") then
		data = connect()
	elseif (utils.lowercase(cgilua.QUERY.action) == "get_config") then
		require("config_network")
		data = get_network_config()
	end
?>
	<%=json.encode(data, { indent = true })%>
<%end%>
