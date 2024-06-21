import React from "react";
import { NavLink } from "react-router-dom"; // Importa NavLink para manejar enlaces activos

export const AsideHeader = () => {
  return (
    <aside className="h-[100vh] bg-yellow-600">
      <header>
        <h1 className="logo">
          <NavLink to="/" className="logo-link">
            SillaShop
          </NavLink>
        </h1>
      </header>
      <nav>
        <ul>
          <li>
            <NavLink to="/carrito" className="boton-menu boton-carrito" activeClassName="active">
              Carrito
            </NavLink>
          </li>
          <li>
            <NavLink to="/gestionProductos" className="boton-menu boton-vender-tus-productos" activeClassName="active">
              Gestiona tus Productos
            </NavLink>
          </li>
          <li>
            <NavLink to="/descuento" className="boton-menu boton-descuento" activeClassName="active">
              Descuentos
            </NavLink>
          </li>
          <li>
            <NavLink to="/categoria" className="boton-menu boton-categoria" activeClassName="active">
              Categorias
            </NavLink>
          </li>
          <li>
            <NavLink to="/producto" className="boton-menu boton-producto" activeClassName="active">
              Productos
            </NavLink>
          </li>
          <li>
            <NavLink to="/rol" className="boton-menu boton-rol" activeClassName="active">
              Rol
            </NavLink>
          </li>
          <li>
            <NavLink to="/administrar" className="boton-menu boton-administrar" activeClassName="active">
              Administrar
            </NavLink>
          </li>
        </ul>
      </nav>
      <footer>
        <p className="texto-footer">© API 2024 Grupo 11</p>
      </footer>
    </aside>
  );
};
