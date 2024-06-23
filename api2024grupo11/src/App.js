import React from "react";
import { Routes, Route } from "react-router-dom";
import { AsideHeader } from "./components/AsideHeader/AsideHeader";

import HomeScreen from "./screens/HomeScreen";
import AdministrarScreen from "./screens/AdministrarScreen";
import CategoriaScreen from "./screens/CategoriaScreen";
import DescuentoScreen from "./screens/DescuentoScreen";
import ProductoScreen from "./screens/ProductoScreen";

import CatalogoProductosScreen from "./screens/CatalogoProductosScreen";

import { DescuentoProvider } from "./context/DescuentoContext";
import { CategoriaProvider } from "./context/CategoriaContext";
import { ProductoProvider } from "./context/ProductoContext";

import NavBar from "./components/NavigationBar/NavBar";

function App() {
  return (
    <DescuentoProvider>
      <CategoriaProvider>
        <ProductoProvider>
          <div className="wrapper">
            <AsideHeader />
            <NavBar />
            <Routes>
              <Route path="/home" element={<HomeScreen />} />
              <Route path="/administrar" element={<AdministrarScreen />} />
              <Route
                path="/administrar/categoria"
                element={<CategoriaScreen />}
              />
              <Route
                path="/administrar/descuento"
                element={<DescuentoScreen />}
              />
              <Route
                path="/administrar/producto"
                element={<ProductoScreen />}
              />
              <Route path="/catalogo" element={<CatalogoProductosScreen />} />
            </Routes>
          </div>
        </ProductoProvider>
      </CategoriaProvider>
    </DescuentoProvider>
  );
}

export default App;
