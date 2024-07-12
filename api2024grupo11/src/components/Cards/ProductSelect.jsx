import React from "react";

function ProductSelect({ value, agregarAlCarrito }) {
    return (
        <div className="producto">
            <div className="paralelo2">
                <img className="producto-imagen2" src={value.imagen_1_URL} alt={value.titulo}></img>
                <img className="producto-imagen2" src={value.imagen_2_URL} alt={value.titulo}></img>
            </div>

            <div className="producto-detalles">
                <h3 className="producto-titulo2">{value.titulo}</h3>
                <header className="paralelo">
                    <p className="producto-precio">Precio ${value.precio}</p>
                    {(value.precio !== value.precioConDescuento) && (
                        <p className="producto-precio">Con dto. $ {value.precioConDescuento.toFixed(2)}</p>
                    )}
                    <p className="producto-cantidad">Stock: {value.cantidad}</p>
                </header>
                <p className="producto-descripcion">{value.descripcion}</p>
                <div className="paralelo">
                    <button className="producto-agregar" onClick={() => agregarAlCarrito(value)}>Agregar</button>
                    <button onClick={() => window.history.back()} className="producto-agregar">Atras</button>
                </div>

            </div>
        </div>
    )
}

export default ProductSelect;