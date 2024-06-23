import React from "react";
import { NavLink } from "react-router-dom"; 

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
            <NavLink to="/home" className="boton-menu boton-home" activeClassName="active">
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/administrar" className="boton-menu boton-administrar" activeClassName="active">
              Administrar
            </NavLink>
          </li>
          <li>
            <NavLink to="/administrar/categoria" className="boton-menu boton-categoria" activeClassName="active">
              Categorias
            </NavLink>
          </li>
          <li>
            <NavLink to="/administrar/descuento" className="boton-menu boton-descuento" activeClassName="active">
              Descuentos
            </NavLink>
          </li>
          <li>
            <NavLink to="/administrar//producto" className="boton-menu boton-producto" activeClassName="active">
              Productos
            </NavLink>
          </li>
          <li>
            <NavLink to="/catalogo" className="boton-menu boton-catalogo" activeClassName="active">
              Catalogo
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
