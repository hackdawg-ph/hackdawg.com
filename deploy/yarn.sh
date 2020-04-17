#!/usr/bin/env bash

if [[ $APP_ENV == "production" ]]; then
    yarn upgrade && yarn prod
fi
