#!/bin/bash

docker rmi -f dog
docker rm -f dogapp
npm --prefix client run build
docker build -t dog .
docker run -d --name dogapp -p 5000:5000 dog
