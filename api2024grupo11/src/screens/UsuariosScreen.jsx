import React, { useState } from "react";
import { Link } from "react-router-dom";
import { LoggearUsuario } from "../Services/usuarioService";

export const UsuariosScreen = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSetUsername = (event) => {
    setUsername(event.target.value);
  };

  const handleSetPassword = (event) => {
    setPassword(event.target.value);
  };

  const handleIngresar = async (e) => {
    e.preventDefault()
    const token = await LoggearUsuario(password, username);

  };

  return (
    <div className="Usuario_Screen">
      <div className="navbar navbar-clear">
        <div className="navbar-inner">
          <div className="center sliding"></div>
        </div>
      </div>

      <div className="pages navbar-fixed toolbar-fixed">
        <div data-page="Usuario" className="page">
          <div className="page-content">
            <div class="nice-header header-fix-top small">
              <div className="logo">
                <h3 class="font-bold text-2xl">Iniciar Sesion</h3>
              </div>
            </div>
            <hr></hr>

            <div className="Usuario_form">
              <form onSubmit={(e) => handleIngresar(e)}>
                <br></br>
                <div>
                  <label className="Usuario_form_label"> Email </label>
                  <br></br>
                  <input
                    type="text"
                    id="username"
                    value={username}
                    onChange={handleSetUsername}
                  ></input>
                </div>
                <br></br>

                <div>
                  <label className="Usuario_form_label"> Password </label>
                  <br></br>
                  <input
                    type="text"
                    id="password"
                    value={password}
                    onChange={handleSetPassword}
                  ></input>
                </div>
                <button
                  type="submit"
                  className="p-2 my-3 rounded-md bg-black text-white font-semibold text-sm hover:bg-slate-900 text-center"
                >
                  Ingresar
                </button>

                <div>
                  <Link
                    className="p-2 my-3 rounded-md bg-black text-white font-semibold text-sm hover:bg-slate-900 text-center boton-menu boton-crear-usuario active"
                    to="/crearUsuario"
                  >
                    Crear usuario
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
