FROM php:7.4-fpm

# Build arguments
ARG APP_ENV=local

# Environment variables
ENV TZ=Asia/Manila
ENV DIR=/var/www/html

# Change Linux timezone
RUN ln -snf /usr/share/zoneinfo/${TZ} /etc/localtime && echo ${TZ} > /etc/timezone

# Install Linux utilities
RUN apt-get update && apt-get install -y \
    build-essential \
    libonig-dev \
    libzip-dev \
    locales \
    curl \
    unzip \
    zip

RUN apt-get clean && rm -rf /var/lib/apt/lists/*

# Install PHP extensions
RUN docker-php-ext-install pdo_mysql bcmath mbstring zip exif pcntl

# Override default PHP configuration
COPY deploy/php.ini /usr/local/etc/php/conf.d/local.ini:ro

# Install Composer
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

COPY . ${DIR}
COPY deploy/chore.sh /usr/local/bin/hackdawg-chore
COPY deploy/queuer.sh /usr/local/bin/hackdawg-queuer
COPY deploy/scheduler.sh /usr/local/bin/hackdawg-scheduler

# Install PHP dependencies
RUN deploy/composer.sh

# Give proper file permissions
RUN chown -R www-data:www-data ${DIR}/storage
RUN chmod -R 775 ${DIR}/storage ${DIR}/bootstrap/cache
RUN chmod +x /usr/local/bin/hackdawg-chore
RUN chmod +x /usr/local/bin/hackdawg-queuer
RUN chmod +x /usr/local/bin/hackdawg-scheduler

# Here we go...
EXPOSE 9000
