import './ProductDo.css';

const ProductoDo=({props, deleteProductoDo, index})=> {
    return(
        <div >
            <img className="producto-imagen" src="${props.imagen}" alt="${props.titulo}"></img>
            <div className="producto-detalles">
                <h3 className="producto-titulo">${props.titulo}</h3>
                <p className="producto-precio">$${props.precio}</p>
                <button className="producto-agregar" id="${props.id}">Agregar</button>
            </div>
        </div>
    )
}

export default ProductoDo
