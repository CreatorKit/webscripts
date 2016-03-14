"use_strict";

// use $.log() instead of console.log() - prevents issues in non console browsers
$ && (!$.log) && ($.log = function (a) { console && console.log(a) });

// build <ul> for 'styled' version of SSID select
$('<ul class="ul-network-list" style="-moz-user-select:none;-webkit-user-select:none;" onselectstart="return false;"/>' +
	'<ul class="ul-network-none" style="-moz-user-select:none;-webkit-user-select:none;" onselectstart="return false;"><li>' + $('#STR_NONE').html() + '</li></ul>').insertBefore( $('#ssid') );

// "underscore object" global variable
var _ = {
	advancedPassword : $('#STR_PASSWORD_ADVANCED').html(),
	alertConnect : $('#STR_CONNECT_MSG_2').html(),
	$btnClearNetworks : $('#btn-clear-networks'),
	$btnDisableWifi : $('#btn-disable-wifi'),
	$btnConnect : $('#btn-connect'),
	$btnCheckUpgrade : $('#btn-check-upgrade'),
	$btnNetworkRefresh : $('#btn-network-refresh'),
	confirmNoNetwork : $('#STR_CONFIRM_NO_NETWORK').html(),
	connError : $('#conn-error').text(),
	currentNetwork : $('#current-network').text(),
	$encryption : $('#encryption'),
	errorAscii : $('#STR_PRINTABLE_ASCII_MSG').html(),
	errorClearSettings : $('#STR_CLEAR_SETTINGS_MSG').html(),
	errorDisableWifi : $('#STR_DISABLE_WIFI_MSG').html(),
	errorDeviceName : $('#STR_CI40_INVALID_DEVICE_NAME_MSG').html(),
	errorDeviceName2 : $('#STR_CI40_INVALID_DEVICE_NAME_MSG_2').html(),
	errorDeviceRegCode : $('#STR_INVALID_DEVICE_REG_CODE_MSG').html(),
	errorEncryption : $('#STR_ENCRYPTION_ERROR_MSG').html(),
	errorIpAddress : $('#STR_INVALID_IP_SETTINGS_MSG').html(),
	errorNetworkList : $('#STR_NETWORK_LIST_ERROR_MSG').html(),
	errorNetworkName : $('#STR_INVALID_NETWORK_NAME_MSG_1').html(),
	errorNone : $('#STR_NONE').html(),
	errorOrientation : $('#STR_ORIENTATION_ERROR_MSG').html(),
	errorPassword : $('#STR_PASSWORD_HINT_MSG').html(),
	errorPassword1 : $('#STR_PASSWORD_HINT_MSG_1').html(),
	errorPassword2 : $('#STR_PASSWORD_HINT_MSG_2').html(),
	errorWep : $('#STR_INVALID_PASSWORD_WEP_MSG').html(),
	errorWpa : $('#STR_INVALID_PASSWORD_WPA_MSG').html(),
	$formNetworkList : $('#form-network-list'),
	$ipAddress : $('.ipaddress'),
	$ipOptions : $('[name=addr_method]'),
	$ipSetup : $('#ipsetup'),
	labelPassword1 : $('#STR_PASSWORD_HINT_MSG_1').html(),
	labelPassword2 : $('#STR_PASSWORD_HINT_MSG_2').html(),
	$manualPassword : $('#manual_password'),
	$manualSsid : $('#manual_ssid'),
	$networkHint : $('.hint-network'),
	$networkHintAdvanced : $('#hint-network-advanced'),
	$netSelect : $('#ssid'),
	$netList : $('.ul-network-list'),
	$netNone : $('.ul-network-none'),
	$password : $('#password'),
	$encPassword : $('#enc_password'),
	$encManualPassword : $('#enc_manual_password'),
	$passwordLabel : $('#network_password .label'),
	$showPassword : $('#showPassword'),
	$showManualPassword : $('#showManualPassword'),
	rememberedNetworks : 0
};

var oNetList = {};

// test that only ascii printable characters are present
function containsPrintableAscii( str ) {
	return /^[\40-\176]*$/.test(str);
}

// test that only hexadecimal characters are present
function checkHex( str ) {
	return /^[0-9A-Fa-f]+$/.test(str);
}


function dialogConnect() {
	alert( _.alertConnect );
}


