const express = require("express");
const app = express();
const cors = require("cors");

const usuariosRoutes = require("./routes/usuarios.routes");

const productosRoutes = require("./routes/productos.routes");

app.use(cors());
app.use(express.json());

app.use("/usuarios", usuariosRoutes);
app.use("/productos", productosRoutes);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
