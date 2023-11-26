/**ESTE COMPONENTE SE ENCARGA DE MOSTRAR EL DETALLE DE UN PRODUCTO */
import { productosServices } from "../../../servicios/productos-servicios.js";
import { ventasServices } from "../../../servicios/ventas-servicios.js";
import { getUsuarioAutenticado } from "../login/login.js";

export async function vistaProducto(){

    let d = document; 
    let res; 
    let carrusel = d.querySelector(".carrusel");
    let seccionProductos = d.querySelector(".seccionProductos");
    let vistaProducto = d.querySelector(".vistaProducto");
    carrusel.innerHTML = "";
    let seccionLogin = d.querySelector(".seccionLogin");
    seccionLogin.innerHTML = "";
    seccionProductos.innerHTML = "";
    let idProducto = leerParametro();

    res = await productosServices.listar(idProducto);

    vistaProducto.innerHTML = htmlVistaProducto(res.id, res.nombre, res.descripcion, res.precio, res.foto);

    let btnComprar = d.getElementById("btnComprar");

    btnComprar.addEventListener("click", registrarCompra);
}

function htmlVistaProducto(id, nombre, descripcion, precio, imagen) {


    let cad =
            `<div class="imagen">
            <img src="${imagen}" alt="producto">
        </div>
        <div class="texto">
            <p id="nameProducto" data-idProducto=${id}>${nombre}</p>
        
            <p id="descripcionProducto">${descripcion}</p>
        
            <p id="precioProducto">${precio}</p>
        
            <div class="form-group">
                <label for="cantidadProducto">Cantidad</label>
                <input type="number" step="1" min ="1" value="1" id="cantidadProducto">
            </div>
        
            <a id="btnComprar" >Comprar</a>
        </div>`;
    return cad; 
    
}
function leerParametro(){
   
    const words = new URLSearchParams(window.location.search);
    let cad = words.get("idProducto");
    if (!cad) return null;
    return cad.trim();
}


function registrarCompra(){
    
    let d = document;
    let session = getUsuarioAutenticado();
    
    if(! session.autenticado) {
        alert("Antes de comprar debe iniciar sesión");
        return;
    }
    
    let cantidad = d.getElementById("cantidadProducto").value;
    let idUsuario = session.idUsuario;
    let emailUsuario = session.email;
    let nameProducto = d.getElementById("nameProducto");
    let idProducto = nameProducto.getAttribute("data-idproducto");
    const fecha = new Date();
    ventasServices.crear(idUsuario,emailUsuario,idProducto,nameProducto.textContent,cantidad,fecha,0);
    location.replace("tienda.html");
    alert("Compra realizada");
}