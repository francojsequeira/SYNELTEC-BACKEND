# SYNELTEC API - Sistema de Gestión Comercial

## Descripción
API REST desarrollada para el sistema de gestión comercial de Syneltec, implementando el backend del TP1. 
Permite la gestión completa de usuarios, productos, categorías y un innovador sistema de reglas de precios dinámicas. 
La API facilita la administración del catálogo de productos, control de usuarios y precios personalizados por cliente.

## Características Principales
- API REST modular basada en Express
- Conexión a MongoDB Atlas con Mongoose
- Autenticación y autorización mediante JWT
- Middleware de validación y roles
- CRUD completo de productos y categorías
- Sistema de reglas de precios por usuario o categoría
- Variables de entorno gestionadas con dotenv
- Despliegue en Vercel
- Documentación compatible con Postman

## Tecnologías Utilizadas
- Node.js - Entorno de ejecución
- Express.js - Framework web
- MongoDB - Base de datos NoSQL
- Mongoose - ODM para MongoDB
- JWT (JSON Web Tokens) - Autenticación
- bcryptjs - Encriptación de contraseñas
- dotenv - Gestión de variables de entorno
- Vercel - Plataforma de despliegue

## Estructura del Proyecto
```
SYNELTEC-BACKEND/
├── config/
│   └── db.js              # Conexión a MongoDB
├── controllers/
│   ├── authController.js
│   ├── productController.js
│   ├── categoryController.js
│   └── pricingController.js
├── middleware/
│   ├── auth.js
│   └── isAdmin.js
├── models/
│   ├── User.js
│   ├── Product.js
│   ├── Category.js
│   └── PricingRule.js
├── routes/
│   ├── authRoutes.js
│   ├── productRoutes.js
│   ├── categoryRoutes.js
│   └── pricingRoutes.js
├── .env.example
├── vercel.json
├── package.json
└── server.js
```
## Cómo Correr el Proyecto

### 1. Clonar el repositorio
```bash
git clone https://github.com/francojsequeira/SYNELTEC-BACKEND.git
cd SYNELTEC-BACKEND
```

### 2. Instalar dependencias
```bash
npm install
```

### 3. Configurar variables de entorno
Crear un archivo `.env` en la raíz del proyecto con la siguiente estructura:
```
PORT=4000                              # Puerto donde correrá el servidor
MONGODB_URI=tu_cadena_de_conexion     # URL de conexión a MongoDB Atlas
JWT_SECRET=tu_clave_secreta           # Clave para firmar tokens JWT
```

### 4. Iniciar la aplicación
```bash
npm start
```

El servidor estará disponible en `http://localhost:4000`

## Endpoints de la API

### Autenticación

#### POST /api/auth/register
Registro de nuevo usuario
- **Descripción**: Crea una nueva cuenta de usuario
- **Requiere**: No requiere autenticación

#### POST /api/auth/login
Inicio de sesión
- **Descripción**: Autentica al usuario y devuelve un token JWT
- **Requiere**: No requiere autenticación

#### GET /api/auth/profile
Perfil de usuario
- **Descripción**: Obtiene los datos del usuario autenticado
- **Requiere**: Token JWT

### Productos

#### GET /api/products
- **Descripción**: Obtiene lista de todos los productos
- **Requiere**: No requiere autenticación

#### GET /api/products/:id
- **Descripción**: Obtiene detalle de un producto específico
- **Requiere**: No requiere autenticación

#### POST /api/products
- **Descripción**: Crea un nuevo producto
- **Requiere**: Token JWT + Rol Admin

#### PUT /api/products/:id
- **Descripción**: Actualiza un producto existente
- **Requiere**: Token JWT + Rol Admin

#### DELETE /api/products/:id
- **Descripción**: Elimina un producto
- **Requiere**: Token JWT + Rol Admin

### Categorías

#### GET /api/categories
- **Descripción**: Lista todas las categorías
- **Requiere**: No requiere autenticación

#### POST /api/categories
- **Descripción**: Crea una nueva categoría
- **Requiere**: Token JWT + Rol Admin

#### PUT /api/categories/:id
- **Descripción**: Actualiza una categoría existente
- **Requiere**: Token JWT + Rol Admin

#### DELETE /api/categories/:id
- **Descripción**: Elimina una categoría
- **Requiere**: Token JWT + Rol Admin

### Reglas de Precios

#### POST /api/pricing
- **Descripción**: Crea una nueva regla de precio
- **Requiere**: Token JWT + Rol Admin

#### GET /api/pricing/:productId/:userId
- **Descripción**: Consulta el precio final de un producto para un usuario específico
- **Requiere**: Token JWT

## Ejemplos de Datos Mock

### Registro de Usuario (POST /api/auth/register)
```json
{
  "name": "Juan Pérez",
  "email": "juan@example.com",
  "password": "contraseña123",
  "role": "user"
}
```

### Login (POST /api/auth/login)
```json
{
  "email": "juan@example.com",
  "password": "contraseña123"
}
```

### Crear Producto (POST /api/products)
```json
{
  "name": "Monitor LED 24\"",
  "description": "Monitor LED Full HD 1080p",
  "price": 89999.99,
  "category": "64f5e8b1c52864abf9876543",
  "stock": 10,
  "specifications": {
    "brand": "TechView",
    "model": "M24-LED",
    "resolution": "1920x1080",
    "refreshRate": "75Hz"
  }
}
```

### Crear Categoría (POST /api/categories)
```json
{
  "name": "Monitores",
  "description": "Monitores y pantallas",
  "active": true
}
```

### Crear Regla de Precio (POST /api/pricing)
```json
{
  "type": "category",
  "categoryId": "64f5e8b1c52864abf9876543",
  "userId": "64f5e8b1c52864abf9876544",
  "discountPercentage": 10,
  "startDate": "2023-11-01",
  "endDate": "2023-12-31"
}
```

## Autor
Franco Sequeira
- GitHub: https://github.com/francojsequeira

*Proyecto desarrollado como parte del curso Full Stack Developer.*
