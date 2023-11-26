import { categoriasServices } from "../../../servicios/categorias-servicios.js";
import { productosServices } from "../../../servicios/productos-servicios.js";

function htmlCategoria(id, categoria){
   
    let htmlCat = 
    `
    <div class="categorias" data-idCategoria="${id}">
        <h1 class="categoria">${categoria}</h1>
        <div class="productos">

            <!-- Acá listan los productos-->
            <p class="item-producto">Sin productos.</p>
        </div>
    </div>            
    `;
    return htmlCat; 
}

function htmlItemProducto(id, imagen, nombre, precio){
   
    let htmlitemProd = 
    `
    <div class="item-producto">

    <img src="${imagen}" >
    <p class="producto_nombre" name="motorola">${nombre}</p>
    <p class="producto_precio">${precio}</p>

    <a href="?idProducto=${id}#vistaProducto" type="button" class="producto_enlace" >Ver producto</a>

    </div>`;
    return htmlitemProd; 
}

async function asignarProducto(id){
    let htmlCat = "";
    let resProd = await productosServices.listarPorCategoria(id);

    resProd.forEach(producto => {
        htmlCat += htmlItemProducto(producto.id,producto.foto,producto.nombre,producto.precio);
    });
        
    let itemProducto = document.querySelector("[data-idCategoria='"+ id + "'] .productos");
    itemProducto.innerHTML = htmlCat; 
} 


export async function listarProductos(){
    let listaProductos = document.querySelector(".seccionProductos");

    listaProductos.innerHTML = "";
    resCat = await categoriasServices.listar();

    resCat.forEach(element => {
        listaProductos.innerHTML += htmlCategoria(element.id, element.descripcion);
        asignarProducto(element.id);
    })
     
}  

