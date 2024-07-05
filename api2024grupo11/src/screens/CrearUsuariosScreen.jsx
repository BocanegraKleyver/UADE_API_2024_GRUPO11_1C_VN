import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { CrearUsuarios } from "../Services/usuarioService";

export const CrearUsuariosScreen = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleSetUsername = (event) => {
    setUsername(event.target.value);
  };

  const handleSetPassword = (event) => {
    setPassword(event.target.value);
  };

  const handleSetNombre = (event) => {
    setNombre(event.target.value);
  };

  const handleSetApellido = (event) => {
    setApellido(event.target.value);
  };
  const handleSetEmail = (event) => {
    setEmail(event.target.value);
  };

  const handleCrearUsuario = async () => {
    await CrearUsuarios(username, password, nombre, apellido, email);
    navigate("/");
  };

  return (
    <div className="CrearUsuarios_Screen">
      <div className="navbar navbar-clear">
        <div className="navbar-inner">
          <div className="center sliding"></div>
        </div>
      </div>

      <div className="pages navbar-fixed toolbar-fixed">
        <div data-page="Crear Usuario" className="page">
          <div className="page-content">
            <div class="nice-header header-fix-top small">
              <div className="logo">
                <h3 class="font-bold text-2xl">Nuevo usuario</h3>
              </div>
            </div>
            <hr></hr>

            <div className="Crear_Usuario_form">
              <form>
                <br></br>
                <div>
                  <label className="Crear_Usuario_form_label"> Usuario </label>
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
                  <label className="Crear_Usuario_form_label"> Password </label>
                  <br></br>
                  <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={handleSetPassword}
                  ></input>
                </div>

                <br></br>
                <div>
                  <label className="Crear_Usuario_form_label"> Nombre </label>
                  <br></br>
                  <input
                    type="text"
                    id="nombre"
                    value={nombre}
                    onChange={handleSetNombre}
                  ></input>
                </div>

                <br></br>
                <div>
                  <label className="Crear_Usuario_form_label"> Apellido </label>
                  <br></br>
                  <input
                    type="text"
                    id="apellido"
                    value={apellido}
                    onChange={handleSetApellido}
                  ></input>
                </div>

                <br></br>
                <div>
                  <label className="Crear_Usuario_form_label"> Email </label>
                  <br></br>
                  <input
                    type="text"
                    id="email"
                    value={email}
                    onChange={handleSetEmail}
                  ></input>
                </div>

                <br></br>
                <div>
                  <button
                    className="p-2 my-3 rounded-md bg-black text-white font-semibold text-sm hover:bg-slate-900 text-center"
                    onClick={handleCrearUsuario}
                  >
                    Crear
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
