# Use uma imagem base Node.js
FROM node:18-alpine

# Defina o diretório de trabalho dentro do container
WORKDIR /app

# Copie os arquivos de configuração para o container
COPY package*.json ./

# Instale as dependências
RUN npm install

# Copie o restante do código da aplicação
COPY . .

# Compile o TypeScript
RUN npm run build

EXPOSE 3333

# Comando para rodar a aplicação
CMD ["node", "build/server.js"]