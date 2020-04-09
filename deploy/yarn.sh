#!/usr/bin/env bash

yarn

if [[ $APP_ENV == "production" ]]; then
    yarn prod
fi
