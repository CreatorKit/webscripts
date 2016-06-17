<?lua
	require("provision")
	local gateway_provision_status = is_gateway_device_provisioned()
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
	<script><?lua print ("if("..tostring(gateway_provision_status)..") window.location.href = 'client_list.lp';")?></script>
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
				<p><%= STR_JAVASCRIPT_MSG_3 %></p>
				<p><%= STR_JAVASCRIPT_MSG_2 %></p>
			</div>
		</noscript>
		<div id="main">
			<div id="message" class="message-container"></div>
			<div>
				<h2 class="c-title"><%= STR_REGISTER_CI40_TITLE %></h2>
			</div>
			<div>
				<p class="c-description"><%= STR_REGISTER_CI40_MSG %></p>
			</div>
			<form method="post" id="form-provision">
				<div id="provision" class="grid">
					<div class="form-item">
						<span class="span-1 c-label"><label for="device_name"><%= STR_CI40_DEVICE_NAME %></label></span>
						<span class="span-1 c-input"><input id="device_name" name="device_name" /></span>
					</div>
					<div class="form-item" style="display:none;">
						<span class="span-1 c-label"><label for="device_desc"><%= STR_DEVICE_DESC %></label></span>
						<span class="span-1 c-input"><textarea id="device_desc" rows="2" name="device_desc"></textarea></span>
					</div>
					<div class="form-item" style="display:none;">
						<span class="span-1 c-label"><label for="device_type">Device Type</label></span>
						<span class="span-1 c-input"><input id="device_type" name="device_type" /></span>
					</div>
					<div class="form-item" style="display:none;">
						<span class="span-1 c-label"><label for="licensee_id">Licensee ID</label></span>
						<span class="span-1 c-input"><input id="licensee_id" name="licensee_id" /></span>
					</div>
					<div class="form-item" >
						<span class="span-1 c-label"><label for="device_reg_code"><%= STR_DEVICE_REG_CODE %></label></span>
						<span class="span-1 c-input"><input id="device_reg_code" name="device_reg_code" /></span>
					</div>
				</div>
				<button type="submit" id="btn-provision" class="button-main"><%= STR_REGISTER %></button>
				<input type="hidden" id="config_method" name="config_method" value="web_page"/>
			</form>
		</div>
	</div>
	<script id="STR_CI40_INVALID_DEVICE_NAME_MSG" type="text/template"><%= STR_CI40_INVALID_DEVICE_NAME_MSG %></script>
	<script id="STR_CI40_INVALID_DEVICE_NAME_MSG_2" type="text/template"><%= STR_CI40_INVALID_DEVICE_NAME_MSG_2 %></script>
	<script id="STR_INVALID_DEVICE_REG_CODE_MSG" type="text/template"><%= STR_INVALID_DEVICE_REG_CODE_MSG %></script>
	<script id="STR_NONE" type="text/template"><%= STR_NONE %></script>
	<script src="/javascript/jquery.js"></script>
	<script src="/javascript/jquery.validate.min.js"></script>
	<script src="/javascript/client_side_script.js"></script>
	<script>
		var element = document.getElementById("message");

		var msg = getCookie("message");
		if (msg) {
			if(msg == 1) {
				element.innerHTML = "<%= STR_PROVISION_FAIL %>";
				element.className += ' error';
			} else if(msg == 2) {
				element.innerHTML = "<%= STR_ALREADY_PROVISIONED %>";
				element.className += ' error';
			} else if(msg == 254) {
				element.innerHTML = "<%= STR_UBUS_CONNECTION_FAIL %>";
				element.className += ' error';
			} else if(msg == 255) {
				element.innerHTML = "<%= STR_UBUS_TIMEOUT %>";
				element.className += ' error';
			}
			document.cookie = 'message=null; expires=0; path=/';
		}
	</script>
</body>
</html>
