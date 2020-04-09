#!/usr/bin/env bash

if [[ $APP_ENV == "production" ]]; then
    composer install --optimize-autoloader --no-dev
else
    composer install
fi
