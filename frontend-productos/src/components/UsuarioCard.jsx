import { Link } from "react-router-dom";

function UsuarioCard({ usuario, onDelete }) {
  return (
    <div className="bg-white p-4 rounded shadow-md border hover:shadow-lg transition">
      <h2 className="text-lg font-semibold">{usuario.nombre}</h2>
      <p className="text-gray-700">Email: {usuario.email}</p>
      <p className="text-gray-500">Edad: {usuario.edad}</p>

      <div className="flex gap-2 mt-4">
        <button
          onClick={() => onDelete(usuario.id)}
          className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 text-sm"
        >
          Eliminar
        </button>
        <Link
          to={`/usuarios/editar/${usuario.id}`}
          className="bg-yellow-400 text-white px-3 py-1 rounded hover:bg-yellow-500 text-sm"
        >
          Editar
        </Link>
      </div>
    </div>
  );
}

export default UsuarioCard;
