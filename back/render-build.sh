#!/usr/bin/env bash
# Render Build Script

echo "🚀 Starting Render build..."

# Install dependencies
composer install --no-dev --optimize-autoloader --no-interaction

# Generate app key if not exists
php artisan key:generate --force --no-interaction

# Run migrations
php artisan migrate --force --no-interaction

# Seed database
php artisan db:seed --force --no-interaction

# Cache config
php artisan config:cache
php artisan route:cache

echo "✅ Build complete!"
