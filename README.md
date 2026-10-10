# NovaTech Store — Tarea 4

## Descripción del proyecto

NovaTech Store es una tienda en línea desarrollada para el curso de Desarrollo Web, utilizando React y Vite para el frontend y Node.js para el backend.

En esta cuarta tarea se integró una API REST con una base de datos MongoDB para administrar productos, registrar usuarios y permitir el inicio de sesión.

## Tecnologías utilizadas

**Frontend**
- React
- Vite
- JavaScript
- React Router
- React-Bootstrap
- CSS

**Backend**
- Node.js
- Express
- MongoDB
- API REST

**Plataformas de despliegue**
- Netlify: frontend
- Render: backend
- GitHub: repositorio del proyecto

## Funcionalidades

- Visualización de productos por categorías.
- Búsqueda de productos.
- Registro de usuarios.
- Inicio y cierre de sesión.
- Autenticación de usuarios.
- Administración de productos mediante operaciones CRUD.
- Comunicación entre el frontend y el backend.
- Persistencia de información en MongoDB.

## Arquitectura del proyecto

El proyecto utiliza una arquitectura cliente-servidor.

El frontend fue desarrollado con React, encargado de mostrar las páginas y permitir la interacción con el usuario.

El backend fue desarrollado con Node.js y Express, encargado de recibir las solicitudes, procesar la información y comunicarse con la base de datos MongoDB.

## Organización del backend

| Carpeta | Función |
|---|---|
| config | Configuración del servidor y conexión con MongoDB |
| models | Modelos de datos de usuarios y productos |
| controllers | Lógica de autenticación y administración |
| routes | Definición de rutas de la API |
| middleware | Validación de autenticación y permisos |
| utils | Funciones auxiliares |
| scripts | Inicialización de información |

*Conservar solamente las carpetas que realmente existan en el repositorio.*

## Documentación de la API REST

URL base:

https://tareaiitiendaenlinea.onrender.com

### Endpoints de productos

| Método | Endpoint | Función |
|---|---|---|
| GET | /api/recursos | Consultar todos los productos |

Pendiente de confirmar en el código: ruta para consultar un producto individual, crear, actualizar y eliminar productos.

### Endpoints de autenticación

Pendiente de documentar las rutas exactas de registro e inicio de sesión, sus parámetros, sus respuestas JSON y los permisos requeridos.

### Ejemplo de respuesta de productos

```json
{
  "nombre": "NovaBook Pro",
  "descripcion": "Computadora ideal para programación, universidad y productividad.",
  "categoria": "computadoras",
  "precio": 7499,
  "stock": 8,
  "procesador": "Intel Core i7",
  "ram": "16 GB",
  "almacenamiento": "SSD 512 GB"
}
```

La respuesta de GET /api/recursos es un arreglo de productos.

## Pruebas funcionales

Las pruebas de funcionamiento incluyen:

1. Registro de nuevos usuarios.
2. Validación de credenciales incorrectas.
3. Inicio de sesión.
4. Consulta y búsqueda de productos.
5. Creación de productos por el administrador.
6. Actualización de productos.
7. Eliminación de productos.
8. Recarga de páginas mediante F5.

Adjuntar las evidencias de las pruebas realizadas.

## Participación de los integrantes

**Fredy**
- Desarrollo del backend.
- Implementación de la API REST.
- Desarrollo de funcionalidades de autenticación y administración de productos.
- Integración con MongoDB.
- Configuración y despliegue del backend en Render.

**Mauricio**
- Desarrollo de páginas del frontend.
- Diseño e implementación de interfaces en React.
- Organización de los componentes visuales del sitio.
- Desarrollo de las páginas asignadas para la Tarea 4.

## Enlaces del proyecto

**Repositorio — rama Tarea4**

https://github.com/fmoralesa6-lgtm/TAREAIITIENDAENLINEA/tree/Tarea4

**Frontend publicado en Netlify**

https://tiendaenlineaiv.netlify.app/

**Backend publicado en Render**

https://tareaiitiendaenlinea.onrender.com/api/recursos

## Conclusión

Con esta tarea se integraron el frontend y el backend para desarrollar una tienda en línea con información almacenada en una base de datos y administrada mediante una API REST.

El proyecto permitió aplicar conocimientos de React, Node.js, Express, MongoDB, autenticación de usuarios y despliegue de aplicaciones web.
