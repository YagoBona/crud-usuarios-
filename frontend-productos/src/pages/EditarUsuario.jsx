import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getUsuarios, actualizarUsuario } from "../services/usuariosApi";

function EditarUsuario() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({ nombre: "", email: "", edad: "" });
  const [error, setError] = useState("");

  useEffect(() => {
    const cargarUsuario = async () => {
      const usuarios = await getUsuarios();
      const usuario = usuarios.find((u) => u.id === parseInt(id));
      if (!usuario) {
        setError("Usuario no encontrado");
        return;
      }
      setForm({
        nombre: usuario.nombre,
        email: usuario.email,
        edad: usuario.edad,
      });
    };
    cargarUsuario();
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await actualizarUsuario(parseInt(id), {
        nombre: form.nombre,
        email: form.email,
        edad: parseInt(form.edad),
      });
      navigate("/usuarios");
    } catch (err) {
      setError("Error al actualizar usuario");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-bold text-center mb-6">Editar Usuario</h1>

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
          <label className="block text-sm font-medium">Email</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            className="mt-1 p-2 w-full border rounded"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium">Edad</label>
          <input
            type="number"
            name="edad"
            value={form.edad}
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

export default EditarUsuario;
