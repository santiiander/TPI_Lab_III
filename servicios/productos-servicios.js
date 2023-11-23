const url = "https://655fc9fd83aba11d99cfdda0.mockapi.io/category/1/products";


async function listar(id) {
    let cadUrl;
    if(isNaN(id))
      cadUrl= url;
    else 
      cadUrl = url + "/" + id;  
    return await fetch(cadUrl)
        .then(respuesta => respuesta.json());
}

async function crear(pname, pdesc, ppic, pprice, id, category) {

    return await fetch(url, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            nombre: pname,
            descripcion: pdesc,
            foto: ppic,
            precio: pprice,
            idCategoria: id,
            categoria: category
        })
    })
}

async function editar(id, pname, pdesc, ppic, pprice, idCategoria, category) {

    let urlPut = url + "/" + id;
    return await fetch(urlPut, {
        method: 'PUT',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            nombre: pname,
            descripcion: pdesc,
            foto: ppic,
            precio: pprice,
            idCategoria: idCategoria,
            categoria: category
        })
    })
}

async function borrar(id){
  
    let urlPut = url + "/" + id;
    return await fetch(urlPut, {
            method: 'DELETE'
       })
}

async function listarPorCategoria(idCategoria) {
    const newUrl= new URL(url);
    newUrl.searchParams.append('idCategoria', idCategoria);
    return await fetch(newUrl)
        .then(respuesta => respuesta.json());
 
}
export const productosServices = {
    listar,
    crear,
    editar,
    borrar,
    listarPorCategoria
}