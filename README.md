# NovaTech Store — Tarea 4

## 1. Descripción del proyecto

NovaTech Store es una tienda en línea desarrollada para el curso de Desarrollo Web IV, utilizando React y Vite para el frontend, Node.js y Express para el backend y MongoDB como base de datos.

En esta cuarta tarea se implementó una API REST que permite administrar productos, registrar usuarios, iniciar sesión y realizar operaciones CRUD mediante peticiones HTTP.

El proyecto utiliza una arquitectura cliente-servidor, donde el frontend se comunica con el backend para consultar y administrar la información almacenada en MongoDB.

La aplicación se encuentra publicada en Netlify y Render, permitiendo acceder a sus funcionalidades desde Internet.

## 2. Objetivos del proyecto

### Objetivo general

Desarrollar e integrar una aplicación web de comercio electrónico mediante React, Node.js, Express y MongoDB, implementando autenticación de usuarios y operaciones CRUD a través de una API REST.

### Objetivos específicos

- Implementar una API REST para administrar los productos.
- Establecer una conexión entre el backend y MongoDB.
- Desarrollar el registro e inicio de sesión de usuarios.
- Implementar autenticación mediante tokens JWT.
- Restringir las operaciones administrativas a usuarios autorizados.
- Integrar el frontend desarrollado en React con el backend.
- Publicar el frontend en Netlify y el backend en Render.
- Realizar pruebas de los endpoints mediante Postman.
- Documentar la estructura, funcionalidades y pruebas del sistema.

## 3. Tecnologías utilizadas

### Frontend

- React: desarrollo de componentes e interfaces.
- Vite: entorno de desarrollo y compilación.
- JavaScript: implementación de funcionalidades.
- React Router: navegación entre páginas.
- React-Bootstrap: componentes visuales.
- CSS: personalización de estilos.

### Backend

- Node.js: entorno de ejecución de JavaScript.
- Express: desarrollo de la API REST.
- MongoDB: almacenamiento de usuarios y productos.
- JWT: autenticación de usuarios mediante tokens.
- Variables de entorno: configuración privada del servidor.

### Herramientas y plataformas

- Visual Studio Code: desarrollo del proyecto.
- Git: control de versiones.
- GitHub: almacenamiento del repositorio.
- Netlify: publicación del frontend.
- Render: publicación del backend.
- Postman: pruebas de los endpoints.
- MongoDB Atlas: alojamiento de la base de datos.

## 4. Funcionalidades del sistema

### Funcionalidades para los usuarios

- Visualización del catálogo de productos.
- Consulta de productos por categorías.
- Búsqueda de productos.
- Visualización de detalles de productos.
- Registro de nuevos usuarios.
- Inicio y cierre de sesión.
- Acceso al perfil del usuario autenticado.

### Funcionalidades administrativas

- Inicio de sesión como administrador.
- Creación de nuevos productos.
- Modificación de productos existentes.
- Eliminación de productos.
- Administración de información mediante la API REST.

### Funcionalidades del backend

- Procesamiento de solicitudes HTTP.
- Comunicación con MongoDB.
- Registro y autenticación de usuarios.
- Generación y validación de tokens JWT.
- Control de acceso a rutas protegidas.
- Ejecución de operaciones CRUD.
- Respuestas mediante objetos JSON.

## 5. Arquitectura del proyecto

El proyecto está desarrollado mediante una arquitectura cliente-servidor, separando la interfaz del usuario, la lógica del servidor y el almacenamiento de datos.

### Frontend

Desarrollado con React y Vite, permite que el usuario interactúe con la tienda, consulte productos, navegue entre páginas e inicie sesión.

### Backend

Desarrollado con Node.js y Express, recibe las peticiones del frontend, ejecuta las operaciones correspondientes y se comunica con MongoDB.

### Base de datos

MongoDB almacena la información de los usuarios y productos. El backend realiza las operaciones de consulta, registro, actualización y eliminación.

### Flujo de comunicación

1. El usuario interactúa con la tienda desde el navegador.
2. React realiza una petición HTTP al backend.
3. Express recibe la solicitud mediante un endpoint.
4. El controlador procesa la operación correspondiente.
5. Si es necesario, se consulta o modifica la información en MongoDB.
6. El backend devuelve una respuesta en formato JSON.
7. React procesa la respuesta y actualiza la interfaz.

### Esquema general

**Usuario → React (Netlify) → API REST (Render) → MongoDB Atlas**

