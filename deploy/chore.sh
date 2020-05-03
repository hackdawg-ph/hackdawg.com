#!/usr/bin/env bash

# Generate application key
echo "Generating application key..."
php artisan key:generate --force

# Run the migrations
echo "Running the migrations..."
php artisan migrate --force

# Link storage directory
echo "Linking storage direcory..."
php artisan storage:link

if [[ $APP_ENV == "production" ]]; then
    # Optimize Laravel
    php artisan config:cache
    php artisan route:cache
    php artisan view:cache
fi
