export const getFavoritos = async () => {
  var res = await fetch("http://localhost:8000/favoritos")
    .then((Response) => Response.json())
    .catch((error) => console.log("error", error));

  var requestOptions = {
    method: "GET",
  };

  var productos = [];
  for (let i = 0; i < res.length; i++) {
    const prod = await fetch(
      "http://localhost:8000/productos/" + res[i].id,
      requestOptions
    )
      .then((Response) => Response.json())
      .catch((error) => console.log("error", error));
    productos.push(prod);
  }

  return productos;
};

export const agregarItemAFavoritos = (item) => {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  var raw = JSON.stringify({
    id: item.id,
    titulo: item.titulo,
    precio: item.precio,
  });

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  fetch("http://localhost:8000/favoritos", requestOptions)
    .then((Response) => Response.text())
    .catch((error) => console.log("error", error));
};

export const eliminarItemDeFavoritos = (id) => {
  var requestOptions = {
    method: "DELETE",
  };

  fetch("http://localhost:8000/favoritos/" + id, requestOptions)
    .then((Response) => Response.text())
    .catch((error) => console.log("error", error));
};
