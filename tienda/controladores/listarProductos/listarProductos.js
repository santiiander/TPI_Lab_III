import { categoriasServices } from "../../../servicios/categorias-servicios.js";
import { productosServices } from "../../../servicios/productos-servicios.js";

function htmlCategoria(id, categoria){
   
    let cad = 
    `
    <div class="categorias" data-idCategoria="${id}">
        <h1 class="categoria">${categoria}</h1>
        <div class="productos">

            <!-- Acá listan los productos-->
            <p class="item-producto">Sin productos.</p>
        </div>
    </div>            
    `;
    return cad; 
}

function htmlItemProducto(id, imagen, nombre, precio){
   
    let cad = 
    `
    <div class="item-producto">

    <img src="${imagen}" >
    <p class="producto_nombre" name="motorola">${nombre}</p>
    <p class="producto_precio">${precio}</p>

    <a href="?idProducto=${id}#vistaProducto" type="button" class="producto_enlace" >Ver producto</a>

    </div>`;
    return cad; 
}

async function asignarProducto(id){
   
    let d = document;
    let cad = "";
    let resProd = await productosServices.listarPorCategoria(id);

    resProd.forEach(producto => {
        cad += htmlItemProducto(producto.id,producto.foto,producto.nombre,producto.precio);
    });
        
    let itemProducto = d.querySelector("[data-idCategoria='"+ id + "'] .productos");
    itemProducto.innerHTML = cad; 
} 


export async function listarProductos(){
   
    let d = document;
    let resCat;

    let listaProductos = d.querySelector(".seccionProductos");

    listaProductos.innerHTML = "";
    resCat = await categoriasServices.listar();

    resCat.forEach(element => {
        listaProductos.innerHTML += htmlCategoria(element.id, element.descripcion);
        asignarProducto(element.id);
    })
     
}  

