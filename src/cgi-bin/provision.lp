<?lua
	require("provision")
	msg = provision()
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
	<link rel="shortcut icon" href="/favicon.ico">
	<script>
		<?lua print ("var ret = '"..tostring(msg).."';")?>
		if(ret) {
			document.cookie = "message="+ret+"; expires=0; path=/";
		}
		if(ret == 0) {
			window.location.href = 'client_list.lp';
		} else {
			window.location.href = 'index.lp';
		}
	</script>
</head>
<body id="home"></body>
</html>
