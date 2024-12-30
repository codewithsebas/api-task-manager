# Task Manager API

Task Manager API es una aplicación backend diseñada para gestionar tareas. Esta API permite crear, leer, actualizar y eliminar tareas, además de ofrecer una documentación clara mediante Swagger.

### Deploy API

```bash
https://api-task-manager-9xyj.onrender.com/api/tasks
```

### Documentación API

```bash
https://api-task-manager-9xyj.onrender.com/api-docs/
```

## Requisitos Previos

- **Node.js** v18 o superior
- **MongoDB** (local o en la nube, como MongoDB Atlas)
- Un cliente HTTP como [Postman](https://www.postman.com/) o [cURL](https://curl.se/)

## Instalación

**Clona el repositorio**:
```bash
git clone https://github.com/codewithsebas/api-task-manager.git
cd api-task-manager
```

**Instala las dependencias**:

```bash
npm install
```

**Configura las variables de entorno**:

Crea un archivo .env en el directorio raíz con el siguiente contenido:

```bash
MONGO_URI=tu_uri_de_mongodb
PORT=3000
```

Reemplaza tu_uri_de_mongodb con tu cadena de conexión a MongoDB (local o Atlas).

**Ejecuta el servidor**:


```bash
npm start
```

**Ruta de Documentación de la API**:
```bash
http://localhost:5000/api-docs/
```

## Recursos utilizados

Node.js: Plataforma principal para la ejecución del backend.

Express.js: Framework minimalista para la creación de aplicaciones web y APIs.

MongoDB: Base de datos NoSQL para almacenar las tareas.

Mongoose: ODM (Object Data Modeling) para interactuar con MongoDB.

express-validator: Middleware para validaciones de datos en los endpoints.

dotenv: Manejo de variables de entorno para configuración segura.

Swagger: Herramienta para la documentación interactiva de la API.

Postman: Cliente HTTP para pruebas de la API en entornos locales o remotos.

Cors: Middleware para habilitar el acceso desde dominios cruzados.

JSDoc: Estándar para comentarios y documentación del código fuente.