function formItems() {
// ASCII printable characters
	jQuery.validator.addMethod("ascii", function(value, element, param) {
		return this.optional(element) || containsPrintableAscii( value );
	}, _.errorAscii );


// IP address
	jQuery.validator.addMethod("iprequired", function(value, element, param) {
		return this.optional(element) || /^(\d|[1-9]\d|1\d\d|2([0-4]\d|5[0-5]))\.(\d|[1-9]\d|1\d\d|2([0-4]\d|5[0-5]))\.(\d|[1-9]\d|1\d\d|2([0-4]\d|5[0-5]))\.(\d|[1-9]\d|1\d\d|2([0-4]\d|5[0-5]))$/.test(value)
	}, _.errorIpAddress );


// Not equal
	jQuery.validator.addMethod("notequal", function(value, element, param) {
		return this.optional(element) || (value !== param && value !== "NONE" && value !== "INVALID");
	}, "Please select a value" );


// WEP
	jQuery.validator.addMethod("wep", function(value, element, param) {
		var inputLength = value.length,
			isHex = checkHex(value);

		return this.optional(element) || inputLength === 5 || (inputLength === 10 && isHex) || inputLength === 13 || (inputLength === 26 && isHex) || inputLength === 16 || (inputLength === 32 && isHex) || inputLength==29 || (inputLength==58 && isHex);
	}, _.errorWep + " " + _.errorAscii );


// WPA2/PSK and WPA/PSK
	jQuery.validator.addMethod("wpa", function(value, element, param) {
		var inputLength = value.length,
			isHex = checkHex(value);

		return this.optional(element) || (inputLength >= 8 && inputLength <= 63) || (inputLength === 64 && isHex);
	}, _.errorWpa + " " + _.errorAscii );


	jQuery.validator.addClassRules({
		iprequired: {
			iprequired: true,
			required: true
		},
		notequal: {
			required: true,
			notequal: true
		},
		wep: {
			required: true,
			ascii: true,
			wep: true
		},
		wpa: {
			required: true,
			ascii: true,
			wpa: true
		}
	});

	$("#form-provision").validate({
		rules: {
			device_name: {
				required: true,
				ascii: true,
			},
			device_reg_code: {
				required: true,
			},
		},
		errorClass: "error",
		errorPlacement: function( label, element ) {
                    label.addClass("c-error-msg-label");
                    if( element.attr( "type" ) === "checkbox" || element.attr( "type" ) === "radio" ) {
                        element.parent().append( label );
                    }
                    else {
                        label.insertAfter( element );
                    }
                },
		messages: {
			device_name: {
				required: _.errorDeviceName,
				ascii: _.errorDeviceName2,
			},
			device_reg_code: {
				required: _.errorDeviceRegCode,
			},
		},
		submitHandler: function(form) {
			document.getElementById('form-provision').action ="provision.lp";
			form.submit();
		}
	});


/**
	* Form provisioning of constrained devices
	*/

var $constrained_devices_form = $('#form-provision-constrained');
if($constrained_devices_form.length > 0){

	var checkboxes = $('.c-device-checkbox input');

	checkboxes.on("change", function(){


		/**
			* First we need to handle checkbox being a part of the form sent or not
			* If the hidden input nearby doesn't have the name "device_name" it won't get submitted
			* Accordingly, when the checkbox is checked, assign the name and vice versa.
			*/

			var chk = $(this),
					corresponding_input = chk.parent().siblings(".c-device-details").children('.form-name-input');


			if(chk.is(':checked')) corresponding_input.attr("name", "device_id");
			else corresponding_input.attr("name", "");


		/**
			* Then we can handle the submit buttons being enabled or disabled
			*/

			var is_any_checked = false,
					groupButton = $(this).parent().parent().siblings("button");

			// First let's update the list of checkboxes to have only the siblings of the selected
			checkboxes = $('.' + $(this).attr("class"));

			$.each(checkboxes, function(i,v){
		    	if(v.checked) is_any_checked = true;
			});

			if(is_any_checked) groupButton.removeAttr("disabled");
			else groupButton.attr("disabled", "disabled");

	});
}

$('.c-device-form-button').on("click", function(){
		var $form_action = $('#config_action');
		if($(this).hasClass("c-device-register-button")) $form_action.val('register');
		else if($(this).hasClass("c-device-delete-button")) $form_action.val('delete');
});


$('#form-provision-constrained').validate({
		submitHandler: function(form){
			document.getElementById('form-provision-constrained').action ="provision_constrained.lp";
			form.submit();
		}
	});

	$('#form-delete-constrained').validate({
			submitHandler: function(form){
				document.getElementById('form-delete-constrained').action ="provision_constrained.lp";

					var confirmDelete = confirm("Please confirm that you wish to delete the selected devices from your FlowCloud account.");
					if (confirmDelete == true) {
					    	form.submit();
					} else {
					    return;
					}

			}
		});
}

