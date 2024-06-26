import React, { useState } from "react";
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

  const handleIngresar = async () => {
    await LoggearUsuario(password, username);
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
              <form>
                <br></br>
                <div>
                  <label className="Usuario_form_label"> Usuario </label>
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
                  className="p-2 my-3 rounded-md bg-black text-white font-semibold text-sm hover:bg-slate-900 text-center"
                  onClick={handleIngresar}
                >
                  Ingresar
                </button>

                <div>
                  <a
                    className="boton-menu boton-crear-usuario active"
                    href="/crearUsuario"
                  >
                    Crear usuario
                  </a>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
