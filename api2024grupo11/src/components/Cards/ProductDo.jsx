import React, { useState } from "react";
import { Link } from "react-router-dom";

function ProductDo({ value, agregarAlCarrito, agregarAFavoritos,onSelect  }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const images = [value.imagen_1_URL, value.imagen_2_URL];

  const handleNextImage = () => {
    setCurrentImageIndex((currentImageIndex + 1) % images.length);
  };

  const handlePrevImage = () => {
    setCurrentImageIndex((currentImageIndex - 1 + images.length) % images.length);
  };

  return (
    <div className="producto" onClick={onSelect}> 
      <div className="imagen-container">
      <Link to={`/producto/${value.id}`}>
        <img className="producto-imagen" src={images[currentImageIndex]} alt={value.titulo} />
        </Link>
        {images.length > 1 && (
          <div className="navegacion-imagen">
            <button className="flecha-izquierda" onClick={handlePrevImage}>&#9664;</button>
            <button className="flecha-derecha" onClick={handleNextImage}>&#9654;</button>
          </div>
        )}
      </div>
        <div className="producto-detalles">
      <Link to={`/producto/${value.id}`}>
          <h3 className="producto-titulo">{value.titulo}</h3>
          </Link>
          <header className="paralelo">
            <p className="producto-precio">Precio ${value.precio}</p>
            {(value.precio !== value.precioConDescuento) && (
              <p className="producto-precio">Con dto. $ {value.precioConDescuento.toFixed(2)}</p>
            )}
            <p className="producto-cantidad">Stock: {value.cantidad}</p>
          </header>
          <p className="producto-descripcion">Descripcion: {value.descripcion}</p>
          <div className="paralelo">
            <button
              className="producto-agregar"
              onClick={() => agregarAlCarrito(value)}
            >
              Agregar
            </button>
            <button
              className="producto-agregar"
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
