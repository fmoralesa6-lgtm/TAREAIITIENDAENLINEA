NovaTech Store — Tarea 5
Curso: Desarrollo Web IV
Proyecto: NovaTech Store
Entrega: Seguridad JWT, autorización stateless y expiración de sesión a los 5 minutos
Rama de entrega: Tarea5

1. Descripción del proyecto
NovaTech Store es una tienda en línea desarrollada con React y Vite en el frontend, Node.js y Express en el backend y MongoDB Atlas para almacenar usuarios y productos. Utiliza una arquitectura cliente-servidor y una API REST.
La Tarea 4 incorporó registro, inicio de sesión, perfil de usuarios y operaciones CRUD de productos. En esta Tarea 5 se reforzó la seguridad mediante JWT de duración estricta de 300 segundos (5 minutos), validación en endpoints privados, detección de respuestas HTTP 401, cierre automático de sesión y redirección a /login con un mensaje visible para el usuario. Se conservaron el catálogo público y las operaciones administrativas existentes.

2. Objetivos
Objetivo general
Fortalecer la autenticación y autorización de NovaTech Store mediante tokens JWT con expiración de cinco minutos, gestionando la pérdida de validez de la sesión tanto en Express como en React.
Objetivos específicos
- Mantener la API REST de usuarios y productos integrada con MongoDB.
- Generar JWT firmados con el algoritmo HS256 e incluir id, email y role en su payload.
- Configurar JWT_SECRET y JWT_EXPIRES_IN=300s en variables de entorno privadas.
- Verificar el encabezado Authorization: Bearer <token> en todas las rutas privadas.
- Responder 401 Unauthorized y devolver un JSON descriptivo ante un token expirado.
- Conservar la restricción de operaciones CRUD administrativas mediante roles.
- Almacenar el JWT en sessionStorage y añadirlo automáticamente a las solicitudes del frontend.
- Actualizar el estado global de autenticación mediante Context API y useReducer.
- Mostrar una alerta y redirigir automáticamente a /login cuando caduque la sesión.
- Documentar y probar los casos de token válido, token expirado y solicitud sin token mediante Postman.

3. Tecnologías y herramientas
Capa	Tecnologías
Frontend	React, Vite, JavaScript, React Router, React-Bootstrap, CSS
Backend	Node.js, Express, jsonwebtoken, middleware de autorización
Datos	MongoDB y MongoDB Atlas
Estado y solicitudes	Context API, useReducer, fetch, sessionStorage
Desarrollo y pruebas	Visual Studio Code, Git, GitHub, Postman
Despliegue	Netlify (frontend) y Render (backend)


4. Funcionalidades del sistema
Para usuarios
- Consultar y buscar productos por categoría, ver detalles y ofertas.
- Registrarse, iniciar sesión y cerrar sesión.
- Consultar el perfil personal desde una ruta protegida.
- Recibir una alerta al caducar el JWT y regresar automáticamente al inicio de sesión.
Para administradores
- Autenticarse con una cuenta autorizada.
- Agregar productos, modificar información y eliminar registros.
- Acceder a las operaciones administrativas solo cuando se valida el JWT y el rol admin.
Del backend
- Procesar solicitudes HTTP y comunicarse con MongoDB.
- Registrar y autenticar usuarios, generando JWT firmados.
- Verificar firma, expiración y existencia de usuarios.
- Proteger recursos privados y administrar permisos.
- Responder errores de autenticación en formato JSON.

5. Arquitectura y flujo
Navegador → React (Netlify) → API REST Express (Render) → MongoDB Atlas
1. El usuario envía sus credenciales a POST /api/auth/login.
2. Express valida las credenciales y devuelve los datos públicos del usuario y un JWT firmado.
3. React guarda el JWT en sessionStorage bajo la clave novatech_token.
4. El cliente HTTP centralizado (src/services/api.js) añade Authorization: Bearer <token> a las solicitudes posteriores.
5. El middleware protect verifica firma y expiración; consulta además el usuario en MongoDB.
6. En las operaciones administrativas, adminOnly verifica el rol real del usuario recuperado.
7. Si el token expira, Express responde con 401 y error: "token_expired".
8. React elimina el token, actualiza su contexto, muestra la alerta y navega a /login.
Las consultas públicas del catálogo no requieren JWT. El backend es stateless respecto a la sesión JWT: no mantiene una sesión HTTP almacenada en el servidor; cada solicitud protegida incluye sus credenciales por encabezado. La validación del usuario contra MongoDB es una comprobación adicional, no una sesión en servidor.

