import './App.css';
import { AsideHeader } from './components/AsideHeader/AsideHeader';
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


