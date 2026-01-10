#!/bin/bash
set -e

echo "🚀 Starting Laravel application..."

# Run migrations
echo "📊 Running database migrations..."
php artisan migrate --force --no-interaction

# Seed database
echo "🌱 Seeding database..."
php artisan db:seed --force --no-interaction

# Start server
echo "✅ Starting server..."
php artisan serve --host=0.0.0.0 --port=8000
