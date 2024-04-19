import logo from './logo.svg';
import './App.css';
import './carrito.js';
import sillacomedor1 from './img/comedor/sillacomedor1.jpg';
import sillacomedor2 from './img/comedor/sillacomedor2.jpg';
import sillacomedor3 from './img/comedor/sillacomedor3.jpg';
import sillagamer1 from './img/gamer/sillagamer1.jpg';
import sillagamer2 from './img/gamer/sillagamer2.jpg';
import sillajardin1 from './img/jardin/sillajardin1.jpg';
import sillajardin2 from './img/jardin/sillajardin2.jpg';
import sillajardin3 from './img/jardin/sillajardin3.jpg';


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
                <div id="contenedor-productos" class="contenedor-productos">
                  <div class="producto">
                    <img class="producto-imagen" src={sillacomedor1} alt=""></img>
                    <div class="producto-detalles">
                      <h3 class="producto-titulo">Comedor01</h3>
                      <p class="producto-precio">$1000</p>
                      <button class="producto-agregar">Agregar</button>
                    </div>
                  </div>
                  <div class="producto">
                    <img class="producto-imagen" src={sillacomedor2} alt=""></img>
                    <div class="producto-detalles">
                      <h3 class="producto-titulo">Comedor02</h3>
                      <p class="producto-precio">$1500</p>
                      <button class="producto-agregar">Agregar</button>
                    </div>
                  </div>
                  <div class="producto">
                    <img class="producto-imagen" src={sillacomedor3} alt=""></img>
                    <div class="producto-detalles">
                      <h3 class="producto-titulo">Comedor03</h3>
                      <p class="producto-precio">$500</p>
                      <button class="producto-agregar">Agregar</button>
                    </div>
                  </div>
                  <div class="producto">
                    <img class="producto-imagen" src={sillacomedor1} alt=""></img>
                    <div class="producto-detalles">
                      <h3 class="producto-titulo">Comedor01</h3>
                      <p class="producto-precio">$1000</p>
                      <button class="producto-agregar">Agregar</button>
                    </div>
                  </div>
                  <div class="producto">
                    <img class="producto-imagen" src={sillacomedor2} alt=""></img>
                    <div class="producto-detalles">
                      <h3 class="producto-titulo">Comedor02</h3>
                      <p class="producto-precio">$1500</p>
                      <button class="producto-agregar">Agregar</button>
                    </div>
                  </div>
                  <div class="producto">
                    <img class="producto-imagen" src={sillacomedor3} alt=""></img>
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

//PRODUCTOS
const productos=[
  //Silla Comedor
  {
    id:"silla-comedor-1",
    titulo:"Silla comedor 1",
    imagen:{sillacomedor1},
    categoria:{
      nombre:"Comedor",
      id:"comedor",
    },
    precio: 1000
  },
  {
    id:"silla-comedor-2",
    titulo:"Silla comedor 2",
    imagen:{sillacomedor2},
    categoria:{
      nombre:"Comedor",
      id:"comedor",
    },
    precio: 1000
  },
  {
    id:"silla-comedor-3",
    titulo:"Silla comedor 3",
    imagen:{sillacomedor3},
    categoria:{
      nombre:"Comedor",
      id:"comedor",
    },
    precio: 1000
  },
  //Gamer
  {
    id:"silla-gamer-1",
    titulo:"Silla gamer 1",
    imagen:{sillagamer1},
    categoria:{
      nombre:"Gamer",
      id:"gamer",
    },
    precio: 1000
  },
  {
    id:"silla-gamer-2",
    titulo:"Silla gamer 2",
    imagen:{sillagamer2},
    categoria:{
      nombre:"Gamer",
      id:"gamer",
    },
    precio: 1000
  },
  //Jardin
  {
    id:"silla-jardin-1",
    titulo:"Silla jardin 1",
    imagen:{sillajardin1},
    categoria:{
      nombre:"Jardin",
      id:"jardin",
    },
    precio: 1000
  },
  {
    id:"silla-jardin-2",
    titulo:"Silla jardin 2",
    imagen:{sillajardin2},
    categoria:{
      nombre:"Jardin",
      id:"jardin",
    },
    precio: 1000
  },
  {
    id:"silla-jardin-3",
    titulo:"Silla jardin 3",
    imagen:{sillajardin3},
    categoria:{
      nombre:"Jardin",
      id:"jardin",
    },
    precio: 1000
  },
];

const contenedorproductos = document.querySelector("#contenedor-productos");

function cargarProductos(){
  productos.forEach(producto => {

    const div = document.createElement("div");
    div.classList.add("producto");
    div.innerHTML = `
      <img class="producto-imagen" src="${producto.imagen}" alt="${producto.titulo}"></img>
      <div class="producto-detalles">
        <h3 class="producto-titulo">${producto.titulo}</h3>
        <p class="producto-precio">$${producto.precio}</p>
        <button class="producto-agregar" id="${producto.id}">Agregar</button>
      </div>
    `;
    contenedorproductos.append(div);
  })
}


