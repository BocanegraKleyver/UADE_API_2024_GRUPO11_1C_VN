export const getCategoria = () => {
    return(
        fetch("http://localhost:3000/categoria")
        .then((Response) => Response.json())
        .catch(error => console.log('error',error))
        .finally(() => console.log('promise is finished'))
    )
};

export const altaCategoria = (id,descripcion) => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
        "id": id,
        "descripcion": descripcion
    });
    
    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    fetch("http://localhost:3000/categoria", requestOptions)
    .then(Response => Response.text())
    .then(result => console.log(result))
    .cath(error => console.log('error', error));
};

export const eliminarCategoria = (id) => {
    
    var requestOptions = {
        method: 'DELETE',
    };

    fetch("http://localhost:3000/categoria/" + id, requestOptions)
    .then(Response => Response.text())
    .cath(error => console.log('error', error));

};