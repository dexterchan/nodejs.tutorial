#!/bin/bash
docker run -dit --restart unless-stopped --log-driver=awslogs --log-opt awslogs-group=docker-logs -p 80:3000 pigpiggcp/serverpingwebsocket:v0.nodejs