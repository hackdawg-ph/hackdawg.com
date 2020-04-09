#!/usr/bin/env bash

# Generate application key
echo "Generating application key..."
php artisan key:generate --force

# Run the migrations
echo "Running the migrations..."
php artisan migrate --force
