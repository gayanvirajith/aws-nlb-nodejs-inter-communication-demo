docker stop service-1 service-2 && docker rm service-1 service-2

docker build -t node-demo-service-1 service-1/
docker build -t node-demo-service-2 service-2/

docker run --name service-1 -p 3000:3000 --env-file service-1/.env-docker --net mynet -d node-demo-service-1
docker run --name service-2 -p 3001:3001 --env-file service-2/.env-docker --net mynet -d node-demo-service-2
