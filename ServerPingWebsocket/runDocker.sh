#!/bin/bash
docker run -dit --restart unless-stopped -p 80:3000 pigpiggcp/serverpingwebsocket:v1.nodejs