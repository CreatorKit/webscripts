<?lua
	require("client_list")
	local client_list_array = get_client_list()
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
				<p><%= STR_JAVASCRIPT_MSG_3 %></p>
				<p><%= STR_JAVASCRIPT_MSG_2 %></p>
			</div>
		</noscript>
		<div id="config" class="page-container">
			<div id="message" class="message-container"></div>
			<div class="c-cloud-logo"></div>
			<div>
				<h2 class="c-title-c"><span class="c-checkbox-success"></span><%= STR_GATEWAY_NAME_PLACEHOLDER %></h2>
			</div>
			<div>
				<p class="c-description-c"><%= STR_GATEWAY_DESCRIPTION_PLACEHOLDER %></p>
			</div>
			<div>
				<h2 class="c-title">Connected Devices</h2>
			</div>
			<div class="c-devices-column-container span span-1">
				<form method="post" target="message" id="form-provision-constrained">
					<div class="c-devices-column span span-1-2">
						<div class="c-dc-title"><%= STR_PENDING_REGISTRATION %></div>
						<?lua
							for i=1, #client_list_array do
								local device = client_list_array[i]
								local device_id = device["clientId"]
								local is_provisioned = device["is_device_provisioned"]
								if not is_provisioned then
									print ("<div class='c-device'>" ..
										"<div class='c-device-checkbox'><input class='pending_checkbox' type='checkbox' name='' value=''></div>"..
										"<div class='c-device-details'>" ..
											"<input class='form-name-input' type='hidden' value='"..device_id.."' name='' />"..
											"<div class='c-device-name'>"..device_id.."</div>"..
											"<div class='c-device-description'></div>"..
										"</div>"..
									"</div>")
								end
							end
						?>
						<button type="submit" class="c-device-register-button c-device-form-button" disabled="disabled"><%= STR_REGISTER_DEVICE_BUTTON %></button>
					</div>
					<input type="hidden" id="config_action" name="config_action" value="register"/>
				</form>
				<form method="post" target="message" id="form-delete-constrained">
					<div class="c-devices-column span span-1-2">
						<div class="c-dc-title"><%= STR_REGISTERED_TO_FM2M %></div>
						<?lua
							for i=1, #client_list_array do
								local device = client_list_array[i]
								local device_id = device["clientId"]
								local is_provisioned = device["is_device_provisioned"]
								if is_provisioned then
									print ("<div class='c-device'>" ..
										"<div class='c-device-checkbox'><input class='pending_checkbox' type='checkbox' name='' value=''></div>"..
										"<div class='c-device-details'>" ..
											"<input class='form-name-input' type='hidden' value='"..device_id.."' name='' />"..
											"<div class='c-device-name'>"..device_id.."</div>"..
											"<div class='c-device-description'></div>"..
										"</div>"..
									"</div>")
								end
							end
						?>
						<button type="submit" class="c-device-delete-button c-device-form-button" disabled="disabled"><%= STR_DELETE_DEVICE_BUTTON %></button>
					</div>
					<input type="hidden" id="config_action" name="config_action" value="delete"/>
				</form>
			</div>
		</div>
	</div>
	<script id="STR_INVALID_DEVICE_NAME_MSG" type="text/template"><%= STR_INVALID_DEVICE_NAME_MSG %></script>
	<script id="STR_INVALID_DEVICE_NAME_MSG_2" type="text/template"><%= STR_INVALID_DEVICE_NAME_MSG_2 %></script>
	<script id="STR_INVALID_DEVICE_REG_CODE_MSG" type="text/template"><%= STR_INVALID_DEVICE_REG_CODE_MSG %></script>
	<script id="STR_NONE" type="text/template"><%= STR_NONE %></script>
	<script src="/javascript/jquery.js"></script>
	<script src="/javascript/jquery.validate.min.js"></script>
	<script src="/javascript/client_side_script.js"></script>
	<script>
		var element = document.getElementById("message");

		var msg = getCookie("message");
		if (msg) {
			if (msg == 0) {
				element.innerHTML = "<%= STR_PROVISION_SUCCESS %>";
				element.className += ' success';
			} else if(msg == 1) {
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
