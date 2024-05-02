import React from "react";
import { AsideHeader } from "./components/AsideHeader/AsideHeader";
import { Routes, Route } from "react-router-dom";
import { CarritoScreen } from "./screens/CarritoScreen";
import { HomePage } from "./screens/HomePage";
import { GestionProductoScreen } from "./screens/GestionProductoScreen";
import ComprarScreen from "./screens/ComprarScreen";


function App() {
  return (
    <div className="wrapper">

      <AsideHeader />
      <Routes>
        <Route path="/" element={<HomePage />}>
        </Route>
        
        <Route path="/Comprar/">
          <Route path="" element={<ComprarScreen />} exact />
        </Route>

        <Route path="/carrito/">
          <Route path="" element={<CarritoScreen />} exact />
        </Route>
        
        <Route path="/GestionProdutos/">
          <Route path="" element={<GestionProductoScreen />} exact />
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


