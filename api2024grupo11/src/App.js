import React from "react";

import { Route, Routes } from "react-router-dom";
import { AsideHeader } from "./components/AsideHeader/AsideHeader.jsx";
import { CarritoScreen } from "./screens/CarritoScreen.jsx";
import ComprarScreen from "./screens/ComprarScreen.jsx";
import { CrearUsuariosScreen } from "./screens/CrearUsuariosScreen.jsx";
import DescripcionScreen from "./screens/DetallesScreen.jsx";
import { FavoritosScreen } from "./screens/FavoritosScreen.jsx";
import { GestionProductoScreen } from "./screens/GestionProductoScreen.jsx";
import { UsuariosScreen } from "./screens/UsuariosScreen.jsx";



function App() {
  return (
    <div className="wrapper">

      <AsideHeader />
      <Routes>
        <Route path="/" element={<ComprarScreen />} exact>
        </Route>

        <Route path="/carrito/">
          <Route path="" element={<CarritoScreen />} exact />
        </Route>
        
        <Route path="/gestionProductos/">
          <Route path="" element={<GestionProductoScreen />} exact />
        </Route>


        <Route path="/usuarios">
          <Route path="" element={<UsuariosScreen />} exact />
        </Route>

        <Route path="/crearUsuario">
          <Route path="" element={<CrearUsuariosScreen />} exact />
        </Route>

        <Route path="/favoritos/">
          <Route path="" element={<FavoritosScreen />} exact />
        </Route>

        <Route path="/producto/:id">
          <Route path="" element={<DescripcionScreen />} exact />
        </Route>

      </Routes>
    </div>

  );
}

export default App;




//const contenedorproductos = document.querySelector("#contenedor-productos");

// function cargarProductos(){
//   productos.forEach(producto => {

//     const div = document.createElement("div");
//     div.classList.add("producto");
//     div.innerHTML = `
//       <img class="producto-imagen" src="${producto.imagen}" alt="${producto.titulo}"></img>
//       <div class="producto-detalles">
//         <h3 class="producto-titulo">${producto.titulo}</h3>
//         <p class="producto-precio">$${producto.precio}</p>
//         <button class="producto-agregar" id="${producto.id}">Agregar</button>
//       </div>
//     `;
//     contenedorproductos.append(div);
//   })
// }


