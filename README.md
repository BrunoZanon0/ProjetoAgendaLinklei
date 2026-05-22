cd ~/ProjetoAgenda

cat > README.md << 'EOF'
# 🚀 Task System - Sistema de Processamento Assíncrono com Filas

Sistema para agendamento e processamento de tarefas em segundo plano com filas Redis e WebSocket.

## 📋 Sobre o Projeto

Este projeto é um sistema completo de gerenciamento de tarefas assíncronas, onde os usuários podem criar tarefas que são processadas em segundo plano através de filas prioritárias. O sistema oferece uma interface moderna e responsiva com atualizações em tempo real.

### 🎯 Funcionalidades

#### Backend
- ✅ Criar, listar e consultar tarefas
- ✅ Status do ciclo de vida (pending, processing, completed, failed, retrying)
- ✅ Reprocessamento manual de tarefas falhas
- ✅ Retry automático com backoff exponencial (5s, 15s, 30s)
- ✅ Logs detalhados de execução
- ✅ Emissão de eventos via WebSocket
- ✅ Métricas gerais (taxa de sucesso, tempo médio, etc.)
- ✅ Autenticação com Laravel Sanctum

#### Frontend
- ✅ Tela de Login e Cadastro
- ✅ Listagem de tarefas com status atualizado em tempo real
- ✅ Formulário para criar tarefas (nome, tipo e prioridade)
- ✅ Botão de retry para tarefas com falha
- ✅ Painel com métricas do sistema
- ✅ Design responsivo com Tailwind CSS

#### Infraestrutura
- ✅ Docker Compose com todos serviços
- ✅ Workers dedicados para cada prioridade (high/default)
- ✅ Banco de dados MySQL 8
- ✅ Redis para filas
- ✅ Laravel Reverb para WebSocket

## 🛠️ Tecnologias Utilizadas

| Camada | Tecnologias |
|--------|-------------|
| **Backend** | Laravel 11, PHP 8.4, MySQL 8, Redis |
| **Frontend** | React 18, TypeScript, Tailwind CSS, Axios |
| **Infraestrutura** | Docker, Docker Compose, Nginx |
| **Autenticação** | Laravel Sanctum |
| **WebSocket** | Laravel Reverb |

## 📦 Pré-requisitos

- Docker e Docker Compose instalados
- Portas disponíveis: 3000, 8000, 3306, 6379, 8080
- Git

## 🚀 Como Executar

./start.sh

Entre no docker do backend e execure

1 - php artisan migrate
2 - php artisan db:seed -> para popular com registros ficticios
