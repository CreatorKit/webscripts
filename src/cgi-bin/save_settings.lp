<?lua
require("strings_en_GB")
?>
<!doctype html>
<!--[if lt IE 7]><html class="no-js lt-ie9 lt-ie8 lt-ie7 ie6" lang="en"><![endif]-->
<!--[if IE 7]><html class="no-js lt-ie9 lt-ie8 ie7" lang="en"><![endif]-->
<!--[if IE 8]><html class="no-js lt-ie9 ie8" lang="en"><![endif]-->
<!--[if IE 9]><html class="no-js ie9" lang="en"><![endif]-->
<!--[if gt IE 9]><!--><html class="no-js" lang="en"><!--<![endif]-->
<html class="" lang="en"><!--<![endif]--><!--<![endif]--><head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title><%= STR_HOME_PAGE_TITLE %></title>
<link href="/css/style.css" rel="stylesheet">
<script src="/javascript/jquery.js"></script>
<script>var a=document.getElementsByTagName("html")[0];a.className&&(a.className=a.className.replace(/no-js\s?/, ''));</script>
<script>
function handleBrowser()
{
	document.getElementById('form_connecting').submit();
}
$(function(){
    $("#getHelp").hide()
});

function toggle_help()
{
    $("#getHelp").toggle()
}
</script>
</head>
<body id="home" class="en_GB"  onload="handleBrowser();">
	<div class="container">
		<noscript class="no-js-message">
			<div>
				<p><%= STR_JAVASCRIPT_MSG_1 %></p>
				<p><%= STR_JAVASCRIPT_MSG_2 %></p>
			</div>
		</noscript>
		<img src="/image/creatorlogo.png" alt="Creator" class="logo">
		<h1><%= STR_SETUP_COMPLETE %></h1>
		<iframe name="message" class="message" style="display:none"></iframe>
		<div id="main">
			<div class="box">
				<div id="generic-info" style="min-height: 0px;">
					<ol class="grid">
						<li>
							<span class="span-1">
								<ul style="list-style-type:disc">
									<li><% cgilua.print(string.format(STR_SETUP_COMPLETE_MSG_1,"<strong style='color:#00ff00'>","</strong>")) %> </li>
									<li><% cgilua.print(string.format(STR_SETUP_COMPLETE_MSG_2,"<a href='javascript:toggle_help();' style='color:#0000ff'>","</a>")) %></li>
								</ul>
							</span>
						</li>
					</ol>
				</div>
			</div>
			<div id="getHelp">
				<br>
				<p><% cgilua.print(string.format(STR_SETUP_COMPLETE_HELP_MSG_1,"<strong style='color:#ff0000'>","</strong>"))  %></p>
				<ul style="list-style-type:disc">
					<li><%= STR_SETUP_COMPLETE_HELP_MSG_2  %></li>
					<li><%= STR_SETUP_COMPLETE_HELP_MSG_3  %></li>
					<li><%= STR_SETUP_COMPLETE_HELP_MSG_4  %></li>
				</ul>
				<p><%= STR_SETUP_COMPLETE_HELP_MSG_5 %></p>
				<ul style="list-style-type:disc">
					<li><%= STR_SETUP_HELP_NO_NETWORK_MSG_2  %></li>
					<li><%= STR_SETUP_HELP_NO_NETWORK_MSG_5  %></li>
					<li><% cgilua.print(string.format(STR_SETUP_HELP_NO_NETWORK_MSG_6,"<strong>","</strong>")) %></li>
				</ul>
			</div>
		</div>
		<form action="<%= "connection.lp" %>" method="post" id="form_connecting" target="message" novalidate="novalidate">
			<input type="hidden" name="ssid" value="<%= cgilua.POST.ssid %>" />
			<input type="hidden" name="password" value="<%= cgilua.POST.password %>" />
			<input type="hidden" name="manual_password" value="<%= cgilua.POST.manual_password %>" />
			<input type="hidden" name="manual_ssid" value="<%= cgilua.POST.manual_ssid %>" />
			<input type="hidden" name="encryption" value="<%= cgilua.POST.encryption %>" />
			<input type="hidden" name="addr_method" value="<%= cgilua.POST.addr_method %>" />
			<input type="hidden" name="ip_address" value="<%= cgilua.POST.ip_address %>" />
			<input type="hidden" name="netmask" value="<%= cgilua.POST.netmask %>" />
			<input type="hidden" name="dns_server" value="<%= cgilua.POST.dns_server %>" />
			<input type="hidden" name="router_ip" value="<%= cgilua.POST.router_ip %>" />
			<input type="hidden" name="config_method" value="<%= cgilua.POST.config_method %>" />
		</form>
		<div id="footer">
			<p>&copy; Imagination Technologies 2016</p>
		</div>
	</div>
</body></html>
