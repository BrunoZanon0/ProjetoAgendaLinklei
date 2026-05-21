#!/bin/bash
echo "🚀 Iniciando Task System completo..."

# Subir containers
docker compose up -d

# Aguardar
sleep 5

# Iniciar workers em background
docker exec -d task_backend php artisan queue:work redis --queue=high --tries=3
docker exec -d task_backend php artisan queue:work redis --queue=default --tries=3

echo "✅ Sistema pronto!"
echo "📱 Frontend: http://localhost:3000"
echo "🔙 Backend API: http://localhost:8000/api/tasks"
echo ""
echo "Workers rodando em background!"
echo "Para ver logs: docker compose logs -f"
