#!/bin/bash

echo "🚀 Iniciando Task System..."

# Subir containers
docker compose up -d

sleep 5

# Configurar
docker exec -it task_backend php artisan key:generate --force
docker exec -it task_backend php artisan migrate --force
docker exec -it task_backend php artisan config:clear

# Parar workers antigos
docker exec -it task_backend php artisan queue:restart
docker exec -it task_backend pkill -f queue:work 2>/dev/null

# Iniciar workers com paralelismo (3 workers por fila)
echo "🔄 Iniciando workers paralelos..."

# Worker HIGH com múltiplos processos
for i in {1..3}; do
    docker exec -d task_backend php artisan queue:work redis \
        --queue=high \
        --tries=3 \
        --sleep=1 \
        --max-jobs=10 \
        --timeout=30 &
done

# Worker DEFAULT com múltiplos processos
for i in {1..2}; do
    docker exec -d task_backend php artisan queue:work redis \
        --queue=default \
        --tries=3 \
        --sleep=1 \
        --max-jobs=10 \
        --timeout=30 &
done

echo "✅ Sistema pronto!"
echo "📱 Frontend: http://localhost:3000"
echo "🔙 API: http://localhost:8000/api/tasks"
echo ""
echo "⚙️ Workers rodando:"
echo "   - 3 workers para fila HIGH"
echo "   - 2 workers para fila DEFAULT"
