#!/bin/bash

VERSION=v2
docker build --tag pigpiggcp/serverpingwebsocket:$VERSION.nodejs .
#docker push pigpiggcp/serverpingwebsocket:$VERSION.nodejs

aws ecr get-login-password --region us-west-2 | docker login --username AWS --password-stdin 192592784707.dkr.ecr.us-west-2.amazonaws.com

docker tag pigpiggcp/serverpingwebsocket:${VERSION}.nodejs 192592784707.dkr.ecr.us-west-2.amazonaws.com/marketservice:${VERSION}.nodejs
docker push 192592784707.dkr.ecr.us-west-2.amazonaws.com/marketservice:${VERSION}.nodejs
