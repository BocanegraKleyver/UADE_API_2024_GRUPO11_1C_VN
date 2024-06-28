export const getProductos = () => {
  return fetch("http://localhost:8000/productos")
    .then((Response) => Response.json())
    .catch((error) => console.log("error", error));
};

export const getProducto = (id) => {
  var requestOptions = {
    method: "GET",
  };

  return fetch("http://localhost:8000/productos" + id, requestOptions)
    .then((Response) => Response.json())
    .catch((error) => console.log("error", error));
};

export const altaProdcuto = (
  id,
  titulo,
  categoria,
  imagen_1,
  imagen_2,
  descripcion,
  precio,
  cantidad
) => {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  var raw = JSON.stringify({
    id: id,
    titulo: titulo,
    categoria: categoria,
    imagen_1: imagen_1,
    imagen_2: imagen_2,
    descripcion: descripcion,
    precio: parseFloat(precio),
    cantidad: parseInt(cantidad),
  });

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  fetch("http://localhost:8000/productos", requestOptions)
    .then((Response) => Response.json())
    .then((result) => console.log(result))
    .catch((error) => console.log("error", error));
};

export const eliminarProducto = (id) => {
  var requestOptions = {
    method: "DELETE",
  };

  fetch("http://localhost:8000/productos/" + id, requestOptions)
    .then((Response) => Response.json())
    .then((result) => console.log(result))
    .catch((error) => console.log("error", error));
};

export const aumentarCantidad = (id, cantidad) => {
  const nuevaCantidad = cantidad + 1;

  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const raw = JSON.stringify({
    cantidad: nuevaCantidad,
  });

  const requestOptions = {
    method: "PATCH",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  fetch(`http://localhost:8000/productos/${id}`, requestOptions)
    .then((response) => {
      if (!response.ok) {
        throw new Error("La solicitud PATCH no fue exitosa.");
      }
      return response.json();
    })
    .then((result) => console.log(result))
    .catch((error) => console.error("Error al aumentar la cantidad:", error));
};

export const decrementarCantidad = (id, cantidad) => {
  const nuevaCantidad = cantidad - 1;

  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const raw = JSON.stringify({
    cantidad: parseInt(nuevaCantidad),
  });

  const requestOptions = {
    method: "PATCH",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  fetch(`http://localhost:8000/productos/${id}`, requestOptions)
    .then((response) => {
      if (!response.ok) {
        throw new Error("La solicitud PATCH no fue exitosa.");
      }
      return response.json();
    })
    .then((result) => console.log(result))
    .catch((error) => console.error("Error al disminuir la cantidad:", error));
};
export const decrementarCantidadEnN = async (producto, cantADecrementar) => {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  try {
    const response = await fetch(
      "http://localhost:8000/productos/" + producto.id
    );
    const productoADecrementar = await response.json();

    const nuevaCantidad = productoADecrementar.cantidad - cantADecrementar;
    const raw = JSON.stringify({
      cantidad: nuevaCantidad,
    });

    const requestOptions = {
      method: "PATCH",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    const patchResponse = await fetch(
      `http://localhost:8000/productos/${producto.id}`,
      requestOptions
    );

    if (!patchResponse.ok) {
      throw new Error("La solicitud PATCH no fue exitosa.");
    }

    const result = await patchResponse.json();
    console.log(result);
  } catch (error) {
    console.error("Error al disminuir la cantidad:", error);
  }
};
