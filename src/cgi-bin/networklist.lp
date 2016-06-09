<?lua
require("utils")
if utils.check_output_format() then
	json = require("json")
	require("networklist")
	list = {}
	list["ssid"] = get_network_list()
?>
	<%=json.encode(list, { indent = true })%>
<%end%>
