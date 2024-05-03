export const getProductos = () => {
    return(
        fetch("http://localhost:8000/productos")
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

    fetch("http://localhost:8000/productos", requestOptions)
    .then(Response => Response.text())
    .then(result => console.log(result))
    .catch(error => console.log('error', error));
};

export const eliminarProducto = (id) => {
    
    var requestOptions = {
        method: 'DELETE',
    };

    fetch("http://localhost:8000/productos/" + id, requestOptions)
    .then(Response => Response.text())
    .then(result => console.log(result))
    .catch(error => console.log('error', error));

};


export const aumentarCantidad = (id,cantidad) => {
    
    fetch("http://localhost:8000/productos/" + id)
    .then(response => response.json())
    .then(producto => {

        const cantidadNueva = cantidad + 1;
        

        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
            "id": id,
            "cantidad":cantidadNueva 
        });
        
        var requestOptions = {
            method: 'PATCH',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch("http://localhost:8000/productos/" +id, requestOptions)
        .then(response => response.text())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));
    })
    .catch(error => console.log('error', error));
};




export const decrementarCantidad = (id,cantidad) => {

    // cant actual del producto
    // restar esa cantidad
    // pegarle de nuevo a la api
    
    fetch("http://localhost:8000/productos/" + id)
    .then(response => response.json())
    .then(producto => {

        const cantidadNueva = cantidad - 1;
        

        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
            "id": id,
            "cantidad":cantidadNueva 
        });
        
        var requestOptions = {
            method: 'PATCH',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch("http://localhost:8000/productos/" + id, requestOptions)
        .then(response => response.text())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));
    })
    .catch(error => console.log('error', error));
};
