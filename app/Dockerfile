FROM node:18-alpine

# /usr/src/app  é um padrão de mercado
WORKDIR /usr/src/app 

COPY package*.json ./
# pega todos os arquivos de package primeiro, seguindo aquela lógica para facilitar o uso do build cache, sendo menos necessário baixar novamente as imagens toda vez que fazer um novo deploy

RUN npm install --only=production

# Copia todo o resto
COPY . .

# abre a porta 3000 do node
EXPOSE 3000

# comandos que rodam ao iniciar o contâiner
# nesse caso roda o start definido no packages.json, que roda o index.js
# o npm abre o packages.json
CMD ["npm","start"]