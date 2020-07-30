#!/bin/bash

VERSION=v1
docker build --tag pigpiggcp/serverpingwebsocket:$VERSION.nodejs .
#docker push pigpiggcp/serverpingwebsocket:$VERSION.nodejs
