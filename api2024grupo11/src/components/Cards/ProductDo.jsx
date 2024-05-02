import './ProductDo.css';

function ProductDo({value}) {
    return(
        <div >
            <img className="producto-imagen" src="${value.imagen}" alt="${value.titulo}"></img>
            <div className="producto-detalles">
                <h3 className="producto-titulo">{value.titulo}</h3>
                <p className="producto-precio">{value.precio}</p>
                <button className="producto-agregar" id="${value.id}">Agregar</button>
            </div>
        </div>
    )
}

export default ProductDo
