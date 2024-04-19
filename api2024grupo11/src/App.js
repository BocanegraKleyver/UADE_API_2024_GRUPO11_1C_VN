import './App.css';
import { AsideHeader } from './components/AsideHeader.js/AsideHeader';
import ProductCard from './components/Cards/ProductCard';


function App() {
  return (
    <div class="wrapper">
            <AsideHeader />
            <main>
                <h2 class="titulo-principal">Todos los productos</h2>
                <div id="contenedor-productos" class="contenedor-productos">
                  <ProductCard />
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

