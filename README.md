Sistema para agendamento e processamento de tarefas em segundo plano com filas Redis e WebSocket.

## 🚀 Tecnologias

- **Backend:** Laravel 11 + PHP 8.4
- **Frontend:** React 18 + TypeScript + Tailwind CSS
- **Banco de Dados:** MySQL 8
- **Fila:** Redis
- **WebSocket:** Laravel Reverb
- **Container:** Docker + Docker Compose

## 📋 Funcionalidades

- ✅ Criar tarefas (email/report) com prioridade (high/default)
- ✅ Processamento assíncrono com filas Redis
- ✅ Workers dedicados para cada prioridade
- ✅ Status em tempo real (pending, processing, completed, failed, retrying)
- ✅ Retry automático com backoff exponencial
- ✅ Reprocessamento manual de tarefas falhas
- ✅ Logs detalhados de execução
- ✅ Métricas em tempo real
- ✅ Interface responsiva com atualização automática

## 🐳 Como Executar

### Pré-requisitos
- Docker e Docker Compose instalados
- Portas 3000, 8000, 3306, 6379, 8080 disponíveis

### Estrutura do Projeto 

ProjetoAgenda/
├── backend/          # Laravel
├── frontend/         # React + TypeScript
├── docker/           # Configurações Docker
├── docker-compose.yml
└── start.sh