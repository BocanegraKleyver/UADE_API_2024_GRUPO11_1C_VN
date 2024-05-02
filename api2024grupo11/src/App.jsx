import React from "react";
import { AsideHeader } from "./components/AsideHeader/AsideHeader";
import { Routes, Route } from "react-router-dom";
import { CarritoScreen } from "./screens/CarritoScreen";
import { HomePage } from "./screens/HomePage";
import { GestionProductoScreen } from "./screens/GestionProductoScreen";

function App() {
  return (
    <div class="wrapper">
      <AsideHeader />
      <Routes>
        <Route path="/" element={<HomePage />}/>
        <Route path="/carrito/" element={<CarritoScreen/>}/>
        <Route path="/GestionProdutos/" element={<GestionProductoScreen/>}/>
      </Routes>
    </div>
  );
}

export default App;
