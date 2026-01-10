#!/usr/bin/env bash
# Render Start Script

echo "🚀 Starting Laravel server..."
php artisan serve --host=0.0.0.0 --port=$PORT
