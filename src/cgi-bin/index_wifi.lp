<?lua
require("index")
?>

<!doctype html>
<!--[if lt IE 7]><html class="no-js lt-ie9 lt-ie8 lt-ie7 ie6" lang="en"><![endif]-->
<!--[if IE 7]><html class="no-js lt-ie9 lt-ie8 ie7" lang="en"><![endif]-->
<!--[if IE 8]><html class="no-js lt-ie9 ie8" lang="en"><![endif]-->
<!--[if IE 9]><html class="no-js ie9" lang="en"><![endif]-->
<!--[if gt IE 9]><!--><html class="no-js" lang="en"><!--<![endif]-->
<head>
        <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv='cache-control' content='no-cache'>
        <meta http-equiv='expires' content='0'>
        <meta http-equiv='pragma' content='no-cache'>
        <title><%= STR_HOME_PAGE_TITLE %></title>
        <link href="/css/style.css" rel="stylesheet">
        <link rel="shortcut icon" href="/favicon.ico">
        <script>var a=document.getElementsByTagName("html")[0];a.className&&(a.className=a.className.replace(/no-js\s?/, ''));</script>
</head>

<body id="home">
	<div id="header">
		<div class="container">
			<div class="c-logo c-ate-logo"></div>
			<div class="c-cloud-illustration"></div>
		</div>
	</div>
    <div class="container">
        <noscript class="no-js-message">
            <div>
                <p><%= STR_JAVASCRIPT_MSG_1 %></p>
                <p><%= STR_JAVASCRIPT_MSG_2 %></p>
            </div>
        </noscript>
        <div id="main">
            <div class="box">
                <form method="post" target="_top" id="form-network-list">
                    <div class="error"></div>
                    <div class="tabs">
                        <ul class="grid nav">
                            <li class="span mobile-span-1-2 valign-bottom"><a href="#basic"><%= STR_BASIC %></a></li>
                            <!--li class="span mobile-span-1-2 valign-bottom"><a href="#advanced"><%= STR_ADVANCED %></a></li-->
                        </ul>
                        <div id="basic" class="dark tab-content">
                            <ol class="grid">
                                <li>
                                    <span class="span-1">
                                        <strong class="label"><%= STR_CURRENT_NETWORK %></strong>
                                        <span id="current-network" class="non-input"><%= current_network_data["current_network"] %></span>
                                    </span>
                                </li>
                                <li>
                                    <% if current_network_data["conn_error"] ~= "" then %>
                                    <span class="span-1">
                                        <span id="conn-error" class="non-input error"><%= current_network_data["conn_error"] %></span>
                                    </span>
                                    <% else %>
                                    <span class="span-1">
                                        <label for="ssid" class="label"><%= STR_AVAILABLE_NETWORKS %></label>
                                    </span>
                                    <% end %>
                                    <span class="span-2-5 pull-right mobile-span-1">
                                         <button type="button" id="btn-network-refresh"><%= STR_REFRESH %></button>
                                    </span>
                                    <div id="span-network-list" class="span-3-5 pull-left mobile-span-1">
                                        <div class="network-list textbox">
                                            <select id="ssid" name="ssid" size="7" class="refresh select select-network-list">
                                                <option>Network List</option>
                                            </select>
                                            <div class="network-list-loading"><%= STR_SCANNING %></div>
                                            <noscript><p><%= STR_JAVASCRIPT_NETWORK_LIST_MSG %></p></noscript>
                                        </div>
                                    </div>
                                </li>
                                <li id="network_password">
                                    <!--<span class="span-1">
                                        <label for="password" class="hint-network"></label>
                                    </span>-->
                                    <span class="span-1">
                                        <label for="password" class="label"><%= STR_PASSWORD %></label>
                                    </span>
                                    <span class="span-3-5 relative">
                                        <input type="password" id="password" name="password" maxlength="64" class="textbox" autocorrect="off" autocapitalize="off" autocomplete="off"/>
                                                                      <input type="checkbox" id="showPassword" onchange="document.getElementById('password').type = (this.checked ? 'text' : 'password')"/>
                                                                      <label for="showPassword"><%= STR_SHOW_PASSWORD %></label>
                                    </span>
                                </li>
                            </ol>
                        </div>
                    </div>
                    <!-- <input type="submit" value="Save" id="btn-connect"/> -->
                    <button type="submit" id="btn-connect" class="button-main"><%= STR_SAVE %></button>
                    <div style="display:none;"><input type="submit" value="<%= STR_SAVE %>" /></div>
                    <input type="hidden" id="enc_password" name="enc_password"/>
                    <input type="hidden" id="enc_manual_password" name="enc_manual_password"/>
                    <input type="hidden" id="config_method" name="config_method" value="web_page"/>
                </form>
            </div>
            <br />

        </div>
        <div id="footer">
            <span class="span-3-5 mobile-span-1">
                <span class="non-input">
                    <%= "&copy; Imagination Technologies 2016" %>
                </span>
            </span>
        </div>
    </div>
