#!/bin/bash

# Aguardar o Redis estar disponível
echo "Aguardando Redis..."
while ! nc -z redis 6379 2>/dev/null; do
    sleep 1
done
echo "Redis disponível!"

# Aguardar o MySQL estar disponível
echo "Aguardando MySQL..."
while ! nc -z mysql 3306 2>/dev/null; do
    sleep 1
done
echo "MySQL disponível!"

# Limpar cache do Laravel
php artisan config:clear
php artisan cache:clear

# Executar o comando original
exec "$@"
