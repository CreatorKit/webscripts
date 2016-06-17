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
    errorDeviceName : $('#STR_INVALID_DEVICE_NAME_MSG').html(),
    errorDeviceName2 : $('#STR_INVALID_DEVICE_NAME_MSG_2').html(),
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

/*!
 * jQuery Validation Plugin 1.12.0pre
 *
 * http://bassistance.de/jquery-plugins/jquery-plugin-validation/
 * http://docs.jquery.com/Plugins/Validation
 *
 * Copyright 2013 Jörn Zaefferer
 * Released under the MIT license:
 *   http://www.opensource.org/licenses/mit-license.php
 */
(function(a){a.extend(a.fn,{validate:function(c){if(!this.length){if(c&&c.debug&&window.console){console.warn("Nothing selected, can't validate, returning nothing.")}return}var d=a.data(this[0],"validator");var b=a("html").hasClass("ie7");if(d){return d}if(!b){this.attr("novalidate","novalidate")}d=new a.validator(c,this[0]);a.data(this[0],"validator",d);if(d.settings.onsubmit){this.validateDelegate(":submit","click",function(e){if(d.settings.submitHandler){d.submitButton=e.target}if(a(e.target).hasClass("cancel")){d.cancelSubmit=true}if(a(e.target).attr("formnovalidate")!==undefined){d.cancelSubmit=true}});this.submit(function(e){if(d.settings.debug){e.preventDefault()}function f(){var g;if(d.settings.submitHandler){if(d.submitButton){g=a("<input type='hidden'/>").attr("name",d.submitButton.name).val(a(d.submitButton).val()).appendTo(d.currentForm)}d.settings.submitHandler.call(d,d.currentForm,e);if(d.submitButton){g.remove()}return false}return true}if(d.cancelSubmit){d.cancelSubmit=false;return f()}if(d.form()){if(d.pendingRequest){d.formSubmitted=true;return false}return f()}else{d.focusInvalid();return false}})}return d},valid:function(){if(a(this[0]).is("form")){return this.validate().form()}else{var c=true;var b=a(this[0].form).validate();this.each(function(){c=c&&b.element(this)});return c}},removeAttrs:function(d){var b={},c=this;a.each(d.split(/\s/),function(e,f){b[f]=c.attr(f);c.removeAttr(f)});return b},rules:function(e,b){var g=this[0];if(e){var d=a.data(g.form,"validator").settings;var i=d.rules;var j=a.validator.staticRules(g);switch(e){case"add":a.extend(j,a.validator.normalizeRule(b));delete j.messages;i[g.name]=j;if(b.messages){d.messages[g.name]=a.extend(d.messages[g.name],b.messages)}break;case"remove":if(!b){delete i[g.name];return j}var h={};a.each(b.split(/\s/),function(k,l){h[l]=j[l];delete j[l]});return h}}var f=a.validator.normalizeRules(a.extend({},a.validator.classRules(g),a.validator.attributeRules(g),a.validator.dataRules(g),a.validator.staticRules(g)),g);if(f.required){var c=f.required;delete f.required;f=a.extend({required:c},f)}return f}});a.extend(a.expr[":"],{blank:function(b){return !a.trim(""+a(b).val())},filled:function(b){return !!a.trim(""+a(b).val())},unchecked:function(b){return !a(b).prop("checked")}});a.validator=function(b,c){this.settings=a.extend(true,{},a.validator.defaults,b);this.currentForm=c;this.init()};a.validator.format=function(b,c){if(arguments.length===1){return function(){var d=a.makeArray(arguments);d.unshift(b);return a.validator.format.apply(this,d)}}if(arguments.length>2&&c.constructor!==Array){c=a.makeArray(arguments).slice(1)}if(c.constructor!==Array){c=[c]}a.each(c,function(d,e){b=b.replace(new RegExp("\\{"+d+"\\}","g"),function(){return e})});return b};a.extend(a.validator,{defaults:{messages:{},groups:{},rules:{},errorClass:"error",validClass:"valid",errorElement:"label",focusInvalid:true,errorContainer:a([]),errorLabelContainer:a([]),onsubmit:true,ignore:":hidden",ignoreTitle:false,onfocusin:function(b,c){this.lastActive=b;if(this.settings.focusCleanup&&!this.blockFocusCleanup){if(this.settings.unhighlight){this.settings.unhighlight.call(this,b,this.settings.errorClass,this.settings.validClass)}this.addWrapper(this.errorsFor(b)).hide()}},onfocusout:function(b,c){if(!this.checkable(b)&&(b.name in this.submitted||!this.optional(b))){this.element(b)}},onkeyup:function(b,c){if(c.which===9&&this.elementValue(b)===""){return}else{if(b.name in this.submitted||b===this.lastElement){this.element(b)}}},onclick:function(b,c){if(b.name in this.submitted){this.element(b)}else{if(b.parentNode.name in this.submitted){this.element(b.parentNode)}}},highlight:function(d,b,c){if(d.type==="radio"){this.findByName(d.name).addClass(b).removeClass(c)}else{a(d).addClass(b).removeClass(c)}},unhighlight:function(d,b,c){if(d.type==="radio"){this.findByName(d.name).removeClass(b).addClass(c)}else{a(d).removeClass(b).addClass(c)}}},setDefaults:function(b){a.extend(a.validator.defaults,b)},messages:{required:"This field is required.",remote:"Please fix this field.",email:"Please enter a valid email address.",url:"Please enter a valid URL.",date:"Please enter a valid date.",dateISO:"Please enter a valid date (ISO).",number:"Please enter a valid number.",digits:"Please enter only digits.",creditcard:"Please enter a valid credit card number.",equalTo:"Please enter the same value again.",maxlength:a.validator.format("Please enter no more than {0} characters."),minlength:a.validator.format("Please enter at least {0} characters."),rangelength:a.validator.format("Please enter a value between {0} and {1} characters long."),range:a.validator.format("Please enter a value between {0} and {1}."),max:a.validator.format("Please enter a value less than or equal to {0}."),min:a.validator.format("Please enter a value greater than or equal to {0}.")},autoCreateRanges:false,prototype:{init:function(){this.labelContainer=a(this.settings.errorLabelContainer);this.errorContext=this.labelContainer.length&&this.labelContainer||a(this.currentForm);this.containers=a(this.settings.errorContainer).add(this.settings.errorLabelContainer);this.submitted={};this.valueCache={};this.pendingRequest=0;this.pending={};this.invalid={};this.reset();var b=(this.groups={});a.each(this.settings.groups,function(e,f){if(typeof f==="string"){f=f.split(/\s/)}a.each(f,function(h,g){b[g]=e})});var d=this.settings.rules;a.each(d,function(e,f){d[e]=a.validator.normalizeRule(f)});function c(g){var f=a.data(this[0].form,"validator"),e="on"+g.type.replace(/^validate/,"");if(f.settings[e]){f.settings[e].call(f,this[0],g)}}a(this.currentForm).validateDelegate(":text, [type='password'], [type='file'], select, textarea, [type='number'], [type='search'] ,[type='tel'], [type='url'], [type='email'], [type='datetime'], [type='date'], [type='month'], [type='week'], [type='time'], [type='datetime-local'], [type='range'], [type='color'] ","focusin focusout keyup",c).validateDelegate("[type='radio'], [type='checkbox'], select, option","click",c);if(this.settings.invalidHandler){a(this.currentForm).bind("invalid-form.validate",this.settings.invalidHandler)}},form:function(){this.checkForm();a.extend(this.submitted,this.errorMap);this.invalid=a.extend({},this.errorMap);if(!this.valid()){a(this.currentForm).triggerHandler("invalid-form",[this])}this.showErrors();return this.valid()},checkForm:function(){this.prepareForm();for(var b=0,c=(this.currentElements=this.elements());c[b];b++){this.check(c[b])}return this.valid()},element:function(c){c=this.validationTargetFor(this.clean(c));this.lastElement=c;this.prepareElement(c);this.currentElements=a(c);var b=this.check(c)!==false;if(b){delete this.invalid[c.name]}else{this.invalid[c.name]=true}if(!this.numberOfInvalids()){this.toHide=this.toHide.add(this.containers)}this.showErrors();return b},showErrors:function(c){if(c){a.extend(this.errorMap,c);this.errorList=[];for(var b in c){this.errorList.push({message:c[b],element:this.findByName(b)[0]})}this.successList=a.grep(this.successList,function(d){return !(d.name in c)})}if(this.settings.showErrors){this.settings.showErrors.call(this,this.errorMap,this.errorList)}else{this.defaultShowErrors()}},resetForm:function(){if(a.fn.resetForm){a(this.currentForm).resetForm()}this.submitted={};this.lastElement=null;this.prepareForm();this.hideErrors();this.elements().removeClass(this.settings.errorClass).removeData("previousValue")},numberOfInvalids:function(){return this.objectLength(this.invalid)},objectLength:function(d){var c=0;for(var b in d){c++}return c},hideErrors:function(){this.addWrapper(this.toHide).hide()},valid:function(){return this.size()===0},size:function(){return this.errorList.length},focusInvalid:function(){if(this.settings.focusInvalid){try{a(this.findLastActive()||this.errorList.length&&this.errorList[0].element||[]).filter(":visible").focus().trigger("focusin")}catch(b){}}},findLastActive:function(){var b=this.lastActive;return b&&a.grep(this.errorList,function(c){return c.element.name===b.name}).length===1&&b},elements:function(){var c=this,b={};return a(this.currentForm).find("input, select, textarea").not(":submit, :reset, :image, [disabled]").not(this.settings.ignore).filter(function(){if(!this.name&&c.settings.debug&&window.console){console.error("%o has no name assigned",this)}if(this.name in b||!c.objectLength(a(this).rules())){return false}b[this.name]=true;return true})},clean:function(b){return a(b)[0]},errors:function(){var b=this.settings.errorClass.replace(" ",".");return a(this.settings.errorElement+"."+b,this.errorContext)},reset:function(){this.successList=[];this.errorList=[];this.errorMap={};this.toShow=a([]);this.toHide=a([]);this.currentElements=a([])},prepareForm:function(){this.reset();this.toHide=this.errors().add(this.containers)},prepareElement:function(b){this.reset();this.toHide=this.errorsFor(b)},elementValue:function(b){var c=a(b).attr("type"),d=a(b).val();if(c==="radio"||c==="checkbox"){return a("input[name='"+a(b).attr("name")+"']:checked").val()}if(typeof d==="string"){return d.replace(/\r/g,"")}return d},check:function(c){c=this.validationTargetFor(this.clean(c));var i=a(c).rules();var d=false;var h=this.elementValue(c);var b;for(var j in i){var g={method:j,parameters:i[j]};try{b=a.validator.methods[j].call(this,h,c,g.parameters);if(b==="dependency-mismatch"){d=true;continue}d=false;if(b==="pending"){this.toHide=this.toHide.not(this.errorsFor(c));return}if(!b){this.formatAndAdd(c,g);return false}}catch(f){if(this.settings.debug&&window.console){console.log("Exception occurred when checking element "+c.id+", check the '"+g.method+"' method.",f)}throw f}}if(d){return}if(this.objectLength(i)){this.successList.push(c)}return true},customDataMessage:function(b,c){return a(b).data("msg-"+c.toLowerCase())||(b.attributes&&a(b).attr("data-msg-"+c.toLowerCase()))},customMessage:function(c,d){var b=this.settings.messages[c];return b&&(b.constructor===String?b:b[d])},findDefined:function(){for(var b=0;b<arguments.length;b++){if(arguments[b]!==undefined){return arguments[b]}}return undefined},defaultMessage:function(b,c){return this.findDefined(this.customMessage(b.name,c),this.customDataMessage(b,c),!this.settings.ignoreTitle&&b.title||undefined,a.validator.messages[c],"<strong>Warning: No message defined for "+b.name+"</strong>")},formatAndAdd:function(c,e){var d=this.defaultMessage(c,e.method),b=/\$?\{(\d+)\}/g;if(typeof d==="function"){d=d.call(this,e.parameters,c)}else{if(b.test(d)){d=a.validator.format(d.replace(b,"{$1}"),e.parameters)}}this.errorList.push({message:d,element:c});this.errorMap[c.name]=d;this.submitted[c.name]=d},addWrapper:function(b){if(this.settings.wrapper){b=b.add(b.parent(this.settings.wrapper))}return b},defaultShowErrors:function(){var c,d;for(c=0;this.errorList[c];c++){var b=this.errorList[c];if(this.settings.highlight){this.settings.highlight.call(this,b.element,this.settings.errorClass,this.settings.validClass)}this.showLabel(b.element,b.message)}if(this.errorList.length){this.toShow=this.toShow.add(this.containers)}if(this.settings.success){for(c=0;this.successList[c];c++){this.showLabel(this.successList[c])}}if(this.settings.unhighlight){for(c=0,d=this.validElements();d[c];c++){this.settings.unhighlight.call(this,d[c],this.settings.errorClass,this.settings.validClass)}}this.toHide=this.toHide.not(this.toShow);this.hideErrors();this.addWrapper(this.toShow).show()},validElements:function(){return this.currentElements.not(this.invalidElements())},invalidElements:function(){return a(this.errorList).map(function(){return this.element})},showLabel:function(c,d){var b=this.errorsFor(c);if(b.length){b.removeClass(this.settings.validClass).addClass(this.settings.errorClass);b.html(d)}else{b=a("<"+this.settings.errorElement+">").attr("for",this.idOrName(c)).addClass(this.settings.errorClass).html(d||"");if(this.settings.wrapper){b=b.hide().show().wrap("<"+this.settings.wrapper+"/>").parent()}if(!this.labelContainer.append(b).length){if(this.settings.errorPlacement){this.settings.errorPlacement(b,a(c))}else{b.insertAfter(c)}}}if(!d&&this.settings.success){b.text("");if(typeof this.settings.success==="string"){b.addClass(this.settings.success)}else{this.settings.success(b,c)}}this.toShow=this.toShow.add(b)},errorsFor:function(c){var b=this.idOrName(c);return this.errors().filter(function(){return a(this).attr("for")===b})},idOrName:function(b){return this.groups[b.name]||(this.checkable(b)?b.name:b.id||b.name)},validationTargetFor:function(b){if(this.checkable(b)){b=this.findByName(b.name).not(this.settings.ignore)[0]}return b},checkable:function(b){return(/radio|checkbox/i).test(b.type)},findByName:function(b){return a(this.currentForm).find("[name='"+b+"']")},getLength:function(c,b){switch(b.nodeName.toLowerCase()){case"select":return a("option:selected",b).length;case"input":if(this.checkable(b)){return this.findByName(b.name).filter(":checked").length}}return c.length},depend:function(c,b){return this.dependTypes[typeof c]?this.dependTypes[typeof c](c,b):true},dependTypes:{"boolean":function(c,b){return c},string:function(c,b){return !!a(c,b.form).length},"function":function(c,b){return c(b)}},optional:function(b){var c=this.elementValue(b);return !a.validator.methods.required.call(this,c,b)&&"dependency-mismatch"},startRequest:function(b){if(!this.pending[b.name]){this.pendingRequest++;this.pending[b.name]=true}},stopRequest:function(b,c){this.pendingRequest--;if(this.pendingRequest<0){this.pendingRequest=0}delete this.pending[b.name];if(c&&this.pendingRequest===0&&this.formSubmitted&&this.form()){a(this.currentForm).submit();this.formSubmitted=false}else{if(!c&&this.pendingRequest===0&&this.formSubmitted){a(this.currentForm).triggerHandler("invalid-form",[this]);this.formSubmitted=false}}},previousValue:function(b){return a.data(b,"previousValue")||a.data(b,"previousValue",{old:null,valid:true,message:this.defaultMessage(b,"remote")})}},classRuleSettings:{required:{required:true},email:{email:true},url:{url:true},date:{date:true},dateISO:{dateISO:true},number:{number:true},digits:{digits:true},creditcard:{creditcard:true}},addClassRules:function(b,c){if(b.constructor===String){this.classRuleSettings[b]=c}else{a.extend(this.classRuleSettings,b)}},classRules:function(c){var d={};var b=a(c).attr("class");if(b){a.each(b.split(" "),function(){if(this in a.validator.classRuleSettings){a.extend(d,a.validator.classRuleSettings[this])}})}return d},attributeRules:function(c){var f={};var b=a(c);var d=b[0].getAttribute("type");for(var g in a.validator.methods){var e;if(g==="required"){e=b.get(0).getAttribute(g);if(e===""){e=true}e=!!e}else{e=b.attr(g)}if(/min|max/.test(g)&&(d===null||/number|range|text/.test(d))){e=Number(e)}if(e){f[g]=e}else{if(d===g&&d!=="range"){f[g]=true}}}if(f.maxlength&&/-1|2147483647|524288/.test(f.maxlength)){delete f.maxlength}return f},dataRules:function(c){var f,d,e={},b=a(c);for(f in a.validator.methods){d=b.data("rule-"+f.toLowerCase());if(d!==undefined){e[f]=d}}return e},staticRules:function(c){var d={};var b=a.data(c.form,"validator");if(b.settings.rules){d=a.validator.normalizeRule(b.settings.rules[c.name])||{}}return d},normalizeRules:function(c,b){a.each(c,function(f,e){if(e===false){delete c[f];return}if(e.param||e.depends){var d=true;switch(typeof e.depends){case"string":d=!!a(e.depends,b.form).length;break;case"function":d=e.depends.call(b,b);break}if(d){c[f]=e.param!==undefined?e.param:true}else{delete c[f]}}});a.each(c,function(d,e){c[d]=a.isFunction(e)?e(b):e});a.each(["minlength","maxlength"],function(){if(c[this]){c[this]=Number(c[this])}});a.each(["rangelength","range"],function(){var d;if(c[this]){if(a.isArray(c[this])){c[this]=[Number(c[this][0]),Number(c[this][1])]}else{if(typeof c[this]==="string"){d=c[this].split(/[\s,]+/);c[this]=[Number(d[0]),Number(d[1])]}}}});if(a.validator.autoCreateRanges){if(c.min&&c.max){c.range=[c.min,c.max];delete c.min;delete c.max}if(c.minlength&&c.maxlength){c.rangelength=[c.minlength,c.maxlength];delete c.minlength;delete c.maxlength}}return c},normalizeRule:function(c){if(typeof c==="string"){var b={};a.each(c.split(/\s/),function(){b[this]=true});c=b}return c},addMethod:function(b,d,c){a.validator.methods[b]=d;a.validator.messages[b]=c!==undefined?c:a.validator.messages[b];if(d.length<3){a.validator.addClassRules(b,a.validator.normalizeRule(b))}},methods:{required:function(c,b,e){if(!this.depend(e,b)){return"dependency-mismatch"}if(b.nodeName.toLowerCase()==="select"){var d=a(b).val();return d&&d.length>0}if(this.checkable(b)){return this.getLength(c,b)>0}return a.trim(c).length>0},email:function(c,b){return this.optional(b)||/^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))$/i.test(c)},url:function(c,b){return this.optional(b)||/^(https?|s?ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i.test(c)},date:function(c,b){return this.optional(b)||!/Invalid|NaN/.test(new Date(c).toString())},dateISO:function(c,b){return this.optional(b)||/^\d{4}[\/\-]\d{1,2}[\/\-]\d{1,2}$/.test(c)},number:function(c,b){return this.optional(b)||/^-?(?:\d+|\d{1,3}(?:,\d{3})+)?(?:\.\d+)?$/.test(c)},digits:function(c,b){return this.optional(b)||/^\d+$/.test(c)},creditcard:function(f,c){if(this.optional(c)){return"dependency-mismatch"}if(/[^0-9 \-]+/.test(f)){return false}var g=0,e=0,b=false;f=f.replace(/\D/g,"");for(var h=f.length-1;h>=0;h--){var d=f.charAt(h);e=parseInt(d,10);if(b){if((e*=2)>9){e-=9}}g+=e;b=!b}return(g%10)===0},minlength:function(d,b,e){var c=a.isArray(d)?d.length:this.getLength(a.trim(d),b);return this.optional(b)||c>=e},maxlength:function(d,b,e){var c=a.isArray(d)?d.length:this.getLength(a.trim(d),b);return this.optional(b)||c<=e},rangelength:function(d,b,e){var c=a.isArray(d)?d.length:this.getLength(a.trim(d),b);return this.optional(b)||(c>=e[0]&&c<=e[1])},min:function(c,b,d){return this.optional(b)||c>=d},max:function(c,b,d){return this.optional(b)||c<=d},range:function(c,b,d){return this.optional(b)||(c>=d[0]&&c<=d[1])},equalTo:function(c,b,e){var d=a(e);if(this.settings.onfocusout){d.unbind(".validate-equalTo").bind("blur.validate-equalTo",function(){a(b).valid()})}return c===d.val()},remote:function(f,c,g){if(this.optional(c)){return"dependency-mismatch"}var d=this.previousValue(c);if(!this.settings.messages[c.name]){this.settings.messages[c.name]={}}d.originalMessage=this.settings.messages[c.name].remote;this.settings.messages[c.name].remote=d.message;g=typeof g==="string"&&{url:g}||g;if(d.old===f){return d.valid}d.old=f;var b=this;this.startRequest(c);var e={};e[c.name]=f;a.ajax(a.extend(true,{url:g,mode:"abort",port:"validate"+c.name,dataType:"json",data:e,success:function(i){b.settings.messages[c.name].remote=d.originalMessage;var k=i===true||i==="true";if(k){var h=b.formSubmitted;b.prepareElement(c);b.formSubmitted=h;b.successList.push(c);delete b.invalid[c.name];b.showErrors()}else{var l={};var j=i||b.defaultMessage(c,"remote");l[c.name]=d.message=a.isFunction(j)?j(f):j;b.invalid[c.name]=true;b.showErrors(l)}d.valid=k;b.stopRequest(c,k)}},g));return"pending"}}});a.format=a.validator.format}(jQuery));(function(c){var a={};if(c.ajaxPrefilter){c.ajaxPrefilter(function(f,e,g){var d=f.port;if(f.mode==="abort"){if(a[d]){a[d].abort()}a[d]=g}})}else{var b=c.ajax;c.ajax=function(e){var f=("mode" in e?e:c.ajaxSettings).mode,d=("port" in e?e:c.ajaxSettings).port;if(f==="abort"){if(a[d]){a[d].abort()}a[d]=b.apply(this,arguments);return a[d]}return b.apply(this,arguments)}}}(jQuery));(function(a){a.extend(a.fn,{validateDelegate:function(d,c,b){return this.bind(c,function(e){var f=a(e.target);if(f.is(d)){return b.apply(f,arguments)}})}})}(jQuery));


