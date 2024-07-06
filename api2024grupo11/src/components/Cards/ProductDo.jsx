
import { Link } from "react-router-dom";

function ProductDo({ value, agregarAlCarrito, agregarAFavoritos }) {
  return (
    <div class="producto">
      <Link to={`/producto/${value.id}`}><img className="producto-imagen" src={value.imagen_1} alt={value.titulo} /></Link>
      <div className="producto-detalles">
        <h3 className="producto-titulo">{value.titulo}</h3>
        <header class="paralelo">
          <p className="producto-precio">$ {value.precio}</p>
          <p className="producto-cantidad">Stock: {value.cantidad}</p>
        </header>
        <p className="producto-descripcion">{value.descripcion}</p>
        <div>
          <button
            className="producto-agregar"
            onClick={() => agregarAlCarrito(value)}
          >
            Agregar
          </button>
          <button
            className="producto-favoritos"
            onClick={() => agregarAFavoritos(value)}
          >
            Favoritos
          </button>

        </div>
      </div>
    </div>
  );
}

export default ProductDo;
