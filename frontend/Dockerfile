FROM node:20-alpine

WORKDIR /app

# Copiar arquivos de dependências
COPY package*.json ./

# Instalar dependências
RUN npm install

# Copiar o resto dos arquivos
COPY . .

# Build do frontend
RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]
