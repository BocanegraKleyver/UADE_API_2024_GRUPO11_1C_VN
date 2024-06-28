export const getFavoritos = () => {
  return fetch("http://localhost:8000/favoritos")
    .then((Response) => Response.json())
    .catch((error) => console.log("error", error));
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

export const actualizarFavoritos = (item) => {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  var raw = JSON.stringify({
    id: item.id,
    titulo: item.titulo,
    precio: item.precio,
  });

  var requestOptions = {
    method: "PATCH",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  fetch("http://localhost:8000/favorito/" + item.id, requestOptions)
    .then((Response) => Response.text())
    .catch((error) => console.log("error", error));
};

export const eliminarItemDeFavoritos = (id) => {
  var requestOptions = {
    method: "DELETE",
  };

  fetch("http://localhost:8000/favorito/" + id, requestOptions)
    .then((Response) => Response.text())
    .then((result) => console.log(result))
    .catch((error) => console.log("error", error));
};
