SYNELTEC Backend - Documentación Técnica
Descripción general
API REST desarrollada con Node.js, Express y MongoDB para la gestión de usuarios, productos, categorías y reglas de precios dinámicas. Incluye autenticación mediante JWT, control de roles (usuario / administrador) y un CRUD completo conectado a una base de datos MongoDB Atlas.
Características principales

- API REST modular basada en Express
- Conexión a MongoDB Atlas con Mongoose
- Autenticación y autorización mediante JWT
- Middleware de validación y roles
- CRUD completo de productos y categorías
- Sistema de reglas de precios por usuario o categoría
- Variables de entorno gestionadas con dotenv
- Despliegue en Vercel
- Documentación compatible con Postman
  Estructura del proyecto
  SYNELTEC-BACKEND/
  ├── config/
  │ └── db.js # Conexión a MongoDB
  ├── controllers/
  │ ├── authController.js
  │ ├── productController.js
  │ ├── categoryController.js
  │ └── pricingController.js
  ├── middleware/
  │ ├── auth.js
  │ └── isAdmin.js
  ├── models/
  │ ├── User.js
  │ ├── Product.js
  │ ├── Category.js
  │ └── PricingRule.js
  ├── routes/
  │ ├── authRoutes.js
  │ ├── productRoutes.js
  │ ├── categoryRoutes.js
  │ └── pricingRoutes.js
  ├── .env.example
  ├── vercel.json
  ├── package.json
  └── server.js
  Instalación local

1. Clonar el repositorio:
   git clone https://github.com/francojsequeira/SYNELTEC-BACKEND.git
   cd SYNELTEC-BACKEND

2. Instalar dependencias:
   npm install

3. Crear el archivo .env con:
   PORT=4000
   MONGODB_URI=tu_string_de_conexion_a_mongo
   JWT_SECRET=tu_clave_secreta

4. Iniciar el servidor:
   npm run dev

El backend estará disponible en http://localhost:4000
Configuración de variables de entorno
El archivo .env debe incluir:
PORT: Puerto donde corre el servidor
MONGODB_URI: URL de conexión a MongoDB Atlas
JWT_SECRET: Clave secreta para firmar tokens JWT
Conexión con MongoDB Atlas

1. Ingresar a https://www.mongodb.com/
2. Crear cuenta o iniciar sesión
3. Crear un cluster gratuito (Free Tier)
4. En Network Access, permitir acceso desde cualquier IP (0.0.0.0/0)
5. Crear un usuario de base de datos con contraseña
6. Obtener el connection string desde 'Connect -> Drivers'
7. Agregar ese string en la variable MONGODB_URI del archivo .env
   Despliegue en Vercel
8. Crear archivo vercel.json:
   {
   "version": 2,
   "rewrites": [
   { "source": "/api/(.*)", "destination": "/api" }
   ]
   }

9. Subir el proyecto a GitHub
10. En Vercel -> Project Settings -> Environment Variables agregar:
    PORT=4000
    MONGODB_URI=tu_conexion_a_mongo
    JWT_SECRET=tu_clave_secreta
11. Realizar el deploy automático con git push
    Endpoints principales
    Autenticación:
    POST /api/auth/register -> Registro de usuario
    POST /api/auth/login -> Login, devuelve token JWT
    GET /api/auth/profile -> Perfil del usuario logueado (requiere JWT)

Productos:
GET /api/products -> Listar productos
GET /api/products/:id -> Ver detalle
POST /api/products -> Crear (requiere admin)
PUT /api/products/:id -> Editar (requiere admin)
DELETE /api/products/:id -> Eliminar (requiere admin)

Categorías:
GET /api/categories -> Listar
POST /api/categories -> Crear (requiere admin)
PUT /api/categories/:id -> Editar (requiere admin)
DELETE /api/categories/:id -> Eliminar (requiere admin)

Reglas de precios:
POST /api/pricing -> Crear regla
GET /api/pricing/:productId/:userId -> Consultar precio final
Autenticación y roles
El sistema usa JWT (Json Web Token) para autenticar usuarios.

1. El usuario inicia sesión y el backend genera un token JWT.
2. El token se incluye en el encabezado 'Authorization: Bearer <token>'.
3. Los middleware auth.js y isAdmin.js verifican el token y los permisos.
   Pruebas con Postman
4. Iniciar el backend con 'npm run dev'
5. Abrir Postman
6. Crear colección 'SYNELTEC API'
7. Agregar requests para login, crear y listar productos
8. Copiar el token del login y agregarlo en los headers:
   Authorization: Bearer TU_TOKEN
   Tecnologías utilizadas

- Node.js
- Express.js
- MongoDB + Mongoose
- JWT
- bcryptjs
- dotenv
- Vercel
  Buenas prácticas aplicadas
- Arquitectura MVC (Model - View - Controller)
- Separación de rutas, controladores y modelos
- Middlewares reutilizables
- Variables de entorno seguras
- Manejo de errores con try/catch
- Código limpio y documentado
- Documentación completa en Postman y README
  Autor
  Franco Sequeira
  GitHub: https://github.com/francojsequeira
  Proyecto desarrollado como parte del curso Full Stack Developer.
