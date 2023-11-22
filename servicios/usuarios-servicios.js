const url = "https://655e38789f1e1093c59abf3d.mockapi.io/users";

//API-REST USUARIOS//

async function listar(id) {
    let cadUrl;
    if(isNaN(id))
      cadUrl= url;
    else 
      cadUrl = url + "/" + id;  
    return await fetch(cadUrl)
        .then(respuesta => respuesta.json());
}

async function crear(lastname, name, email, password, pic, country, city, address, phone) {

    return await fetch(url, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            lastname: lastname,
            name: name,
            email: email,
            password: password,
            pic: pic,
            country: country,
            city: city,
            address: address,
            phone:  phone
        })
    })
}

async function editar(id, lastname, name, email, password, pic, country, city, address, phone) {

    let urlPut = url + "/" + id;
    return await fetch(urlPut, {
        method: 'PUT',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            lastname: lastname,
            name: name,
            email: email,
            password: password,
            pic: pic,
            country: country,
            city: city,
            address: address,
            phone:  phone
        })
    })
}

async function borrar(id){
  
    let urlPut = url + "/" + id;
    return await fetch(urlPut, {
            method: 'DELETE'
       })
}

export const usuariosServices = {
    listar,
    crear,
    editar,
    borrar
}