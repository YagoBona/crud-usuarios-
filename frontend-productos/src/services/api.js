const API_URL = "http://localhost:3000/productos";

export const getProductos = async () => {
  const res = await fetch(API_URL);
  return await res.json();
};

export const crearProducto = async (producto) => {
  const res = await fetch("http://localhost:3000/productos", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(producto),
  });

  if (!res.ok) {
    throw new Error("Error al crear el producto");
  }

  return await res.json();
};

export const eliminarProducto = async (id) => {
  const res = await fetch(`http://localhost:3000/productos/${id}`, {
    method: "DELETE",
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.error || "Error al eliminar");
  }

  return await res.json();
};

export const actualizarProducto = async (id, producto) => {
  const res = await fetch(`http://localhost:3000/productos/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(producto),
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.error || "Error al actualizar");
  }

  return await res.json();
};
