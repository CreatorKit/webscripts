require("io")
require("os")
require("string")
require("utils")

local function split(str, pat)
	local split_str = {}
	local find_pat = "(.-)" .. pat
	local last_end = 1
	local start_pos, end_pos, capture = str:find(find_pat, 1)
	while start_pos do
		if start_pos ~= 1 or capture ~= "" then
			table.insert(split_str, capture)
		end
		last_end = end_pos + 1
		start_pos, end_pos, capture = str:find(find_pat, last_end)
	end
	if last_end <= #str then
		capture = str:sub(last_end)
		table.insert(split_str, capture)
	end
	return split_str
end

local function parse(res)
	local ap = {}
	ap.ssid = res:match("SSID: (.-)\n")
	if not res:find("Privacy") then
		ap.enc = "open"
	else
		local wpa = res:find("WPA")
		local rsn = res:find("RSN")
		if wpa and rsn then
			ap.enc = "WPA/WPA2"
		elseif rsn then
			ap.enc = "WPA2"
		elseif wpa then
			ap.enc = "WPA"
		else
			ap.enc = "WEP"
		end
	end
	return ap
end

function get_scanlist()
	local scan_list = {}
	local handle = io.popen("iw dev")
	local output = handle:read("*a")
	handle:close()
	-- currently, a maximum of 2 virtual interfaces are supported
	local num_allowed_interfaces = 2
	local iface_list = split(output, "Interface ")
	-- remove the unecessary data before the interfaces
	table.remove(iface_list, 1)

	for i = 1, #iface_list do
		local mode = iface_list[i]:match("type (.-)\n")
		if mode == "managed" then
			local iface = utils.trim(iface_list[i]:match("(.-)ifindex"))
			scan_list = scan(iface)
			break
		end
	end
	if #scan_list == 0 and #iface_list < num_allowed_interfaces then
		os.execute("iw phy phy0 interface add scan0 type managed >/dev/null 2>&1")
		os.execute("ifconfig scan0 up >/dev/null 2>&1")
		scan_list = scan("scan0")
		os.execute("iw dev scan0 del >/dev/null 2>&1")
	end
	return scan_list
end

function scan(iface)
	cmd = "iw " .. iface .. " scan"
	local handle = io.popen(cmd)
	local output = handle:read("*a")
	handle:close()
	local res = split(output, "\nBSS ")
	local ap_list = {}
	for i = 1, #res do
		ap_list[i] = {}
		ap_list[i] = parse(res[i])
        end
	return ap_list
end
