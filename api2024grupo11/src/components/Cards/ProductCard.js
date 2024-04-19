import React from 'react'

const ProductCard = () => {
  return (
    <div class="producto">
        <img class="producto-imagen" src="../public/img/comedor/sillacomedor1.jpg" alt=""></img>
        <div class="producto-detalles">
            <h3 class="producto-titulo">Comedor01</h3>
            <p class="producto-precio">$1000</p>
            <button class="producto-agregar">Agregar</button>
        </div>
    </div>
  )
}

export default ProductCard