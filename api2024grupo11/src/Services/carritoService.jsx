export const getCarrito = () => {
    return(
        fetch("http://localhost:8000/carrito")
        .then((Response) => Response.json())
        .catch(error => console.log('error',error))
        .finally(() => console.log('promise is finished'))
    )
};

export const agregarItemAlCarrito = (item) => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
        "id": item.id,
        "titulo": item.titulo,
        "precio": item.precio,
        "cantidad": item.cantidad
    });
    
    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    fetch("http://localhost:8000/carrito", requestOptions)
    .then(Response => Response.text())
    .then(result => console.log(result))
    .catch(error => console.log('error', error));
};

export const eliminarItemDelCarrito = (id) => {
    var requestOptions = {
        method: 'DELETE',
    };

    fetch("http://localhost:8000/carrito/" + id, requestOptions)
    .then(Response => Response.text())
    .then(result => console.log(result))
    .catch(error => console.log('error', error));

};

export const vaciarCarrito = (arrayIds) => {

    // No encontramos forma de vaciar el carrito de una
    arrayIds.forEach(id => {
        var requestOptions = {
            method: 'DELETE',
        };
    
        fetch("http://localhost:8000/carrito/" + id, requestOptions)
        .then(Response => Response.text())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));
    });


};   
