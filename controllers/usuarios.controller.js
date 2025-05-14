const fs = require("fs");
const path = require("path");

const usuariosPath = path.join(__dirname, "../data/usuarios.json");

const leerUsuarios = () => {
  const data = fs.readFileSync(usuariosPath, "utf-8");
  return JSON.parse(data);
};

const guardarUsuarios = (data) => {
  fs.writeFileSync(usuariosPath, JSON.stringify(data, null, 2));
};

module.exports = {
  getUsuarios: (req, res) => {
    const usuarios = leerUsuarios();
    res.json(usuarios);
  },

  getUsuarioById: (req, res) => {
    const usuarios = leerUsuarios();
    const usuario = usuarios.find((u) => u.id === req.params.id);
    if (!usuario) return res.status(404).json({ error: "Usuario no encontrado" });
    res.json(usuario);
  },

  crearUsuario: (req, res) => {
    const { nombre, email, edad } = req.body;
    if (!nombre || !email || !edad) {
      return res.status(400).json({ error: "Faltan campos obligatorios" });
    }

    const usuarios = leerUsuarios();

    // Validar email no repetido
    const emailRepetido = usuarios.find((u) => u.email === email);
    if (emailRepetido) {
      return res.status(400).json({ error: "Email ya registrado" });
    }

    const nuevoUsuario = {
      id: usuarios.length ? usuarios[usuarios.length - 1].id + 1 : 1,
      nombre,
      email,
      edad,
    };

    usuarios.push(nuevoUsuario);
    guardarUsuarios(usuarios);
    res.status(201).json(nuevoUsuario);
  },

  actualizarUsuario: (req, res) => {
    const usuarios = leerUsuarios();
    const usuario = usuarios.find((u) => u.id === req.params.id);

    if (!usuario) return res.status(404).json({ error: "Usuario no encontrado" });

    const { nombre, email, edad } = req.body;
    if (!nombre || !email || !edad) {
      return res.status(400).json({ error: "Faltan campos obligatorios" });
    }

    usuario.nombre = nombre;
    usuario.email = email;
    usuario.edad = edad;

    guardarUsuarios(usuarios);
    res.json(usuario);
  },

  eliminarUsuario: (req, res) => {
    let usuarios = leerUsuarios();
    const usuario = usuarios.find((u) => u.id === req.params.id);
    if (!usuario) return res.status(404).json({ error: "Usuario no encontrado" });

    usuarios = usuarios.filter((u) => u.id !== req.params.id);
    guardarUsuarios(usuarios);
    res.json({ mensaje: "Usuario eliminado correctamente" });
  },
};
