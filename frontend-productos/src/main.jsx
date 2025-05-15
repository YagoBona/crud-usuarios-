import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App.jsx";
import EditarProducto from "./pages/EditarProducto.jsx";
import "./index.css";
import Usuarios from "./pages/Usuarios.jsx";
import EditarUsuario from "./pages/EditarUsuario.jsx";


ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/editar/:id" element={<EditarProducto />} />
        <Route path="/usuarios" element={<Usuarios />} />
        <Route path="/usuarios/editar/:id" element={<EditarUsuario />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
