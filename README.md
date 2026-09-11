# Tarea 3 - NovaTech Store

Este proyecto corresponde a la mejora de la tienda en línea desarrollada
previamente en React. En esta entrega se implementó una arquitectura de
gestión de estado global para controlar la autenticación y la información
del usuario dentro de toda la aplicación.

## Arquitectura seleccionada

### Opción A: Context API + useReducer

Para esta tarea se utilizó Context API combinado con useReducer.

Se eligió esta arquitectura porque permite mantener centralizado el estado
de autenticación sin necesidad de instalar una librería adicional. De esta
manera, componentes como el Navbar, Login y Perfil pueden consultar y
modificar la sesión directamente desde el estado global, evitando pasar
información manualmente mediante props entre diferentes componentes.

El uso de useReducer también permite manejar las acciones de autenticación
de una forma organizada y predecible.

## Estado global

El estado de autenticación contiene información como:

- Estado de autenticación del usuario.
- Datos del usuario autenticado.
- Estado de carga.
- Fecha del último acceso.

Las acciones implementadas son:

- LOGIN
- LOGOUT
- UPDATE_PROFILE
- SET_LOADING

## Componentes desarrollados

### AuthContext.jsx

Contiene el AuthProvider, el estado global y el reducer utilizado para
administrar la autenticación de toda la aplicación.

### Login.jsx

Formulario desarrollado con React-Bootstrap que permite realizar una
autenticación simulada. Valida el correo y la contraseña antes de registrar
la sesión.

### NavigationBar.jsx

La barra de navegación consulta directamente el estado global.

Cuando el usuario no ha iniciado sesión muestra la opción "Iniciar Sesión".

Cuando existe una sesión activa muestra el nombre del usuario, su membresía,
el acceso al perfil y el botón "Cerrar Sesión".

### Perfil.jsx

Muestra la información del usuario autenticado utilizando componentes de
React-Bootstrap como Card, Badge y ListGroup.

También muestra un historial de pedidos simulado y permite cerrar la sesión.

### ProtectedRoute.jsx

Protege la vista de perfil para evitar que un usuario que no haya iniciado
sesión pueda acceder directamente a esa sección.

## Credenciales de prueba

Correo:

cliente@novatech.com

Contraseña:

123456

## Tecnologías utilizadas

- React
- Vite
- JavaScript
- React Router
- React-Bootstrap
- Bootstrap
- Context API
- useReducer
- Git
- GitHub
- Netlify

## Sitio publicado

Pendiente de publicación en Netlify.

## Integrante

Nombre completo: Fredy Leonel Morales Albizures y Mauricio Isai Pérez Saban

Carné: 9490-23-16408 y 9490-23-25701

### Secciones desarrolladas

- Configuración de Context API y useReducer.
- AuthProvider.
- Login.
- Logout.
- Perfil de usuario.
- Navbar dinámico.
- Protección de rutas.
- Integración del estado global.

## Rama utilizada

Tarea3
