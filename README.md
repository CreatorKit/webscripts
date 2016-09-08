# Webscripts

## Overview

This package provides the web interface for onboarding and provisioning Creator Kit devices. It includes webpages as well as webservices.

 - Webpages provide a visual interface via web browsers.

 - Webservices provide an interface to request a service and get the response.

 - Webscripts use lua for scripting and cgilua for dynamic lua pages which are hosted on a webserver running on your Ci40.
Creator Kit uses the <a href="http://wiki.openwrt.org/doc/howto/http.uhttpd">uhttpd</a> webserver.

## Access to Ci40 Webpages

Connect your Ci40 to a network using Ethernet. Obtain the IP address of your Ci40 using "ifconfig" command from its serial console

Onboarding webpages can be accessed from your Ci40 by entering `<IP address>/webscripts` on a web browser which should re-direct to the following url:

    http://<Ip Address>/cgi-bin/index_wifi.lp

## WiFi Onboarding

If there is no ethernet connected, you can also use the SoftAp to onboard the device.

  - Connect to CreatorAP from your WiFi enabled device.
  - Type http://10.10.10.1/webscripts in the browser. It should redirect to http://10.10.10.1/cgi-bin/index_wifi.lp
  - Select the Wireless network from the scanned list of available networks.
  - Enter the necessary credentials such as password etc and press Save.
  - It should connect to the selected wireless network.

### Outstanding issues
  - SoftAp is always active even after connecting to WiFi network.

----

## Contributing

We welcome all contributions to this project and we give credit where it's due. Anything from enhancing functionality to improving documentation and bug reporting - it's all good.

For more details about the Contributor's guidelines, refer to the [contributor guide](https://github.com/CreatorKit/creator-docs/blob/master/ContributorGuide.md).
