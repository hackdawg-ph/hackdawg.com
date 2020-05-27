#!/usr/bin/env bash

echo "Generating application key..."
php artisan key:generate --force

echo "Linking storage directory..."
rm -rf public/storage && php artisan storage:link

if [[ $APP_ENV != "testing" ]]; then
    echo "Running the migrations..."
    php artisan migrate --force
fi

if [[ $APP_ENV == "production" ]]; then
    # Optimize Laravel
    php artisan config:cache
    php artisan route:cache
    php artisan view:cache
fi
