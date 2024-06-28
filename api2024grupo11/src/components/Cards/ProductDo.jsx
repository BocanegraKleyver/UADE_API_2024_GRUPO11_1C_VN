function ProductDo({ value, agregarAlCarrito, agregarAFavoritos }) {
  return (
    <div class="producto">
      <img
        className="producto-imagen"
        src={value.imagen_1}
        alt={value.titulo}
      ></img>
      <div className="producto-detalles">
        <h3 className="producto-titulo">{value.titulo}</h3>
        <header class="paralelo">
          <p className="producto-precio">$ {value.precio}</p>
          <p className="producto-cantidad">Stock: {value.cantidad}</p>
        </header>
        <p className="producto-descripcion">{value.descripcion}</p>
        <button
          className="producto-agregar"
          onClick={() => agregarAlCarrito(value)}
        >
          Agregar al carrito
        </button>
        <button
          className="producto-agregar"
          onClick={() => agregarAFavoritos(value)}
        >
          Agregar a favoritos
        </button>
      </div>
    </div>
  );
}

export default ProductDo;
