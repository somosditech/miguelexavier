# Railway Build Script
echo "🚀 Starting Railway deployment..."

# Generate app key if not exists
if [ -z "$APP_KEY" ]; then
    echo "🔑 Generating app key..."
    php artisan key:generate --force --no-interaction
fi

# Run migrations
echo "🗄️ Running migrations..."
php artisan migrate --force --no-interaction

# Seed database
echo "🌱 Seeding database..."
php artisan db:seed --force --no-interaction

echo "✅ Build complete!"
