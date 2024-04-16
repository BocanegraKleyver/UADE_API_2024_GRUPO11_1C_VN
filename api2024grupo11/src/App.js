import logo from './logo.svg';
import './App.css';


function App() {
  return (
    <div class="wrapper">
            <aside>
                <header>
                    <h1 class="logo">SillaShop</h1>
                </header>
                <nav>
                    <ul class="menu">
                        <li><button class="boton-menu boton-menu active">Todos los productos</button></li>
                        <li><button class="boton-menu boton-menu">Comedor</button></li>
                        <li><button class="boton-menu boton-menu">Jardin</button></li>
                        <li><button class="boton-menu boton-menu">Gamer</button></li>
                        <li><a class="boton-menu boton-carrito" href="./carrito.js">Carrito<span class="numerito">0</span></a></li>
                    </ul>
                </nav>
                <footer>
                    <p class="texto-footer">© API 2024 Grupo 11</p>
                </footer>
            </aside>
            <main>
                <h2 class="titulo-principal">Todos los productos</h2>
                <div class="contenedor-productos">
                  <div class="producto">
                    <img class="producto-imagen" src="./img/comedor/sillacomedor1.jpg" alt=""></img>
                    <div class="producto-detalles">
                      <h3 class="producto-titulo">Comedor01</h3>
                      <p class="producto-precio">$1000</p>
                      <button class="producto-agregar">Agregar</button>
                    </div>
                  </div>
                  <div class="producto">
                    <img class="producto-imagen" src="./img/comedor/sillacomedor2.jpg" alt=""></img>
                    <div class="producto-detalles">
                      <h3 class="producto-titulo">Comedor02</h3>
                      <p class="producto-precio">$1500</p>
                      <button class="producto-agregar">Agregar</button>
                    </div>
                  </div>
                  <div class="producto">
                    <img class="producto-imagen" src="./img/comedor/sillacomedor3.jpg" alt=""></img>
                    <div class="producto-detalles">
                      <h3 class="producto-titulo">Comedor03</h3>
                      <p class="producto-precio">$500</p>
                      <button class="producto-agregar">Agregar</button>
                    </div>
                  </div>
                  <div class="producto">
                    <img class="producto-imagen" src="./img/comedor/sillacomedor1.jpg" alt=""></img>
                    <div class="producto-detalles">
                      <h3 class="producto-titulo">Comedor01</h3>
                      <p class="producto-precio">$1000</p>
                      <button class="producto-agregar">Agregar</button>
                    </div>
                  </div>
                  <div class="producto">
                    <img class="producto-imagen" src="./img/comedor/sillacomedor2.jpg" alt=""></img>
                    <div class="producto-detalles">
                      <h3 class="producto-titulo">Comedor02</h3>
                      <p class="producto-precio">$1500</p>
                      <button class="producto-agregar">Agregar</button>
                    </div>
                  </div>
                  <div class="producto">
                    <img class="producto-imagen" src="./img/comedor/sillacomedor3.jpg" alt=""></img>
                    <div class="producto-detalles">
                      <h3 class="producto-titulo">Comedor03</h3>
                      <p class="producto-precio">$500</p>
                      <button class="producto-agregar">Agregar</button>
                    </div>
                  </div>
                </div>
            </main>
        </div>
    
  );
}

export default App;
