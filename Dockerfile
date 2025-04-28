FROM node:16-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install && npm cache clean --force

COPY . .

RUN npm run build

# Hanya menyimpan production dependencies untuk image akhir
RUN rm -rf node_modules && \
    npm install --production && \
    npm cache clean --force

EXPOSE 3000

CMD ["node", "server.js"]