function checkNetworkError() {
	if ( _.connError !== "" ) {
		document.getElementById('current-network').style.color = "#c00"
		document.getElementById('conn-error').style.color = "#c00"
	}
}

_.$btnClearNetworks.on("click", function(){
	var r = confirm( _.errorClearSettings );
	if (!r) {
		return false;
	}
	else
	{
		location.href = "clear_settings.lp"
	}
});

_.$btnDisableWifi.on("click", function(){
	var r = confirm( _.errorDisableWifi );
	if (!r) {
		return false;
	}
	else
	{
		location.href = "disable_wifi.lp"
	}
});

// =====================================================================
// =Basic / Network List
// =====================================================================

// controls selection of the hidden <select id="ssid" ... > options
function fauxSelectOptions( $option ) {
	var encryption = $option.data('encryption'),
		i = $option.index();

	$('.network-list li').removeClass('selected');
	$('option', _.$netSelect).prop('selected', false);
	$option.addClass('selected');
	$('option:eq(' + i + ')', _.$netSelect).prop('selected', true);
	// _.$netSelect.valid();
	switchEncryption( _.$password, _.$passwordLabel, _.$showPassword, encryption );
	checkNetworkList($option);
	$.log( _.$netSelect.val() );
}

function resetPassword() {
	_.$passwordLabel.addClass('disabled');
	_.$password.removeClass('wpa wep required').prop('disabled', true).valid();
	_.$showPassword.prop('disabled', true);
}

// construct an <li> and <option> for each SSID select option
function buildNetworkList() {
	_.$netSelect.empty();
	_.$netList.empty();

	var currNetworkFound = false;	//Assume that current network was not found in the scan

	if ( oNetList && oNetList.ssid.length ) {
		_.$netNone.hide();
		var oNetItems = oNetList.ssid;

		for (var i = 0; i < oNetList.ssid.length ; i++) {
			var li = '<li class="',
				option = '<option';

			if ( oNetItems[i].encryption !== "" && oNetItems[i].encryption !== "open" ){
				li += 'encrypted';
			}
			else if ( oNetItems[i].encryption === "open" ){
				li += 'open';
			}
			else if ( oNetItems[i].encryption === "" ){
				li += 'invalid';
			}

			if ( oNetItems[i].name === _.currentNetwork ) {
			    currNetworkFound = true;	//Current network was found, don't add again it manually
				if ( _.connError === "" ) {
					// li += " selected remembered";
					li += " remembered";
				}
				else {
					li += " failed selected";
					// option += ' selected="selected"'
					_.$networkHint.html(oNetItems[i].name);
					_.rememberedNetworks ++;
				}
			}

			li += '"';

			if ( oNetItems[i].encryption !== "" ){
				li += ' data-encryption="' + oNetItems[i].encryption.toLowerCase().replace('/','') + '"';
				option += ' value="' + oNetItems[i].name + '=' + oNetItems[i].encryption + '"';
			}
			else {
				li += ' data-encryption="invalid"'
				option += ' value="NONE"';
			}

			li += '><span>'+ oNetItems[i].name;
			option += '>'+ oNetItems[i].name;

			if ( oNetItems[i].encryption !== "" ){
				li += ' (' + oNetItems[i].encryption + ')';
				option += ' (' + oNetItems[i].encryption + ')';
			}

			li += '</span></li>';
			option += '</option>';

			$(li).appendTo('.ul-network-list');
			_.$netSelect.append(option);
		}

		// if ( _.rememberedNetworks === 0 ) {
		//	$('.ul-network-list li:first-child').addClass('selected');
		//	$('option:first-child', _.$netSelect).attr('selected', 'selected');
		//	fauxSelectOptions( $('.ul-network-list li:first-child') );
		// }

		if(currNetworkFound == false && _.currentNetwork != "")
		{
			// The current network was configured but was not found in the network scan, so add it manually
		    var li = '<li class="open remembered" data-encryption="open"><span>' + _.currentNetwork + '</span></li>';
	    var option = '<option value="NONE">' + _.currentNetwork + '</option>'; // NONE forces server side code to check if currentNetwork is set, and if yes, connect it
	    $(li).prependTo('.ul-network-list');
			_.$netSelect.prepend(option);
		}

		_.$netList.show();
	}
	else if (oNetList.ssid.length === 0){
		_.$netNone.show();
		// _.$password.prop('disabled', true);
	}

	// reset basic password field
	resetPassword();

	if(_.currentNetwork != "" && _.connError !== "")
	{
		// Highlight the current network which failed and enable the password if required
		fauxSelectOptions( $(".ul-network-list li.selected "));
	}

	// disabled Save button
	// _.$btnConnect.prop('disabled', true);
}

