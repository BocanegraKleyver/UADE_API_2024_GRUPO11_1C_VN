export const getCarrito = async () => {
    try {
        const response = await fetch("http://localhost:8000/carrito");
        const data = await response.json();
        return data;
    } catch (error) {
        console.log('error', error);
    }
};

export const agregarItemAlCarrito = async (item) => {
    try {
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

        const response = await fetch("http://localhost:8000/carrito", requestOptions);
        const result = await response.text();
        console.log(result);
    } catch (error) {
        console.log('error', error);
    }
};

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
        var requestOptions = {
            method: 'DELETE',
        };

        const response = await fetch("http://localhost:8000/carrito/" + id, requestOptions);
        const result = await response.text();
        console.log(result);
    } catch (error) {
        console.log('error', error);
    }
};

export const vaciarCarrito = async (arrayIds) => {
    try {
        // No encontramos forma de vaciar el carrito de una
        arrayIds.forEach(async (id) => {
            var requestOptions = {
                method: 'DELETE',
            };
        
            const response = await fetch("http://localhost:8000/carrito/" + id, requestOptions);
            const result = await response.text();
            console.log(result);
        });
    } catch (error) {
        console.log('error', error);
    }
};
