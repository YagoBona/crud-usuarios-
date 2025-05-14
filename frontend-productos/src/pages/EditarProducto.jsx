import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getProductos, actualizarProducto } from "../services/api";

function EditarProducto() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({ nombre: "", precio: "", stock: "" });
  const [error, setError] = useState("");

  useEffect(() => {
    const cargarProducto = async () => {
      const productos = await getProductos();
      const producto = productos.find((p) => p.id === parseInt(id));
      if (!producto) {
        setError("Producto no encontrado");
        return;
      }
      setForm({
        nombre: producto.nombre,
        precio: producto.precio,
        stock: producto.stock,
      });
    };
    cargarProducto();
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await actualizarProducto(parseInt(id), {
        nombre: form.nombre,
        precio: parseFloat(form.precio),
        stock: parseInt(form.stock),
    });
      navigate("/"); // volver al listado
    } catch {
      setError("Error al actualizar el producto");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-bold text-center mb-6">Editar Producto</h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 max-w-md mx-auto rounded shadow"
      >
        {error && <p className="text-red-500 text-sm mb-3">{error}</p>}

        <div className="mb-3">
          <label className="block text-sm font-medium">Nombre</label>
          <input
            type="text"
            name="nombre"
            value={form.nombre}
            onChange={handleChange}
            className="mt-1 p-2 w-full border rounded"
          />
        </div>

        <div className="mb-3">
          <label className="block text-sm font-medium">Precio</label>
          <input
            type="number"
            name="precio"
            value={form.precio}
            onChange={handleChange}
            className="mt-1 p-2 w-full border rounded"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium">Stock</label>
          <input
            type="number"
            name="stock"
            value={form.stock}
            onChange={handleChange}
            className="mt-1 p-2 w-full border rounded"
          />
        </div>

        <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          Guardar cambios
        </button>
      </form>
    </div>
  );
}

export default EditarProducto;
