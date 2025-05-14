const express = require('express');
const app = express();

const cors = require('cors')
app.use(cors())



// Middleware para leer JSON
app.use(express.json());

const fs = require('fs');
const path = require('path');

const rutaArchivo = path.join(__dirname, '/db/usuarios.json');

// Funcion para leer usuarios desde el archivo
function leerUsuarios() {
  const data = fs.readFileSync(rutaArchivo, 'utf8');
  return JSON.parse(data);
}

// Funcion para guardar usuarios en el archivo
function guardarUsuarios(usuarios) {
  fs.writeFileSync(rutaArchivo, JSON.stringify(usuarios, null, 2));
}

// Puerto en el que se ejecutará el servidor
const PORT = 3000;

// Ruta inicial de prueba
app.get('/', (req, res) => {
  res.send('API de Usuarios funcionando');
});

// GET /usuarios - Devuelve todos los usuarios
app.get('/usuarios', (req, res) => {
    const usuarios = leerUsuarios();
    res.json(usuarios);
  });
  
// GET /usuarios/:id - Devuelve un usuario por su ID
app.get('/usuarios/:id', (req, res) => {
    const usuarios = leerUsuarios();
    const id = parseInt(req.params.id);
    const usuario = usuarios.find(u => u.id === id);
  
    if (!usuario) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }
  
    res.json(usuario);
  });
  

// POST /usuarios - Crea un nuevo usuario
app.post('/usuarios', (req, res) => {
    const usuarios = leerUsuarios();
    const { nombre, email, edad } = req.body;
  
    if (!nombre || !email || !edad) {
      return res.status(400).json({ error: "Faltan datos obligatorios (nombre, email, edad)" });
    }
  
    const emailExistente = usuarios.find(u => u.email === email);
    if (emailExistente) {
      return res.status(400).json({ error: "El email ya está en uso" });
    }
  
    const nuevoUsuario = {
      id: usuarios.length ? usuarios[usuarios.length - 1].id + 1 : 1,
      nombre,
      email,
      edad
    };
  
    usuarios.push(nuevoUsuario);
    guardarUsuarios(usuarios);
  
    res.status(201).json(nuevoUsuario);
  });
  

// PUT /usuarios/:id - Actualiza un usuario existente
app.put('/usuarios/:id', (req, res) => {
    const usuarios = leerUsuarios();
    const id = parseInt(req.params.id);
    const usuario = usuarios.find(u => u.id === id);
  
    if (!usuario) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }
  
    const { nombre, email, edad } = req.body;
  
    if (!nombre || !email || !edad) {
      return res.status(400).json({ error: "Faltan datos obligatorios (nombre, email, edad)" });
    }
  
    const emailEnUso = usuarios.find(u => u.email === email && u.id !== id);
    if (emailEnUso) {
      return res.status(400).json({ error: "El email ya está en uso por otro usuario" });
    }
  
    usuario.nombre = nombre;
    usuario.email = email;
    usuario.edad = edad;
  
    guardarUsuarios(usuarios);
  
    res.json(usuario);
  });
  

// DELETE /usuarios/:id - Elimina un usuario por ID
app.delete('/usuarios/:id', (req, res) => {
    let usuarios = leerUsuarios();
    const id = parseInt(req.params.id);
    const usuario = usuarios.find(u => u.id === id);
  
    if (!usuario) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }
  
    usuarios = usuarios.filter(u => u.id !== id);
    guardarUsuarios(usuarios);
  
    res.json({ mensaje: `Usuario con ID ${id} eliminado correctamente.` });
  });
  
  

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
