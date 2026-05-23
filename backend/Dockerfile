FROM php:8.4-fpm

# Install system dependencies
RUN apt-get update && apt-get install -y \
    git \
    curl \
    libpng-dev \
    libonig-dev \
    libxml2-dev \
    libzip-dev \
    zip \
    unzip \
    netcat-openbsd \
    && docker-php-ext-install pdo_mysql mbstring exif pcntl bcmath zip

# Install Redis extension
RUN pecl install redis && docker-php-ext-enable redis

# Install Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

WORKDIR /var/www/html

# Copy all files
COPY . .

# Create .env file if not exists
RUN if [ ! -f .env ]; then cp .env.example .env 2>/dev/null || echo 'APP_KEY=base64:Gy8p4UeIxJERMXq0jqvQNOMplgVhAQREm4YPXWLdfD0=' > .env; fi

# Install dependencies
RUN composer install --ignore-platform-req=ext-redis --no-interaction --no-progress

# Generate key if needed
RUN php artisan key:generate --force || true

# Set permissions
RUN chown -R www-data:www-data /var/www/html/storage /var/www/html/bootstrap/cache /var/www/html/.env
RUN chmod -R 775 /var/www/html/storage /var/www/html/bootstrap/cache
RUN chmod 664 /var/www/html/.env

EXPOSE 8000

CMD ["php", "artisan", "serve", "--host=0.0.0.0", "--port=8000"]
