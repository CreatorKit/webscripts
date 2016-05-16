# Project Properties
####################
CMAKE_MINIMUM_REQUIRED (VERSION 2.6.2)

PROJECT(webscripts)

SET(webscripts_VERSION_MAJOR 0)
SET(webscripts_VERSION_MINOR 9)
SET(webscripts_VERSION_PATCH 0)
SET(webscripts_VERSION
    ${webscripts_VERSION_MAJOR}.${webscripts_VERSION_MINOR}.${webscripts_VERSION_PATCH})

# Options
###################
SET(CMAKE_VERBOSE_MAKEFILE 1)
SET(CMAKE_BUILD_TYPE DEBUG)

# Paths
########
ADD_SUBDIRECTORY(src)
ADD_SUBDIRECTORY(data)