6. Organización del backend
Ruta	Responsabilidad
backend/src/config/env.js	Carga y validación de variables de entorno
backend/src/config/db.js	Configuración de conexión MongoDB
backend/src/controllers/authController.js	Registro, login, generación de JWT y perfil
backend/src/controllers/recursoController.js	Consulta y operaciones CRUD de productos
backend/src/middleware/auth.js	Middleware protect y control adminOnly
backend/src/models/User.js	Modelo de usuario
backend/src/models/Recurso.js	Modelo de producto
backend/src/routes/authRoutes.js	Rutas de autenticación
backend/src/routes/recursoRoutes.js	Rutas de productos
backend/src/scripts/	Carga de datos y utilidades iniciales
backend/src/utils/password.js	Funciones de contraseñas
backend/src/utils/errors.js	Errores del servidor
backend/src/app.js	Configuración de Express
backend/src/server.js	Arranque de API y conexión a MongoDB


7. Organización del frontend
Ruta	Responsabilidad
src/components/NavigationBar.jsx	Barra de navegación
src/components/Footer.jsx	Pie de página
src/components/Catalogo.jsx	Catálogo de productos
src/components/ProductDetail.jsx	Detalles del producto
src/components/ProtectedRoute.jsx	Restricción de rutas privadas y de administración
src/context/AuthContext.jsx	Estado global con useReducer, login, logout y temporizador de expiración
src/services/api.js	Función fetch centralizada, gestión del token y tratamiento de errores HTTP
src/hooks/useProducts.js	Lógica reutilizable para productos
src/pages/	Inicio, Computadoras, Telefonos, Accesorios, Ofertas, Nosotros, Login, Perfil y Administracion
src/App.jsx	Rutas, alerta de sesión caducada y redirección a /login
src/main.jsx	Inicio de React, BrowserRouter y AuthProvider
src/App.css, src/index.css	Estilos


8. Documentación de la API REST
API desplegada en la Tarea 4: https://tareaiitiendaenlinea.onrender.com
API local utilizada para probar la Tarea 5: http://localhost:4000
Los enlaces desplegados corresponden al proyecto anterior. Es necesario comprobar que Netlify y Render estén ejecutando el código de la rama Tarea5 antes de presentar esas URLs como despliegues finales de la Tarea 5.

Autenticación
Método	Endpoint	Descripción	Acceso
POST	/api/auth/register	Registrar usuario y obtener sesión	Público
POST	/api/auth/login	Validar credenciales y emitir JWT	Público
GET	/api/auth/me	Consultar el perfil autenticado	JWT obligatorio


Productos
Método	Endpoint	Descripción	Acceso
GET	/api/recursos	Listar productos	Público
GET	/api/recursos/:id	Consultar un producto	Público
POST	/api/recursos	Crear producto	JWT + rol admin
PUT	/api/recursos/:id	Editar producto	JWT + rol admin
DELETE	/api/recursos/:id	Eliminar producto	JWT + rol admin


