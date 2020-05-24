#!/usr/bin/env bash

if [[ $APP_ENV == "testing" && $APP_ENV == "production" ]]; then
    composer install -q --no-ansi --no-interaction --prefer-dist --optimize-autoloader
fi
