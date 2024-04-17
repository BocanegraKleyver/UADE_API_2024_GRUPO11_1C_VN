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
                <div id="contenedor-productos" class="contenedor-productos">
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

//PRODUCTOS
const productos=[
  //Silla Comedor
  {
    id:"silla-comedor-1",
    titulo:"Silla comedor 1",
    imagen:"./img/comedor/sillacomedor1.jpg",
    categoria:{
      nombre:"Comedor",
      id:"comedor",
    },
    precio: 1000
  },
  {
    id:"silla-comedor-2",
    titulo:"Silla comedor 2",
    imagen:"./img/comedor/sillacomedor2.jpg",
    categoria:{
      nombre:"Comedor",
      id:"comedor",
    },
    precio: 1000
  },
  {
    id:"silla-comedor-3",
    titulo:"Silla comedor 3",
    imagen:"./img/comedor/sillacomedor3.jpg",
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
    imagen:"./img/gamer/sillagamer1.jpg",
    categoria:{
      nombre:"Gamer",
      id:"gamer",
    },
    precio: 1000
  },
  {
    id:"silla-gamer-2",
    titulo:"Silla gamer 2",
    imagen:"./img/gamer/sillagamer2.jpg",
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
    imagen:"./img/gamer/sillajardin1.jpg",
    categoria:{
      nombre:"Jardin",
      id:"jardin",
    },
    precio: 1000
  },
  {
    id:"silla-jardin-2",
    titulo:"Silla jardin 2",
    imagen:"./img/gamer/sillajardin2.jpg",
    categoria:{
      nombre:"Jardin",
      id:"jardin",
    },
    precio: 1000
  },
  {
    id:"silla-jardin-3",
    titulo:"Silla jardin 3",
    imagen:"./img/gamer/sillajardin3.jpg",
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


