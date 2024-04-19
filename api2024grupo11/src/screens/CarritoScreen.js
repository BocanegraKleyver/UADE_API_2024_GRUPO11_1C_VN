import './App.css';


function carrito() {
  return (
    <div class="wrapper">
            <aside>
                <header>
                    <h1 class="logo">SillaShop</h1>
                </header>
                <nav>
                    <ul>
                        <li><a class="boton-menu boton-volver" href="./App.js">Seguir Comprando</a></li>
                        <li><a class="boton-menu boton-carrito active" href="./carrito.html">Carrito</a></li>
                    </ul>
                </nav>
                <footer>
                    <p class="texto-footer">© API 2024 Grupo 11</p>
                </footer>
            </aside>
            <main>
                <h2 class="titulo-principal">Carrito</h2>
                <div class="contenedor-carrito">
                  <p class="carrito-vacio">Tu carrito está vacío</p>

                  <div class="carrito-producto">

                    <div class="acrrito-producto">
                        <img class="carrito-producto-imagen" src="./img/comedor/sillacomedor1.jpg" alt=""></img>
                        <div class="carrito-producto-titulo">
                            <small>Titulo</small>
                            <h3>sillacomedor1</h3>
                        </div>
                        <div class="carrito-producto-cantidad">
                            <small>Cantidad</small>
                            <p>1</p>
                        </div>
                        <div class="carrito-producto-precio">
                            <small>Precio</small>
                            <p>$1000</p>
                        </div>
                        <div class="carrito-producto-subtotal">
                            <small>Subtotal</small>
                            <p>$1000</p>
                            <button class="carrito-producto-eliminar">Eliminar</button>
                        </div>
                    </div>

                  </div>
                </div>
                <div class="carrito-acciones">
                    <div class="carrito-acciones-izquierda">
                        <button class="carrito-acciones-vaciar">Vaciar Carrito</button>
                    </div>
                    <div class="carrito-acciones-derecha">
                        <div class="carrito-acciones-total">
                            <p>Total</p>
                            <p id="total">$1000</p>
                        </div>
                        <button class="carrito-acciones-comprar">Comprar Ahora</button>
                    </div>
                </div>
            </main>
        </div>
    
  );
}

export default carrito;