La respuesta regresa desde MongoDB al backend y posteriormente al frontend.

## 6. Organización del backend

El backend está organizado por responsabilidades para facilitar el mantenimiento del código.

| Carpeta o archivo | Responsabilidad |
|---|---|
| src/config | Configuración del entorno y conexión con MongoDB |
| src/controllers | Lógica de autenticación y administración de productos |
| src/middleware | Verificación de autenticación y permisos |
| src/models | Modelos de usuarios y productos |
| src/routes | Definición de los endpoints |
| src/scripts | Datos iniciales y carga de productos |
| src/utils | Funciones auxiliares para contraseñas y errores |
| src/app.js | Configuración de la aplicación Express |
| src/server.js | Inicialización del servidor |

### Archivos principales

**Configuración**
- db.js
- env.js

**Controladores**
- authController.js
- recursoController.js

**Middleware**
- auth.js

**Modelos**
- User.js
- Recurso.js

**Rutas**
- authRoutes.js
- recursoRoutes.js

**Scripts**
- productos.js
- seed.js

**Utilidades**
- errors.js
- password.js

Esta estructura permite separar las responsabilidades y organizar el desarrollo de la API REST.

## 7. Organización del frontend

El frontend utiliza componentes reutilizables, páginas independientes y un contexto para administrar el estado de autenticación.

### Componentes

- Catalogo.jsx
- Footer.jsx
- NavigationBar.jsx
- ProductDetail.jsx
- ProtectedRoute.jsx

### Páginas

- Inicio.jsx
- Computadoras.jsx
- Telefonos.jsx
- Accesorios.jsx
- Ofertas.jsx
- Nosotros.jsx
- Login.jsx
- Perfil.jsx
- Administracion.jsx

### Contexto y hooks

- AuthContext.jsx: administración del estado de autenticación.
- useProducts.js: lógica reutilizable relacionada con productos.

### Archivos principales

- App.jsx
- main.jsx
- App.css
- index.css

Esta estructura permite organizar la aplicación mediante componentes y facilita la comunicación con el backend.

## 8. Documentación de la API REST

La API REST permite realizar operaciones sobre usuarios y productos utilizando los métodos HTTP GET, POST, PUT y DELETE.

### URL base

https://tareaiitiendaenlinea.onrender.com

### Endpoints de autenticación

| Método | Endpoint | Descripción | Acceso |
|---|---|---|---|
| POST | /api/auth/register | Registrar un usuario | Público |
| POST | /api/auth/login | Iniciar sesión | Público |
| GET | /api/auth/me | Consultar perfil autenticado | Usuario autenticado |

### Endpoints de productos

| Método | Endpoint | Descripción | Acceso |
|---|---|---|---|
| GET | /api/recursos | Listar todos los productos | Público |
| GET | /api/recursos/:id | Consultar un producto por ID | Público |
| POST | /api/recursos | Crear un producto | Administrador |
| PUT | /api/recursos/:id | Actualizar un producto | Administrador |
| DELETE | /api/recursos/:id | Eliminar un producto | Administrador |

### 8.1. Registro de usuarios

**Método:** POST

**Endpoint:** /api/auth/register

**Ejemplo de solicitud:**

```json
{
  "name": "Usuario Prueba",
  "email": "usuario@example.com",
  "password": "CONTRASEÑA_DE_PRUEBA"
}
```

**Resultado obtenido en Postman:** 201 Created.

Esta operación permite registrar un usuario nuevo en la base de datos.

### 8.2. Inicio de sesión

**Método:** POST

**Endpoint:** /api/auth/login

**Ejemplo de solicitud:**

```json
{
  "email": "usuario@example.com",
  "password": "CONTRASEÑA_DE_PRUEBA"
}
```

**Resultado obtenido en Postman:** 200 OK.

Cuando las credenciales son correctas, el backend devuelve información del usuario y un token JWT.

Este token permite realizar peticiones que requieren autenticación.

### 8.3. Consultar perfil del usuario

**Método:** GET

**Endpoint:** /api/auth/me

**Autorización:** Bearer Token.

**Resultado obtenido en Postman:** 200 OK.

El backend valida el token y devuelve la información correspondiente al usuario autenticado.

### 8.4. Consultar todos los productos

**Método:** GET

**Endpoint:** /api/recursos

**Resultado obtenido en Postman:** 200 OK.

Esta operación devuelve un arreglo JSON con los productos almacenados en MongoDB.

La información puede incluir nombre, descripción, categoría, precio, stock y características técnicas.

