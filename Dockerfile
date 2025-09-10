# Usa uma imagem Node
FROM node:18-alpine

# Define o diretório de trabalho
WORKDIR /app

# Copia os arquivos de dependência
COPY package*.json ./

# Instala TODAS as dependências (dev e production)
RUN npm install

# Copia o restante do seu projeto
COPY . .

# Gera o cliente do Prisma
RUN npx prisma generate

# Expõe a porta da sua API
EXPOSE 3333

# Comando para iniciar sua aplicação
CMD ["npm", "run", "start:dev"]