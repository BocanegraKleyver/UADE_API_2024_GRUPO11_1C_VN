import React from "react";

function ProductSelect({ value, agregarAlCarrito }) {
    return (
        <div className="producto">
            <header className="paralelo2">
                <img className="producto-imagen2" src={value.imagen_1_URL} alt={value.titulo}></img>
                <img className="producto-imagen2" src={value.imagen_2_URL} alt={value.titulo}></img>
            </header>

            <div className="producto-detalles">
                <h3 className="producto-titulo2">{value.titulo}</h3>
                <header className="paralelo">
                    <p className="producto-precio2">$ {value.precio}</p>
                    <p className="producto-cantidad2">Stock: {value.cantidad}</p>
                </header>
                <p className="producto-descripcion">{value.descripcion}</p>
                <div className="dividir">
                    <button className="producto-agregar" onClick={() => agregarAlCarrito(value)}>Agregar</button>
                    <div className="flex justify-between">
                        <button
                            onClick={() => window.history.back()}
                            className="block bg-gray-500 text-white py-2 px-4 rounded-md text-center mt-4"
                        >
                        ATRAS
                        </button>
                    </div>
                </div>
                
            </div>
        </div>
    )
}

export default ProductSelect;