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
import UsuarioScreen from "./screens/UsuarioScreen";
import RegisterScreen from "./screens/RegisterScreen";
import LoginScreen from "./screens/LoginScreen";
import HomeScreen from "./screens/HomeScreen";

import { DescuentoProvider } from "./context/DescuentoContext";
import { CategoriaProvider } from "./context/CategoriaContext";
import { ProductoProvider } from "./context/ProductoContext";
import { RolProvider } from "./context/RolContext";
import { UsuarioProvider } from "./context/UsuarioContext";

import AdministrarScreen from "./screens/AdministrarScreen";

import NavBar from "./components/NavigationBar/NavBar";

function App() {
  return (
    <DescuentoProvider>
      <CategoriaProvider>
        <ProductoProvider>
          <RolProvider>
            <UsuarioProvider>
              <div className="wrapper">
                <AsideHeader />
                <NavBar />
                <Routes>
                  <Route path="/" element={<LoginScreen />} />
                  <Route path="/login" element={<LoginScreen />} />
                  <Route path="/register" element={<RegisterScreen />} />
                  <Route path="/home" element={<HomeScreen />} />
                  <Route path="/administrar" element={<AdministrarScreen />} />
                  <Route path="/rol" element={<RolScreen />} />
                  <Route path="/usuario" element={<UsuarioScreen />} />
                  <Route path="/categoria" element={<CategoriaScreen />} />
                  <Route path="/descuento" element={<DescuentoScreen />} />
                  <Route path="/producto" element={<ProductoScreen />} />
                  <Route path="/carrito" element={<CarritoScreen />} />
                  <Route
                    path="/gestionProductos"
                    element={<GestionProductoScreen />}
                  />
                  <Route path="/comprar" element={<ComprarScreen />} />
                </Routes>
              </div>
            </UsuarioProvider>
          </RolProvider>
        </ProductoProvider>
      </CategoriaProvider>
    </DescuentoProvider>
  );
}

export default App;
