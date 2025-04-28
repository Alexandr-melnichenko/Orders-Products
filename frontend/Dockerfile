#Base slice
FROM node:18 AS base
WORKDIR /app
COPY package*.json ./

#Dev mode
FROM base AS dev
RUN npm install
COPY . .
CMD ["npm", "run", "dev"]

#Prod-mode
FROM base AS prod
RUN npm install --only=production
COPY . .
RUN npm run build

FROM nginx:alpine AS prod-final
COPY --from=prod /app/dist /usr/share/nginx/html
