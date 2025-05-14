import { useEffect, useState } from "react";
import { getProductos, crearProducto } from "./services/api";
import ProductoCard from "./components/ProductoCard";
import { eliminarProducto } from "./services/api";


function App() {
  const [productos, setProductos] = useState([]);
  const [form, setForm] = useState({
    nombre: "",
    precio: "",
    stock: "",
  });

  const [error, setError] = useState("");

  useEffect(() => {
    cargarProductos();
  }, []);

  const cargarProductos = async () => {
    const data = await getProductos();
    setProductos(data);
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  if (!form.nombre || !form.precio || !form.stock) {
    setError("Todos los campos son obligatorios");
    return;
  }

  try {
    const productoData = {
      nombre: form.nombre,
      precio: parseFloat(form.precio),
      stock: parseInt(form.stock),
    };

    if (editandoId) {
      await actualizarProducto(editandoId, productoData);
    } else {
      await crearProducto(productoData);
    }

    setForm({ nombre: "", precio: "", stock: "" });
    setEditandoId(null);
    setError("");
    cargarProductos();
  } catch (err) {
    setError("Error al guardar el producto");
  }
};


  const handleEliminar = async (id) => {
  const confirmar = window.confirm("¿Estás seguro de que querés eliminar este producto?");
  if (!confirmar) return;

  try {
    await eliminarProducto(id);
    cargarProductos();
  } catch (err) {
    alert("Error al eliminar el producto");
  }
};

const [editandoId, setEditandoId] = useState(null);
const handleEditar = (producto) => {
  setForm({
    nombre: producto.nombre,
    precio: producto.precio,
    stock: producto.stock,
  });
  setEditandoId(producto.id);
  window.scrollTo({ top: 0, behavior: "smooth" }); // opcional
};


  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Gestión de Productos</h1>

      {/* FORMULARIO */}
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md mb-8 max-w-md mx-auto">
        <h2 className="text-xl font-semibold mb-4">Agregar nuevo producto</h2>

        {error && <p className="text-red-500 text-sm mb-3">{error}</p>}

        <div className="mb-3">
          <label className="block text-sm font-medium text-gray-700">Nombre</label>
          <input
            type="text"
            name="nombre"
            value={form.nombre}
            onChange={handleChange}
            className="mt-1 p-2 border rounded w-full"
            placeholder="Ej: Teclado Mecánico"
          />
        </div>

        <div className="mb-3">
          <label className="block text-sm font-medium text-gray-700">Precio</label>
          <input
            type="number"
            name="precio"
            value={form.precio}
            onChange={handleChange}
            className="mt-1 p-2 border rounded w-full"
            placeholder="Ej: 19999"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Stock</label>
          <input
            type="number"
            name="stock"
            value={form.stock}
            onChange={handleChange}
            className="mt-1 p-2 border rounded w-full"
            placeholder="Ej: 15"
          />
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          Crear Producto
        </button>
      </form>

<h1 className="text-3xl font-bold mb-6 text-center">Listado de Productos</h1>

      {/* LISTADO */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {productos.map((producto) => (
          <ProductoCard key={producto.id} producto={producto} onDelete={handleEliminar} onEdit={handleEditar} />
        ))}
      </div>
    </div>
  );
}

export default App;
