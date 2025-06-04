FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Финальный образ с nginx
FROM nginx:alpine

# Удаляем ненужные файлы конфигурации по умолчанию
RUN rm /etc/nginx/conf.d/default.conf

# Копируем собранное приложение
COPY --from=builder /app/dist /usr/share/nginx/html

# Копируем наш конфиг nginx (без SSL-настроек)
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Убираем EXPOSE 443, так как фронтенд не должен обрабатывать HTTPS напрямую
EXPOSE 80

# Устанавливаем здоровье контейнера (опционально)
HEALTHCHECK --interval=30s --timeout=3s \
  CMD curl -f http://localhost/ || exit 1