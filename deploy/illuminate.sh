#!/usr/bin/env bash

if [[ $APP_ENV == "local" ]]; then
	docker-compose -f deploy/docker-compose.yml -f deploy/docker-compose.local.yml up
fi

if [[ $APP_ENV == "testing" ]]; then
    docker-compose -f deploy/docker-compose.yml -f deploy/docker-compose.testing.yml up -d --build --force-recreate
fi

if [[ $APP_ENV == "production" ]]; then
	docker-compose -f deploy/docker-compose.yml -f deploy/docker-compose.production.yml up -d --build --force-recreate
fi
