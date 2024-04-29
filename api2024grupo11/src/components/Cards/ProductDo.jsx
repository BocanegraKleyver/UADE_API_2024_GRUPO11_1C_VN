function ProductoDo({producto, deleteProductoDo, index}) {
    return(
        <div>
            <img class="producto-imagen" src="${producto.imagen}" alt="${producto.titulo}"></img>
            <div class="producto-detalles">
                <h3 class="producto-titulo">${producto.titulo}</h3>
                <p class="producto-precio">$${producto.precio}</p>
                <button class="producto-agregar" id="${producto.id}">Agregar</button>
            </div>
        </div>
    )
}
export default ProductoDo;