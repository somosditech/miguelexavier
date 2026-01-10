#!/bin/bash

echo "🚀 Starting deployment..."

# Install dependencies
echo "📦 Installing dependencies..."
composer install --no-dev --optimize-autoloader

# Generate app key if not exists
if [ -z "$APP_KEY" ]; then
    echo "🔑 Generating app key..."
    php artisan key:generate --force
fi

# Run migrations
echo "🗄️ Running migrations..."
php artisan migrate --force

# Seed database
echo "🌱 Seeding database..."
php artisan db:seed --force

# Cache config
echo "⚡ Caching configuration..."
php artisan config:cache
php artisan route:cache
php artisan view:cache

echo "✅ Deployment complete!"
