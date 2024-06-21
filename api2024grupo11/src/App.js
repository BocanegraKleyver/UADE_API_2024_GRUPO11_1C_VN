import React from "react";
import { Routes, Route } from "react-router-dom";
import { AsideHeader } from "./components/AsideHeader/AsideHeader";
import CarritoScreen from "./screens/CarritoScreen";
import GestionProductoScreen from "./screens/GestionProductoScreen";
import ComprarScreen from "./screens/ComprarScreen";

import DescuentoScreen from "./screens/DescuentoScreen";
import CategoriaScreen from "./screens/CategoriaScreen";
import ProductoScreen from "./screens/ProductoScreen";
import RolScreen from "./screens/RolScreen";

import { DescuentoProvider } from "./context/DescuentoContext";
import { CategoriaProvider } from "./context/CategoriaContext";
import { ProductoProvider } from "./context/ProductoContext";
import { RolProvider } from "./context/RolContext";

import AdministrarScreen from "./screens/AdministrarScreen";

function App() {
  return (
    <DescuentoProvider>
      <CategoriaProvider>
        <ProductoProvider>
          <RolProvider>
            <div className="wrapper">
              <AsideHeader />
              <Routes>
                <Route path="/" element={<ComprarScreen />} />
                <Route path="/carrito" element={<CarritoScreen />} />
                <Route
                  path="/gestionProductos"
                  element={<GestionProductoScreen />}
                />
                <Route path="/descuento" element={<DescuentoScreen />} />
                <Route path="/administrar" element={<AdministrarScreen />} />
                <Route path="/producto" element={<ProductoScreen />} />
                <Route path="/categoria" element={<CategoriaScreen />} />
                <Route path="/rol" element={<RolScreen />} />
              </Routes>
            </div>
          </RolProvider>
        </ProductoProvider>
      </CategoriaProvider>
    </DescuentoProvider>
  );
}

export default App;
