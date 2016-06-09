<?lua
require("json")
require("current_network")
current_network_data = get_current_network()
?>
<%= current_network_data["current_network"] %>
<%= current_network_data["enc_type"] %>
