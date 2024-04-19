import React from 'react'

export const AsideHeader = () => {
  return (
    <aside>
        <header>
            <h1 class="logo"><a class="logo-link" href="/">SillaShop</a></h1>
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
  )
}
