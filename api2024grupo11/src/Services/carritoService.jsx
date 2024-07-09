export const getCarrito = async () => {
    try {
        const response = await fetch("http://localhost:8080/api/v1/carrito/1", {
            method: 'GET',
            headers: new Headers({ 'Content-type': 'application/json'}),
            mode: 'cors'
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const text = await response.text();

        const data = JSON.parse(text);
        return data;
    } catch (error) {
        console.log('Error fetching carrito', error);
    }
};


export const agregarItemAlCarrito = async (item, idCarrito) => {
    try {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
            "productoId": item.id,
            "cantidad": 1
        });

        console.log(raw)
        
        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        const response = await fetch("http://localhost:8080/api/v1/carrito/agregar/" + idCarrito, requestOptions);
        const result = await response.text();
        console.log(result);
    } catch (error) {
        console.log('error', error);
    }
};

export const sumarCantidadCarrito = async (cantidad, idProducto) => {
    try {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
            "productoId": idProducto,
            "cantidad": cantidad
        });
        
        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
        };

        const response = await fetch("http://localhost:8080/api/v1/carrito/agregar/1", requestOptions);
        
        if (!response.ok) {
            const errorResponse = await response.json();
            throw new Error(errorResponse.error || 'Error en la solicitud');
          }
      
          return await response.json();
        } catch (error) {
          return { error: error.message };
        }
}

export const restarCantidadCarrito = async (cantidad, idProducto) => {
    try {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
            "productoId": idProducto,
            "cantidad": cantidad
        });
        
        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
        };

        const response = await fetch("http://localhost:8080/api/v1/carrito/restar/1", requestOptions);
        
        if (!response.ok) {
            const errorResponse = await response.json();
            throw new Error(errorResponse.error || 'Error en la solicitud');
          }
      
          return await response.json();
        } catch (error) {
          return { error: error.message };
        }
}

export const actualizarCarrito = async (cantidad, item) => {
    try {
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

        const response = await fetch("http://localhost:8000/carrito/" + item.id, requestOptions);
        const result = await response.text();
        console.log(result);
    } catch (error) {
        console.log('error', error);
    }
};

export const eliminarItemDelCarrito = async (id) => {
    try {

        const data = {
            "productoId": id
        }

        var requestOptions = {
            method: 'DELETE',
            headers: new Headers({ 'Content-type': 'application/json'}),
            body: JSON.stringify(data),
            mode: 'cors'
        };

        const response = await fetch("http://localhost:8080/api/v1/carrito/quitar/1", requestOptions);
    } catch (error) {
        console.log('error', error);
    }
};