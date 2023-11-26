import { productosServices } from "../../../servicios/productos-servicios.js";
import { ventasServices } from "../../../servicios/ventas-servicios.js";
import { getUsuarioAutenticado } from "../login/login.js";

export async function vistaProducto() {
    const carrusel = document.querySelector(".carrusel");
    const seccionProducto = document.querySelector(".seccionProducto");
    const seccionLogin = document.querySelector(".seccionLogin");
    carrusel.innerHTML = "";
    seccionProducto.innerHTML = "";
    seccionLogin.innerHTML = "";

    const vistaProductoElement = document.querySelector(".vistaProducto");
    const idProducto = leerParametro();
    
    if (!idProducto) {
        // Si no se proporciona un idProducto, podrías mostrar un mensaje de error o redirigir a otra página.
        console.error("Error: No se proporcionó un idProducto válido.");
        return;
    }

    const producto = await productosServices.obtenerPorId(idProducto);
    const htmlProducto = htmlVistaProducto(producto.id, producto.nombre, producto.descripcion, producto.precio, producto.imagen);
    vistaProductoElement.innerHTML = htmlProducto;

    const btnComprar = document.getElementById("btnComprar");
    btnComprar.addEventListener("click", registrarCompra);
}

function htmlVistaProducto(id, nombre, descripcion, precio, imagen) {
    return `
        <!-- Código HTML correspondiente al componente vistaProducto -->
        <div class="producto">
            <img src="${imagen}" alt="${nombre}">
            <h2>${nombre}</h2>
            <p>${descripcion}</p>
            <p>Precio: $${precio}</p>
            <a href="#" id="btnComprar" data-idproducto="${id}">Comprar</a>
        </div>
    `;
}

function leerParametro() {
    const words = new URLSearchParams(window.location.search);
    const idProducto = words.get("idProducto");
    return idProducto ? idProducto.trim() : null;
}

function registrarCompra() {
    const session = getUsuarioAutenticado();
    
    if (!session || !session.autenticado) {
        alert("Debes iniciar sesión antes de realizar una compra.");
        return;
    }

    const idUsuario = session.idUsuario;
    const emailUsuario = session.email;
    const idProducto = this.getAttribute("data-idproducto");
    const nombreProducto = document.getElementById("nombreProducto").innerText;
    const cantidadProducto = document.getElementById("cantidadProducto").value;
    const fecha = new Date().toISOString();

    ventasServices.crear(idUsuario, emailUsuario, idProducto, nombreProducto, cantidadProducto, fecha);
    location.replace("tienda.html");
    alert("Compra finalizada.");
}
