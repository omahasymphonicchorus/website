/*!
* Copyright (c) 2018 Chris O'Hara <cohara87@gmail.com>
*
* Permission is hereby granted, free of charge, to any person obtaining
* a copy of this software and associated documentation files (the
* "Software"), to deal in the Software without restriction, including
* without limitation the rights to use, copy, modify, merge, publish,
* distribute, sublicense, and/or sell copies of the Software, and to
* permit persons to whom the Software is furnished to do so, subject to
* the following conditions:
*
* The above copyright notice and this permission notice shall be
* included in all copies or substantial portions of the Software.
*
* THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
* EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
* MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
* NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
* LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
* OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
* WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/(function(global,factory){typeof exports==='object'&&typeof module!=='undefined'?module.exports=factory():typeof define==='function'&&define.amd?define(factory):(global.validator=factory());}(this,(function(){'use strict';var _typeof=typeof Symbol==="function"&&typeof Symbol.iterator==="symbol"?function(obj){return typeof obj;}:function(obj){return obj&&typeof Symbol==="function"&&obj.constructor===Symbol&&obj!==Symbol.prototype?"symbol":typeof obj;};function assertString(input){var isString=typeof input==='string'||input instanceof String;if(!isString){var invalidType=void 0;if(input===null){invalidType='null';}else{invalidType=typeof input==='undefined'?'undefined':_typeof(input);if(invalidType==='object'&&input.constructor&&input.constructor.hasOwnProperty('name')){invalidType=input.constructor.name;}else{invalidType='a '+invalidType;}}
throw new TypeError('Expected string but received '+invalidType+'.');}}
function toDate(date){assertString(date);date=Date.parse(date);return!isNaN(date)?new Date(date):null;}
function toFloat(str){assertString(str);return parseFloat(str);}
function toInt(str,radix){assertString(str);return parseInt(str,radix||10);}
function toBoolean(str,strict){assertString(str);if(strict){return str==='1'||str==='true';}
return str!=='0'&&str!=='false'&&str!=='';}
function equals(str,comparison){assertString(str);return str===comparison;}
function toString(input){if((typeof input==='undefined'?'undefined':_typeof(input))==='object'&&input!==null){if(typeof input.toString==='function'){input=input.toString();}else{input='[object Object]';}}else if(input===null||typeof input==='undefined'||isNaN(input)&&!input.length){input='';}
return String(input);}
function contains(str,elem){assertString(str);return str.indexOf(toString(elem))>=0;}
function matches(str,pattern,modifiers){assertString(str);if(Object.prototype.toString.call(pattern)!=='[object RegExp]'){pattern=new RegExp(pattern,modifiers);}
return pattern.test(str);}
function merge(){var obj=arguments.length>0&&arguments[0]!==undefined?arguments[0]:{};var defaults=arguments[1];for(var key in defaults){if(typeof obj[key]==='undefined'){obj[key]=defaults[key];}}
return obj;}
function isByteLength(str,options){assertString(str);var min=void 0;var max=void 0;if((typeof options==='undefined'?'undefined':_typeof(options))==='object'){min=options.min||0;max=options.max;}else{min=arguments[1];max=arguments[2];}
var len=encodeURI(str).split(/%..|./).length-1;return len>=min&&(typeof max==='undefined'||len<=max);}
var default_fqdn_options={require_tld:true,allow_underscores:false,allow_trailing_dot:false};function isFQDN(str,options){assertString(str);options=merge(options,default_fqdn_options);if(options.allow_trailing_dot&&str[str.length-1]==='.'){str=str.substring(0,str.length-1);}
var parts=str.split('.');for(var i=0;i<parts.length;i++){if(parts[i].length>63){return false;}}
if(options.require_tld){var tld=parts.pop();if(!parts.length||!/^([a-z\u00a1-\uffff]{2,}|xn[a-z0-9-]{2,})$/i.test(tld)){return false;}
if(/[\s\u2002-\u200B\u202F\u205F\u3000\uFEFF\uDB40\uDC20]/.test(tld)){return false;}}
for(var part,_i=0;_i<parts.length;_i++){part=parts[_i];if(options.allow_underscores){part=part.replace(/_/g,'');}
if(!/^[a-z\u00a1-\uffff0-9-]+$/i.test(part)){return false;}
if(/[\uff01-\uff5e]/.test(part)){return false;}
if(part[0]==='-'||part[part.length-1]==='-'){return false;}}
return true;}
var ipv4Maybe=/^(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})$/;var ipv6Block=/^[0-9A-F]{1,4}$/i;function isIP(str){var version=arguments.length>1&&arguments[1]!==undefined?arguments[1]:'';assertString(str);version=String(version);if(!version){return isIP(str,4)||isIP(str,6);}else if(version==='4'){if(!ipv4Maybe.test(str)){return false;}
var parts=str.split('.').sort(function(a,b){return a-b;});return parts[3]<=255;}else if(version==='6'){var blocks=str.split(':');var foundOmissionBlock=false;var foundIPv4TransitionBlock=isIP(blocks[blocks.length-1],4);var expectedNumberOfBlocks=foundIPv4TransitionBlock?7:8;if(blocks.length>expectedNumberOfBlocks){return false;}
if(str==='::'){return true;}else if(str.substr(0,2)==='::'){blocks.shift();blocks.shift();foundOmissionBlock=true;}else if(str.substr(str.length-2)==='::'){blocks.pop();blocks.pop();foundOmissionBlock=true;}
for(var i=0;i<blocks.length;++i){if(blocks[i]===''&&i>0&&i<blocks.length-1){if(foundOmissionBlock){return false;}
foundOmissionBlock=true;}else if(foundIPv4TransitionBlock&&i===blocks.length-1){}else if(!ipv6Block.test(blocks[i])){return false;}}
if(foundOmissionBlock){return blocks.length>=1;}
return blocks.length===expectedNumberOfBlocks;}
return false;}
var default_email_options={allow_display_name:false,require_display_name:false,allow_utf8_local_part:true,require_tld:true};var displayName=/^[a-z\d!#\$%&'\*\+\-\/=\?\^_`{\|}~\.\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+[a-z\d!#\$%&'\*\+\-\/=\?\^_`{\|}~\,\.\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF\s]*<(.+)>$/i;var emailUserPart=/^[a-z\d!#\$%&'\*\+\-\/=\?\^_`{\|}~]+$/i;var gmailUserPart=/^[a-z\d]+$/;var quotedEmailUser=/^([\s\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e]|(\\[\x01-\x09\x0b\x0c\x0d-\x7f]))*$/i;var emailUserUtf8Part=/^[a-z\d!#\$%&'\*\+\-\/=\?\^_`{\|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+$/i;var quotedEmailUserUtf8=/^([\s\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|(\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*$/i;function isEmail(str,options){assertString(str);options=merge(options,default_email_options);if(options.require_display_name||options.allow_display_name){var display_email=str.match(displayName);if(display_email){str=display_email[1];}else if(options.require_display_name){return false;}}
var parts=str.split('@');var domain=parts.pop();var user=parts.join('@');var lower_domain=domain.toLowerCase();if(options.domain_specific_validation&&(lower_domain==='gmail.com'||lower_domain==='googlemail.com')){user=user.toLowerCase();var username=user.split('+')[0];if(!isByteLength(username.replace('.',''),{min:6,max:30})){return false;}
var _user_parts=username.split('.');for(var i=0;i<_user_parts.length;i++){if(!gmailUserPart.test(_user_parts[i])){return false;}}}
if(!isByteLength(user,{max:64})||!isByteLength(domain,{max:254})){return false;}
if(!isFQDN(domain,{require_tld:options.require_tld})){if(!options.allow_ip_domain){return false;}
if(!isIP(domain)){if(!domain.startsWith('[')||!domain.endsWith(']')){return false;}
var noBracketdomain=domain.substr(1,domain.length-2);if(noBracketdomain.length===0||!isIP(noBracketdomain)){return false;}}}
if(user[0]==='"'){user=user.slice(1,user.length-1);return options.allow_utf8_local_part?quotedEmailUserUtf8.test(user):quotedEmailUser.test(user);}
var pattern=options.allow_utf8_local_part?emailUserUtf8Part:emailUserPart;var user_parts=user.split('.');for(var _i=0;_i<user_parts.length;_i++){if(!pattern.test(user_parts[_i])){return false;}}
return true;}
var default_url_options={protocols:['http','https','ftp'],require_tld:true,require_protocol:false,require_host:true,require_valid_protocol:true,allow_underscores:false,allow_trailing_dot:false,allow_protocol_relative_urls:false};var wrapped_ipv6=/^\[([^\]]+)\](?::([0-9]+))?$/;function isRegExp(obj){return Object.prototype.toString.call(obj)==='[object RegExp]';}
function checkHost(host,matches){for(var i=0;i<matches.length;i++){var match=matches[i];if(host===match||isRegExp(match)&&match.test(host)){return true;}}
return false;}
function isURL(url,options){assertString(url);if(!url||url.length>=2083||/[\s<>]/.test(url)){return false;}
if(url.indexOf('mailto:')===0){return false;}
options=merge(options,default_url_options);var protocol=void 0,auth=void 0,host=void 0,hostname=void 0,port=void 0,port_str=void 0,split=void 0,ipv6=void 0;split=url.split('#');url=split.shift();split=url.split('?');url=split.shift();split=url.split('://');if(split.length>1){protocol=split.shift().toLowerCase();if(options.require_valid_protocol&&options.protocols.indexOf(protocol)===-1){return false;}}else if(options.require_protocol){return false;}else if(url.substr(0,2)==='//'){if(!options.allow_protocol_relative_urls){return false;}
split[0]=url.substr(2);}
url=split.join('://');if(url===''){return false;}
split=url.split('/');url=split.shift();if(url===''&&!options.require_host){return true;}
split=url.split('@');if(split.length>1){auth=split.shift();if(auth.indexOf(':')>=0&&auth.split(':').length>2){return false;}}
hostname=split.join('@');port_str=null;ipv6=null;var ipv6_match=hostname.match(wrapped_ipv6);if(ipv6_match){host='';ipv6=ipv6_match[1];port_str=ipv6_match[2]||null;}else{split=hostname.split(':');host=split.shift();if(split.length){port_str=split.join(':');}}
if(port_str!==null){port=parseInt(port_str,10);if(!/^[0-9]+$/.test(port_str)||port<=0||port>65535){return false;}}
if(!isIP(host)&&!isFQDN(host,options)&&(!ipv6||!isIP(ipv6,6))){return false;}
host=host||ipv6;if(options.host_whitelist&&!checkHost(host,options.host_whitelist)){return false;}
if(options.host_blacklist&&checkHost(host,options.host_blacklist)){return false;}
return true;}
var macAddress=/^([0-9a-fA-F][0-9a-fA-F]:){5}([0-9a-fA-F][0-9a-fA-F])$/;var macAddressNoColons=/^([0-9a-fA-F]){12}$/;function isMACAddress(str,options){assertString(str);if(options&&options.no_colons){return macAddressNoColons.test(str);}
return macAddress.test(str);}
var subnetMaybe=/^\d{1,2}$/;function isIPRange(str){assertString(str);var parts=str.split('/');if(parts.length!==2){return false;}
if(!subnetMaybe.test(parts[1])){return false;}
if(parts[1].length>1&&parts[1].startsWith('0')){return false;}
return isIP(parts[0],4)&&parts[1]<=32&&parts[1]>=0;}
function isBoolean(str){assertString(str);return['true','false','1','0'].indexOf(str)>=0;}
var alpha={'en-US':/^[A-Z]+$/i,'bg-BG':/^[А-Я]+$/i,'cs-CZ':/^[A-ZÁČĎÉĚÍŇÓŘŠŤÚŮÝŽ]+$/i,'da-DK':/^[A-ZÆØÅ]+$/i,'de-DE':/^[A-ZÄÖÜß]+$/i,'el-GR':/^[Α-ω]+$/i,'es-ES':/^[A-ZÁÉÍÑÓÚÜ]+$/i,'fr-FR':/^[A-ZÀÂÆÇÉÈÊËÏÎÔŒÙÛÜŸ]+$/i,'it-IT':/^[A-ZÀÉÈÌÎÓÒÙ]+$/i,'nb-NO':/^[A-ZÆØÅ]+$/i,'nl-NL':/^[A-ZÁÉËÏÓÖÜÚ]+$/i,'nn-NO':/^[A-ZÆØÅ]+$/i,'hu-HU':/^[A-ZÁÉÍÓÖŐÚÜŰ]+$/i,'pl-PL':/^[A-ZĄĆĘŚŁŃÓŻŹ]+$/i,'pt-PT':/^[A-ZÃÁÀÂÇÉÊÍÕÓÔÚÜ]+$/i,'ru-RU':/^[А-ЯЁ]+$/i,'sl-SI':/^[A-ZČĆĐŠŽ]+$/i,'sk-SK':/^[A-ZÁČĎÉÍŇÓŠŤÚÝŽĹŔĽÄÔ]+$/i,'sr-RS@latin':/^[A-ZČĆŽŠĐ]+$/i,'sr-RS':/^[А-ЯЂЈЉЊЋЏ]+$/i,'sv-SE':/^[A-ZÅÄÖ]+$/i,'tr-TR':/^[A-ZÇĞİıÖŞÜ]+$/i,'uk-UA':/^[А-ЩЬЮЯЄIЇҐі]+$/i,'ku-IQ':/^[ئابپتجچحخدرڕزژسشعغفڤقکگلڵمنوۆھەیێيطؤثآإأكضصةظذ]+$/i,ar:/^[ءآأؤإئابةتثجحخدذرزسشصضطظعغفقكلمنهوىيًٌٍَُِّْٰ]+$/};var alphanumeric={'en-US':/^[0-9A-Z]+$/i,'bg-BG':/^[0-9А-Я]+$/i,'cs-CZ':/^[0-9A-ZÁČĎÉĚÍŇÓŘŠŤÚŮÝŽ]+$/i,'da-DK':/^[0-9A-ZÆØÅ]+$/i,'de-DE':/^[0-9A-ZÄÖÜß]+$/i,'el-GR':/^[0-9Α-ω]+$/i,'es-ES':/^[0-9A-ZÁÉÍÑÓÚÜ]+$/i,'fr-FR':/^[0-9A-ZÀÂÆÇÉÈÊËÏÎÔŒÙÛÜŸ]+$/i,'it-IT':/^[0-9A-ZÀÉÈÌÎÓÒÙ]+$/i,'hu-HU':/^[0-9A-ZÁÉÍÓÖŐÚÜŰ]+$/i,'nb-NO':/^[0-9A-ZÆØÅ]+$/i,'nl-NL':/^[0-9A-ZÁÉËÏÓÖÜÚ]+$/i,'nn-NO':/^[0-9A-ZÆØÅ]+$/i,'pl-PL':/^[0-9A-ZĄĆĘŚŁŃÓŻŹ]+$/i,'pt-PT':/^[0-9A-ZÃÁÀÂÇÉÊÍÕÓÔÚÜ]+$/i,'ru-RU':/^[0-9А-ЯЁ]+$/i,'sl-SI':/^[0-9A-ZČĆĐŠŽ]+$/i,'sk-SK':/^[0-9A-ZÁČĎÉÍŇÓŠŤÚÝŽĹŔĽÄÔ]+$/i,'sr-RS@latin':/^[0-9A-ZČĆŽŠĐ]+$/i,'sr-RS':/^[0-9А-ЯЂЈЉЊЋЏ]+$/i,'sv-SE':/^[0-9A-ZÅÄÖ]+$/i,'tr-TR':/^[0-9A-ZÇĞİıÖŞÜ]+$/i,'uk-UA':/^[0-9А-ЩЬЮЯЄIЇҐі]+$/i,'ku-IQ':/^[٠١٢٣٤٥٦٧٨٩0-9ئابپتجچحخدرڕزژسشعغفڤقکگلڵمنوۆھەیێيطؤثآإأكضصةظذ]+$/i,ar:/^[٠١٢٣٤٥٦٧٨٩0-9ءآأؤإئابةتثجحخدذرزسشصضطظعغفقكلمنهوىيًٌٍَُِّْٰ]+$/};var decimal={'en-US':'.',ar:'٫'};var englishLocales=['AU','GB','HK','IN','NZ','ZA','ZM'];for(var locale,i=0;i<englishLocales.length;i++){locale='en-'+englishLocales[i];alpha[locale]=alpha['en-US'];alphanumeric[locale]=alphanumeric['en-US'];decimal[locale]=decimal['en-US'];}
var arabicLocales=['AE','BH','DZ','EG','IQ','JO','KW','LB','LY','MA','QM','QA','SA','SD','SY','TN','YE'];for(var _locale,_i=0;_i<arabicLocales.length;_i++){_locale='ar-'+arabicLocales[_i];alpha[_locale]=alpha.ar;alphanumeric[_locale]=alphanumeric.ar;decimal[_locale]=decimal.ar;}
var dotDecimal=[];var commaDecimal=['bg-BG','cs-CZ','da-DK','de-DE','el-GR','es-ES','fr-FR','it-IT','ku-IQ','hu-HU','nb-NO','nn-NO','nl-NL','pl-PL','pt-PT','ru-RU','sl-SI','sr-RS@latin','sr-RS','sv-SE','tr-TR','uk-UA'];for(var _i2=0;_i2<dotDecimal.length;_i2++){decimal[dotDecimal[_i2]]=decimal['en-US'];}
for(var _i3=0;_i3<commaDecimal.length;_i3++){decimal[commaDecimal[_i3]]=',';}
alpha['pt-BR']=alpha['pt-PT'];alphanumeric['pt-BR']=alphanumeric['pt-PT'];decimal['pt-BR']=decimal['pt-PT'];alpha['pl-Pl']=alpha['pl-PL'];alphanumeric['pl-Pl']=alphanumeric['pl-PL'];decimal['pl-Pl']=decimal['pl-PL'];function isAlpha(str){var locale=arguments.length>1&&arguments[1]!==undefined?arguments[1]:'en-US';assertString(str);if(locale in alpha){return alpha[locale].test(str);}
throw new Error('Invalid locale \''+locale+'\'');}
var locales=Object.keys(alpha);function isAlphanumeric(str){var locale=arguments.length>1&&arguments[1]!==undefined?arguments[1]:'en-US';assertString(str);if(locale in alphanumeric){return alphanumeric[locale].test(str);}
throw new Error('Invalid locale \''+locale+'\'');}
var locales$1=Object.keys(alphanumeric);var numeric=/^[+-]?([0-9]*[.])?[0-9]+$/;var numericNoSymbols=/^[0-9]+$/;function isNumeric(str,options){assertString(str);if(options&&options.no_symbols){return numericNoSymbols.test(str);}
return numeric.test(str);}
var int=/^(?:[-+]?(?:0|[1-9][0-9]*))$/;var intLeadingZeroes=/^[-+]?[0-9]+$/;function isInt(str,options){assertString(str);options=options||{};var regex=options.hasOwnProperty('allow_leading_zeroes')&&!options.allow_leading_zeroes?int:intLeadingZeroes;var minCheckPassed=!options.hasOwnProperty('min')||str>=options.min;var maxCheckPassed=!options.hasOwnProperty('max')||str<=options.max;var ltCheckPassed=!options.hasOwnProperty('lt')||str<options.lt;var gtCheckPassed=!options.hasOwnProperty('gt')||str>options.gt;return regex.test(str)&&minCheckPassed&&maxCheckPassed&&ltCheckPassed&&gtCheckPassed;}
function isPort(str){return isInt(str,{min:0,max:65535});}
function isLowercase(str){assertString(str);return str===str.toLowerCase();}
function isUppercase(str){assertString(str);return str===str.toUpperCase();}
var ascii=/^[\x00-\x7F]+$/;function isAscii(str){assertString(str);return ascii.test(str);}
var fullWidth=/[^\u0020-\u007E\uFF61-\uFF9F\uFFA0-\uFFDC\uFFE8-\uFFEE0-9a-zA-Z]/;function isFullWidth(str){assertString(str);return fullWidth.test(str);}
var halfWidth=/[\u0020-\u007E\uFF61-\uFF9F\uFFA0-\uFFDC\uFFE8-\uFFEE0-9a-zA-Z]/;function isHalfWidth(str){assertString(str);return halfWidth.test(str);}
function isVariableWidth(str){assertString(str);return fullWidth.test(str)&&halfWidth.test(str);}
var multibyte=/[^\x00-\x7F]/;function isMultibyte(str){assertString(str);return multibyte.test(str);}
var surrogatePair=/[\uD800-\uDBFF][\uDC00-\uDFFF]/;function isSurrogatePair(str){assertString(str);return surrogatePair.test(str);}
function isFloat(str,options){assertString(str);options=options||{};var float=new RegExp('^(?:[-+])?(?:[0-9]+)?(?:\\'+(options.locale?decimal[options.locale]:'.')+'[0-9]*)?(?:[eE][\\+\\-]?(?:[0-9]+))?$');if(str===''||str==='.'||str==='-'||str==='+'){return false;}
var value=parseFloat(str.replace(',','.'));return float.test(str)&&(!options.hasOwnProperty('min')||value>=options.min)&&(!options.hasOwnProperty('max')||value<=options.max)&&(!options.hasOwnProperty('lt')||value<options.lt)&&(!options.hasOwnProperty('gt')||value>options.gt);}
var locales$2=Object.keys(decimal);var includes=function includes(arr,val){return arr.some(function(arrVal){return val===arrVal;});};function decimalRegExp(options){var regExp=new RegExp('^[-+]?([0-9]+)?(\\'+decimal[options.locale]+'[0-9]{'+options.decimal_digits+'})'+(options.force_decimal?'':'?')+'$');return regExp;}
var default_decimal_options={force_decimal:false,decimal_digits:'1,',locale:'en-US'};var blacklist=['','-','+'];function isDecimal(str,options){assertString(str);options=merge(options,default_decimal_options);if(options.locale in decimal){return!includes(blacklist,str.replace(/ /g,''))&&decimalRegExp(options).test(str);}
throw new Error('Invalid locale \''+options.locale+'\'');}
var hexadecimal=/^[0-9A-F]+$/i;function isHexadecimal(str){assertString(str);return hexadecimal.test(str);}
function isDivisibleBy(str,num){assertString(str);return toFloat(str)%parseInt(num,10)===0;}
var hexcolor=/^#?([0-9A-F]{3}|[0-9A-F]{6})$/i;function isHexColor(str){assertString(str);return hexcolor.test(str);}
var isrc=/^[A-Z]{2}[0-9A-Z]{3}\d{2}\d{5}$/;function isISRC(str){assertString(str);return isrc.test(str);}
var md5=/^[a-f0-9]{32}$/;function isMD5(str){assertString(str);return md5.test(str);}
var lengths={md5:32,md4:32,sha1:40,sha256:64,sha384:96,sha512:128,ripemd128:32,ripemd160:40,tiger128:32,tiger160:40,tiger192:48,crc32:8,crc32b:8};function isHash(str,algorithm){assertString(str);var hash=new RegExp('^[a-f0-9]{'+lengths[algorithm]+'}$');return hash.test(str);}
var jwt=/^[a-zA-Z0-9\-_]+\.[a-zA-Z0-9\-_]+\.[a-zA-Z0-9\-_]+$/;function isJWT(str){assertString(str);return jwt.test(str);}
function isJSON(str){assertString(str);try{var obj=JSON.parse(str);return!!obj&&(typeof obj==='undefined'?'undefined':_typeof(obj))==='object';}catch(e){}
return false;}
var default_is_empty_options={ignore_whitespace:false};function isEmpty(str,options){assertString(str);options=merge(options,default_is_empty_options);return(options.ignore_whitespace?str.trim().length:str.length)===0;}
function isLength(str,options){assertString(str);var min=void 0;var max=void 0;if((typeof options==='undefined'?'undefined':_typeof(options))==='object'){min=options.min||0;max=options.max;}else{min=arguments[1];max=arguments[2];}
var surrogatePairs=str.match(/[\uD800-\uDBFF][\uDC00-\uDFFF]/g)||[];var len=str.length-surrogatePairs.length;return len>=min&&(typeof max==='undefined'||len<=max);}
var uuid={3:/^[0-9A-F]{8}-[0-9A-F]{4}-3[0-9A-F]{3}-[0-9A-F]{4}-[0-9A-F]{12}$/i,4:/^[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i,5:/^[0-9A-F]{8}-[0-9A-F]{4}-5[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i,all:/^[0-9A-F]{8}-[0-9A-F]{4}-[0-9A-F]{4}-[0-9A-F]{4}-[0-9A-F]{12}$/i};function isUUID(str){var version=arguments.length>1&&arguments[1]!==undefined?arguments[1]:'all';assertString(str);var pattern=uuid[version];return pattern&&pattern.test(str);}
function isMongoId(str){assertString(str);return isHexadecimal(str)&&str.length===24;}
function isAfter(str){var date=arguments.length>1&&arguments[1]!==undefined?arguments[1]:String(new Date());assertString(str);var comparison=toDate(date);var original=toDate(str);return!!(original&&comparison&&original>comparison);}
function isBefore(str){var date=arguments.length>1&&arguments[1]!==undefined?arguments[1]:String(new Date());assertString(str);var comparison=toDate(date);var original=toDate(str);return!!(original&&comparison&&original<comparison);}
function isIn(str,options){assertString(str);var i=void 0;if(Object.prototype.toString.call(options)==='[object Array]'){var array=[];for(i in options){if({}.hasOwnProperty.call(options,i)){array[i]=toString(options[i]);}}
return array.indexOf(str)>=0;}else if((typeof options==='undefined'?'undefined':_typeof(options))==='object'){return options.hasOwnProperty(str);}else if(options&&typeof options.indexOf==='function'){return options.indexOf(str)>=0;}
return false;}
var creditCard=/^(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|(222[1-9]|22[3-9][0-9]|2[3-6][0-9]{2}|27[01][0-9]|2720)[0-9]{12}|6(?:011|5[0-9][0-9])[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\d{3})\d{11}|6[27][0-9]{14})$/;function isCreditCard(str){assertString(str);var sanitized=str.replace(/[- ]+/g,'');if(!creditCard.test(sanitized)){return false;}
var sum=0;var digit=void 0;var tmpNum=void 0;var shouldDouble=void 0;for(var i=sanitized.length-1;i>=0;i--){digit=sanitized.substring(i,i+1);tmpNum=parseInt(digit,10);if(shouldDouble){tmpNum*=2;if(tmpNum>=10){sum+=tmpNum%10+1;}else{sum+=tmpNum;}}else{sum+=tmpNum;}
shouldDouble=!shouldDouble;}
return!!(sum%10===0?sanitized:false);}
var validators={ES:function ES(str){assertString(str);var DNI=/^[0-9X-Z][0-9]{7}[TRWAGMYFPDXBNJZSQVHLCKE]$/;var charsValue={X:0,Y:1,Z:2};var controlDigits=['T','R','W','A','G','M','Y','F','P','D','X','B','N','J','Z','S','Q','V','H','L','C','K','E'];var sanitized=str.trim().toUpperCase();if(!DNI.test(sanitized)){return false;}
var number=sanitized.slice(0,-1).replace(/[X,Y,Z]/g,function(char){return charsValue[char];});return sanitized.endsWith(controlDigits[number%23]);}};function isIdentityCard(str){var locale=arguments.length>1&&arguments[1]!==undefined?arguments[1]:'any';assertString(str);if(locale in validators){return validators[locale](str);}else if(locale==='any'){for(var key in validators){if(validators.hasOwnProperty(key)){var validator=validators[key];if(validator(str)){return true;}}}
return false;}
throw new Error('Invalid locale \''+locale+'\'');}
var isin=/^[A-Z]{2}[0-9A-Z]{9}[0-9]$/;function isISIN(str){assertString(str);if(!isin.test(str)){return false;}
var checksumStr=str.replace(/[A-Z]/g,function(character){return parseInt(character,36);});var sum=0;var digit=void 0;var tmpNum=void 0;var shouldDouble=true;for(var i=checksumStr.length-2;i>=0;i--){digit=checksumStr.substring(i,i+1);tmpNum=parseInt(digit,10);if(shouldDouble){tmpNum*=2;if(tmpNum>=10){sum+=tmpNum+1;}else{sum+=tmpNum;}}else{sum+=tmpNum;}
shouldDouble=!shouldDouble;}
return parseInt(str.substr(str.length-1),10)===(10000-sum)%10;}
var isbn10Maybe=/^(?:[0-9]{9}X|[0-9]{10})$/;var isbn13Maybe=/^(?:[0-9]{13})$/;var factor=[1,3];function isISBN(str){var version=arguments.length>1&&arguments[1]!==undefined?arguments[1]:'';assertString(str);version=String(version);if(!version){return isISBN(str,10)||isISBN(str,13);}
var sanitized=str.replace(/[\s-]+/g,'');var checksum=0;var i=void 0;if(version==='10'){if(!isbn10Maybe.test(sanitized)){return false;}
for(i=0;i<9;i++){checksum+=(i+1)*sanitized.charAt(i);}
if(sanitized.charAt(9)==='X'){checksum+=10*10;}else{checksum+=10*sanitized.charAt(9);}
if(checksum%11===0){return!!sanitized;}}else if(version==='13'){if(!isbn13Maybe.test(sanitized)){return false;}
for(i=0;i<12;i++){checksum+=factor[i%2]*sanitized.charAt(i);}
if(sanitized.charAt(12)-(10-checksum%10)%10===0){return!!sanitized;}}
return false;}
var issn='^\\d{4}-?\\d{3}[\\dX]$';function isISSN(str){var options=arguments.length>1&&arguments[1]!==undefined?arguments[1]:{};assertString(str);var testIssn=issn;testIssn=options.require_hyphen?testIssn.replace('?',''):testIssn;testIssn=options.case_sensitive?new RegExp(testIssn):new RegExp(testIssn,'i');if(!testIssn.test(str)){return false;}
var digits=str.replace('-','').toUpperCase();var checksum=0;for(var i=0;i<digits.length;i++){var digit=digits[i];checksum+=(digit==='X'?10:+digit)*(8-i);}
return checksum%11===0;}
var phones={'ar-AE':/^((\+?971)|0)?5[024568]\d{7}$/,'ar-DZ':/^(\+?213|0)(5|6|7)\d{8}$/,'ar-EG':/^((\+?20)|0)?1[012]\d{8}$/,'ar-IQ':/^(\+?964|0)?7[0-9]\d{8}$/,'ar-JO':/^(\+?962|0)?7[789]\d{7}$/,'ar-KW':/^(\+?965)[569]\d{7}$/,'ar-SA':/^(!?(\+?966)|0)?5\d{8}$/,'ar-SY':/^(!?(\+?963)|0)?9\d{8}$/,'ar-TN':/^(\+?216)?[2459]\d{7}$/,'be-BY':/^(\+?375)?(24|25|29|33|44)\d{7}$/,'bg-BG':/^(\+?359|0)?8[789]\d{7}$/,'bn-BD':/\+?(88)?0?1[156789][0-9]{8}\b/,'cs-CZ':/^(\+?420)? ?[1-9][0-9]{2} ?[0-9]{3} ?[0-9]{3}$/,'da-DK':/^(\+?45)?\s?\d{2}\s?\d{2}\s?\d{2}\s?\d{2}$/,'de-DE':/^(\+?49[ \.\-]?)?([\(]{1}[0-9]{1,6}[\)])?([0-9 \.\-\/]{3,20})((x|ext|extension)[ ]?[0-9]{1,4})?$/,'el-GR':/^(\+?30|0)?(69\d{8})$/,'en-AU':/^(\+?61|0)4\d{8}$/,'en-GB':/^(\+?44|0)7\d{9}$/,'en-HK':/^(\+?852\-?)?[456789]\d{3}\-?\d{4}$/,'en-IN':/^(\+?91|0)?[6789]\d{9}$/,'en-KE':/^(\+?254|0)?[7]\d{8}$/,'en-NG':/^(\+?234|0)?[789]\d{9}$/,'en-NZ':/^(\+?64|0)[28]\d{7,9}$/,'en-PK':/^((\+92)|(0092))-{0,1}\d{3}-{0,1}\d{7}$|^\d{11}$|^\d{4}-\d{7}$/,'en-RW':/^(\+?250|0)?[7]\d{8}$/,'en-SG':/^(\+65)?[89]\d{7}$/,'en-TZ':/^(\+?255|0)?[67]\d{8}$/,'en-UG':/^(\+?256|0)?[7]\d{8}$/,'en-US':/^(\+?1?( |-)?)?(\([2-9][0-9]{2}\)|[2-9][0-9]{2})( |-)?([2-9][0-9]{2}( |-)?[0-9]{4})$/,'en-ZA':/^(\+?27|0)\d{9}$/,'en-ZM':/^(\+?26)?09[567]\d{7}$/,'es-ES':/^(\+?34)?(6\d{1}|7[1234])\d{7}$/,'es-MX':/^(\+?52)?(1|01)?\d{10,11}$/,'et-EE':/^(\+?372)?\s?(5|8[1-4])\s?([0-9]\s?){6,7}$/,'fa-IR':/^(\+?98[\-\s]?|0)9[0-39]\d[\-\s]?\d{3}[\-\s]?\d{4}$/,'fi-FI':/^(\+?358|0)\s?(4(0|1|2|4|5|6)?|50)\s?(\d\s?){4,8}\d$/,'fo-FO':/^(\+?298)?\s?\d{2}\s?\d{2}\s?\d{2}$/,'fr-FR':/^(\+?33|0)[67]\d{8}$/,'he-IL':/^(\+972|0)([23489]|5[012345689]|77)[1-9]\d{6}$/,'hu-HU':/^(\+?36)(20|30|70)\d{7}$/,'id-ID':/^(\+?62|0)(0?8?\d\d\s?\d?)([\s?|\d]{7,12})$/,'it-IT':/^(\+?39)?\s?3\d{2} ?\d{6,7}$/,'ja-JP':/^(\+?81|0)[789]0[ \-]?[1-9]\d{2}[ \-]?\d{5}$/,'kk-KZ':/^(\+?7|8)?7\d{9}$/,'kl-GL':/^(\+?299)?\s?\d{2}\s?\d{2}\s?\d{2}$/,'ko-KR':/^((\+?82)[ \-]?)?0?1([0|1|6|7|8|9]{1})[ \-]?\d{3,4}[ \-]?\d{4}$/,'lt-LT':/^(\+370|8)\d{8}$/,'ms-MY':/^(\+?6?01){1}(([145]{1}(\-|\s)?\d{7,8})|([236789]{1}(\s|\-)?\d{7}))$/,'nb-NO':/^(\+?47)?[49]\d{7}$/,'nl-BE':/^(\+?32|0)4?\d{8}$/,'nn-NO':/^(\+?47)?[49]\d{7}$/,'pl-PL':/^(\+?48)? ?[5-8]\d ?\d{3} ?\d{2} ?\d{2}$/,'pt-BR':/(?=^(\+?5{2}\-?|0)[1-9]{2}\-?\d{4}\-?\d{4}$)(^(\+?5{2}\-?|0)[1-9]{2}\-?[6-9]{1}\d{3}\-?\d{4}$)|(^(\+?5{2}\-?|0)[1-9]{2}\-?9[6-9]{1}\d{3}\-?\d{4}$)/,'pt-PT':/^(\+?351)?9[1236]\d{7}$/,'ro-RO':/^(\+?4?0)\s?7\d{2}(\/|\s|\.|\-)?\d{3}(\s|\.|\-)?\d{3}$/,'ru-RU':/^(\+?7|8)?9\d{9}$/,'sl-SI':/^(\+386\s?|0)(\d{1}\s?\d{3}\s?\d{2}\s?\d{2}|\d{2}\s?\d{3}\s?\d{3})$/,'sk-SK':/^(\+?421)? ?[1-9][0-9]{2} ?[0-9]{3} ?[0-9]{3}$/,'sr-RS':/^(\+3816|06)[- \d]{5,9}$/,'sv-SE':/^(\+?46|0)[\s\-]?7[\s\-]?[02369]([\s\-]?\d){7}$/,'th-TH':/^(\+66|66|0)\d{9}$/,'tr-TR':/^(\+?90|0)?5\d{9}$/,'uk-UA':/^(\+?38|8)?0\d{9}$/,'vi-VN':/^(\+?84|0)?((1(2([0-9])|6([2-9])|88|99))|(9((?!5)[0-9])))([0-9]{7})$/,'zh-CN':/^((\+|00)86)?1([358][0-9]|4[579]|66|7[0135678]|9[89])[0-9]{8}$/,'zh-TW':/^(\+?886\-?|0)?9\d{8}$/};phones['en-CA']=phones['en-US'];phones['fr-BE']=phones['nl-BE'];phones['zh-HK']=phones['en-HK'];function isMobilePhone(str,locale,options){assertString(str);if(options&&options.strictMode&&!str.startsWith('+')){return false;}
if(Array.isArray(locale)){return locale.some(function(key){if(phones.hasOwnProperty(key)){var phone=phones[key];if(phone.test(str)){return true;}}
return false;});}else if(locale in phones){return phones[locale].test(str);}else if(!locale||locale==='any'){for(var key in phones){if(phones.hasOwnProperty(key)){var phone=phones[key];if(phone.test(str)){return true;}}}
return false;}
throw new Error('Invalid locale \''+locale+'\'');}
var locales$3=Object.keys(phones);function currencyRegex(options){var decimal_digits='\\d{'+options.digits_after_decimal[0]+'}';options.digits_after_decimal.forEach(function(digit,index){if(index!==0)decimal_digits=decimal_digits+'|\\d{'+digit+'}';});var symbol='(\\'+options.symbol.replace(/\./g,'\\.')+')'+(options.require_symbol?'':'?'),negative='-?',whole_dollar_amount_without_sep='[1-9]\\d*',whole_dollar_amount_with_sep='[1-9]\\d{0,2}(\\'+options.thousands_separator+'\\d{3})*',valid_whole_dollar_amounts=['0',whole_dollar_amount_without_sep,whole_dollar_amount_with_sep],whole_dollar_amount='('+valid_whole_dollar_amounts.join('|')+')?',decimal_amount='(\\'+options.decimal_separator+'('+decimal_digits+'))'+(options.require_decimal?'':'?');var pattern=whole_dollar_amount+(options.allow_decimal||options.require_decimal?decimal_amount:'');if(options.allow_negatives&&!options.parens_for_negatives){if(options.negative_sign_after_digits){pattern+=negative;}else if(options.negative_sign_before_digits){pattern=negative+pattern;}}
if(options.allow_negative_sign_placeholder){pattern='( (?!\\-))?'+pattern;}else if(options.allow_space_after_symbol){pattern=' ?'+pattern;}else if(options.allow_space_after_digits){pattern+='( (?!$))?';}
if(options.symbol_after_digits){pattern+=symbol;}else{pattern=symbol+pattern;}
if(options.allow_negatives){if(options.parens_for_negatives){pattern='(\\('+pattern+'\\)|'+pattern+')';}else if(!(options.negative_sign_before_digits||options.negative_sign_after_digits)){pattern=negative+pattern;}}
return new RegExp('^(?!-? )(?=.*\\d)'+pattern+'$');}
var default_currency_options={symbol:'$',require_symbol:false,allow_space_after_symbol:false,symbol_after_digits:false,allow_negatives:true,parens_for_negatives:false,negative_sign_before_digits:false,negative_sign_after_digits:false,allow_negative_sign_placeholder:false,thousands_separator:',',decimal_separator:'.',allow_decimal:true,require_decimal:false,digits_after_decimal:[2],allow_space_after_digits:false};function isCurrency(str,options){assertString(str);options=merge(options,default_currency_options);return currencyRegex(options).test(str);}
var iso8601=/^([\+-]?\d{4}(?!\d{2}\b))((-?)((0[1-9]|1[0-2])(\3([12]\d|0[1-9]|3[01]))?|W([0-4]\d|5[0-2])(-?[1-7])?|(00[1-9]|0[1-9]\d|[12]\d{2}|3([0-5]\d|6[1-6])))([T\s]((([01]\d|2[0-3])((:?)[0-5]\d)?|24:?00)([\.,]\d+(?!:))?)?(\17[0-5]\d([\.,]\d+)?)?([zZ]|([\+-])([01]\d|2[0-3]):?([0-5]\d)?)?)?)?$/;function isISO8601(str){assertString(str);return iso8601.test(str);}
var dateFullYear=/[0-9]{4}/;var dateMonth=/(0[1-9]|1[0-2])/;var dateMDay=/([12]\d|0[1-9]|3[01])/;var timeHour=/([01][0-9]|2[0-3])/;var timeMinute=/[0-5][0-9]/;var timeSecond=/([0-5][0-9]|60)/;var timeSecFrac=/(\.[0-9]+)?/;var timeNumOffset=new RegExp('[-+]'+timeHour.source+':'+timeMinute.source);var timeOffset=new RegExp('([zZ]|'+timeNumOffset.source+')');var partialTime=new RegExp(timeHour.source+':'+timeMinute.source+':'+timeSecond.source+timeSecFrac.source);var fullDate=new RegExp(dateFullYear.source+'-'+dateMonth.source+'-'+dateMDay.source);var fullTime=new RegExp(''+partialTime.source+timeOffset.source);var rfc3339=new RegExp(fullDate.source+'[ tT]'+fullTime.source);function isRFC3339(str){assertString(str);return rfc3339.test(str);}
var validISO31661Alpha2CountriesCodes=['AD','AE','AF','AG','AI','AL','AM','AO','AQ','AR','AS','AT','AU','AW','AX','AZ','BA','BB','BD','BE','BF','BG','BH','BI','BJ','BL','BM','BN','BO','BQ','BR','BS','BT','BV','BW','BY','BZ','CA','CC','CD','CF','CG','CH','CI','CK','CL','CM','CN','CO','CR','CU','CV','CW','CX','CY','CZ','DE','DJ','DK','DM','DO','DZ','EC','EE','EG','EH','ER','ES','ET','FI','FJ','FK','FM','FO','FR','GA','GB','GD','GE','GF','GG','GH','GI','GL','GM','GN','GP','GQ','GR','GS','GT','GU','GW','GY','HK','HM','HN','HR','HT','HU','ID','IE','IL','IM','IN','IO','IQ','IR','IS','IT','JE','JM','JO','JP','KE','KG','KH','KI','KM','KN','KP','KR','KW','KY','KZ','LA','LB','LC','LI','LK','LR','LS','LT','LU','LV','LY','MA','MC','MD','ME','MF','MG','MH','MK','ML','MM','MN','MO','MP','MQ','MR','MS','MT','MU','MV','MW','MX','MY','MZ','NA','NC','NE','NF','NG','NI','NL','NO','NP','NR','NU','NZ','OM','PA','PE','PF','PG','PH','PK','PL','PM','PN','PR','PS','PT','PW','PY','QA','RE','RO','RS','RU','RW','SA','SB','SC','SD','SE','SG','SH','SI','SJ','SK','SL','SM','SN','SO','SR','SS','ST','SV','SX','SY','SZ','TC','TD','TF','TG','TH','TJ','TK','TL','TM','TN','TO','TR','TT','TV','TW','TZ','UA','UG','UM','US','UY','UZ','VA','VC','VE','VG','VI','VN','VU','WF','WS','YE','YT','ZA','ZM','ZW'];function isISO31661Alpha2(str){assertString(str);return includes(validISO31661Alpha2CountriesCodes,str.toUpperCase());}
var validISO31661Alpha3CountriesCodes=['AFG','ALA','ALB','DZA','ASM','AND','AGO','AIA','ATA','ATG','ARG','ARM','ABW','AUS','AUT','AZE','BHS','BHR','BGD','BRB','BLR','BEL','BLZ','BEN','BMU','BTN','BOL','BES','BIH','BWA','BVT','BRA','IOT','BRN','BGR','BFA','BDI','KHM','CMR','CAN','CPV','CYM','CAF','TCD','CHL','CHN','CXR','CCK','COL','COM','COG','COD','COK','CRI','CIV','HRV','CUB','CUW','CYP','CZE','DNK','DJI','DMA','DOM','ECU','EGY','SLV','GNQ','ERI','EST','ETH','FLK','FRO','FJI','FIN','FRA','GUF','PYF','ATF','GAB','GMB','GEO','DEU','GHA','GIB','GRC','GRL','GRD','GLP','GUM','GTM','GGY','GIN','GNB','GUY','HTI','HMD','VAT','HND','HKG','HUN','ISL','IND','IDN','IRN','IRQ','IRL','IMN','ISR','ITA','JAM','JPN','JEY','JOR','KAZ','KEN','KIR','PRK','KOR','KWT','KGZ','LAO','LVA','LBN','LSO','LBR','LBY','LIE','LTU','LUX','MAC','MKD','MDG','MWI','MYS','MDV','MLI','MLT','MHL','MTQ','MRT','MUS','MYT','MEX','FSM','MDA','MCO','MNG','MNE','MSR','MAR','MOZ','MMR','NAM','NRU','NPL','NLD','NCL','NZL','NIC','NER','NGA','NIU','NFK','MNP','NOR','OMN','PAK','PLW','PSE','PAN','PNG','PRY','PER','PHL','PCN','POL','PRT','PRI','QAT','REU','ROU','RUS','RWA','BLM','SHN','KNA','LCA','MAF','SPM','VCT','WSM','SMR','STP','SAU','SEN','SRB','SYC','SLE','SGP','SXM','SVK','SVN','SLB','SOM','ZAF','SGS','SSD','ESP','LKA','SDN','SUR','SJM','SWZ','SWE','CHE','SYR','TWN','TJK','TZA','THA','TLS','TGO','TKL','TON','TTO','TUN','TUR','TKM','TCA','TUV','UGA','UKR','ARE','GBR','USA','UMI','URY','UZB','VUT','VEN','VNM','VGB','VIR','WLF','ESH','YEM','ZMB','ZWE'];function isISO31661Alpha3(str){assertString(str);return includes(validISO31661Alpha3CountriesCodes,str.toUpperCase());}
var notBase64=/[^A-Z0-9+\/=]/i;function isBase64(str){assertString(str);var len=str.length;if(!len||len%4!==0||notBase64.test(str)){return false;}
var firstPaddingChar=str.indexOf('=');return firstPaddingChar===-1||firstPaddingChar===len-1||firstPaddingChar===len-2&&str[len-1]==='=';}
var validMediaType=/^[a-z]+\/[a-z0-9\-\+]+$/i;var validAttribute=/^[a-z\-]+=[a-z0-9\-]+$/i;var validData=/^[a-z0-9!\$&'\(\)\*\+,;=\-\._~:@\/\?%\s]*$/i;function isDataURI(str){assertString(str);var data=str.split(',');if(data.length<2){return false;}
var attributes=data.shift().trim().split(';');var schemeAndMediaType=attributes.shift();if(schemeAndMediaType.substr(0,5)!=='data:'){return false;}
var mediaType=schemeAndMediaType.substr(5);if(mediaType!==''&&!validMediaType.test(mediaType)){return false;}
for(var i=0;i<attributes.length;i++){if(i===attributes.length-1&&attributes[i].toLowerCase()==='base64'){}else if(!validAttribute.test(attributes[i])){return false;}}
for(var _i=0;_i<data.length;_i++){if(!validData.test(data[_i])){return false;}}
return true;}
var magnetURI=/^magnet:\?xt=urn:[a-z0-9]+:[a-z0-9]{32,40}&dn=.+&tr=.+$/i;function isMagnetURI(url){assertString(url);return magnetURI.test(url.trim());}
var mimeTypeSimple=/^(application|audio|font|image|message|model|multipart|text|video)\/[a-zA-Z0-9\.\-\+]{1,100}$/i;var mimeTypeText=/^text\/[a-zA-Z0-9\.\-\+]{1,100};\s?charset=("[a-zA-Z0-9\.\-\+\s]{0,70}"|[a-zA-Z0-9\.\-\+]{0,70})(\s?\([a-zA-Z0-9\.\-\+\s]{1,20}\))?$/i;var mimeTypeMultipart=/^multipart\/[a-zA-Z0-9\.\-\+]{1,100}(;\s?(boundary|charset)=("[a-zA-Z0-9\.\-\+\s]{0,70}"|[a-zA-Z0-9\.\-\+]{0,70})(\s?\([a-zA-Z0-9\.\-\+\s]{1,20}\))?){0,2}$/i;function isMimeType(str){assertString(str);return mimeTypeSimple.test(str)||mimeTypeText.test(str)||mimeTypeMultipart.test(str);}
var lat=/^\(?[+-]?(90(\.0+)?|[1-8]?\d(\.\d+)?)$/;var long=/^\s?[+-]?(180(\.0+)?|1[0-7]\d(\.\d+)?|\d{1,2}(\.\d+)?)\)?$/;var isLatLong=function(str){assertString(str);if(!str.includes(','))return false;var pair=str.split(',');return lat.test(pair[0])&&long.test(pair[1]);};var threeDigit=/^\d{3}$/;var fourDigit=/^\d{4}$/;var fiveDigit=/^\d{5}$/;var sixDigit=/^\d{6}$/;var patterns={AD:/^AD\d{3}$/,AT:fourDigit,AU:fourDigit,BE:fourDigit,BG:fourDigit,CA:/^[ABCEGHJKLMNPRSTVXY]\d[ABCEGHJ-NPRSTV-Z][\s\-]?\d[ABCEGHJ-NPRSTV-Z]\d$/i,CH:fourDigit,CZ:/^\d{3}\s?\d{2}$/,DE:fiveDigit,DK:fourDigit,DZ:fiveDigit,EE:fiveDigit,ES:fiveDigit,FI:fiveDigit,FR:/^\d{2}\s?\d{3}$/,GB:/^(gir\s?0aa|[a-z]{1,2}\d[\da-z]?\s?(\d[a-z]{2})?)$/i,GR:/^\d{3}\s?\d{2}$/,HR:/^([1-5]\d{4}$)/,HU:fourDigit,IL:fiveDigit,IN:sixDigit,IS:threeDigit,IT:fiveDigit,JP:/^\d{3}\-\d{4}$/,KE:fiveDigit,LI:/^(948[5-9]|949[0-7])$/,LT:/^LT\-\d{5}$/,LU:fourDigit,LV:/^LV\-\d{4}$/,MX:fiveDigit,NL:/^\d{4}\s?[a-z]{2}$/i,NO:fourDigit,PL:/^\d{2}\-\d{3}$/,PT:/^\d{4}\-\d{3}?$/,RO:sixDigit,RU:sixDigit,SA:fiveDigit,SE:/^\d{3}\s?\d{2}$/,SI:fourDigit,SK:/^\d{3}\s?\d{2}$/,TN:fourDigit,TW:/^\d{3}(\d{2})?$/,US:/^\d{5}(-\d{4})?$/,ZA:fourDigit,ZM:fiveDigit};var locales$4=Object.keys(patterns);var isPostalCode=function(str,locale){assertString(str);if(locale in patterns){return patterns[locale].test(str);}else if(locale==='any'){for(var key in patterns){if(patterns.hasOwnProperty(key)){var pattern=patterns[key];if(pattern.test(str)){return true;}}}
return false;}
throw new Error('Invalid locale \''+locale+'\'');};function ltrim(str,chars){assertString(str);var pattern=chars?new RegExp('^['+chars+']+','g'):/^\s+/g;return str.replace(pattern,'');}
function rtrim(str,chars){assertString(str);var pattern=chars?new RegExp('['+chars+']'):/\s/;var idx=str.length-1;for(;idx>=0&&pattern.test(str[idx]);idx--){}
return idx<str.length?str.substr(0,idx+1):str;}
function trim(str,chars){return rtrim(ltrim(str,chars),chars);}
function escape(str){assertString(str);return str.replace(/&/g,'&amp;').replace(/"/g,'&quot;').replace(/'/g,'&#x27;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/\//g,'&#x2F;').replace(/\\/g,'&#x5C;').replace(/`/g,'&#96;');}
function unescape(str){assertString(str);return str.replace(/&amp;/g,'&').replace(/&quot;/g,'"').replace(/&#x27;/g,"'").replace(/&lt;/g,'<').replace(/&gt;/g,'>').replace(/&#x2F;/g,'/').replace(/&#x5C;/g,'\\').replace(/&#96;/g,'`');}
function blacklist$1(str,chars){assertString(str);return str.replace(new RegExp('['+chars+']+','g'),'');}
function stripLow(str,keep_new_lines){assertString(str);var chars=keep_new_lines?'\\x00-\\x09\\x0B\\x0C\\x0E-\\x1F\\x7F':'\\x00-\\x1F\\x7F';return blacklist$1(str,chars);}
function whitelist(str,chars){assertString(str);return str.replace(new RegExp('[^'+chars+']+','g'),'');}
function isWhitelisted(str,chars){assertString(str);for(var i=str.length-1;i>=0;i--){if(chars.indexOf(str[i])===-1){return false;}}
return true;}
var default_normalize_email_options={all_lowercase:true,gmail_lowercase:true,gmail_remove_dots:true,gmail_remove_subaddress:true,gmail_convert_googlemaildotcom:true,outlookdotcom_lowercase:true,outlookdotcom_remove_subaddress:true,yahoo_lowercase:true,yahoo_remove_subaddress:true,yandex_lowercase:true,icloud_lowercase:true,icloud_remove_subaddress:true};var icloud_domains=['icloud.com','me.com'];var outlookdotcom_domains=['hotmail.at','hotmail.be','hotmail.ca','hotmail.cl','hotmail.co.il','hotmail.co.nz','hotmail.co.th','hotmail.co.uk','hotmail.com','hotmail.com.ar','hotmail.com.au','hotmail.com.br','hotmail.com.gr','hotmail.com.mx','hotmail.com.pe','hotmail.com.tr','hotmail.com.vn','hotmail.cz','hotmail.de','hotmail.dk','hotmail.es','hotmail.fr','hotmail.hu','hotmail.id','hotmail.ie','hotmail.in','hotmail.it','hotmail.jp','hotmail.kr','hotmail.lv','hotmail.my','hotmail.ph','hotmail.pt','hotmail.sa','hotmail.sg','hotmail.sk','live.be','live.co.uk','live.com','live.com.ar','live.com.mx','live.de','live.es','live.eu','live.fr','live.it','live.nl','msn.com','outlook.at','outlook.be','outlook.cl','outlook.co.il','outlook.co.nz','outlook.co.th','outlook.com','outlook.com.ar','outlook.com.au','outlook.com.br','outlook.com.gr','outlook.com.pe','outlook.com.tr','outlook.com.vn','outlook.cz','outlook.de','outlook.dk','outlook.es','outlook.fr','outlook.hu','outlook.id','outlook.ie','outlook.in','outlook.it','outlook.jp','outlook.kr','outlook.lv','outlook.my','outlook.ph','outlook.pt','outlook.sa','outlook.sg','outlook.sk','passport.com'];var yahoo_domains=['rocketmail.com','yahoo.ca','yahoo.co.uk','yahoo.com','yahoo.de','yahoo.fr','yahoo.in','yahoo.it','ymail.com'];var yandex_domains=['yandex.ru','yandex.ua','yandex.kz','yandex.com','yandex.by','ya.ru'];function dotsReplacer(match){if(match.length>1){return match;}
return '';}
function normalizeEmail(email,options){options=merge(options,default_normalize_email_options);var raw_parts=email.split('@');var domain=raw_parts.pop();var user=raw_parts.join('@');var parts=[user,domain];parts[1]=parts[1].toLowerCase();if(parts[1]==='gmail.com'||parts[1]==='googlemail.com'){if(options.gmail_remove_subaddress){parts[0]=parts[0].split('+')[0];}
if(options.gmail_remove_dots){parts[0]=parts[0].replace(/\.+/g,dotsReplacer);}
if(!parts[0].length){return false;}
if(options.all_lowercase||options.gmail_lowercase){parts[0]=parts[0].toLowerCase();}
parts[1]=options.gmail_convert_googlemaildotcom?'gmail.com':parts[1];}else if(icloud_domains.indexOf(parts[1])>=0){if(options.icloud_remove_subaddress){parts[0]=parts[0].split('+')[0];}
if(!parts[0].length){return false;}
if(options.all_lowercase||options.icloud_lowercase){parts[0]=parts[0].toLowerCase();}}else if(outlookdotcom_domains.indexOf(parts[1])>=0){if(options.outlookdotcom_remove_subaddress){parts[0]=parts[0].split('+')[0];}
if(!parts[0].length){return false;}
if(options.all_lowercase||options.outlookdotcom_lowercase){parts[0]=parts[0].toLowerCase();}}else if(yahoo_domains.indexOf(parts[1])>=0){if(options.yahoo_remove_subaddress){var components=parts[0].split('-');parts[0]=components.length>1?components.slice(0,-1).join('-'):components[0];}
if(!parts[0].length){return false;}
if(options.all_lowercase||options.yahoo_lowercase){parts[0]=parts[0].toLowerCase();}}else if(yandex_domains.indexOf(parts[1])>=0){if(options.all_lowercase||options.yandex_lowercase){parts[0]=parts[0].toLowerCase();}
parts[1]='yandex.ru';}else if(options.all_lowercase){parts[0]=parts[0].toLowerCase();}
return parts.join('@');}
var version='10.8.0';var validator={version:version,toDate:toDate,toFloat:toFloat,toInt:toInt,toBoolean:toBoolean,equals:equals,contains:contains,matches:matches,isEmail:isEmail,isURL:isURL,isMACAddress:isMACAddress,isIP:isIP,isIPRange:isIPRange,isFQDN:isFQDN,isBoolean:isBoolean,isAlpha:isAlpha,isAlphaLocales:locales,isAlphanumeric:isAlphanumeric,isAlphanumericLocales:locales$1,isNumeric:isNumeric,isPort:isPort,isLowercase:isLowercase,isUppercase:isUppercase,isAscii:isAscii,isFullWidth:isFullWidth,isHalfWidth:isHalfWidth,isVariableWidth:isVariableWidth,isMultibyte:isMultibyte,isSurrogatePair:isSurrogatePair,isInt:isInt,isFloat:isFloat,isFloatLocales:locales$2,isDecimal:isDecimal,isHexadecimal:isHexadecimal,isDivisibleBy:isDivisibleBy,isHexColor:isHexColor,isISRC:isISRC,isMD5:isMD5,isHash:isHash,isJWT:isJWT,isJSON:isJSON,isEmpty:isEmpty,isLength:isLength,isByteLength:isByteLength,isUUID:isUUID,isMongoId:isMongoId,isAfter:isAfter,isBefore:isBefore,isIn:isIn,isCreditCard:isCreditCard,isIdentityCard:isIdentityCard,isISIN:isISIN,isISBN:isISBN,isISSN:isISSN,isMobilePhone:isMobilePhone,isMobilePhoneLocales:locales$3,isPostalCode:isPostalCode,isPostalCodeLocales:locales$4,isCurrency:isCurrency,isISO8601:isISO8601,isRFC3339:isRFC3339,isISO31661Alpha2:isISO31661Alpha2,isISO31661Alpha3:isISO31661Alpha3,isBase64:isBase64,isDataURI:isDataURI,isMagnetURI:isMagnetURI,isMimeType:isMimeType,isLatLong:isLatLong,ltrim:ltrim,rtrim:rtrim,trim:trim,escape:escape,unescape:unescape,stripLow:stripLow,whitelist:whitelist,blacklist:blacklist$1,isWhitelisted:isWhitelisted,normalizeEmail:normalizeEmail,toString:toString};return validator;})));;/*!
* Datepicker for Bootstrap v1.7.0-dev (https://github.com/uxsolutions/bootstrap-datepicker)
*
* Licensed under the Apache License v2.0 (http://www.apache.org/licenses/LICENSE-2.0)
*/(function(factory){if(typeof define==="function"&&define.amd){define(["jquery"],factory);}else if(typeof exports==='object'){factory(require('jquery'));}else{factory(jQuery);}}(function($,undefined){function UTCDate(){return new Date(Date.UTC.apply(Date,arguments));}
function UTCToday(){var today=new Date();return UTCDate(today.getFullYear(),today.getMonth(),today.getDate());}
function isUTCEquals(date1,date2){return(date1.getUTCFullYear()===date2.getUTCFullYear()&&date1.getUTCMonth()===date2.getUTCMonth()&&date1.getUTCDate()===date2.getUTCDate());}
function alias(method,deprecationMsg){return function(){if(deprecationMsg!==undefined){$.fn.datepicker.deprecated(deprecationMsg);}
return this[method].apply(this,arguments);};}
function isValidDate(d){return d&&!isNaN(d.getTime());}
var DateArray=(function(){var extras={get:function(i){return this.slice(i)[0];},contains:function(d){var val=d&&d.valueOf();for(var i=0,l=this.length;i<l;i++)
if(0<=this[i].valueOf()-val&&this[i].valueOf()-val<1000*60*60*24)
return i;return-1;},remove:function(i){this.splice(i,1);},replace:function(new_array){if(!new_array)
return;if(!$.isArray(new_array))
new_array=[new_array];this.clear();this.push.apply(this,new_array);},clear:function(){this.length=0;},copy:function(){var a=new DateArray();a.replace(this);return a;}};return function(){var a=[];a.push.apply(a,arguments);$.extend(a,extras);return a;};})();var Datepicker=function(element,options){$.data(element,'datepicker',this);this._process_options(options);this.dates=new DateArray();this.viewDate=this.o.defaultViewDate;this.focusDate=null;this.element=$(element);this.isInput=this.element.is('input');this.inputField=this.isInput?this.element:this.element.find('input');this.component=this.element.hasClass('date')?this.element.find('.add-on, .input-group-addon, .btn'):false;if(this.component&&this.component.length===0)
this.component=false;this.isInline=!this.component&&this.element.is('div');this.picker=$(DPGlobal.template);if(this._check_template(this.o.templates.leftArrow)){this.picker.find('.prev').html(this.o.templates.leftArrow);}
if(this._check_template(this.o.templates.rightArrow)){this.picker.find('.next').html(this.o.templates.rightArrow);}
this._buildEvents();this._attachEvents();if(this.isInline){this.picker.addClass('datepicker-inline').appendTo(this.element);}else{this.picker.addClass('datepicker-dropdown dropdown-menu');}
if(this.o.rtl){this.picker.addClass('datepicker-rtl');}
if(this.o.calendarWeeks){this.picker.find('.datepicker-days .datepicker-switch, thead .datepicker-title, tfoot .today, tfoot .clear').attr('colspan',function(i,val){return Number(val)+1;});}
this._process_options({startDate:this._o.startDate,endDate:this._o.endDate,daysOfWeekDisabled:this.o.daysOfWeekDisabled,daysOfWeekHighlighted:this.o.daysOfWeekHighlighted,datesDisabled:this.o.datesDisabled});this._allow_update=false;this.setViewMode(this.o.startView);this._allow_update=true;this.fillDow();this.fillMonths();this.update();if(this.isInline){this.show();}};Datepicker.prototype={constructor:Datepicker,_resolveViewName:function(view){$.each(DPGlobal.viewModes,function(i,viewMode){if(view===i||$.inArray(view,viewMode.names)!==-1){view=i;return false;}});return view;},_resolveDaysOfWeek:function(daysOfWeek){if(!$.isArray(daysOfWeek))
daysOfWeek=daysOfWeek.split(/[,\s]*/);return $.map(daysOfWeek,Number);},_check_template:function(tmp){try{if(tmp===undefined||tmp===""){return false;}
if((tmp.match(/[<>]/g)||[]).length<=0){return true;}
var jDom=$(tmp);return jDom.length>0;}catch(ex){return false;}},_process_options:function(opts){this._o=$.extend({},this._o,opts);var o=this.o=$.extend({},this._o);var lang=o.language;if(!dates[lang]){lang=lang.split('-')[0];if(!dates[lang])
lang=defaults.language;}
o.language=lang;o.startView=this._resolveViewName(o.startView);o.minViewMode=this._resolveViewName(o.minViewMode);o.maxViewMode=this._resolveViewName(o.maxViewMode);o.startView=Math.max(this.o.minViewMode,Math.min(this.o.maxViewMode,o.startView));if(o.multidate!==true){o.multidate=Number(o.multidate)||false;if(o.multidate!==false)
o.multidate=Math.max(0,o.multidate);}
o.multidateSeparator=String(o.multidateSeparator);o.weekStart%=7;o.weekEnd=(o.weekStart+6)%7;var format=DPGlobal.parseFormat(o.format);if(o.startDate!==-Infinity){if(!!o.startDate){if(o.startDate instanceof Date)
o.startDate=this._local_to_utc(this._zero_time(o.startDate));else
o.startDate=DPGlobal.parseDate(o.startDate,format,o.language,o.assumeNearbyYear);}else{o.startDate=-Infinity;}}
if(o.endDate!==Infinity){if(!!o.endDate){if(o.endDate instanceof Date)
o.endDate=this._local_to_utc(this._zero_time(o.endDate));else
o.endDate=DPGlobal.parseDate(o.endDate,format,o.language,o.assumeNearbyYear);}else{o.endDate=Infinity;}}
o.daysOfWeekDisabled=this._resolveDaysOfWeek(o.daysOfWeekDisabled||[]);o.daysOfWeekHighlighted=this._resolveDaysOfWeek(o.daysOfWeekHighlighted||[]);o.datesDisabled=o.datesDisabled||[];if(!$.isArray(o.datesDisabled)){o.datesDisabled=o.datesDisabled.split(',');}
o.datesDisabled=$.map(o.datesDisabled,function(d){return DPGlobal.parseDate(d,format,o.language,o.assumeNearbyYear);});var plc=String(o.orientation).toLowerCase().split(/\s+/g),_plc=o.orientation.toLowerCase();plc=$.grep(plc,function(word){return /^auto|left|right|top|bottom$/.test(word);});o.orientation={x:'auto',y:'auto'};if(!_plc||_plc==='auto');else if(plc.length===1){switch(plc[0]){case 'top':case 'bottom':o.orientation.y=plc[0];break;case 'left':case 'right':o.orientation.x=plc[0];break;}}else{_plc=$.grep(plc,function(word){return /^left|right$/.test(word);});o.orientation.x=_plc[0]||'auto';_plc=$.grep(plc,function(word){return /^top|bottom$/.test(word);});o.orientation.y=_plc[0]||'auto';}
if(o.defaultViewDate instanceof Date||typeof o.defaultViewDate==='string'){o.defaultViewDate=DPGlobal.parseDate(o.defaultViewDate,format,o.language,o.assumeNearbyYear);}else if(o.defaultViewDate){var year=o.defaultViewDate.year||new Date().getFullYear();var month=o.defaultViewDate.month||0;var day=o.defaultViewDate.day||1;o.defaultViewDate=UTCDate(year,month,day);}else{o.defaultViewDate=UTCToday();}},_events:[],_secondaryEvents:[],_applyEvents:function(evs){for(var i=0,el,ch,ev;i<evs.length;i++){el=evs[i][0];if(evs[i].length===2){ch=undefined;ev=evs[i][1];}else if(evs[i].length===3){ch=evs[i][1];ev=evs[i][2];}
el.on(ev,ch);}},_unapplyEvents:function(evs){for(var i=0,el,ev,ch;i<evs.length;i++){el=evs[i][0];if(evs[i].length===2){ch=undefined;ev=evs[i][1];}else if(evs[i].length===3){ch=evs[i][1];ev=evs[i][2];}
el.off(ev,ch);}},_buildEvents:function(){var events={keyup:$.proxy(function(e){if($.inArray(e.keyCode,[27,37,39,38,40,32,13,9])===-1)
this.update();},this),keydown:$.proxy(this.keydown,this),paste:$.proxy(this.paste,this)};if(this.o.showOnFocus===true){events.focus=$.proxy(this.show,this);}
if(this.isInput){this._events=[[this.element,events]];}
else if(this.component&&this.inputField.length){this._events=[[this.inputField,events],[this.component,{click:$.proxy(this.show,this)}]];}else{this._events=[[this.element,{click:$.proxy(this.show,this),keydown:$.proxy(this.keydown,this)}]];}
this._events.push([this.element,'*',{blur:$.proxy(function(e){this._focused_from=e.target;},this)}],[this.element,{blur:$.proxy(function(e){this._focused_from=e.target;},this)}]);if(this.o.immediateUpdates){this._events.push([this.element,{'changeYear changeMonth':$.proxy(function(e){this.update(e.date);},this)}]);}
this._secondaryEvents=[[this.picker,{click:$.proxy(this.click,this)}],[this.picker,'.prev, .next',{click:$.proxy(this.navArrowsClick,this)}],[$(window),{resize:$.proxy(this.place,this)}],[$(document),{'mousedown touchstart':$.proxy(function(e){if(!(this.element.is(e.target)||this.element.find(e.target).length||this.picker.is(e.target)||this.picker.find(e.target).length||this.isInline)){this.hide();}},this)}]];},_attachEvents:function(){this._detachEvents();this._applyEvents(this._events);},_detachEvents:function(){this._unapplyEvents(this._events);},_attachSecondaryEvents:function(){this._detachSecondaryEvents();this._applyEvents(this._secondaryEvents);},_detachSecondaryEvents:function(){this._unapplyEvents(this._secondaryEvents);},_trigger:function(event,altdate){var date=altdate||this.dates.get(-1),local_date=this._utc_to_local(date);this.element.trigger({type:event,date:local_date,viewMode:this.viewMode,dates:$.map(this.dates,this._utc_to_local),format:$.proxy(function(ix,format){if(arguments.length===0){ix=this.dates.length-1;format=this.o.format;}else if(typeof ix==='string'){format=ix;ix=this.dates.length-1;}
format=format||this.o.format;var date=this.dates.get(ix);return DPGlobal.formatDate(date,format,this.o.language);},this)});},show:function(){if(this.inputField.prop('disabled')||(this.inputField.prop('readonly')&&this.o.enableOnReadonly===false))
return;if(!this.isInline)
this.picker.appendTo(this.o.container);this.place();this.picker.show();this._attachSecondaryEvents();this._trigger('show');if((window.navigator.msMaxTouchPoints||'ontouchstart'in document)&&this.o.disableTouchKeyboard){$(this.element).blur();}
return this;},hide:function(){if(this.isInline||!this.picker.is(':visible'))
return this;this.focusDate=null;this.picker.hide().detach();this._detachSecondaryEvents();this.setViewMode(this.o.startView);if(this.o.forceParse&&this.inputField.val())
this.setValue();this._trigger('hide');return this;},destroy:function(){this.hide();this._detachEvents();this._detachSecondaryEvents();this.picker.remove();delete this.element.data().datepicker;if(!this.isInput){delete this.element.data().date;}
return this;},paste:function(e){var dateString;if(e.originalEvent.clipboardData&&e.originalEvent.clipboardData.types&&$.inArray('text/plain',e.originalEvent.clipboardData.types)!==-1){dateString=e.originalEvent.clipboardData.getData('text/plain');}else if(window.clipboardData){dateString=window.clipboardData.getData('Text');}else{return;}
this.setDate(dateString);this.update();e.preventDefault();},_utc_to_local:function(utc){if(!utc){return utc;}
var local=new Date(utc.getTime()+(utc.getTimezoneOffset()*60000));if(local.getTimezoneOffset()!==utc.getTimezoneOffset()){local=new Date(utc.getTime()+(local.getTimezoneOffset()*60000));}
return local;},_local_to_utc:function(local){return local&&new Date(local.getTime()-(local.getTimezoneOffset()*60000));},_zero_time:function(local){return local&&new Date(local.getFullYear(),local.getMonth(),local.getDate());},_zero_utc_time:function(utc){return utc&&UTCDate(utc.getUTCFullYear(),utc.getUTCMonth(),utc.getUTCDate());},getDates:function(){return $.map(this.dates,this._utc_to_local);},getUTCDates:function(){return $.map(this.dates,function(d){return new Date(d);});},getDate:function(){return this._utc_to_local(this.getUTCDate());},getUTCDate:function(){var selected_date=this.dates.get(-1);if(selected_date!==undefined){return new Date(selected_date);}else{return null;}},clearDates:function(){this.inputField.val('');this.update();this._trigger('changeDate');if(this.o.autoclose){this.hide();}},setDates:function(){var args=$.isArray(arguments[0])?arguments[0]:arguments;this.update.apply(this,args);this._trigger('changeDate');this.setValue();return this;},setUTCDates:function(){var args=$.isArray(arguments[0])?arguments[0]:arguments;this.setDates.apply(this,$.map(args,this._utc_to_local));return this;},setDate:alias('setDates'),setUTCDate:alias('setUTCDates'),remove:alias('destroy','Method `remove` is deprecated and will be removed in version 2.0. Use `destroy` instead'),setValue:function(){var formatted=this.getFormattedDate();this.inputField.val(formatted);return this;},getFormattedDate:function(format){if(format===undefined)
format=this.o.format;var lang=this.o.language;return $.map(this.dates,function(d){return DPGlobal.formatDate(d,format,lang);}).join(this.o.multidateSeparator);},getStartDate:function(){return this.o.startDate;},setStartDate:function(startDate){this._process_options({startDate:startDate});this.update();this.updateNavArrows();return this;},getEndDate:function(){return this.o.endDate;},setEndDate:function(endDate){this._process_options({endDate:endDate});this.update();this.updateNavArrows();return this;},setDaysOfWeekDisabled:function(daysOfWeekDisabled){this._process_options({daysOfWeekDisabled:daysOfWeekDisabled});this.update();return this;},setDaysOfWeekHighlighted:function(daysOfWeekHighlighted){this._process_options({daysOfWeekHighlighted:daysOfWeekHighlighted});this.update();return this;},setDatesDisabled:function(datesDisabled){this._process_options({datesDisabled:datesDisabled});this.update();return this;},place:function(){if(this.isInline)
return this;var calendarWidth=this.picker.outerWidth(),calendarHeight=this.picker.outerHeight(),visualPadding=10,container=$(this.o.container),windowWidth=container.width(),scrollTop=this.o.container==='body'?$(document).scrollTop():container.scrollTop(),appendOffset=container.offset();var parentsZindex=[0];this.element.parents().each(function(){var itemZIndex=$(this).css('z-index');if(itemZIndex!=='auto'&&Number(itemZIndex)!==0)parentsZindex.push(Number(itemZIndex));});var zIndex=Math.max.apply(Math,parentsZindex)+this.o.zIndexOffset;var offset=this.component?this.component.parent().offset():this.element.offset();var height=this.component?this.component.outerHeight(true):this.element.outerHeight(false);var width=this.component?this.component.outerWidth(true):this.element.outerWidth(false);var left=offset.left-appendOffset.left;var top=offset.top-appendOffset.top;if(this.o.container!=='body'){top+=scrollTop;}
this.picker.removeClass('datepicker-orient-top datepicker-orient-bottom '+
'datepicker-orient-right datepicker-orient-left');if(this.o.orientation.x!=='auto'){this.picker.addClass('datepicker-orient-'+this.o.orientation.x);if(this.o.orientation.x==='right')
left-=calendarWidth-width;}
else{if(offset.left<0){this.picker.addClass('datepicker-orient-left');left-=offset.left-visualPadding;}else if(left+calendarWidth>windowWidth){this.picker.addClass('datepicker-orient-right');left+=width-calendarWidth;}else{if(this.o.rtl){this.picker.addClass('datepicker-orient-right');}else{this.picker.addClass('datepicker-orient-left');}}}
var yorient=this.o.orientation.y,top_overflow;if(yorient==='auto'){top_overflow=-scrollTop+top-calendarHeight;yorient=top_overflow<0?'bottom':'top';}
this.picker.addClass('datepicker-orient-'+yorient);if(yorient==='top')
top-=calendarHeight+parseInt(this.picker.css('padding-top'));else
top+=height;if(this.o.rtl){var right=windowWidth-(left+width);this.picker.css({top:top,right:right,zIndex:zIndex});}else{this.picker.css({top:top,left:left,zIndex:zIndex});}
return this;},_allow_update:true,update:function(){if(!this._allow_update)
return this;var oldDates=this.dates.copy(),dates=[],fromArgs=false;if(arguments.length){$.each(arguments,$.proxy(function(i,date){if(date instanceof Date)
date=this._local_to_utc(date);dates.push(date);},this));fromArgs=true;}else{dates=this.isInput?this.element.val():this.element.data('date')||this.inputField.val();if(dates&&this.o.multidate)
dates=dates.split(this.o.multidateSeparator);else
dates=[dates];delete this.element.data().date;}
dates=$.map(dates,$.proxy(function(date){return DPGlobal.parseDate(date,this.o.format,this.o.language,this.o.assumeNearbyYear);},this));dates=$.grep(dates,$.proxy(function(date){return(!this.dateWithinRange(date)||!date);},this),true);this.dates.replace(dates);if(this.o.updateViewDate){if(this.dates.length)
this.viewDate=new Date(this.dates.get(-1));else if(this.viewDate<this.o.startDate)
this.viewDate=new Date(this.o.startDate);else if(this.viewDate>this.o.endDate)
this.viewDate=new Date(this.o.endDate);else
this.viewDate=this.o.defaultViewDate;}
if(fromArgs){this.setValue();this.element.change();}else if(this.dates.length){if(typeof this.o.format==='string'){if((String(this.element[0].value).length===String(this.o.format).length)&&(String(oldDates)!==String(this.dates)))
this._trigger('changeDate');this.element.change();}else if(String(oldDates)!==String(this.dates)){this._trigger('changeDate');this.element.change();}}
if(!this.dates.length&&oldDates.length){this._trigger('clearDate');this.element.change();}
this.fill();return this;},fillDow:function(){var dowCnt=this.o.weekStart,html='<tr>';if(this.o.calendarWeeks){html+='<th class="cw">&#160;</th>';}
while(dowCnt<this.o.weekStart+7){html+='<th class="dow';if($.inArray(dowCnt,this.o.daysOfWeekDisabled)!==-1)
html+=' disabled';html+='">'+dates[this.o.language].daysMin[(dowCnt++)%7]+'</th>';}
html+='</tr>';this.picker.find('.datepicker-days thead').append(html);},fillMonths:function(){var localDate=this._utc_to_local(this.viewDate);var html='';var focused;for(var i=0;i<12;i++){focused=localDate&&localDate.getMonth()===i?' focused':'';html+='<span class="month'+focused+'">'+dates[this.o.language].monthsShort[i]+'</span>';}
this.picker.find('.datepicker-months td').html(html);},setRange:function(range){if(!range||!range.length)
delete this.range;else
this.range=$.map(range,function(d){return d.valueOf();});this.fill();},getClassNames:function(date){var cls=[],year=this.viewDate.getUTCFullYear(),month=this.viewDate.getUTCMonth(),today=UTCToday();if(date.getUTCFullYear()<year||(date.getUTCFullYear()===year&&date.getUTCMonth()<month)){cls.push('old');}else if(date.getUTCFullYear()>year||(date.getUTCFullYear()===year&&date.getUTCMonth()>month)){cls.push('new');}
if(this.focusDate&&date.valueOf()===this.focusDate.valueOf())
cls.push('focused');if(this.o.todayHighlight&&isUTCEquals(date,today)){cls.push('today');}
if(this.dates.contains(date)!==-1)
cls.push('active');if(!this.dateWithinRange(date)){cls.push('disabled');}
if(this.dateIsDisabled(date)){cls.push('disabled','disabled-date');}
if($.inArray(date.getUTCDay(),this.o.daysOfWeekHighlighted)!==-1){cls.push('highlighted');}
if(this.range){if(date>this.range[0]&&date<this.range[this.range.length-1]){cls.push('range');}
if($.inArray(date.valueOf(),this.range)!==-1){cls.push('selected');}
if(date.valueOf()===this.range[0]){cls.push('range-start');}
if(date.valueOf()===this.range[this.range.length-1]){cls.push('range-end');}}
return cls;},_fill_yearsView:function(selector,cssClass,factor,year,startYear,endYear,beforeFn){var html='';var step=factor/10;var view=this.picker.find(selector);var startVal=Math.floor(year/factor)*factor;var endVal=startVal+step*9;var focusedVal=Math.floor(this.viewDate.getFullYear()/step)*step;var selected=$.map(this.dates,function(d){return Math.floor(d.getUTCFullYear()/step)*step;});var classes,tooltip,before;for(var currVal=startVal-step;currVal<=endVal+step;currVal+=step){classes=[cssClass];tooltip=null;if(currVal===startVal-step){classes.push('old');}else if(currVal===endVal+step){classes.push('new');}
if($.inArray(currVal,selected)!==-1){classes.push('active');}
if(currVal<startYear||currVal>endYear){classes.push('disabled');}
if(currVal===focusedVal){classes.push('focused');}
if(beforeFn!==$.noop){before=beforeFn(new Date(currVal,0,1));if(before===undefined){before={};}else if(typeof before==='boolean'){before={enabled:before};}else if(typeof before==='string'){before={classes:before};}
if(before.enabled===false){classes.push('disabled');}
if(before.classes){classes=classes.concat(before.classes.split(/\s+/));}
if(before.tooltip){tooltip=before.tooltip;}}
html+='<span class="'+classes.join(' ')+'"'+(tooltip?' title="'+tooltip+'"':'')+'>'+currVal+'</span>';}
view.find('.datepicker-switch').text(startVal+'-'+endVal);view.find('td').html(html);},fill:function(){var d=new Date(this.viewDate),year=d.getUTCFullYear(),month=d.getUTCMonth(),startYear=this.o.startDate!==-Infinity?this.o.startDate.getUTCFullYear():-Infinity,startMonth=this.o.startDate!==-Infinity?this.o.startDate.getUTCMonth():-Infinity,endYear=this.o.endDate!==Infinity?this.o.endDate.getUTCFullYear():Infinity,endMonth=this.o.endDate!==Infinity?this.o.endDate.getUTCMonth():Infinity,todaytxt=dates[this.o.language].today||dates['en'].today||'',cleartxt=dates[this.o.language].clear||dates['en'].clear||'',titleFormat=dates[this.o.language].titleFormat||dates['en'].titleFormat,tooltip,before;if(isNaN(year)||isNaN(month))
return;this.picker.find('.datepicker-days .datepicker-switch').text(DPGlobal.formatDate(d,titleFormat,this.o.language));this.picker.find('tfoot .today').text(todaytxt).toggle(this.o.todayBtn!==false);this.picker.find('tfoot .clear').text(cleartxt).toggle(this.o.clearBtn!==false);this.picker.find('thead .datepicker-title').text(this.o.title).toggle(this.o.title!=='');this.updateNavArrows();this.fillMonths();var prevMonth=UTCDate(year,month,0),day=prevMonth.getUTCDate();prevMonth.setUTCDate(day-(prevMonth.getUTCDay()-this.o.weekStart+7)%7);var nextMonth=new Date(prevMonth);if(prevMonth.getUTCFullYear()<100){nextMonth.setUTCFullYear(prevMonth.getUTCFullYear());}
nextMonth.setUTCDate(nextMonth.getUTCDate()+42);nextMonth=nextMonth.valueOf();var html=[];var weekDay,clsName;while(prevMonth.valueOf()<nextMonth){weekDay=prevMonth.getUTCDay();if(weekDay===this.o.weekStart){html.push('<tr>');if(this.o.calendarWeeks){var
ws=new Date(+prevMonth+(this.o.weekStart-weekDay-7)%7*864e5),th=new Date(Number(ws)+(7+4-ws.getUTCDay())%7*864e5),yth=new Date(Number(yth=UTCDate(th.getUTCFullYear(),0,1))+(7+4-yth.getUTCDay())%7*864e5),calWeek=(th-yth)/864e5/7+1;html.push('<td class="cw">'+calWeek+'</td>');}}
clsName=this.getClassNames(prevMonth);clsName.push('day');if(this.o.beforeShowDay!==$.noop){before=this.o.beforeShowDay(this._utc_to_local(prevMonth));if(before===undefined)
before={};else if(typeof before==='boolean')
before={enabled:before};else if(typeof before==='string')
before={classes:before};if(before.enabled===false)
clsName.push('disabled');if(before.classes)
clsName=clsName.concat(before.classes.split(/\s+/));if(before.tooltip)
tooltip=before.tooltip;}
if($.isFunction($.uniqueSort)){clsName=$.uniqueSort(clsName);}else{clsName=$.unique(clsName);}
html.push('<td class="'+clsName.join(' ')+'"'+(tooltip?' title="'+tooltip+'"':'')+(this.o.dateCells?' data-date="'+prevMonth.getTime().toString()+'"':'')+'><div>'+prevMonth.getUTCDate()+'</div></td>');tooltip=null;if(weekDay===this.o.weekEnd){html.push('</tr>');}
prevMonth.setUTCDate(prevMonth.getUTCDate()+1);}
this.picker.find('.datepicker-days tbody').html(html.join(''));var monthsTitle=dates[this.o.language].monthsTitle||dates['en'].monthsTitle||'Months';var months=this.picker.find('.datepicker-months').find('.datepicker-switch').text(this.o.maxViewMode<2?monthsTitle:year).end().find('tbody span').removeClass('active');$.each(this.dates,function(i,d){if(d.getUTCFullYear()===year)
months.eq(d.getUTCMonth()).addClass('active');});if(year<startYear||year>endYear){months.addClass('disabled');}
if(year===startYear){months.slice(0,startMonth).addClass('disabled');}
if(year===endYear){months.slice(endMonth+1).addClass('disabled');}
if(this.o.beforeShowMonth!==$.noop){var that=this;$.each(months,function(i,month){var moDate=new Date(year,i,1);var before=that.o.beforeShowMonth(moDate);if(before===undefined)
before={};else if(typeof before==='boolean')
before={enabled:before};else if(typeof before==='string')
before={classes:before};if(before.enabled===false&&!$(month).hasClass('disabled'))
$(month).addClass('disabled');if(before.classes)
$(month).addClass(before.classes);if(before.tooltip)
$(month).prop('title',before.tooltip);});}
this._fill_yearsView('.datepicker-years','year',10,year,startYear,endYear,this.o.beforeShowYear);this._fill_yearsView('.datepicker-decades','decade',100,year,startYear,endYear,this.o.beforeShowDecade);this._fill_yearsView('.datepicker-centuries','century',1000,year,startYear,endYear,this.o.beforeShowCentury);},updateNavArrows:function(){if(!this._allow_update)
return;var d=new Date(this.viewDate),year=d.getUTCFullYear(),month=d.getUTCMonth(),startYear=this.o.startDate!==-Infinity?this.o.startDate.getUTCFullYear():-Infinity,startMonth=this.o.startDate!==-Infinity?this.o.startDate.getUTCMonth():-Infinity,endYear=this.o.endDate!==Infinity?this.o.endDate.getUTCFullYear():Infinity,endMonth=this.o.endDate!==Infinity?this.o.endDate.getUTCMonth():Infinity,prevIsDisabled,nextIsDisabled,factor=1;switch(this.viewMode){case 0:prevIsDisabled=year<=startYear&&month<=startMonth;nextIsDisabled=year>=endYear&&month>=endMonth;break;case 4:factor*=10;case 3:factor*=10;case 2:factor*=10;case 1:prevIsDisabled=Math.floor(year/factor)*factor<=startYear;nextIsDisabled=Math.floor(year/factor)*factor+factor>=endYear;break;}
this.picker.find('.prev').toggleClass('disabled',prevIsDisabled);this.picker.find('.next').toggleClass('disabled',nextIsDisabled);},click:function(e){e.preventDefault();e.stopPropagation();var target,dir,day,year,month;target=$(e.target);if(target.hasClass('datepicker-switch')&&this.viewMode!==this.o.maxViewMode){this.setViewMode(this.viewMode+1);}
if(target.hasClass('today')&&!target.hasClass('day')){this.setViewMode(0);this._setDate(UTCToday(),this.o.todayBtn==='linked'?null:'view');}
if(target.hasClass('clear')){this.clearDates();}
if(!target.hasClass('disabled')){if(target.hasClass('day')){day=Number(target.text());year=this.viewDate.getUTCFullYear();month=this.viewDate.getUTCMonth();if(target.hasClass('old')||target.hasClass('new')){dir=target.hasClass('old')?-1:1;month=(month+dir+12)%12;if((dir===-1&&month===11)||(dir===1&&month===0)){year+=dir;if(this.o.updateViewDate){this._trigger('changeYear',this.viewDate);}}
if(this.o.updateViewDate){this._trigger('changeMonth',this.viewDate);}}
this._setDate(UTCDate(year,month,day));}
if(target.hasClass('month')||target.hasClass('year')||target.hasClass('decade')||target.hasClass('century')){this.viewDate.setUTCDate(1);day=1;if(this.viewMode===1){month=target.parent().find('span').index(target);year=this.viewDate.getUTCFullYear();this.viewDate.setUTCMonth(month);}else{month=0;year=Number(target.text());this.viewDate.setUTCFullYear(year);}
this._trigger(DPGlobal.viewModes[this.viewMode-1].e,this.viewDate);if(this.viewMode===this.o.minViewMode){this._setDate(UTCDate(year,month,day));}else{this.setViewMode(this.viewMode-1);this.fill();}}}
if(this.picker.is(':visible')&&this._focused_from){this._focused_from.focus();}
delete this._focused_from;},navArrowsClick:function(e){var target=$(e.target);var dir=target.hasClass('prev')?-1:1;if(this.viewMode!==0){dir*=DPGlobal.viewModes[this.viewMode].navStep*12;}
this.viewDate=this.moveMonth(this.viewDate,dir);this._trigger(DPGlobal.viewModes[this.viewMode].e,this.viewDate);this.fill();},_toggle_multidate:function(date){var ix=this.dates.contains(date);if(!date){this.dates.clear();}
if(ix!==-1){if(this.o.multidate===true||this.o.multidate>1||this.o.toggleActive){this.dates.remove(ix);}}else if(this.o.multidate===false){this.dates.clear();this.dates.push(date);}else{this.dates.push(date);}
if(typeof this.o.multidate==='number')
while(this.dates.length>this.o.multidate)
this.dates.remove(0);},_setDate:function(date,which){if(!which||which==='date')
this._toggle_multidate(date&&new Date(date));if((!which&&this.o.updateViewDate)||which==='view')
this.viewDate=date&&new Date(date);this.fill();this.setValue();if(!which||which!=='view'){this._trigger('changeDate');}
this.inputField.trigger('change');if(this.o.autoclose&&(!which||which==='date')){this.hide();}},moveDay:function(date,dir){var newDate=new Date(date);newDate.setUTCDate(date.getUTCDate()+dir);return newDate;},moveWeek:function(date,dir){return this.moveDay(date,dir*7);},moveMonth:function(date,dir){if(!isValidDate(date))
return this.o.defaultViewDate;if(!dir)
return date;var new_date=new Date(date.valueOf()),day=new_date.getUTCDate(),month=new_date.getUTCMonth(),mag=Math.abs(dir),new_month,test;dir=dir>0?1:-1;if(mag===1){test=dir===-1?function(){return new_date.getUTCMonth()===month;}:function(){return new_date.getUTCMonth()!==new_month;};new_month=month+dir;new_date.setUTCMonth(new_month);new_month=(new_month+12)%12;}else{for(var i=0;i<mag;i++)
new_date=this.moveMonth(new_date,dir);new_month=new_date.getUTCMonth();new_date.setUTCDate(day);test=function(){return new_month!==new_date.getUTCMonth();};}
while(test()){new_date.setUTCDate(--day);new_date.setUTCMonth(new_month);}
return new_date;},moveYear:function(date,dir){return this.moveMonth(date,dir*12);},moveAvailableDate:function(date,dir,fn){do{date=this[fn](date,dir);if(!this.dateWithinRange(date))
return false;fn='moveDay';}
while(this.dateIsDisabled(date));return date;},weekOfDateIsDisabled:function(date){return $.inArray(date.getUTCDay(),this.o.daysOfWeekDisabled)!==-1;},dateIsDisabled:function(date){return(this.weekOfDateIsDisabled(date)||$.grep(this.o.datesDisabled,function(d){return isUTCEquals(date,d);}).length>0);},dateWithinRange:function(date){return date>=this.o.startDate&&date<=this.o.endDate;},keydown:function(e){if(!this.picker.is(':visible')){if(e.keyCode===40||e.keyCode===27){this.show();e.stopPropagation();}
return;}
var dateChanged=false,dir,newViewDate,focusDate=this.focusDate||this.viewDate;switch(e.keyCode){case 27:if(this.focusDate){this.focusDate=null;this.viewDate=this.dates.get(-1)||this.viewDate;this.fill();}else
this.hide();e.preventDefault();e.stopPropagation();break;case 37:case 38:case 39:case 40:if(!this.o.keyboardNavigation||this.o.daysOfWeekDisabled.length===7)
break;dir=e.keyCode===37||e.keyCode===38?-1:1;if(this.viewMode===0){if(e.ctrlKey){newViewDate=this.moveAvailableDate(focusDate,dir,'moveYear');if(newViewDate)
this._trigger('changeYear',this.viewDate);}else if(e.shiftKey){newViewDate=this.moveAvailableDate(focusDate,dir,'moveMonth');if(newViewDate)
this._trigger('changeMonth',this.viewDate);}else if(e.keyCode===37||e.keyCode===39){newViewDate=this.moveAvailableDate(focusDate,dir,'moveDay');}else if(!this.weekOfDateIsDisabled(focusDate)){newViewDate=this.moveAvailableDate(focusDate,dir,'moveWeek');}}else if(this.viewMode===1){if(e.keyCode===38||e.keyCode===40){dir=dir*4;}
newViewDate=this.moveAvailableDate(focusDate,dir,'moveMonth');}else if(this.viewMode===2){if(e.keyCode===38||e.keyCode===40){dir=dir*4;}
newViewDate=this.moveAvailableDate(focusDate,dir,'moveYear');}
if(newViewDate){this.focusDate=this.viewDate=newViewDate;this.setValue();this.fill();e.preventDefault();}
break;case 13:if(!this.o.forceParse)
break;focusDate=this.focusDate||this.dates.get(-1)||this.viewDate;if(this.o.keyboardNavigation){this._toggle_multidate(focusDate);dateChanged=true;}
this.focusDate=null;this.viewDate=this.dates.get(-1)||this.viewDate;this.setValue();this.fill();if(this.picker.is(':visible')){e.preventDefault();e.stopPropagation();if(this.o.autoclose)
this.hide();}
break;case 9:this.focusDate=null;this.viewDate=this.dates.get(-1)||this.viewDate;this.fill();this.hide();break;}
if(dateChanged){if(this.dates.length)
this._trigger('changeDate');else
this._trigger('clearDate');this.inputField.trigger('change');}},setViewMode:function(viewMode){this.viewMode=viewMode;this.picker.children('div').hide().filter('.datepicker-'+DPGlobal.viewModes[this.viewMode].clsName).show();this.updateNavArrows();this._trigger('changeViewMode',new Date(this.viewDate));}};var DateRangePicker=function(element,options){$.data(element,'datepicker',this);this.element=$(element);this.inputs=$.map(options.inputs,function(i){return i.jquery?i[0]:i;});delete options.inputs;this.keepEmptyValues=options.keepEmptyValues;delete options.keepEmptyValues;datepickerPlugin.call($(this.inputs),options).on('changeDate',$.proxy(this.dateUpdated,this));this.pickers=$.map(this.inputs,function(i){return $.data(i,'datepicker');});this.updateDates();};DateRangePicker.prototype={updateDates:function(){this.dates=$.map(this.pickers,function(i){return i.getUTCDate();});this.updateRanges();},updateRanges:function(){var range=$.map(this.dates,function(d){return d.valueOf();});$.each(this.pickers,function(i,p){p.setRange(range);});},dateUpdated:function(e){if(this.updating)
return;this.updating=true;var dp=$.data(e.target,'datepicker');if(dp===undefined){return;}
var new_date=dp.getUTCDate(),keep_empty_values=this.keepEmptyValues,i=$.inArray(e.target,this.inputs),j=i-1,k=i+1,l=this.inputs.length;if(i===-1)
return;$.each(this.pickers,function(i,p){if(!p.getUTCDate()&&(p===dp||!keep_empty_values))
p.setUTCDate(new_date);});if(new_date<this.dates[j]){while(j>=0&&new_date<this.dates[j]){this.pickers[j--].setUTCDate(new_date);}}else if(new_date>this.dates[k]){while(k<l&&new_date>this.dates[k]){this.pickers[k++].setUTCDate(new_date);}}
this.updateDates();delete this.updating;},destroy:function(){$.map(this.pickers,function(p){p.destroy();});$(this.inputs).off('changeDate',this.dateUpdated);delete this.element.data().datepicker;},remove:alias('destroy','Method `remove` is deprecated and will be removed in version 2.0. Use `destroy` instead')};function opts_from_el(el,prefix){var data=$(el).data(),out={},inkey,replace=new RegExp('^'+prefix.toLowerCase()+'([A-Z])');prefix=new RegExp('^'+prefix.toLowerCase());function re_lower(_,a){return a.toLowerCase();}
for(var key in data)
if(prefix.test(key)){inkey=key.replace(replace,re_lower);out[inkey]=data[key];}
return out;}
function opts_from_locale(lang){var out={};if(!dates[lang]){lang=lang.split('-')[0];if(!dates[lang])
return;}
var d=dates[lang];$.each(locale_opts,function(i,k){if(k in d)
out[k]=d[k];});return out;}
var old=$.fn.datepicker;var datepickerPlugin=function(option){var args=Array.apply(null,arguments);args.shift();var internal_return;this.each(function(){var $this=$(this),data=$this.data('datepicker'),options=typeof option==='object'&&option;if(!data){var elopts=opts_from_el(this,'date'),xopts=$.extend({},defaults,elopts,options),locopts=opts_from_locale(xopts.language),opts=$.extend({},defaults,locopts,elopts,options);if($this.hasClass('input-daterange')||opts.inputs){$.extend(opts,{inputs:opts.inputs||$this.find('input').toArray()});data=new DateRangePicker(this,opts);}else{data=new Datepicker(this,opts);}
$this.data('datepicker',data);}
if(typeof option==='string'&&typeof data[option]==='function'){internal_return=data[option].apply(data,args);}});if(internal_return===undefined||internal_return instanceof Datepicker||internal_return instanceof DateRangePicker)
return this;if(this.length>1)
throw new Error('Using only allowed for the collection of a single element ('+option+' function)');else
return internal_return;};$.fn.datepicker=datepickerPlugin;var defaults=$.fn.datepicker.defaults={assumeNearbyYear:false,autoclose:false,beforeShowDay:$.noop,beforeShowMonth:$.noop,beforeShowYear:$.noop,beforeShowDecade:$.noop,beforeShowCentury:$.noop,calendarWeeks:false,clearBtn:false,toggleActive:false,daysOfWeekDisabled:[],daysOfWeekHighlighted:[],datesDisabled:[],endDate:Infinity,forceParse:true,format:'mm/dd/yyyy',keepEmptyValues:false,keyboardNavigation:true,language:'en',minViewMode:0,maxViewMode:4,multidate:false,multidateSeparator:',',orientation:"auto",rtl:false,startDate:-Infinity,startView:0,todayBtn:false,todayHighlight:false,updateViewDate:true,weekStart:0,disableTouchKeyboard:false,enableOnReadonly:true,showOnFocus:true,zIndexOffset:10,container:'body',immediateUpdates:false,dateCells:false,title:'',templates:{leftArrow:'&#x00AB;',rightArrow:'&#x00BB;'}};var locale_opts=$.fn.datepicker.locale_opts=['format','rtl','weekStart'];$.fn.datepicker.Constructor=Datepicker;var dates=$.fn.datepicker.dates={en:{days:["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],daysShort:["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],daysMin:["Su","Mo","Tu","We","Th","Fr","Sa"],months:["January","February","March","April","May","June","July","August","September","October","November","December"],monthsShort:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],today:"Today",clear:"Clear",titleFormat:"MM yyyy"}};var DPGlobal={viewModes:[{names:['days','month'],clsName:'days',e:'changeMonth'},{names:['months','year'],clsName:'months',e:'changeYear',navStep:1},{names:['years','decade'],clsName:'years',e:'changeDecade',navStep:10},{names:['decades','century'],clsName:'decades',e:'changeCentury',navStep:100},{names:['centuries','millennium'],clsName:'centuries',e:'changeMillennium',navStep:1000}],validParts:/dd?|DD?|mm?|MM?|yy(?:yy)?/g,nonpunctuation:/[^ -\/:-@\u5e74\u6708\u65e5\[-`{-~\t\n\r]+/g,parseFormat:function(format){if(typeof format.toValue==='function'&&typeof format.toDisplay==='function')
return format;var separators=format.replace(this.validParts,'\0').split('\0'),parts=format.match(this.validParts);if(!separators||!separators.length||!parts||parts.length===0){throw new Error("Invalid date format.");}
return{separators:separators,parts:parts};},parseDate:function(date,format,language,assumeNearby){if(!date)
return undefined;if(date instanceof Date)
return date;if(typeof format==='string')
format=DPGlobal.parseFormat(format);if(format.toValue)
return format.toValue(date,format,language);var fn_map={d:'moveDay',m:'moveMonth',w:'moveWeek',y:'moveYear'},dateAliases={yesterday:'-1d',today:'+0d',tomorrow:'+1d'},parts,part,dir,i,fn;if(date in dateAliases){date=dateAliases[date];}
if(/^[\-+]\d+[dmwy]([\s,]+[\-+]\d+[dmwy])*$/i.test(date)){parts=date.match(/([\-+]\d+)([dmwy])/gi);date=new Date();for(i=0;i<parts.length;i++){part=parts[i].match(/([\-+]\d+)([dmwy])/i);dir=Number(part[1]);fn=fn_map[part[2].toLowerCase()];date=Datepicker.prototype[fn](date,dir);}
return Datepicker.prototype._zero_utc_time(date);}
parts=date&&date.match(this.nonpunctuation)||[];function applyNearbyYear(year,threshold){if(threshold===true)
threshold=10;if(year<100){year+=2000;if(year>((new Date()).getFullYear()+threshold)){year-=100;}}
return year;}
var parsed={},setters_order=['yyyy','yy','M','MM','m','mm','d','dd'],setters_map={yyyy:function(d,v){return d.setUTCFullYear(assumeNearby?applyNearbyYear(v,assumeNearby):v);},m:function(d,v){if(isNaN(d))
return d;v-=1;while(v<0)v+=12;v%=12;d.setUTCMonth(v);while(d.getUTCMonth()!==v)
d.setUTCDate(d.getUTCDate()-1);return d;},d:function(d,v){return d.setUTCDate(v);}},val,filtered;setters_map['yy']=setters_map['yyyy'];setters_map['M']=setters_map['MM']=setters_map['mm']=setters_map['m'];setters_map['dd']=setters_map['d'];date=UTCToday();var fparts=format.parts.slice();if(parts.length!==fparts.length){fparts=$(fparts).filter(function(i,p){return $.inArray(p,setters_order)!==-1;}).toArray();}
function match_part(){var m=this.slice(0,parts[i].length),p=parts[i].slice(0,m.length);return m.toLowerCase()===p.toLowerCase();}
if(parts.length===fparts.length){var cnt;for(i=0,cnt=fparts.length;i<cnt;i++){val=parseInt(parts[i],10);part=fparts[i];if(isNaN(val)){switch(part){case 'MM':filtered=$(dates[language].months).filter(match_part);val=$.inArray(filtered[0],dates[language].months)+1;break;case 'M':filtered=$(dates[language].monthsShort).filter(match_part);val=$.inArray(filtered[0],dates[language].monthsShort)+1;break;}}
parsed[part]=val;}
var _date,s;for(i=0;i<setters_order.length;i++){s=setters_order[i];if(s in parsed&&!isNaN(parsed[s])){_date=new Date(date);setters_map[s](_date,parsed[s]);if(!isNaN(_date))
date=_date;}}}
return date;},formatDate:function(date,format,language){if(!date)
return '';if(typeof format==='string')
format=DPGlobal.parseFormat(format);if(format.toDisplay)
return format.toDisplay(date,format,language);var val={d:date.getUTCDate(),D:dates[language].daysShort[date.getUTCDay()],DD:dates[language].days[date.getUTCDay()],m:date.getUTCMonth()+1,M:dates[language].monthsShort[date.getUTCMonth()],MM:dates[language].months[date.getUTCMonth()],yy:date.getUTCFullYear().toString().substring(2),yyyy:date.getUTCFullYear()};val.dd=(val.d<10?'0':'')+val.d;val.mm=(val.m<10?'0':'')+val.m;date=[];var seps=$.extend([],format.separators);for(var i=0,cnt=format.parts.length;i<=cnt;i++){if(seps.length)
date.push(seps.shift());date.push(val[format.parts[i]]);}
return date.join('');},headTemplate:'<thead>'+
'<tr>'+
'<th colspan="7" class="datepicker-title"></th>'+
'</tr>'+
'<tr>'+
'<th class="prev">&laquo;</th>'+
'<th colspan="5" class="datepicker-switch"></th>'+
'<th class="next">&raquo;</th>'+
'</tr>'+
'</thead>',contTemplate:'<tbody><tr><td colspan="7"></td></tr></tbody>',footTemplate:'<tfoot>'+
'<tr>'+
'<th colspan="7" class="today"></th>'+
'</tr>'+
'<tr>'+
'<th colspan="7" class="clear"></th>'+
'</tr>'+
'</tfoot>'};DPGlobal.template='<div class="datepicker">'+
'<div class="datepicker-days">'+
'<table class="table-condensed">'+
DPGlobal.headTemplate+
'<tbody></tbody>'+
DPGlobal.footTemplate+
'</table>'+
'</div>'+
'<div class="datepicker-months">'+
'<table class="table-condensed">'+
DPGlobal.headTemplate+
DPGlobal.contTemplate+
DPGlobal.footTemplate+
'</table>'+
'</div>'+
'<div class="datepicker-years">'+
'<table class="table-condensed">'+
DPGlobal.headTemplate+
DPGlobal.contTemplate+
DPGlobal.footTemplate+
'</table>'+
'</div>'+
'<div class="datepicker-decades">'+
'<table class="table-condensed">'+
DPGlobal.headTemplate+
DPGlobal.contTemplate+
DPGlobal.footTemplate+
'</table>'+
'</div>'+
'<div class="datepicker-centuries">'+
'<table class="table-condensed">'+
DPGlobal.headTemplate+
DPGlobal.contTemplate+
DPGlobal.footTemplate+
'</table>'+
'</div>'+
'</div>';$.fn.datepicker.DPGlobal=DPGlobal;$.fn.datepicker.noConflict=function(){$.fn.datepicker=old;return this;};$.fn.datepicker.version='1.7.0-dev';$.fn.datepicker.deprecated=function(msg){var console=window.console;if(console&&console.warn){console.warn('DEPRECATED: '+msg);}};$(document).on('focus.datepicker.data-api click.datepicker.data-api','[data-provide="datepicker"]',function(e){var $this=$(this);if($this.data('datepicker'))
return;e.preventDefault();datepickerPlugin.call($this,'show');});$(function(){datepickerPlugin.call($('[data-provide="datepicker-inline"]'));});}));;/*!
=========================================================
* Now UI Kit - v1.2.0
=========================================================
* Product Page: https://www.creative-tim.com/product/now-ui-kit
* Copyright 2018 Creative Tim (http://www.creative-tim.com)
* Designed by www.invisionapp.com Coded by www.creative-tim.com
=========================================================
* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/var transparent=true;var big_image;var transparentDemo=true;var fixedTop=false;var navbar_initialized,backgroundOrange=false,toggle_initialized=false;var nowuiKit,$navbar,scroll_distance,oVal;$(document).ready(function(){$('[data-toggle="tooltip"], [rel="tooltip"]').tooltip();$('[data-toggle="popover"]').each(function(){color_class=$(this).data("color");$(this).popover({template:'<div class="popover popover-'+
color_class+
'" role="tooltip"><div class="arrow"></div><h3 class="popover-header"></h3><div class="popover-body"></div></div>'});});nowuiKit.initNavbarImage();$navbar=$(".navbar[color-on-scroll]");scroll_distance=$navbar.attr("color-on-scroll")||500;if($(".navbar[color-on-scroll]").length!=0){nowuiKit.checkScrollForTransparentNavbar();$(window).on("scroll",nowuiKit.checkScrollForTransparentNavbar);}
$(".form-control").on("focus",function(){$(this).parent(".input-group").addClass("input-group-focus");}).on("blur",function(){$(this).parent(".input-group").removeClass("input-group-focus");});$(".bootstrap-switch").each(function(){$this=$(this);data_on_label=$this.data("on-label")||"";data_off_label=$this.data("off-label")||"";$this.bootstrapSwitch({onText:data_on_label,offText:data_off_label});});big_image=$('.page-header-image[data-parallax="true"]');$(window).on("scroll",nowuiKit.checkScrollForParallax);$(".carousel").carousel({interval:4000});$(".date-picker").each(function(){$(this).datepicker({templates:{leftArrow:'<i class="now-ui-icons arrows-1_minimal-left"></i>',rightArrow:'<i class="now-ui-icons arrows-1_minimal-right"></i>'}}).on("show",function(){$(".datepicker").addClass("open");datepicker_color=$(this).data("datepicker-color");if(datepicker_color.length!=0){$(".datepicker").addClass("datepicker-"+datepicker_color+"");}}).on("hide",function(){$(".datepicker").removeClass("open");});});$(".map").each(function(){if($(this).data("address")){var address=$(this).data("address");var geocoder=new google.maps.Geocoder();var root=$(this)[0];geocoder.geocode({address:$(this).data("address")},function(res,sta){if(sta==google.maps.GeocoderStatus.OK){if(sta!=google.maps.GeocoderStatus.ZERO_RESULTS){var map=new google.maps.Map(root,{zoom:16,center:res[0].geometry.location,mapTypeId:google.maps.MapTypeId.ROADMAP,mapTypeControl:false,streetViewControl:false});var marker=new google.maps.Marker({position:res[0].geometry.location,map:map,title:address});}else{alert("No result");}}else{alert("Not ok");}});}});});function debounce(func,wait,immediate){var timeout;return function(){var context=this,args=arguments;clearTimeout(timeout);timeout=setTimeout(function(){timeout=null;if(!immediate)func.apply(context,args);},wait);if(immediate&&!timeout)func.apply(context,args);};}
$(window).on("resize",function(){nowuiKit.initNavbarImage();});$(document).on("click",".navbar-toggler",function(){$toggle=$(this);if(nowuiKit.misc.navbar_menu_visible==1){$("html").removeClass("nav-open");nowuiKit.misc.navbar_menu_visible=0;$("#bodyClick").remove();setTimeout(function(){$toggle.removeClass("toggled");},550);}else{setTimeout(function(){$toggle.addClass("toggled");},580);div='<div id="bodyClick"></div>';$(div).appendTo("body").click(function(){$("html").removeClass("nav-open");nowuiKit.misc.navbar_menu_visible=0;setTimeout(function(){$toggle.removeClass("toggled");$("#bodyClick").remove();},550);});$("html").addClass("nav-open");nowuiKit.misc.navbar_menu_visible=1;}});nowuiKit={misc:{navbar_menu_visible:0},checkScrollForTransparentNavbar:debounce(function(){if($(document).scrollTop()>scroll_distance){if(transparent){transparent=false;$(".navbar[color-on-scroll]").removeClass("navbar-transparent");}}else{if(!transparent){transparent=true;$(".navbar[color-on-scroll]").addClass("navbar-transparent");}}},17),checkScrollForParallax:debounce(function(){var current_scroll=$(this).scrollTop();oVal=$(window).scrollTop()/3;big_image.css({transform:"translate3d(0,"+oVal+"px,0)","-webkit-transform":"translate3d(0,"+oVal+"px,0)","-ms-transform":"translate3d(0,"+oVal+"px,0)","-o-transform":"translate3d(0,"+oVal+"px,0)"});},10),initNavbarImage:function(){var $navbar=$(".navbar").find(".navbar-translate").siblings(".navbar-collapse");var background_image=$navbar.data("nav-image");if(background_image!=undefined){if($(window).width()<991||$("body").hasClass("burger-menu")){$navbar.css("background","url('"+background_image+"')").removeAttr("data-nav-image").css("background-size","cover").addClass("has-image");}else{$navbar.css("background","").attr("data-nav-image",""+background_image+"").css("background-size","").removeClass("has-image");}}},initSliders:function(){var slider=document.getElementById("sliderRegular");noUiSlider.create(slider,{start:40,connect:[true,false],range:{min:0,max:100}});var slider2=document.getElementById("sliderDouble");noUiSlider.create(slider2,{start:[20,60],connect:true,range:{min:0,max:100}});}};;var recaptchaKey="6LdH4HIUAAAAAFZ00mElSOG_9IuLWKBnrPQY3Gfp";var applicationId="sq0idp-Dci8dLeU0ozmVGlnwq2RVA";var locationId="6J17D3TNR87DJ";var server="https://sls.omahasymphonicchorus.org";$(document).ready(function(){grecaptcha.ready(function(){grecaptcha.execute(recaptchaKey,{action:"homepage",});});$(".datepicker-inline *").click(function(e){e.preventDefault();e.stopPropagation();});});function smoothScroll(node,e){$("html").removeClass("nav-open");nowuiKit.misc.navbar_menu_visible=0;setTimeout(function(){$toggle.removeClass("toggled");$("#bodyClick").remove();},550);$("html, body").animate({scrollTop:$($(node).data("target")).offset().top,},1000);}
function smoothFade(nodeOut,nodeIn){$(nodeOut).fadeOut();$(nodeIn).fadeIn();}
function submitContactForm(form,event){event.preventDefault();grecaptcha.execute(recaptchaKey,{action:"submit"}).then(function(token){$("#g-recaptcha-response").val(token);const formData={};const formElements=Array.from(form);formElements.map((input)=>(formData[input.name]=input.value));var submitButton=$(form).find("button[type=submit]").first();var origSubmitText=$(submitButton).html();$(submitButton).prop("disabled",true);$(submitButton).html('Sending... <i class="now-ui-icons loader_refresh spin"></i>');$(form).find("input[type=text], textarea").prop("disabled",true);$.post(server+"/contact",JSON.stringify(formData)).done(function(){$("#submit-fail").remove();$(form).find("input[type=text], textarea").val("");$(form).find("button[type=submit]").before('<div id="submit-success" class="form-text text-success">Your message has been sent.</div>');setTimeout(function(){$("#submit-success").remove();},5000);}).fail(function(err){console.log(err);$(form).find("button[type=submit]").before('<div id="submit-fail" class="form-text text-danger">Message submission failed: '+
err.responseJSON.message+
"</div>");}).always(function(data){console.log(data);$(submitButton).prop("disabled",false);$(submitButton).html(origSubmitText);$(form).find("input[type=text], textarea").prop("disabled",false);});});}
function requestCardNonce(event){event.preventDefault();$(".donation-processing>.success").hide();$(".donation-processing>.failure").hide();$(".donation-processing>.processing").hide();$(".donation-processing").show();$(".donation-processing>.processing").fadeIn();paymentForm.requestCardNonce();}
var paymentForm=new SqPaymentForm({applicationId:applicationId,locationId:locationId,inputClass:"sq-input",inputStyles:[{backgroundColor:"transparent",boxShadow:"none",color:"#2c2c2c",fontFamily:"Helvetica Neue, Arial, sans-serif",fontWeight:"300",fontSize:".8571em",lineHeight:"normal",padding:"10px 18px",},],applePay:{elementId:"sq-apple-pay",},googlePay:{elementId:"sq-google-pay",},masterpass:{elementId:"sq-masterpass",},cardNumber:{elementId:"sq-card-number",placeholder:"•••• •••• •••• ••••",},cvv:{elementId:"sq-cvv",placeholder:"CVV",},expirationDate:{elementId:"sq-expiration-date",placeholder:"MM/YY",},postalCode:{elementId:"sq-postal-code",},callbacks:{methodsSupported:function(methods){var applePayBtn=document.getElementById("sq-apple-pay");var applePayLabel=document.getElementById("sq-apple-pay-label");var googlePayBtn=document.getElementById("sq-google-pay");var googlePayLabel=document.getElementById("sq-google-pay-label");var masterpassBtn=document.getElementById("sq-masterpass");var masterpassLabel=document.getElementById("sq-masterpass-label");if(methods.applePay===true){$("#payment-type-tabs").append('<li class="nav-item"><a class="nav-link" id="donate-ap-tab" data-toggle="tab" href="#donate-ap">Apple Pay</a></li>');applePayBtn.style.display="inline-block";}
if(methods.googlePay===true){$("#payment-type-tabs").append('<li class="nav-item"><a class="nav-link" id="donate-gp-tab" data-toggle="tab" href="#donate-gp">Google Pay</a></li>');googlePayBtn.style.display="inline-block";}
if(methods.masterpass===true){$("#payment-type-tabs").append('<li class="nav-item"><a class="nav-link" id="donate-mp-tap" data-toggle="tab" href="#donate-mp">MasterPass</a></li>');masterpassBtn.style.display="inline-block";}},createPaymentRequest:function(){$(".donation-processing>.success").hide();$(".donation-processing>.failure").hide();$(".donation-processing>.processing").hide();$(".donation-processing").show();$(".donation-processing>.processing").fadeIn();return{requestShippingAddress:false,requestBillingInfo:true,countryCode:"US",currencyCode:"USD",lineItems:[{label:"Donation",amount:$('#donation-amount input[name="amount"]').val(),pending:false,},],total:{label:"Omaha Symphonic Chorus",amount:$('#donation-amount input[name="amount"]').val(),pending:false,},};},validateShippingContact:function(contact){var validationErrorObj;return validationErrorObj;},cardNonceResponseReceived:function(errors,nonce,cardData,billingContact,shippingContact){console.log(cardData);console.log(billingContact);console.log(shippingContact);if(errors){$(".donation-processing>.failure>.message").html(errors.map(function(error){return error.message+"<br/>";}));smoothFade($(".donation-processing>.processing"),$(".donation-processing>.failure"));return;}
var donationData={amount:$("#donation-amount-field").val(),nonce:nonce,name:$("#donation-name").val(),street:$("#donation-address").val(),city:$("#donation-city").val(),state:$("#donation-state").val(),zip:cardData.billing_postal_code,email:$("#donation-email").val(),phone:$("#donation-phone").val(),note:$("#donation-note").val(),};if(!cardData.billing_postal_code){donationData.zip=billingContact.postalCode;}else{donationData.zip=cardData.billing_postal_code;}
errs=[];if(!validator.isCurrency(donationData.amount)){errs.push("Invalid donation amount.");}
if(validator.isEmpty(donationData.name)){errs.push("Please enter a name.");}
if(validator.isEmpty(donationData.street)){errs.push("Please enter a billing street address.");}
if(validator.isEmpty(donationData.city)){errs.push("Please enter a valid billing city.");}
if(validator.isEmpty(donationData.state)){errs.push("Please enter a valid billing state.");}
if(!donationData.zip||!validator.isPostalCode(donationData.zip,"US")){errs.push("Please enter a valid billing zip code.");}
if(!validator.isEmail(donationData.email)){errs.push("Please enter a valid email address.");}
if(errs.length){$(".donation-processing>.failure>.message").html(errs.map(function(error){return error+"<br/>";}));smoothFade($(".donation-processing>.processing"),$(".donation-processing>.failure"));return;}
$.post(server+"/process-donation",JSON.stringify(donationData)).done(function(){$("#donation-amount-field").val(50);$("#donation-name").val("");$("#donation-address").val("");$("#donation-city").val("");$("#donation-state").val("");$("#donation-email").val("");$("#donation-phone").val("");$("#donation-note").val("");smoothFade($(".donation-processing>.processing"),$(".donation-processing>.success"));setTimeout(function(){$(".donation-processing").hide();$("#donation-form").modal("hide");$("#donation-form").on("hidden.bs.modal",function(){$(".donation-processing").hide();});},5000);}).fail(function(err){const serverError=JSON.parse(err.responseJSON.response.text);$(".donation-processing>.failure>.message").html(serverError.errors.map(function(error){return error.detail+"<br/>";}));smoothFade($(".donation-processing>.processing"),$(".donation-processing>.failure"));}).always(function(data){});},unsupportedBrowserDetected:function(){},inputEventReceived:function(inputEvent){switch(inputEvent.eventType){case "focusClassAdded":break;case "focusClassRemoved":break;case "errorClassAdded":break;case "errorClassRemoved":break;case "cardBrandChanged":break;case "postalCodeChanged":break;}},paymentFormLoaded:function(){},},});$("#donation-form").on("hidden.bs.modal",function(e){paymentForm.recalculateSize();});$('input[type="radio"][name="amount-btn"]').on("change",function(e){if(e.target.value==="other"){$('#donation-amount input[name="amount"]').val("");$('#donation-amount, #donation-amount input[name="amount"]').attr("disabled",false);}else{$('#donation-amount input[name="amount"]').val(e.target.value);$('#donation-amount, #donation-amount input[name="amount"]').attr("disabled",true);}});$("#dismiss-donation-failure").click(function(){$(".donation-processing>.failure").hide();$(".donation-processing").hide();});