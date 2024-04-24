import React from 'react';
import { AsideHeader } from './components/AsideHeader/AsideHeader';
import { Routes, Route } from "react-router-dom";
import {CarritoScreen} from './screens/CarritoScreen';
import {HomePage} from './screens/HomePage';

function App() {
  return (
    <div class="wrapper">
            <AsideHeader />
            <Routes>
              <Route path="/" element={<HomePage />}></Route>
              <Route path="/carrito/">
                <Route path="" element={<CarritoScreen  />} exact />
              </Route>
            </Routes>
    </div>
  );
}

export default App;


