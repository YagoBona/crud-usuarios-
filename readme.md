# 🧠 CRUD de Usuarios con Express.js

Este proyecto es una API REST creada con **Node.js** y **Express** que permite gestionar una lista de usuarios. Los datos se almacenan en un archivo `usuarios.json`, simulando una base de datos para fines prácticos y educativos.

---

## 📦 Características

- CRUD completo de usuarios (Create, Read, Update, Delete)
- Almacenamiento persistente en archivo JSON
- Validaciones básicas de campos requeridos
- Verificación de email único
- Errores claros y personalizados
- Probado con Thunder Client / Postman

---

## 🚀 Instalación y ejecución

1. Clonar el repositorio:

```bash
git clone https://github.com/tu-usuario/mi-api-usuarios.git
cd mi-api-usuarios
Instalar dependencias:

bash
Copiar
Editar
npm install
Iniciar el servidor:

bash
Copiar
Editar
node index.js
El servidor se ejecutará en http://localhost:3000

📁 Estructura del proyecto
go
Copiar
Editar
📦 mi-api-usuarios
├── index.js           // Código principal del servidor
├── usuarios.json      // Archivo donde se almacenan los usuarios
├── package.json       // Dependencias y scripts
└── README.md          // Este archivo
📌 Endpoints disponibles
✔️ GET /usuarios
Devuelve el listado completo de usuarios.

✔️ GET /usuarios/:id
Devuelve un usuario por su ID.
404 si no existe.

✔️ POST /usuarios
Crea un nuevo usuario.
Campos requeridos: nombre, email, edad.
Valida: email no vacío ni repetido.

✔️ PUT /usuarios/:id
Actualiza un usuario existente.
Valida: existencia del usuario, campos requeridos, email único.

✔️ DELETE /usuarios/:id
Elimina un usuario por ID.
Valida: existencia del usuario.

🔧 Tecnologías usadas
Node.js

Express.js

Thunder Client o Postman