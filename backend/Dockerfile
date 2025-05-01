#Base slice
FROM node:18 AS base
WORKDIR /app

# Создаем папку для загрузок
RUN mkdir -p /app/uploads

COPY package*.json ./
EXPOSE 3000

# Dev-mode
FROM base AS dev
RUN npm install nodemon --save-dev
COPY . .
CMD ["npx", "nodemon", "./app.js"]

#Prod-mode
FROM base AS prod
RUN npm install --only=production && npm cache clean --force
COPY . .
CMD ["node", "./app.js"]
