export const getCarrito = () => {
    return(
        fetch("http://localhost:8080/carrito")
        .then((Response) => Response.json())
        .catch(error => console.log('error',error))
    )
};

export const agregarItemAlCarrito = (item) => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
        "id": item.id,
        "titulo": item.titulo,
        "precio": item.precio,
        "cantidad": 1
    });
    
    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    fetch("http://localhost:8080/carrito", requestOptions)
    .then(Response => Response.text())
    .catch(error => console.log('error', error));
};

export const actualizarCarrito = (cantidad, item) => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
        "id": item.id,
        "titulo": item.titulo,
        "precio": item.precio,
        "cantidad": cantidad
    });
    
    var requestOptions = {
        method: 'PATCH',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    fetch("http://localhost:8080/carrito/" + item.id, requestOptions)
    .then(Response => Response.text())
    .catch(error => console.log('error', error));
};

export const eliminarItemDelCarrito = (id) => {
    var requestOptions = {
        method: 'DELETE',
    };

    fetch("http://localhost:8080/carrito/" + id, requestOptions)
    .then(Response => Response.text())
    .then(result => console.log(result))
    .catch(error => console.log('error', error));

};

export const vaciarCarrito = (arrayIds) => {

    
    arrayIds.forEach(id => {
        var requestOptions = {
            method: 'DELETE',
        };
    
        fetch("http://localhost:8080/carrito/" + id, requestOptions)
        .then(Response => Response.text())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));
    });


};   
