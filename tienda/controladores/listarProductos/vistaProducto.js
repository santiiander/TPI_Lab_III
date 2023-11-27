/**ESTE COMPONENTE SE ENCARGA DE MOSTRAR EL DETALLE DE UN PRODUCTO */
import { productosServices } from "../../../servicios/productos-servicios.js";
import { ventasServices } from "../../../servicios/ventas-servicios.js";
import { getUsuarioAutenticado } from "../login/login.js";

export async function vistaProducto(){
    var lista
    var carrusel = document.querySelector(".carrusel")
    carrusel.innerHTML = ""
    var seccionProductos = document.querySelector(".seccionProductos")
    seccionProductos.innerHTML = ""
    var seccionLogin = document.querySelector(".seccionLogin")
    seccionLogin.innerHTML = ""

    var vistaProducto = document.querySelector(".vistaProducto")
    var idProducto = leerParametro()

    /**llama a la funcion listar() de productosServices para obtener la informacion del producto
     * la funcion listar() toma como parametro el ID del producto y devuelve un objeto con la informacion del producto */
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
   /**almacena los parámetros de la URL. */
    const words = new URLSearchParams(window.location.search)
    /**obtiene el valor del parametro idProducto del objeto URLSearchParams */
    var vista = words.get("idProducto")
    /**verifica si el valor del parametro idProducto es nulo. si lo es, la funcion devuelve null */
    if (!vista) return null
    return vista.trim()
}

function registrarCompra(){
    /**verifica si el usuario esta autenticado. si no lo esta, la funcion muestra un mensaje de alerta y devuelve */
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