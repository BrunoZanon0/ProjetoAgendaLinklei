#!/bin/bash

echo "🚀 Iniciando Task System..."

# Subir containers
docker compose up -d

# Aguardar backend
sleep 5

# Limpar cache
docker exec task_backend php artisan config:clear
docker exec task_backend php artisan cache:clear

# Rodar migrations se necessário
docker exec task_backend php artisan migrate --force

echo "✅ Sistema pronto!"
echo "📱 Frontend: http://localhost:3000"
echo "🔙 Backend API: http://localhost:8000/api/tasks"
echo "📊 Métricas: http://localhost:8000/api/metrics"
echo ""
echo "Para ver logs: docker compose logs -f"
echo "Para parar: docker compose down"
