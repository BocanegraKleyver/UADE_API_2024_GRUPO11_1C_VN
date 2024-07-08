import React from "react";

import { Route, Routes } from "react-router-dom";
import { AsideHeader } from "./components/AsideHeader/AsideHeader.jsx";
import { ComprarScreen } from "./screens/ComprarScreen.jsx";
import { CrearUsuariosScreen } from "./screens/CrearUsuariosScreen.jsx";
import { FavoritosScreen } from "./screens/FavoritosScreen.jsx";
import { UsuariosScreen } from "./screens/UsuariosScreen.jsx";
import { AdministrarScreen } from "./screens/AdministrarScreen.jsx";
import { CategoriaScreen } from "./screens/CategoriaScreen.jsx";
import { DescuentoScreen } from "./screens/DescuentoScreen.jsx";
import { ProductoScreen } from "./screens/ProductoScreen.jsx";
import { DescuentoProvider } from "./context/DescuentoContext.jsx";
import { CategoriaProvider } from "./context/CategoriaContext.jsx";
import { ProductoProvider } from "./context/ProductoContext.jsx";
import { CarritoScreen } from "./screens/CarritoScreen.jsx";

function App() {
  return (
    <DescuentoProvider>
      <CategoriaProvider>
        <ProductoProvider>
          <div className="wrapper">
            <AsideHeader />
            <Routes>
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
              <Route path="/" element={<ComprarScreen />} exact></Route>

              <Route path="/carrito">
                <Route path="" element={<CarritoScreen />} exact />
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
            </Routes>
          </div>
        </ProductoProvider>
      </CategoriaProvider>
    </DescuentoProvider>
  );
}

export default App;
