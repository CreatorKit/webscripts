# Webscripts

## Overview

This package provides the web interface for provisioning Creator Kit devices. It includes webpages as well as webservices.

 - Webpages provide a visual interface via web browsers.

 - Webservices provide an interface to request a service and get the response.

 - Webscripts use lua for scripting and cgilua for dynamic lua pages which are hosted on a webserver running on your Ci40.
Creator Kit uses the <a href="http://wiki.openwrt.org/doc/howto/http.uhttpd">uhttpd</a> webserver.

## Revision History
| Revision  | Changes from previous revision |
| :----     | :------------------------------|
| 0.9.0     | External Beta Trial Release    | 

## Access to Ci40 Webpages

Connect your Ci40 to a network using Ethernet. Obtain the IP address of your Ci40 using "ifconfig" command from its serial console

Provisioning webpages can be accessed from your Ci40 by entering its IP address on a web browser which should re-direct to the following url:
```
http://<Ip Address>/cgi-bin/index.lp
```