Ejemplo de login
POST /api/auth/login
Content-Type: application/json
{
  "email": "usuario@example.com",
  "password": "CONTRASENA_DE_PRUEBA"
}
El backend devuelve un objeto user y un token JWT cuando las credenciales son correctas. Para consultar el perfil se envía:
GET /api/auth/me
Authorization: Bearer <TOKEN_JWT_VALIDO>
Ejemplo de producto de prueba (Tarea 4)
{
  "nombre": "Laptop Prueba Postman",
  "descripcion": "Producto creado para probar el CRUD",
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
El CRUD de la Tarea 4 fue probado con creación (201), edición (200) y eliminación (204) de productos de prueba.

9. Seguridad JWT: implementación de la Tarea 5
9.1 Generación y expiración estricta en Express
En backend/src/controllers/authController.js, el login valida las credenciales del usuario y firma el JWT mediante jsonwebtoken. El payload contiene id, email y role y mantiene sub como identificador del usuario. La firma utiliza el algoritmo HS256 y la clave privada definida en JWT_SECRET.
La duración se configura en backend/.env:
JWT_SECRET=COLOCAR_UN_SECRETO_ALEATORIO_SEGURO
JWT_EXPIRES_IN=300s
300s equivalen a cinco minutos. En el controlador se emplea expiresIn: process.env.JWT_EXPIRES_IN. La aplicación debe validar que esa variable tenga el valor exigido. El JWT incluye las marcas iat y exp; no se renueva automáticamente al consultar el perfil.
Seguridad de la configuración: los archivos .env no deben subirse a GitHub. En Render las variables se configuran en el panel de entorno. .env.example puede documentar sus nombres, pero nunca valores secretos.
9.2 Middleware protect y permisos
backend/src/middleware/auth.js obtiene el token desde el encabezado HTTP Authorization: Bearer <token>, verifica la firma con JWT_SECRET, limita los algoritmos admitidos a HS256 y comprueba que el usuario exista en la base de datos. Si es válido, asigna el usuario a req.user y permite continuar.
El middleware adminOnly comprueba el rol admin para crear, editar y eliminar productos. Las consultas públicas del catálogo siguen disponibles sin autenticación.
9.3 Manejo de errores de autorización
Condición	HTTP	Identificador
Falta cabecera Bearer o no hay token	401 Unauthorized	unauthorized
Token inválido	401 Unauthorized	invalid_token
Token expirado	401 Unauthorized	token_expired
Usuario sin permisos administrativos	403 Forbidden	Mensaje de permisos


Respuesta para token expirado:
{
  "error": "token_expired",
  "message": "La sesión ha expirado o ya no es válida. Por favor, inicie sesión nuevamente."
}
Respuesta sin token:
{
  "error": "unauthorized",
  "message": "Inicia sesión para continuar."
}
9.4 Estado de autenticación y token en React
El frontend guarda el JWT en sessionStorage con la clave novatech_token. El estado de autenticación se administra en src/context/AuthContext.jsx mediante Context API y useReducer, con acciones como LOGIN, LOGOUT y SESSION_EXPIRED.
La función HTTP centralizada de src/services/api.js añade automáticamente el encabezado Authorization: Bearer <token> si hay un token almacenado. Ante un error 401 cuyo JSON indica token_expired o invalid_token, elimina el token y emite el evento novatech-session-expired. El contexto recibe el evento y actualiza el estado de sesión.
Adicionalmente, React lee exp del JWT únicamente para programar un temporizador que finaliza la sesión al vencer. La autorización verdadera siempre se comprueba en el servidor: leer el payload en el navegador no verifica su firma.
9.5 Aviso y redirección automática
Cuando el contexto activa SESSION_EXPIRED, src/App.jsx utiliza useNavigate para redirigir a /login y muestra una alerta de React-Bootstrap:
Sesión finalizada
Su sesión ya no es válida o ha caducado. Por favor, inicie sesión nuevamente.

El token se elimina, el usuario deja de estar autenticado y desaparece el acceso a las opciones administrativas. ProtectedRoute.jsx impide acceder a /perfil o /administracion sin una sesión válida.
9.6 Consideraciones adicionales de seguridad
- HTTPS debe mantenerse habilitado en los despliegues públicos.
- Los roles administrativos deben comprobarse en el backend, no solamente en React.
- JWT y contraseñas reales no deben incluirse en README, capturas ni colecciones exportadas.
- sessionStorage evita la persistencia al cerrar la pestaña, pero sigue siendo accesible por JavaScript: se deben prevenir ataques XSS.
- La expiración controla la vigencia del token; no sustituye una estrategia de revocación inmediata de JWT ya emitidos.

10. Pruebas realizadas con Postman
Resultados heredados de la Tarea 4
No.	Prueba	Método	HTTP obtenido
1	Listar productos	GET	200 OK
2	Registrar usuario	POST	201 Created
3	Iniciar sesión	POST	200 OK
4	Consultar perfil	GET	200 OK
5	Consultar producto por ID	GET	200 OK
6	Login administrador	POST	200 OK
7	Crear producto	POST	201 Created
8	Editar producto	PUT	200 OK
9	Eliminar producto	DELETE	204 No Content


Pruebas realizadas para la Tarea 5 (API local)
No.	Prueba	Método y endpoint	HTTP observado	Evidencia
10	Login y generación de JWT	POST /api/auth/login	200 OK	Token emitido
11	Perfil protegido con token válido	GET /api/auth/me	200 OK	Devuelve el perfil autenticado
12	Perfil protegido sin token	GET /api/auth/me	401 Unauthorized	error: unauthorized
13	Perfil protegido con token expirado	GET /api/auth/me	401 Unauthorized	error: token_expired y mensaje solicitado


En las pruebas de React se observó el cierre de sesión, la redirección hacia /login y el aviso visible de sesión caducada. Las respuestas de Postman confirmaron el rechazo de tokens vencidos y de peticiones sin autenticación. Las pruebas de la Tarea 5 se realizaron contra localhost:4000; todavía debe comprobarse el nuevo despliegue público.
Procedimiento de expiración: ejecutar el login, copiar el token, obtener 200 en /api/auth/me, esperar más de 300 segundos sin regenerar el token y repetir la consulta con exactamente el mismo Bearer Token. El resultado esperado y observado es 401 token_expired.

11. Colección de Postman
Guardar el archivo exportado y corregido en:
postman/NovaTech_Store_Tarea5_Seguridad_JWT_CORREGIDA.postman_collection.json
La colección debe ser compatible con Postman Collection v2.1 e incluir las cuatro peticiones JWT de la Tarea 5, además de las pruebas anteriores si se desea mantener el historial del CRUD.
Para ejecutarla, configurar las variables locales del correo, contraseña y token; realizar primero el login y después las pruebas de perfil. La solicitud sin token debe tener No Auth y la de token expirado debe enviar el mismo Bearer Token después de que transcurran cinco minutos.
Antes de subir a GitHub, inspeccionar el JSON exportado para comprobar que no contenga contraseñas reales ni JWT copiados en texto plano.

12. Ejecución local y variables de entorno
Backend
cd backend
npm install
npm run dev
El servidor utiliza por defecto http://localhost:4000/api si PORT no indica otro valor.
Conservar en backend/.env la configuración existente de MongoDB y añadir/verificar:
MONGODB_URI=CADENA_PRIVADA_DE_MONGODB_ATLAS
JWT_SECRET=SECRETO_ALEATORIO_NO_PUBLICO
JWT_EXPIRES_IN=300s
PORT=4000
Frontend
Desde la raíz del repositorio:
npm install
npm run dev
En el archivo .env del frontend, utilizar la URL base que incluye /api:
VITE_API_URL=http://localhost:4000/api
En el despliegue de Netlify se debe utilizar la URL pública de Render con /api al final.

13. Despliegue y enlaces
Recurso	URL de referencia
Frontend Netlify	https://tiendaenlineaiv.netlify.app/
Backend Render (catálogo)	https://tareaiitiendaenlinea.onrender.com/api/recursos
Repositorio GitHub, rama Tarea 4	https://github.com/fmoralesa6-lgtm/TAREAIITIENDAENLINEA/tree/Tarea4
Repositorio GitHub, rama Tarea 5	https://github.com/fmoralesa6-lgtm/TAREAIITIENDAENLINEA/tree/Tarea5


Estado de la Tarea 5: las pruebas citadas se realizaron localmente. La publicación de la rama Tarea5 y la actualización de los despliegues de Netlify y Render deben verificarse antes de la entrega definitiva.
Para desplegar la Tarea 5, seleccionar su rama en los servicios o seguir el flujo de despliegue del repositorio, configurar JWT_SECRET y JWT_EXPIRES_IN=300s en Render y comprobar VITE_API_URL en Netlify. Realizar luego una prueba de login y expiración contra el backend publicado.

14. Integrantes y responsabilidades
La Tarea 4 se desarrolló con responsabilidades divididas entre backend y frontend. Para la Tarea 5, la siguiente tabla debe revisarse con el equipo y reflejar solo el trabajo realizado por cada integrante.
Nombre completo	Carné	Responsabilidades
Fredy Leonel Morales Albizures	9490-23-16408	Backend Express y MongoDB, JWT de 5 minutos, middleware de autenticación, integración de la gestión de sesión en React, pruebas Postman y documentación de la Tarea 5.
Mauricio [completar apellidos]	[completar carné]	Desarrollo de páginas y componentes visuales de React en la Tarea 4. [Precisar su aporte efectivo a la Tarea 5 antes de entregar].


Distribución previa de Tarea 4
- Fredy (backend): desarrollo y organización de la API REST, configuración de Express, integración de MongoDB, controladores y endpoints, autenticación JWT, CRUD, despliegue del backend y pruebas en Postman.
- Mauricio (frontend): desarrollo y organización de páginas y componentes React, diseño de las interfaces y funcionalidades visuales.

15. Repositorio y control de versiones
La Tarea 4 permanece en la rama Tarea4. Para la nueva entrega se creó la rama Tarea5, con el propósito de conservar los cambios anteriores y registrar la evolución de seguridad de la aplicación.
Antes de publicar:
git status
git check-ignore backend/.env
git check-ignore .env
git add README.md postman/ backend/src/ src/
git diff --cached --stat
git commit -m "Tarea 5: seguridad JWT y expiracion de sesion"
git push -u origin Tarea5
Estos comandos son una guía: revisar primero los archivos preparados y añadir también los archivos de configuración no secretos que efectivamente se hayan modificado. Si un .env estaba versionado previamente, .gitignore por sí solo no lo retira del historial; hay que dejar de rastrearlo y rotar los secretos comprometidos.

16. Conclusiones
Con la Tarea 5, NovaTech Store evolucionó desde una tienda con autenticación y CRUD hacia una implementación de sesión JWT con vencimiento estricto de cinco minutos y comprobaciones de acceso en la API.
El backend valida el Bearer Token y diferencia los errores por token ausente, inválido o expirado, mientras React conserva el estado global, elimina el token vencido, muestra un aviso contextual y regresa al login. Las pruebas locales con Postman y el navegador confirmaron los principales flujos de autenticación y expiración.
Como pasos finales quedan la revisión de datos de integrantes, la publicación del código en GitHub y la comprobación de Netlify y Render con la versión de la Tarea 5.