// hardcoded JSON for testing
//oNetList = { "ssid" : [ { "name" : "Select Network", "encryption" : "" , "remembered": "0"},{"name" : "<%= current_network %>" , "encryption" : "WEP" , "remembered": "1"},{"name" : "IMGDARadio" , "encryption" : "WEP" , "remembered": "0"},{"name" : "IMGWireless" , "encryption" : "WEP" , "remembered": "0"},{"name" : "IMGMetaToolsVideo" , "encryption" : "open" , "remembered": "1"},{"name" : "IMGPUNE2" , "encryption" : "open" , "remembered": "0"},{"name" : "IMGMeta" , "encryption" : "WPA2/PSK" , "remembered": "0"},{"name" : "IMGPune1" , "encryption" : "open" , "remembered": "0"}] };


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

// =faux radio
// custom radio buttons
    $('.form-element').data('active',false);

    $('.form-checkbox input[type="checkbox"], .form-radio input[type="radio"]').each(function(e){
        if(!$(this).data('custom')){
            var type = $(this).attr('type');
            $(this).wrap('<span class="faux-' + type + '"><span class="faux-inner' + ($(this).is(':checked') ? ' checked' : '') + '">' + (type === 'checkbox' ? '&#10004;' : '&nbsp;') + '</span></span>')
            if ( $(this).is(':checked') ) {
                $(this).parents('.form-radio').find('.img').addClass('checked');
            }
            $(this).data('custom', true);
        }
    }).change(function(e){
        if($(this).is(':checked')){
            $('input[name="' + $(this).attr('name') + '"]').parent().removeClass('checked').parents('.form-radio').find('.img').removeClass('checked');
            $(this).parent().addClass('checked').parents('.form-radio').find('.img').addClass('checked');
        }else{
            $(this).parent().removeClass('checked').parents('.form-radio').find('.img').removeClass('checked');
        }
    }).fadeTo(0,0);


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

    function enableSave( errors ) {
        $.log( 'errors = ' + errors );
        if (errors) {
        _.$btnConnect.prop('disabled', true);
        }
        else {
        _.$btnConnect.prop('disabled', false);
        }
    }

    _.validator = _.$formNetworkList.validate({
        // debug: true,
        // invalidHandler: function(event, validator) {
        //    // 'this' refers to the form
        //    var errors = validator.numberOfInvalids();

        //    if (errors) {
        //        _.$btnConnect.prop('disabled', true);
        //        // var message = errors == 1
        //        // ? 'You missed 1 field. It has been highlighted'
        //        // : 'You missed ' + errors + ' fields. They have been highlighted';
        //        // $("div.error").html(message);
        //        // $("div.error").show();
        //     }
        //     else {
     //        _.$btnConnect.prop('disabled', false);
        //        // $("div.error").hide();
        //     }
        // },
        // define custom messages for individual controls
        messages: {
            device_name: {
                required: _.errorDeviceName,
                ascii: _.errorDeviceName2
            },
            speaker_orientation: _.errorOrientation,
            encryption: _.errorEncryption,
            manual_password: {
            required: _.errorPassword,
                ascii: _.errorAscii
            },
            manual_ssid: _.errorNetworkName,
            password: {
                required: _.errorPassword,
                ascii: _.errorAscii
            },
            //ssid: _.errorEncryption,
            wep: _.errorWep + " " + _.errorAscii,
            wpa: _.errorWpa + " " + _.errorAscii,
            // ip addresses
            dns_server: {
                required: _.errorIpAddress
            },
            ip_address: {
                required: _.errorIpAddress
            },
            netmask: {
                required: _.errorIpAddress
            },
            router_ip: {
                required: _.errorIpAddress
            }
        },
        // set to enable validation on blurring each element without an initial form submit
        onfocusout: function(element, event) {
            this.element(element);
        },
        // disable validation on character entry
        onkeyup: false,
        rules: {
            device_name: {
                required: true,
                ascii: true
            },
                manual_password: {
                    ascii: true
                },
                password: {
                    ascii: true
                }
        },// >>>
        showErrors: function( errorMap, errorList ) {
            var errors = this.numberOfInvalids();
      //        var errors = $('.error.required').length;

                // enableSave( errors );
                // if (errors) {
                // _.$btnConnect.prop('disabled', true);
                    // var message = errors == 1
                    // ? 'You missed 1 field. It has been highlighted'
                    // : 'You missed ' + errors + ' fields. They have been highlighted';
                    // $("div.error").html(message);
                    // $("div.error").show();
                // }
                // else {
             //        _.$btnConnect.prop('disabled', false);
                    // $("div.error").hide();
                // }
                this.defaultShowErrors();
            },
        submitHandler: function(form) {
            $("div.error").hide();

            if ( _.currentNetwork !== "" || _.$netSelect.val() != null || (_.$manualSsid.val() != null && _.$manualSsid.val() != "" )) {
                    // Encrypt password before sending to the device
                    if (_.$password.val() != "") {
                        //_.$encPassword.val(encrypt_string(_.$password.val()));
                    }
                    if (_.$manualPassword.val() != "") {
                        //_.$encManualPassword.val(encrypt_string(_.$manualPassword.val()));
                    }
                    // Disabled <input> elements in a form will not be submitted.
                    // Prevent from sending unencrypted password.
                    _.$encPassword.prop('disabled', true);
                    _.$encManualPassword.prop('disabled', true);
                    document.getElementById('form-network-list').action ="save_settings.lp";
                    form.submit();
                }
                else
                {
                    var selectNetwork = confirm(_.confirmNoNetwork);
                    if (selectNetwork) {
                        document.getElementById('form-network-list').action ="no_network.lp";
                        form.submit();
                    }
                }

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
    // $('body').on('blur', '.required, .iprequired, .notequal', function() {
    //    if ( _.$formNetworkList.valid() ) {
    //        $.log("Valid!");
    //    }
    //    else {
    //        _.validator.focusInvalid();
    //    }
    //    return false;
    // });
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

    var currNetworkFound = false;    //Assume that current network was not found in the scan

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
                currNetworkFound = true;    //Current network was found, don't add again it manually
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
        //    $('.ul-network-list li:first-child').addClass('selected');
        //    $('option:first-child', _.$netSelect).attr('selected', 'selected');
        //    fauxSelectOptions( $('.ul-network-list li:first-child') );
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

function encrypt_string(plaintext)
{
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
    // checkNetworkError();
    key = new RSAKey();
    key.setPublic(key_n, key_e);
});

$(window).load(function(){
    // JSON is only loaded once all page assets are loaded
    loadJson();
    _.$btnNetworkRefresh.on("click", function(){
        // $.log('refresh network list');
        $(this).prop('disabled', true);
        $('#no-networks').remove();
        loadJson();
        return false;
    });
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