### 8.5. Consultar producto por ID

**Método:** GET

**Endpoint:** /api/recursos/:id

**Resultado obtenido en Postman:** 200 OK.

Permite recuperar la información de un producto específico utilizando su identificador.

### 8.6. Crear un producto

**Método:** POST

**Endpoint:** /api/recursos

**Autorización:** Bearer Token de administrador.

**Ejemplo de solicitud:**

```json
{
  "nombre": "Laptop Prueba Postman",
  "descripcion": "Producto creado para probar el CRUD de la Tarea 4",
  "categoria": "computadoras",
  "precio": 3500,
  "precioAnterior": 4000,
  "stock": 10,
  "procesador": "Intel Core i5",
  "ram": "8 GB",
  "almacenamiento": "SSD 256 GB",
  "etiqueta": "Prueba",
  "destacado": false,
  "oferta": false
}
```

**Resultado obtenido en Postman:** 201 Created.

El servidor registra el producto en MongoDB y devuelve su información, incluyendo un identificador único.

### 8.7. Actualizar un producto

**Método:** PUT

**Endpoint:** /api/recursos/:id

**Autorización:** Bearer Token de administrador.

**Ejemplo de solicitud:**

```json
{
  "nombre": "Laptop Prueba Postman Actualizada",
  "descripcion": "Producto actualizado mediante la API REST",
  "categoria": "computadoras",
  "precio": 3200,
  "precioAnterior": 4000,
  "stock": 15,
  "procesador": "Intel Core i7",
  "ram": "16 GB",
  "almacenamiento": "SSD 512 GB",
  "etiqueta": "Actualizado",
  "destacado": false,
  "oferta": false
}
```

**Resultado obtenido en Postman:** 200 OK.

La prueba permitió actualizar correctamente el precio, stock, procesador, memoria RAM y almacenamiento del producto.

### 8.8. Eliminar un producto

**Método:** DELETE

**Endpoint:** /api/recursos/:id

**Autorización:** Bearer Token de administrador.

**Resultado obtenido en Postman:** 204 No Content.

El servidor completó correctamente la eliminación del producto de prueba y devolvió una respuesta sin contenido.

## 9. Autenticación y control de acceso

El proyecto utiliza JWT para gestionar la autenticación de usuarios.

Después de iniciar sesión, el backend genera un token que puede enviarse en las solicitudes protegidas mediante la cabecera Authorization.

**Formato utilizado:**

Authorization: Bearer TOKEN_JWT

### Usuarios normales

Los usuarios con rol cliente pueden acceder a las funcionalidades públicas y consultar su perfil autenticado.

### Administradores

Los usuarios con rol administrador pueden realizar operaciones de creación, actualización y eliminación de productos.

El middleware del backend se encarga de verificar la autenticación y los permisos correspondientes.

### Seguridad

- Las rutas administrativas requieren autenticación.
- Las operaciones protegidas utilizan tokens JWT.
- Las credenciales privadas se gestionan mediante variables de entorno.
- Los archivos .env no deben publicarse en GitHub.
- La colección compartida de Postman utiliza variables en lugar de credenciales reales.

## 10. Pruebas realizadas con Postman

Se utilizó Postman para probar los endpoints del backend publicado en Render.

Las pruebas permitieron comprobar el funcionamiento de la autenticación y las operaciones CRUD.

### Resultados de las pruebas

| No. | Prueba | Método | Estado HTTP | Resultado |
|---|---|---|---|---|
| 1 | Listar productos | GET | 200 OK | Exitosa |
| 2 | Registrar usuario | POST | 201 Created | Exitosa |
| 3 | Iniciar sesión | POST | 200 OK | Exitosa |
| 4 | Consultar perfil | GET | 200 OK | Exitosa |
| 5 | Consultar producto por ID | GET | 200 OK | Exitosa |
| 6 | Login administrador | POST | 200 OK | Exitosa |
| 7 | Crear producto | POST | 201 Created | Exitosa |
| 8 | Editar producto | PUT | 200 OK | Exitosa |
| 9 | Eliminar producto | DELETE | 204 No Content | Exitosa |

### Resultados generales

Durante las pruebas se comprobó lo siguiente:

- El servidor responde correctamente a las peticiones HTTP.
- MongoDB devuelve los productos almacenados.
- El registro de usuarios funciona.
- El inicio de sesión genera un token JWT.
- La consulta del perfil requiere autenticación.
- Los productos pueden consultarse individualmente.
- El administrador puede crear productos.
- Los productos pueden actualizarse mediante PUT.
- Los productos pueden eliminarse mediante DELETE.

