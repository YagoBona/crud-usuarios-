import { Link } from "react-router-dom";


function ProductoCard({ producto, onDelete, onEdit  }) {
  return (
    <div className="bg-white rounded-xl shadow p-4 border hover:shadow-md transition">
      <h2 className="text-xl font-semibold">{producto.nombre}</h2>
      <p className="text-gray-700">Precio: ${producto.precio}</p>
      <p className="text-gray-500">Stock: {producto.stock}</p>

      <div className="flex gap-2 mt-4">
        <button
          onClick={() => onDelete(producto.id)}
          className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 text-sm"
        >
          Eliminar
        </button>

        <Link
            to={`/editar/${producto.id}`}
            className="bg-yellow-400 text-white px-3 py-1 rounded hover:bg-yellow-500 text-sm inline-block text-center"
        >
            Editar
        </Link>


      </div>
    </div>
  );
}

export default ProductoCard;
