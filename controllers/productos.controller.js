const fs = require("fs");
const path = require("path");

const productosPath = path.join(__dirname, "../data/productos.json");

const leerProductos = () => {
  const data = fs.readFileSync(productosPath, "utf-8");
  return JSON.parse(data);
};

const guardarProductos = (data) => {
  fs.writeFileSync(productosPath, JSON.stringify(data, null, 2));
};

module.exports = {
  getProductos: (req, res) => {
    const productos = leerProductos();
    res.json(productos);
  },

  getProductoById: (req, res) => {
    const productos = leerProductos();
    const producto = productos.find((p) => p.id === req.params.id);
    if (!producto) return res.status(404).json({ error: "Producto no encontrado" });
    res.json(producto);
  },

  crearProducto: (req, res) => {
    const { nombre, precio, stock } = req.body;
    if (!nombre || !precio || !stock) {
      return res.status(400).json({ error: "Faltan campos obligatorios" });
    }

    const productos = leerProductos();
    const nuevoProducto = {
      id: productos.length ? productos[productos.length - 1].id + 1 : 1,
      nombre,
      precio,
      stock,
    };

    productos.push(nuevoProducto);
    guardarProductos(productos);
    res.status(201).json(nuevoProducto);
  },

  actualizarProducto: (req, res) => {
  const productos = leerProductos();
  const id = parseInt(req.params.id);
  const producto = productos.find((p) => p.id === id);

  if (!producto) {
    return res.status(404).json({ error: "Producto no encontrado" });
  }

  const { nombre, precio, stock } = req.body;

  if (!nombre || !precio || !stock) {
    return res.status(400).json({ error: "Faltan campos obligatorios" });
  }

  producto.nombre = nombre;
  producto.precio = precio;
  producto.stock = stock;

  guardarProductos(productos);
  res.json(producto);
},

  eliminarProducto: (req, res) => {
  let productos = leerProductos();
  const id = parseInt(req.params.id);
  const producto = productos.find((p) => p.id === id);

  if (!producto) return res.status(404).json({ error: "Producto no encontrado" });

  productos = productos.filter((p) => p.id !== id);
  guardarProductos(productos);
  res.json({ mensaje: "Producto eliminado correctamente" });
},
};
