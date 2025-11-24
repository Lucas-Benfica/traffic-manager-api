# 1. Imagem base leve do Node
FROM node:18-alpine

# 2. Diretório de trabalho dentro do container
WORKDIR /app

# 3. Copiar dependências e instalar
COPY package*.json ./
RUN npm install

# 4. Copiar o resto do código
COPY . .

# 5. Gerar o cliente do Prisma (Importante para funcionar no Linux do container)
RUN npx prisma generate

# 6. Compilar o TypeScript para JavaScript
RUN npm run build

# 7. Expor a porta
EXPOSE 3333

# 8. Comando para iniciar
CMD ["npm", "start"]