function checkNetworkList( $selected ) {
	// invalid network (no current network - default option)
	if( $selected.data('encryption') === "invalid" || $selected.is('.remembered') || $selected.is('.failed')){
		_.$networkHint.html(_.currentNetwork);
		//$.log('current')
	}
	// open network
	else if( $selected.data('encryption') === "open" ){
		_.$networkHint.html( _.errorPassword1 );
		//$.log('open')
	}
	// encrypted network
	else {
		_.$networkHint.html( _.errorPassword2 );
		//$.log('encrypted')
	}
}

function encrypt_string(plaintext){
	var enc_text;

	// encrypt() method has a bug. If the encryption result starts with zeros,
	// those leading zeros are stripped away from the returned string. Since the
	// encryption result is different for every iteration, workaround that by
	// enrypting the string again, until the result has correct length.
	do
	{
		enc_text = key.encrypt(plaintext);
	}
	while (enc_text.length != 256);
	return enc_text;
}

function enablePassword( $password, $showPasswordChkbox, encryption ) {
	if ( encryption === "open" || encryption === "invalid"){
		// disable password field
		$password.prop('disabled', true);
		$showPasswordChkbox.prop('disabled', true);
	}
	else {
		// enable password field
		$password.prop('disabled', false);
		$showPasswordChkbox.prop('disabled', false);
	}
}

function switchEncryption( $passwordInput, $passwordLabel, $showPasswordChkbox, encryption ) {
	// set class of password field as appropriate
	switch ( encryption ) {
		case "invalid" :
			// $.log('encryption open');
			$passwordInput.removeClass('error required wep wpa').valid();//.siblings('.req').remove();
			$passwordLabel.addClass('disabled').text( _.labelPassword2 );
			// _.$networkHintAdvanced.html( _.advancedPassword );
			break;

		case "open" :
			// $.log('encryption open');
			$passwordInput.removeClass('error required wep wpa').valid();//.siblings('.req').remove();
			$passwordLabel.addClass('disabled').text( _.labelPassword1 );
			// _.$networkHintAdvanced.html( _.errorPassword1 );
			break;

		case "wep" :
			// $.log('encryption wep');
			$passwordInput.removeClass('invalid open wpa');//.siblings('.req').remove();
			$passwordInput.addClass('required wep');//.after(_.requiredMark);
			$passwordLabel.removeClass('disabled').text( _.labelPassword2 );
			// _.$networkHintAdvanced.html( _.advancedPassword );
			break;

		case "wpa" :
		case "wpa/wpa2" :
		case "wpa2" :
			// $.log('encryption WPA');
			$passwordInput.removeClass('invalid open wep');//.siblings('.req').remove();
			$passwordInput.addClass('required wpa');//.after(_.requiredMark);
			$passwordLabel.removeClass('disabled').text( _.labelPassword2 );
			// _.$networkHintAdvanced.html( _.advancedPassword );
			break;
	}

	enablePassword( $passwordInput, $showPasswordChkbox, encryption );

	// $passwordInput.valid();
}

// =faux select change
// Available networks: define action on selecting an item
$('.network-list').on("click", ".ul-network-list li", function(){
	fauxSelectOptions( $(this) );
	_.$netSelect.valid();//.triggerHandler("focus");
});

_.$netSelect.on("change", function() {
	var $this = $(this),
		i = $this.index();

	$('.network-list li').removeClass('selected');
	$('.network-list li:eq(' + i + ')').addClass('selected');
});


// =====================================================================
// =Advanced / Manual Configuration
// =====================================================================

// Encryption type: select events
_.$encryption.on('change', function(){
	switchEncryption( _.$manualPassword, _.$networkHintAdvanced, _.$showManualPassword, $(this).val().toLowerCase() );
});

// IP setup: input events
_.$ipOptions.on("change", function(){
	var mode = $(this).val();
// >=>
	if ( mode === "static" ) {
		_.$ipAddress.each(function(){
			$(this).addClass('iprequired')//.valid();
		});
		_.$ipSetup.slideDown(500);
	}
	else if ( mode === "dhcp" ) {
		_.$ipSetup.slideUp(500);
		_.$ipAddress.each(function(){
			$(this).removeClass('iprequired').valid();
		});
	}
});


