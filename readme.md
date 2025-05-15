# 🧩 Panel CRUD de Productos y Usuarios con React + Express

Este proyecto es una aplicación web full stack construida con:

- 🔧 Backend: Node.js + Express + almacenamiento en archivos JSON
- 💻 Frontend: React + Tailwind CSS + React Router
- 📄 Exportación: jsPDF + jsPDF-AutoTable

Permite gestionar dos entidades (Productos y Usuarios) con operaciones CRUD completas: listar, crear, editar y eliminar. También ofrece exportación a PDF en formato tabla.

---

## 🗂️ Estructura

/backend
├── controllers/
├── routes/
├── data/
└── index.js

/frontend
├── pages/
├── components/
├── services/
└── main.jsx

---

## 🚀 Funcionalidades

### Productos
- ✅ Listado con nombre, precio y stock
- 📝 Formulario para crear productos
- 🗑️ Eliminar producto
- ✏️ Editar producto (en ruta /editar/:id)
- 📤 Exportar listado de productos a PDF en tabla

### Usuarios
- ✅ Listado con nombre, email y edad
- 📝 Formulario para crear usuarios
- 🗑️ Eliminar usuario
- ✏️ Editar usuario (en ruta /usuarios/editar/:id)
- 📤 Exportar listado de usuarios a PDF en tabla

---

## 📦 Tecnologías usadas

### Backend
- Node.js
- Express
- fs (manejo de archivos locales)
- JSON como almacenamiento persistente

### Frontend
- React
- Vite
- Tailwind CSS
- React Router DOM
- jsPDF + jspdf-autotable

---

## 🛠️ Instalación

### 🔁 1. Clonar el proyecto

git clone https://github.com/YagoBona/crud-usuarios-.git
cd mi-panel-crud

📦 2. Instalar dependencias
Backend
cd backend
npm install

Frontend
cd ../frontend
npm install

▶️ Ejecución en desarrollo

🚀 Iniciar backend (en puerto 3000)
cd backend
node index.js

💻 Iniciar frontend (en puerto 5173)
cd frontend
npm run dev

Abrí el navegador en:
http://localhost:5173

🧪 Rutas principales
Ruta	Descripción
/	Gestión de productos
/editar/:id	Edición de producto específico
/usuarios	Gestión de usuarios
/usuarios/editar/:id	Edición de usuario específico

📝 Consideraciones
No se usa base de datos, los datos se almacenan en archivos .json.

El backend debe estar corriendo para que el frontend funcione correctamente.

El proyecto es modular: controladores y rutas están separados por entidad.