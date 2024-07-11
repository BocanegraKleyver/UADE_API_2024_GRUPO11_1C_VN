import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutUsuario } from "../../Redux/UsuarioSlice";

export const AsideHeader = () => {
  const dispatch = useDispatch();
  const usuario = useSelector((state) => state.usuario.usuario);

  const handleLogout = () => {
    dispatch(logoutUsuario());
  };

  const isAdmin = usuario?.authorities?.some(auth => auth.authority === 'Admin');

  return (
    <aside className="h-[100vh] bg-yellow-600">
      <header>
        <h1 className="logo">
          <Link to="/" className="logo-link">
            SillaShop
          </Link>
        </h1>
      </header>
      <nav>
        <ul>
          {usuario ? (
            <>
              <li>
                <Link to="/carrito" className="boton-menu boton-home" activeClassName="active">
                  Carrito
                </Link>
              </li>
              {isAdmin && (
                <li>
                  <Link to="/administrar" className="boton-menu boton-administrar" activeClassName="active">
                    Administrar
                  </Link>
                </li>
              )}
              <li>
                <Link to="/mis-compras" className="boton-menu boton-vender-tus-productos" activeClassName="active">
                  Mis compras
                </Link>
              </li>
              <li>
                <Link to="/favoritos" className="boton-menu boton-carrito" activeClassName="active">
                  Mis favoritos
                </Link>
              </li>
              <li>
                <Link to="/VenderProducto" className="boton-menu boton-vender-producto" activeClassName="active">
                  Vender tus Productos
                </Link>
              </li>
              <li>
                <button onClick={handleLogout} className="boton-menu boton-logout">
                  Logout
                </button>
              </li>
            </>
          ) : (
            <li>
              <Link to="/usuarios" className="boton-menu boton-home" activeClassName="active">
                Iniciar sesión
              </Link>
            </li>
          )}
        </ul>
      </nav>
      <footer>
        <p className="texto-footer">© API 2024 Grupo 11</p>
      </footer>
    </aside>
  );
};
