
FROM node:22-alpine AS build

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .

ARG VITE_API_URL=/api
ENV VITE_API_URL=$VITE_API_URL

RUN npm run build

FROM nginx:alpine AS production

ARG APP_VERSION=v1

LABEL org.opencontainers.image.title="NovaTech Store"
LABEL org.opencontainers.image.version="${APP_VERSION}"

COPY --from=build /app/dist /usr/share/nginx/html
COPY docker/nginx/frontend.conf /etc/nginx/conf.d/default.conf

RUN printf '%s\n' "$APP_VERSION" > /usr/share/nginx/html/version.txt

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
