import { categoriasServices } from "../../../servicios/categorias-servicios.js";
import { productosServices } from "../../../servicios/productos-servicios.js";

function htmlCategoria(id, categoria){
   
    var vista = 
    `
    <div class="categorias" data-idCategoria="${id}">
        <h1 class="categoria">${categoria}</h1>
        <div class="productos">

            <!-- Acá listan los productos-->
            <p class="item-producto">Sin productos.</p>
        </div>
    </div>            
    `
    return vista
}

function htmlItemProducto(id, imagen, nombre, precio){
   
    var vista = 
    `
    <div class="item-producto">

    <img src="${imagen}" >
    <p class="producto_nombre" name="motorola">${nombre}</p>
    <p class="producto_precio">${precio}</p>

    <a href="?idProducto=${id}#vistaProducto" type="button" class="producto_enlace" >Ver producto</a>

    </div>`
    return vista
}

async function asignarProducto(id){
    var vista = ""
    var resProd = await productosServices.listarPorCategoria(id);
    resProd.forEach(producto => {
        vista += htmlItemProducto(producto.id, producto.foto, producto.nombre, producto.precio)
    })
    var itemProducto = document.querySelector("[data-idCategoria='"+ id + "'] .productos")
    itemProducto.innerHTML = vista
} 

export async function listarProductos(){
    var lisVista
    var listaProductos = document.querySelector(".seccionProductos")
    listaProductos.innerHTML = ""
    lisVista = await categoriasServices.listar()
    lisVista.forEach(element => {
        listaProductos.innerHTML += htmlCategoria(element.id, element.descripcion)
        asignarProducto(element.id)
    })
}