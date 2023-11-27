/**ESTE COMPONENTE SE ENCARGA DE MOSTRAR EL DETALLE DE UN PRODUCTO */
import { productosServices } from "../../../servicios/productos-servicios.js";
import { ventasServices } from "../../../servicios/ventas-servicios.js";
import { getUsuarioAutenticado } from "../login/login.js";

export async function vistaProducto(){
    var lista
    var carrusel = document.querySelector(".carrusel")
    var seccionProductos = document.querySelector(".seccionProductos")
    var vistaProducto = document.querySelector(".vistaProducto")
    carrusel.innerHTML = ""
    var seccionLogin = document.querySelector(".seccionLogin")
    seccionLogin.innerHTML = ""
    seccionProductos.innerHTML = ""
    var idProducto = leerParametro()

    lista = await productosServices.listar(idProducto)

    vistaProducto.innerHTML = htmlVistaProducto(lista.id, lista.nombre, lista.descripcion, lista.precio, lista.foto)

    var btnComprar = document.getElementById("btnComprar")

    btnComprar.addEventListener("click", registrarCompra)
}

function htmlVistaProducto(id, nombre, descripcion, precio, imagen){
    var vista =
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
        </div>`
    return vista  
}

function leerParametro(){
   
    const words = new URLSearchParams(window.location.search)
    var vista = words.get("idProducto")
    if (!vista) return null
    return vista.trim()
}


function registrarCompra(){

    var session = getUsuarioAutenticado()
    if(!session.autenticado){
        alert("Porfavor inicie secion")
        return
    }
    
    var cantidad = document.getElementById("cantidadProducto").value
    var idUsuario = session.idUsuario
    var emailUsuario = session.email
    var nameProducto = document.getElementById("nameProducto")
    var idProducto = nameProducto.getAttribute("data-idproducto")
    const fecha = new Date()
    ventasServices.crear(idUsuario, emailUsuario, idProducto, nameProducto.textContent, cantidad, fecha, 0)
    location.replace("tienda.html")
    alert("Compra exitosa")
}