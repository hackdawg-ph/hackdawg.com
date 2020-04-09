#!/usr/bin/env bash

if [[ $APP_ENV == "production" ]]; then
    composer install -q --no-ansi --no-interaction --no-scripts --no-suggest --no-progress --prefer-dist --optimize-autoloader --no-dev
fi
