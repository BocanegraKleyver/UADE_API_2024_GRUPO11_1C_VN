import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ProductSelect from "../components/Cards/ProductSelect";
import { useDispatch, useSelector } from "react-redux";
import { addToCarrito, fetchCarritoByUserEmail } from "../Redux/CarritoSlice";
import { fetchProductoById, } from "../Redux/ProductoSlice";


export const DetalleScreen = (props) => {
  const dispatch = useDispatch();
  const productos = useSelector((state) => state.producto.productos);
  const usuarioLocalStorage = JSON.parse(localStorage.getItem("usuario"));
  const email = usuarioLocalStorage ? usuarioLocalStorage.registered_email : null;
  const carrito = useSelector((state) => state.carrito.carrito);
  const navigate = useNavigate();

  const { id } = useParams();

  useEffect(() => {
    dispatch(fetchProductoById(id));
    if (email) {
      dispatch(fetchCarritoByUserEmail(email));
    }
  }, [dispatch, email]);

  const handleAgregarAlCarrito = (productos) => {

    if (!email) {
      navigate('/usuarios');
      return;
    }

    if (!carrito || !carrito.carrito.id) {
      alert("No se pudo agregar el producto al carrito. Intente nuevamente.");
      return;
    }

    if (productos.cantidad === 0) {
      alert("No hay stock del producto. Intente más tarde o con otro producto.");
      return;
    }

    const item = { productoId: productos.id, cantidad: 1 };
    dispatch(addToCarrito({ carritoId: carrito.carrito.id, item }))
      .then((response) => {
        alert("Item agregado al carrito");
      })
      .catch((error) => {
        console.error('Error al agregar producto al carrito:', error);
        alert("Hubo un error al agregar el producto al carrito. Intente nuevamente.");
      });
  };

  return (
    <div>
      <div className='text-black bold p-5' >
        <h1>
          Informacion del Producto
        </h1>
      </div>
      <div>

        <ProductSelect value={productos} agregarAlCarrito={() => handleAgregarAlCarrito(productos)} />

      </div>
    </div>
  )

}
