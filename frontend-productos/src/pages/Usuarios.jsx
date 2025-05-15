import { useEffect, useState } from "react";
import { getUsuarios, crearUsuario, eliminarUsuario } from "../services/usuariosApi";
import UsuarioCard from "../components/UsuarioCard";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";


function Usuarios() {
  const [usuarios, setUsuarios] = useState([]);
  const [form, setForm] = useState({ nombre: "", email: "", edad: "" });
  const [error, setError] = useState("");

  useEffect(() => {
    cargarUsuarios();
  }, []);

  const cargarUsuarios = async () => {
    const data = await getUsuarios();
    setUsuarios(data);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.nombre || !form.email || !form.edad) {
      setError("Todos los campos son obligatorios");
      return;
    }

    try {
      await crearUsuario({
        nombre: form.nombre,
        email: form.email,
        edad: parseInt(form.edad),
      });
      setForm({ nombre: "", email: "", edad: "" });
      setError("");
      cargarUsuarios();
    } catch (err) {
      setError("Error al crear usuario");
    }
  };

  const handleEliminar = async (id) => {
  const confirmar = window.confirm("¿Eliminar este usuario?");
  if (!confirmar) return;

  try {
    await eliminarUsuario(id);
    cargarUsuarios(); // recarga la lista
  } catch (err) {
    alert("Error al eliminar el usuario");
  }
    };

    const exportarUsuariosPDF = () => {
  const doc = new jsPDF();

  doc.setFontSize(16);
  doc.text("Listado de Usuarios", 14, 15);

  autoTable(doc, {
    startY: 20,
    head: [["#", "Nombre", "Email", "Edad"]],
    body: usuarios.map((usuario, i) => [
      i + 1,
      usuario.nombre,
      usuario.email,
      usuario.edad,
    ]),
    styles: {
      fontSize: 10,
      cellPadding: 4,
    },
    headStyles: {
      fillColor: [22, 160, 133], // Verde
      textColor: 255,
      halign: "center",
    },
    columnStyles: {
      0: { halign: "center", cellWidth: 10 },
      3: { halign: "center", cellWidth: 20 },
    },
  });

  doc.save("usuarios.pdf");
};



  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-center mb-6">Gestión de Usuarios</h1>

      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md mb-8 max-w-md mx-auto">
        <h2 className="text-xl font-semibold mb-4">Agregar nuevo usuario</h2>

        {error && <p className="text-red-500 text-sm mb-3">{error}</p>}

        <div className="mb-3">
          <label className="block text-sm font-medium text-gray-700">Nombre</label>
          <input
            type="text"
            name="nombre"
            value={form.nombre}
            onChange={handleChange}
            className="mt-1 p-2 border rounded w-full"
            placeholder="Ej: Juan Pérez"
          />
        </div>

        <div className="mb-3">
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            className="mt-1 p-2 border rounded w-full"
            placeholder="Ej: juan@email.com"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Edad</label>
          <input
            type="number"
            name="edad"
            value={form.edad}
            onChange={handleChange}
            className="mt-1 p-2 border rounded w-full"
            placeholder="Ej: 30"
          />
        </div>

        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">
          Crear Usuario
        </button>
      </form>
        
        <div className="flex justify-center mb-6">
        <button
            onClick={exportarUsuariosPDF}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
        >
            Exportar a PDF
        </button>
        </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {usuarios.map((usuario) => (
          <UsuarioCard key={usuario.id} usuario={usuario} onDelete={handleEliminar} />
        ))}
      </div>
    </div>
  );
}

export default Usuarios;