</div>

<script id="STR_INVALID_DEVICE_NAME_MSG" type="text/template"><%= STR_INVALID_DEVICE_NAME_MSG %></script>
<script id="STR_INVALID_DEVICE_NAME_MSG_2" type="text/template"><%= STR_INVALID_DEVICE_NAME_MSG_2 %></script>
<script id="STR_INVALID_PASSWORD_WEP_MSG" type="text/template"><%= STR_INVALID_PASSWORD_WEP_MSG %></script>
<script id="STR_INVALID_PASSWORD_WPA_MSG" type="text/template"><%= STR_INVALID_PASSWORD_WPA_MSG %></script>
<script id="STR_PRINTABLE_ASCII_MSG" type="text/template"><%= STR_PRINTABLE_ASCII_MSG %></script>
<script id="STR_CONNECT_MSG_2" type="text/template"><%= STR_CONNECT_MSG_2 %></script>
<script id="STR_CLEAR_SETTINGS_MSG" type="text/template"><%= STR_CLEAR_SETTINGS_MSG %></script>
<script id="STR_DISABLE_WIFI_MSG" type="text/template"><%= STR_DISABLE_WIFI_MSG %></script>
<script id="STR_NONE" type="text/template"><%= STR_NONE %></script>
<script id="STR_PASSWORD_HINT_MSG" type="text/template"><%= STR_PASSWORD_HINT_MSG %></script>
<script id="STR_PASSWORD_HINT_MSG_1" type="text/template"><%= STR_PASSWORD_HINT_MSG_1 %></script>
<script id="STR_PASSWORD_HINT_MSG_2" type="text/template"><%= STR_PASSWORD_HINT_MSG_2 %></script>
<script id="STR_NETWORK_LIST_ERROR_MSG" type="text/template"><%= STR_NETWORK_LIST_ERROR_MSG %></script>
<script id="STR_INVALID_NETWORK_NAME_MSG_1" type="text/template"><%= STR_INVALID_NETWORK_NAME_MSG_1 %></script>
<script id="STR_PASSWORD_ADVANCED" type="text/template"><%= STR_PASSWORD_ADVANCED %></script>
<script id="STR_CONFIRM_NO_NETWORK" type="text/template"><%= STR_CONFIRM_NO_NETWORK %></script>
<!-- New error messages required -->
<script id="STR_INVALID_IP_SETTINGS_MSG" type="text/template"><%= STR_INVALID_IP_SETTINGS_MSG %></script>
<script id="STR_ENCRYPTION_ERROR_MSG" type="text/template"><%= STR_ENCRYPTION_ERROR_MSG %></script>
<script id="STR_NETWORK_NAME_ERROR_MSG" type="text/template"><%= STR_NETWORK_NAME_ERROR_MSG %></script>
<script id="STR_ORIENTATION_ERROR_MSG" type="text/template"><%= STR_ORIENTATION_ERROR_MSG %></script>

<script src="/javascript/jquery.js"></script>
<script src="/javascript/client_side_script.js">
</script>
</body>
</html>
