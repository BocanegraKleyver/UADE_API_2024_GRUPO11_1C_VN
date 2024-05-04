export const getCategoria = async () => {
    try {
        const response = await fetch("http://localhost:3000/categoria");
        const data = await response.json();
        return data;
    } catch (error) {
        console.log('error', error);
    } finally {
        console.log('promise is finished');
    }
};

export const altaCategoria = async (id, descripcion) => {
    try {
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const raw = JSON.stringify({
            "id": id,
            "descripcion": descripcion
        });
        
        const requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        const response = await fetch("http://localhost:3000/categoria", requestOptions);
        const result = await response.text();
        console.log(result);
    } catch (error) {
        console.log('error', error);
    }
};

export const eliminarCategoria = async (id) => {
    try {
        const requestOptions = {
            method: 'DELETE',
        };

        const response = await fetch("http://localhost:3000/categoria/" + id, requestOptions);
        const result = await response.text();
        console.log(result);
    } catch (error) {
        console.log('error', error);
    }
};
