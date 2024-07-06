function ProductSelect({value, agregarAlCarrito}) {
    return(
        <div class="producto">
            <header class="paralelo2">
                <img className="producto-imagen2" src={value.imagen_1} alt={value.titulo}></img>
                <img className="producto-imagen2" src={value.imagen_2} alt={value.titulo}></img>
            </header>
            
            <div className="producto-detalles">
                <h3 className="producto-titulo2">{value.titulo}</h3>
                <header class="paralelo">
                <p className="producto-precio2">$ {value.precio}</p>
                <p className="producto-cantidad2">Stock: {value.cantidad}</p>
                </header>
                <p className="producto-descripcion">{value.descripcion}</p>
                <button className="producto-agregar" onClick={() => agregarAlCarrito(value)}>Agregar</button>
            </div>
        </div>
    )
}

export default ProductSelect