#!/bin/sh
#node client/serverpingclient.js --protocol=wss --hostname=treequery.org --port=443
arg=""
for var in "$@"
do
    arg="$arg $var"
done

node client/mktdataclient_stomp.treequery.js $arg