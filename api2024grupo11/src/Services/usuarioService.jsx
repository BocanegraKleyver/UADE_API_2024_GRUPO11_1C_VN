export const CrearUsuarios = async (
  username,
  password,
  nombre,
  apellido,
  email
) => {
  const req = JSON.stringify({
    username,
    firstname: nombre,
    lastname: apellido,
    email,
    password,
    roles: 1,
  });


  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: req,
  };

  const response = await fetch(
    "http://localhost:8080/api/v1/auth/register",
    requestOptions
  )
    .then((Response) => Response.json())
    .catch((error) => console.log("error", error));

  return response;
};

export const LoggearUsuario = async (password, email) => {
  const req = JSON.stringify({
    email,
    password,
  });

  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: req,
  };

  const response = await fetch(
    "http://localhost:8080/api/v1/auth/authenticate",
    requestOptions
  )
    .then((response) => response.json())
    .catch((error) => console.log("error", error));

  return response;
};
