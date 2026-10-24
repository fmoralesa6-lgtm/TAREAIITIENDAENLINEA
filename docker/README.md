# NovaTech Store — Despliegues con Docker

## Descripción

Este proyecto demuestra tres estrategias de despliegue de aplicaciones web utilizando Docker, Docker Compose y Nginx, tomando como base NovaTech Store, desarrollada con React, Express y MongoDB Atlas.

Las estrategias implementadas son Recreate, Blue-Green y Canary Deployment.

En este laboratorio se contenedoriza el frontend React. El backend Express continúa alojado en Render y utiliza MongoDB Atlas como base de datos externa.

## Requisitos

- Docker Desktop con Docker Engine funcionando.
- Docker Compose.
- Conexión a Internet.
- Imágenes Docker `novatech-frontend:v1` y `novatech-frontend:v2`.
- Puertos 8085, 8086 y 8087 disponibles.

## Construcción de imágenes

Ejecutar desde la raíz del proyecto:

```powershell
docker build --build-arg APP_VERSION=v1 -t novatech-frontend:v1 .
docker build --build-arg APP_VERSION=v2 -t novatech-frontend:v2 .
```

## Estrategia 1: Recreate Deployment

Iniciar la versión inicial:

```powershell
$env:APP_VERSION="v1"
docker compose -f docker/recreate/compose.yaml up -d
```

Verificar:

```powershell
(Invoke-WebRequest http://localhost:8085/version.txt -UseBasicParsing).Content
```

Detener el servicio:

```powershell
docker compose -f docker/recreate/compose.yaml down
```

Iniciar la nueva versión:

```powershell
$env:APP_VERSION="v2"
docker compose -f docker/recreate/compose.yaml up -d
```

La versión anterior se detiene antes de iniciar la nueva, lo que puede causar indisponibilidad.

## Estrategia 2: Blue-Green Deployment

Iniciar los entornos:

```powershell
docker compose -f docker/blue-green/compose.yaml up -d
```

La dirección de acceso es:

http://localhost:8086/version.txt

Para cambiar de Blue a Green, modificar `docker/blue-green/active.conf`:

De:

```nginx
proxy_pass http://blue:80;
```

A:

```nginx
proxy_pass http://green:80;
```

Validar y aplicar:

```powershell
docker compose -f docker/blue-green/compose.yaml exec -T gateway nginx -t
docker compose -f docker/blue-green/compose.yaml exec -T gateway nginx -s reload
```

Para realizar un rollback, regresar a `blue:80` y repetir ambos comandos.

## Estrategia 3: Canary Deployment

Iniciar los contenedores:

```powershell
docker compose -f docker/canary/compose.yaml up -d
```

Dirección de prueba:

http://localhost:8087/version.txt

Para activar una distribución 90/10:

```powershell
Copy-Item docker/canary/nginx-90-10.conf docker/canary/nginx.conf -Force
```

Para activar 70/30:

```powershell
Copy-Item docker/canary/nginx-70-30.conf docker/canary/nginx.conf -Force
```

Para activar el 100 % hacia v2:

```powershell
Copy-Item docker/canary/nginx-100.conf docker/canary/nginx.conf -Force
```

Después de cada cambio, validar y recargar Nginx:

```powershell
docker compose -f docker/canary/compose.yaml exec -T gateway nginx -t
docker compose -f docker/canary/compose.yaml exec -T gateway nginx -s reload
```

La distribución se realiza por solicitudes HTTP, no necesariamente por usuarios individuales.

## Detener los escenarios

```powershell
docker compose -f docker/recreate/compose.yaml down
docker compose -f docker/blue-green/compose.yaml down
docker compose -f docker/canary/compose.yaml down
```

## Seguridad y limitaciones

Las credenciales no deben incorporarse a las imágenes ni publicarse en GitHub. Los archivos `.env` quedan excluidos del repositorio.

La implementación depende de la disponibilidad del backend externo en Render y de MongoDB Atlas.

Las versiones v1 y v2 se distinguen por etiquetas Docker y por el archivo `version.txt`. Se utilizan para demostrar los mecanismos de despliegue, sin representar necesariamente modificaciones funcionales de la aplicación.

Los cambios de configuración de Nginx deben validarse antes de recargar el servicio. Las pruebas realizadas no garantizan disponibilidad continua ni sustituyen un monitoreo de producción.