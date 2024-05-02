import React from "react";

export const getProductos = () => {
    return(
        fetch("http://localhost:3000/productos")
        .then((Response) => Response.json())
        .catch(error => console.log('error',error))
        .finally(() => console.log('promise is finished'))
    )
};

export const altaProdcuto = (id,titulo,categoria,imagen_1,imagen_2,descripcion,precio,cantidad) => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
        "id": id,
        "titulo": titulo,
        "categoria": categoria,
        "imagen_1":imagen_1,
        "imagen_2":imagen_2,
        "descripcion": descripcion,
        "precio":precio,
        "cantidad":cantidad
    });
    
    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    fetch("http://localhost:3000/productos", requestOptions)
    .then(Response => Response.text())
    .then(result => console.log(result))
    .cath(error => console.log('error', error));
};

export const eliminarProducto = (id) => {
    
    var requestOptions = {
        method: 'DELETE',
    };

    fetch("http://localhost:3000/productos/" + id, requestOptions)
    .then(Response => Response.text())
    .then(result => console.log(result))
    .cath(error => console.log('error', error));

};