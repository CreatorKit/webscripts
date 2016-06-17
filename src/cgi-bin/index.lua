require("strings_en_GB")
require("current_network")
local selected_locale = "en_GB"
local language = {}
language_data = {}
language[1] = { ["name"]="UK English", ["locale"]="en_GB" }
language[2] = { ["name"]="US English", ["locale"]="en_US" }
language[3] = { ["name"]="Français", ["locale"]="fr_FR" }
language[4] = { ["name"]="Italiano", ["locale"]="it_IT" }
language[5] = { ["name"]="Deutsch", ["locale"]="de_DE" }
language[6] = { ["name"]="Español", ["locale"]="es_ES" }

language_data["language"] = language
language_data["selected_locale"] = selected_locale
current_network_data = get_current_network()


