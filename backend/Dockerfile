FROM node:18-alpine AS base
WORKDIR /app

# Установка зависимостей + wait-for-it (простая альтернатива)
RUN apk add --no-cache bash curl && \
    curl -o /usr/local/bin/wait-for-it.sh https://raw.githubusercontent.com/vishnubob/wait-for-it/master/wait-for-it.sh && \
    chmod +x /usr/local/bin/wait-for-it.sh

# Установка зависимостей отдельно для кэширования
COPY package*.json ./
RUN npm ci --only=production
COPY . .

# Финальный образ
FROM node:18-alpine
WORKDIR /app
RUN apk add --no-cache bash curl
COPY --from=base /app /app
COPY --from=base /usr/local/bin/wait-for-it.sh /usr/local/bin/

# Безопасность и запуск
RUN if ! getent group node >/dev/null; then addgroup -S node; fi && \
    if ! getent passwd node >/dev/null; then adduser -S node -G node; fi
USER node
EXPOSE 3000
CMD ["bash", "-c", "wait-for-it.sh db:3306 --timeout=300 -- node app.js"]