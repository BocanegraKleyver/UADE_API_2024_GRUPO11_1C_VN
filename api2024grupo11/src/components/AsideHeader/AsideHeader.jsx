import React from "react";

export const AsideHeader = () => {
  return (
    <aside className="h-[100vh] bg-yellow-600">
      <header>
        <h1 className="logo">
          <a class="logo-link" href="/">
            SillaShop
          </a>
        </h1>
      </header>
      <nav>
        <ul>
          <li>
            <a className="boton-menu boton-carrito active" href="/carrito">
              Carrito
            </a>
          </li>
          <li>
            <a
              className="boton-menu boton-vender-tus-productos active"
              href="/gestionProductos"
            >
              Gestiona tus Productos
            </a>
          </li>
          <li>
            <a
              className="boton-menu boton-vender-tus-productos active"
              href="/usuarios"
            >
              Iniciar sesion
            </a>
          </li>
          <li>
            <a className="boton-menu boton-carrito active" href="/favoritos">
              Mis favoritos
            </a>
          </li>
        </ul>
      </nav>
      <footer>
        <p className="texto-footer">© API 2024 Grupo 11</p>
      </footer>
    </aside>
  );
};
