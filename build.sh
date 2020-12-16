#!/bin/bash

host_network="mynet"
network=$(docker network inspect "${host_network}" -f '{{json .Name}}'  | tr -d '"')

if [[ -z "$network" ]]; then
    echo "Must have valid docker network" 1>&2
    # create docker network
    docker network create "${host_network}"
fi

echo "docker network ${network}"

docker stop service-1 service-2 && docker rm service-1 service-2

docker build -t node-demo-service-1 service-1/
docker build -t node-demo-service-2 service-2/

docker run --name service-1 -p 3000:3000 --env-file service-1/.env-docker --net mynet -d node-demo-service-1
docker run --name service-2 -p 3001:3001 --env-file service-2/.env-docker --net mynet -d node-demo-service-2

sleep 3

curl -X GET http://127.0.0.1:3000/service-1/v1
curl -X GET http://127.0.0.1:3001/service-2/v1
curl -X GET http://127.0.0.1:3000/service-1/v1/service-2
curl -X GET http://127.0.0.1:3001/service-2/v1/service-1

echo "Done"