_.$btnCheckUpgrade.on("click", function(){
	// $.log('check upgrade');
	alert("Your Jongo will now check for upgrades.");
	$(this).css('display', 'none');
	window.frames['upgrade_result'].document.write("<span style='font-family: Helvetica, Arial, sans-serif;font-size: 0.8125em;font-style: normal;font-variant: normal;font-weight: normal;line-height: 1.385em;color: #3b3b3b;'>Checking for upgrade...</span>");
	return true;
});

function loadJson(){
	_.$netList.hide();
	_.$netNone.hide();
	$('.network-list-loading').show();

		// JSON file location specified here "network-list.json"
		$.getJSON("networklist.lp?output=json", function(data) {
			oNetList = data;
		})
		// confirms getJSON success
		.success(function() { $.log("getJSON successful"); })
		// error is returned if getJSON is unsuccessful or process is interrupted
		.error(function(data) {
			$.log('getJSON error');
			// $.log(data);
		})
		// Commented out the following line as per WW's update on 07-12-12 in reference to PRN 33697
		//.error(function() { alert($('#STR_NETWORK_LIST_ERROR_MSG').html()); })
		// confirms getJSON complete
		.complete(function(data) {
			$.log('getJSON complete');
			_.$networkHint.html();

			var t = setTimeout(function(){
				$('.network-list-loading').hide();
				// build <ul> and <select> contents for available networks dynamically
				buildNetworkList();
				_.$btnNetworkRefresh.prop('disabled', false);
			}, 1000);
		});
}

// ==>TABBED CONTENT
// ====================================================================

// set up content blocks with a class of 'tabs' as tabbed content
function tabs() {
	$('.tabs').each(function(){
		// on initial load hide all but the first block of content in each tab group
		// and add a class of active to the first tab

		// declare variables within each container with a class of 'tabs'
		var $tabGroup = $(this),
			$tabContent = $tabGroup.find('.tab-content'),
			$tabLink = $tabGroup.find('.nav a');

		$tabLink.first().addClass('active');
		$tabContent.hide();
		$tabContent.first().show();

		_.$ipSetup.hide();

		$tabLink.click(function(){
			var context = $(this),
				oldTab = $('.active').attr('href'),
				newTab = context.attr('href');

			if ( !context.hasClass('active') ) {
				// reset form, but save device name and BT multiroom checkbox status.
				var deviceName = $("#device_name").val();
				var btMultiOn = document.getElementById('BT-multi').checked;
				var btVisibility = $('input[name=bt_visibility]:checked').attr('id');
				_.$formNetworkList[0].reset();
				$("#device_name").val(deviceName);
				document.getElementById('BT-multi').checked = btMultiOn;
				document.getElementById(btVisibility).checked = true;

				switchEncryption( _.$manualPassword, _.$networkHintAdvanced, _.$showManualPassword, _.$encryption.val().toLowerCase() );
				_.$ipSetup.hide();

				// form data is reset on switching tabs but 'faux' network list
				// needs to be reset separately as this is not a true form control
				$('.selected', _.$netList).removeClass('selected');

				// reset basic password field
				resetPassword();

				// set active tab link
				$tabLink.removeAttr('class');
				context.addClass('active');

				// toggle active tab
				$tabContent.hide();
				$(newTab).show();

				// >>>
				// on switching tabs ...
				// 1) remove class of "required" from elements to ...
				$(newTab + ' .required').removeClass('required').addClass('ignore');
				$(newTab + ' .notequal').removeClass('notequal error').addClass('ignore-notequal');
				// 2) allow form to be checked without errors being flagged up and then ...
				_.$formNetworkList.valid();
				// 3) reinstate "required"
				$('.ignore').removeClass('ignore').addClass('required');
				$('.ignore-notequal').removeClass('ignore-notequal').addClass('notequal');
			}

			return false;
		});
	});
}

var key;

$(function(){
	tabs();
	formItems();
});

$(window).load(function(){
	// JSON is only loaded once all page assets are loaded
	/*loadJson();
	_.$btnNetworkRefresh.on("click", function(){
		// $.log('refresh network list');
		$(this).prop('disabled', true);
		$('#no-networks').remove();
		loadJson();
		return false;
	});*/
});

$('.message-container').on("load", function () {
	if($(".message-container").contents().find(".message").length)
	{
		$(".message-container").show();
	}
});

function getCookie(cname) {
	var name = cname + "=";
	var ca = document.cookie.split(';');
	for (var i = 0; i < ca.length; i++) {
		var c = ca[i];
		while (c.charAt(0) == ' ') c = c.substring(1);
		if (c.indexOf(name) != -1) return c.substring(name.length, c.length);
	}
	return "";
}
