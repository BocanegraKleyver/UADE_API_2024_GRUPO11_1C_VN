import React, { useState, useEffect } from "react";
import { Link, useNavigate  } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { loginUsuario } from "../Redux/UsuarioSlice";

export const UsuariosScreen = () => {
  const dispatch = useDispatch();
  const usuario = useSelector((state) => state.usuario.usuario);
  const status = useSelector((state) => state.usuario.status);
  const error = useSelector((state) => state.usuario.error);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSetEmail = (event) => {
    setEmail(event.target.value);
  };

  const handleSetPassword = (event) => {
    setPassword(event.target.value);
  };


  const handleIngresar = async (e) => {
    e.preventDefault();
    dispatch(loginUsuario({ email, password }));
  };
  

  useEffect(() => {
    if (usuario) {
      navigate("/");
    }
  }, [usuario, navigate]);

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
            <div className="nice-header header-fix-top small">
              <div className="logo">
                <h3 className="font-bold text-2xl">Iniciar Sesion</h3>
              </div>
            </div>
            <hr></hr>

            <div className="Usuario_form">
              <form onSubmit={handleIngresar}>
                <br></br>
                <div>
                  <label className="Usuario_form_label"> Email </label>
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
                  <label className="Usuario_form_label"> Password </label>
                  <br></br>
                  <input
                    type="password"
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
                    className="p-2 my-3 rounded-md bg-black text-white font-semibold text-sm hover:bg-slate-900 hover:text-white text-center  active"
                    to="/crearUsuario"
                  >
                    Crear usuario
                  </Link>
                </div>
              </form>
            </div>
            {status === "loading" && <p>Cargando...</p>}
            {status === "failed" && <p>Error: {error}</p>}
          </div>
        </div>
      </div>
    </div>
  );
};