#!/usr/bin/env bash

if [[ $APP_ENV == "production" ]]; then
    yarn && yarn prod
fi
