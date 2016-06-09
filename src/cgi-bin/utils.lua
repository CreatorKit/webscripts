#!/webscripts/cgi-bin/cgilua.cgi

require("uci")

utils = {}

-- Remove leading and trailing whitespace from string.
function utils.trim(s)
	return s:match "^%s*(.-)%s*$"
end

-- Encode string. Format is `%´ followed by the character ASCII code in two digit hexadecimal. Characters encoded - "%", " " and "="(delimiter) and control characters.
function utils.encode (s)
	if (s) then
		s = string.gsub(s, "([=%%%c ])", function (c)
            return string.format("%%%02X", string.byte(c))
        end)
	end
	return s
end

-- Decode string.
function utils.decode (s)
	if (s) then
		s = string.gsub(s, "%%(%x%x)", function (h)
            return string.char(tonumber(h, 16))
        end)
	end
	return s
end


-- Check if a string represents an ip address
function utils.isIpAddress (ip)
	if ip == "" then return false end

	local a,b,c,d = string.match( ip, "^(%d%d?%d?)%.(%d%d?%d?)%.(%d%d?%d?)%.(%d%d?%d?)$" )

	a = tonumber(a)
	b = tonumber(b)
	c = tonumber(c)
	d = tonumber(d)

	if not a or not b or not c or not d then return false end

	if a < 0 or 255 < a then return false end
	if b < 0 or 255 < b then return false end
	if c < 0 or 255 < c then return false end
	if d < 0 or 255 < d then return false end

	return true
end

-- Encode a string in JSON format
function utils.JSON_encode (s)
	if (s) then
		s = string.gsub(s, "([\\/\"%c ])", function (c)
		return string.format("\\u00%02X", string.byte(c))
	end)
	end
	return s
end

function utils.string_parse(s)
	local data = {}
	local token
	local i = 1
	if (s) then
		for token in string.gmatch(s, "([^ ]+)") do
			data[i] = utils.decode(utils.trim(token))
			i = i + 1
		end
		return unpack(data)
	else
		return nil
	end
end

function utils.html_encode(s)
	local encode =
	{
		["&"] = "&amp;",
		["<"] = "&lt;",
		[">"] = "&gt;",
		["\""] = "&quot;",
		["\'"] = "&apos;",
	}
	if (s) then
		s = string.gsub(s, "[&<>\"\']", encode)
	end
	return s
end

function utils.lowercase(s)
	if (s) then
		s = string.lower(s)
	end
	return s
end

function utils.isHex(s)
	return (s:find("^[0-9A-Fa-f]+$") ~= nil)
end

-- Check if decrypted password is valid
function utils.isValidPasswd(key, encType)
	if (encType == "open") then
		 return true
        end
	local keyLength = string.len(key)
	if (encType ==  "WEP") then
		if (keyLength == 5 or keyLength == 13 or keyLength == 16 or keyLength == 29) then
			return true
		elseif ((keyLength == 10 or keyLength == 26 or keyLength == 32 or keyLength == 58) and (utils.isHex(key))) then
			return true
		end
	elseif (encType == "WPA2" or encType == "WPA" or encType == "WPA/WPA2") then
		if ((keyLength >= 8 and keyLength <= 63) or (keyLength == 64 and utils.isHex(key))) then
			return true
		end
	end

	return false
end

-- Check if encryption type is valid
function utils.isValidEncType(encType)
	if (encType == "open" or  encType == "WEP" or encType == "WPA" or encType == "WPA2" or encType == "WPA/WPA2") then
		return true
	end

	return false
end

-- Check if ssid is valid
function utils.isValidSsid(ssid)
	if (ssid == nil or ssid == "" or (string.len(ssid) > 32) ) then
		return false
	end

	return true
end

-- Check if output is requested in json format
function utils.check_output_format()
	if (utils.lowercase(cgilua.QUERY.output) == "json") then
		return true
	else
		cgilua.print("UNSUPPORTED_REQUEST")
		return false
	end
end

-- Convert string to boolean
function utils.string_to_boolean(value)
	if value == "true" then
		return true
	elseif value == "false" then
		return false
	else
		assert(nil)
	end
end

-- Check if string contains valid boolean value
function utils.isValidBooleanString(value)
	if value == "true" or value == "false" then
		return true
	else
		return false
	end
end

function utils.IN(needle,haystack)
	for k,v in pairs(haystack) do
		if (v == needle) then
			return true
		end
	end
	return false
end

-- Check if data(needle) is present in table(haystack)
function utils.assert_in(needle,haystack)
	assert(type(haystack) == "table")
	assert(utils.IN(needle,haystack) == true)
end

-- Gives count of elements in the table tab
function utils.table_length(tab)
	local count = 0
	for k,v in pairs(tab) do
		count = count + 1
	end
	return count
end

function utils.map_enc_to_uci_type(enc_type)
        local table = {
                ["open"] = "none",
                ["WEP"] = "wep",
                ["WPA"] = "psk",
                ["WPA2"] = "psk2",
                ["WPA/WPA2"] = "mixed-psk"
        }
        return table[enc_type]
end

function utils.map_enc_from_uci_type(enc_type)
        local table = {
                ["none"] = "open",
                ["wep"] = "WEP",
                ["psk"] = "WPA",
                ["psk2"] = "WPA2",
                ["mixed-psk"] = "WPA/WPA2"
        }
        return table[enc_type]
end

function utils.get_uci()
	local uci_ = uci.cursor()

	path = os.getenv("UCI_CONF_PATH");
	if path ~= nil then
		uci_.set_confdir(path)
	end

	return uci_
end
