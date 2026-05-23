#!/bin/bash

echo "🚀 Iniciando TaskFlow - Sistema de Agendamento e Processamento de Tarefas..."
echo ""

# Verificar se Docker está rodando
if ! docker info > /dev/null 2>&1; then
    echo "❌ Docker não está rodando. Por favor, inicie o Docker."
    exit 1
fi

# Subir containers
echo "📦 Construindo e subindo containers..."
docker compose up -d --build

echo ""
echo "⏳ Aguardando MySQL ficar pronto..."
sleep 10

# Aguardar MySQL ficar saudável
echo "⏳ Aguardando MySQL ficar saudável..."
while ! docker exec task_mysql mysqladmin ping -h localhost -uroot -proot123 --silent 2>/dev/null; do
    echo "   Aguardando MySQL..."
    sleep 3
done
echo "✅ MySQL pronto!"

echo ""
echo "⏳ Aguardando backend..."
sleep 5

echo ""
echo "🔧 Configurando o backend..."

# Verificar se o backend está rodando
if ! docker ps | grep -q task_backend; then
    echo "⚠️ Backend não está rodando. Iniciando..."
    docker start task_backend
    sleep 5
fi

# Gerar APP_KEY
docker exec task_backend php artisan key:generate --force 2>/dev/null || echo "⚠️ Erro ao gerar key"

# Rodar migrations
docker exec task_backend php artisan migrate --force 2>/dev/null || echo "⚠️ Erro ao rodar migrations"

# Rodar seeders
docker exec task_backend php artisan db:seed --class=UserSeeder --force 2>/dev/null || echo "⚠️ Seeder de usuários já executado"

# Limpar cache
docker exec task_backend php artisan config:clear 2>/dev/null
docker exec task_backend php artisan cache:clear 2>/dev/null

# Iniciar workers
echo "⚙️ Iniciando workers..."
docker exec -d task_backend php artisan queue:work redis --queue=high --tries=3 --sleep=3 2>/dev/null
docker exec -d task_backend php artisan queue:work redis --queue=default --tries=3 --sleep=3 2>/dev/null

echo ""
echo "✅ Sistema pronto!"
echo "======================================"
echo "📱 Frontend: http://localhost:3000"
echo "🔙 Backend API: http://localhost:8000/api/tasks"
echo "📊 Métricas: http://localhost:8000/api/metrics"
echo "======================================"
echo ""
echo "🔐 Credenciais padrão:"
echo "   Email: admin@example.com"
echo "   Senha: 12345678"
echo ""
echo "📝 Comandos úteis:"
echo "   Ver logs: docker compose logs -f"
echo "   Parar sistema: docker compose down"
echo "   Reiniciar: docker compose restart"
