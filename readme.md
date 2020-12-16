# AWS ECS usage demo with NLB with node js

This repository contains two basic nodejs rest api services. 

- service-1
- service-2

## Service-1

Service-1 has two api calls

- GET http://localhost:3000/service-1/v1/
- GET http://localhost:3000/service-1/v1/service-2 (will have a intercommunication call to service-2 and display the response comes from service-2)

## Service-2

Service-2 has two api calls

- GET `http://localhost:3001/service-2/v1/`
- GET `http://localhost:3001/service-2/v1/service-1` (this will be a intercommunication call to service-1 and display the response comes from service-1)

### How to setup using docker

 - Change directory to project rool folder
 - Create `.env-docker` under service-1/ and put below contents
```
APP_PORT=3000
EXTERNAL_SERVICE_BASE_URL=http://service-2:3001
```
 - Execute `build.sh` from your terminal. eg: `./build.sh`
 - Create `.env-docker` under service-2/ and put below contents`
```
APP_PORT=3001
EXTERNAL_SERVICE_BASE_URL=http://service-1:3000
```
 - Execute `Docker container ls` to see the docker containers. 
 - Execute below curl calls to to see if everything works fine

Basic calla

```
curl -X GET http://127.0.0.1:3000/service-1/v1
```

```
curl -X GET http://127.0.0.1:3001/service-2/v1
```

Intercommunication call fromn service-1 to service-2

```
curl -X GET http://localhost:3000/service-1/v1/service-2
```

```
curl -X GET http://localhost:3001/service-2/v1/service-1
```

