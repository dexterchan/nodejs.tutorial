#!/bin/bash
docker build --tag pigpiggcp/serverpingwebsocket:v0.nodejs .
docker push pigpiggcp/serverpingwebsocket:v0.nodejs