Se utilizó un producto de prueba para comprobar las operaciones CRUD.

Primero se creó el producto, posteriormente se modificaron sus características y finalmente se eliminó de la base de datos.

Las nueve peticiones se ejecutaron correctamente durante las pruebas realizadas.

## 11. Colección de Postman

Para facilitar la revisión de los endpoints se incluyó una colección de Postman en formato JSON.

**Ubicación:**

postman/NovaTech_Store_Tarea4_SEGURO.postman_collection.json

**Formato:** Postman Collection v2.1.

La colección contiene nueve peticiones organizadas por nombre y método HTTP.

Incluye operaciones de registro, autenticación, consulta de perfil y administración de productos.

### Configuración de la colección

La versión compartida utiliza variables para evitar incluir información confidencial.

Para ejecutar las solicitudes se deben configurar las variables correspondientes a la URL del backend, credenciales de prueba, tokens JWT e identificadores de productos.

La colección permite importar las peticiones en Postman y reproducir las pruebas con credenciales autorizadas.

## 12. Despliegue del proyecto

### Frontend — Netlify

El frontend está publicado en Netlify, permitiendo acceder a la tienda desde un navegador web.

**Enlace:**

https://tiendaenlineaiv.netlify.app/

### Backend — Render

El backend está publicado en Render y proporciona los endpoints utilizados por el frontend y Postman.

**Enlace para consultar productos:**

https://tareaiitiendaenlinea.onrender.com/api/recursos

### Base de datos — MongoDB Atlas

La base de datos MongoDB se utiliza para almacenar usuarios y productos.

El backend establece la conexión mediante una variable de entorno privada.

### Repositorio — GitHub

El código fuente se encuentra almacenado en GitHub, utilizando la rama Tarea4 para la entrega.

**Enlace:**

https://github.com/fmoralesa6-lgtm/TAREAIITIENDAENLINEA/tree/Tarea4

## 13. Participación de los integrantes

El proyecto fue desarrollado en equipo, distribuyendo las responsabilidades entre el backend y el frontend.

### Fredy — Backend

- Desarrollo y organización del backend.
- Implementación de la API REST.
- Configuración del servidor con Node.js y Express.
- Integración de la base de datos MongoDB.
- Desarrollo de los controladores y endpoints.
- Implementación de la autenticación de usuarios.
- Configuración de tokens JWT.
- Implementación de operaciones CRUD.
- Configuración y publicación del backend en Render.
- Pruebas de los endpoints mediante Postman.
- Preparación de la colección de peticiones para la entrega.

### Mauricio — Frontend

- Desarrollo de las páginas del frontend.
- Implementación de componentes con React.
- Diseño de interfaces visuales.
- Organización de las páginas y componentes del sitio.
- Desarrollo de las páginas asignadas para la Tarea 4.
- Implementación de las funcionalidades visuales del frontend.

La integración de ambas partes permitió comunicar la interfaz desarrollada con React con la API REST y la base de datos MongoDB.

## 14. Repositorio y control de versiones

El proyecto utiliza Git y GitHub para administrar las versiones del código fuente.

Para esta entrega se utiliza la rama:

**Tarea4**

En esta rama se encuentra el código del proyecto, la documentación y la colección de Postman.

El control de versiones permite mantener un historial de los cambios realizados y facilitar el trabajo en equipo.

## 15. Conclusiones

El desarrollo de NovaTech Store permitió integrar los conocimientos adquiridos durante el curso de Desarrollo Web IV mediante la implementación de una aplicación cliente-servidor.

La utilización de React permitió organizar el frontend mediante componentes reutilizables, mientras que Node.js y Express facilitaron el desarrollo del backend y de los endpoints de la API REST.

MongoDB permitió almacenar la información de usuarios y productos, mientras que JWT se utilizó para gestionar la autenticación y el acceso a las funcionalidades protegidas.

Las pruebas realizadas con Postman permitieron comprobar el funcionamiento de los endpoints de autenticación y de las operaciones CRUD.

Finalmente, la publicación del frontend en Netlify y del backend en Render permitió disponer de una aplicación web accesible mediante Internet.

El proyecto permitió fortalecer los conocimientos sobre desarrollo frontend, backend, bases de datos, autenticación, servicios REST, pruebas de API y despliegue de aplicaciones web.
