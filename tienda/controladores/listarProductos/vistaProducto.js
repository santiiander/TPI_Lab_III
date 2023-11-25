import { productosServices } from "../../../servicios/productos-servicios.js";
import { ventasServices } from "../../../servicios/ventas-servicios.js";
import { getUsuarioAutenticado } from "../login/login.js";

export async function vistaProducto(){
  /**1-En esta función se deben capturar los elementos html: .carrusel, .seccionProducto, .seccionLogin. Para luego 
   * blanquear su contenido. 
   * 2-Se deberá capturar el elemento .vistaProducto.
   * 3-Se deberá llamar a la función leerParametro para recuperar de la url el idProducto. 
   * 4-Luego se deberán leer los datos del producto indentificado con el idProducto recuperado.
   * 5-Llamar a la función htmlVistaProducto.
   * 6-El resultado de la función deberá asignarse al elemento .vistaProducto capturado previamente.
   * 7-Se deberá capturar el elemento html correspondiente al anchor btnComprar y enlazar el evento click a la función registrarCompra.  
   */

  // Blanquea el contenido de los elementos html
  document.querySelector(".carrusel").innerHTML = "";
  document.querySelector(".seccionProducto").innerHTML = "";
  document.querySelector(".seccionLogin").innerHTML = "";

  // Captura el elemento .vistaProducto
  const vistaProducto = document.querySelector(".vistaProducto");

  // Obtiene el idProducto de la url
  const idProducto = leerParametro("idProducto");

  // Obtiene los datos del producto
  const producto = await productosServices.obtenerProducto(idProducto);

  // Genera el HTML de la vista del producto
  const htmlVistaProducto = htmlVistaProducto(producto);

  // Asigna el HTML al elemento .vistaProducto
  vistaProducto.innerHTML = htmlVistaProducto;

  // Captura el elemento btnComprar
  const btnComprar = document.querySelector(".btnComprar");

  // Enlaza el evento click a la función registrarCompra
  btnComprar.addEventListener("click", async () => {
    // Verifica si el usuario está autenticado
    const usuarioAutenticado = await getUsuarioAutenticado();
    if (!usuarioAutenticado.autenticado) {
      // Si el usuario no está autenticado, redirige a la pantalla de login
      window.location.href = "#login";
      return;
    }

    // Registra la compra
    await ventasServices.registrarCompra(producto.id, usuarioAutenticado.idUsuario);

    // Muestra un mensaje de confirmación
    mostrarMensaje("Compra realizada con éxito");
  });
}

function htmlVistaProducto(id, nombre, descripcion, precio, imagen) {
    /**1- ESTA FUNCION RECIBE COMO PARAMETRO los siguiente datos id, nombre, descripcion, precio e imagen del producto */
    /**2- A ESTOS PARAMETROS LOS CONCATENA DENTRO DEL CODIGO CORRESPONDIENTE AL COMPONENTE vistaProducto ( ASSETS/MODULOS/vistaProducto.html)*/
    /**3- POR ULTIMO DEVUELVE LA CADENA RESULTANTE. */
    /**4- SE RECUERDA QUE PARA PODER HACER LA INTERPOLACION DE CADENAS ${NOMBRE_VARIABLE} EL TEXTO DEBE ESTAR ENTRE LAS COMILLAS ` `. 
    * 
    *  ejemplo
    *  let titulo = 'Señora'; 
    *  let cadena = `Hola, ${titulo} Claudia  en que podemos ayudarla`;
    * 
    */
  
    const html = `
    <div class="producto">
      <div class="imagen">
        <img src="${imagen}" alt="${nombre}">
      </div>
      <div class="datos">
        <h2>${nombre}</h2>
        <p>${descripcion}</p>
        <p>${precio} €</p>
        <a href="#" class="btnComprar">Comprar</a>
      </div>
    </div>
    `;
  
    return html;
}

function leerParametro(){
    // Captura el idProducto de la dirección URL enviada por la página que llama
    const words = new URLSearchParams(window.location.search);
    let cad = words.get("idProducto");
    if (!cad) return null;
    return cad.trim();
}


function registrarCompra() {
    /**1-Esta función es la encargada de procesar el evento click del anchor btnComprar.
     * 2-Luego deberá recuperar con la función getUsuarioAutenticado presente en el módulo login.js el objeto session
     * 3-Si la propiedad autenticado del objeto session es falso, el usuario no ha iniciado sesión, y se deberá emitir 
     *   una alerta que comunique al usuario que antes de realizar una compra debe haber iniciado sesión y salir de la 
     * ejecución de la función.
     * 4-Si la propiedad autenticado es true la ejecución continua.
     * 5-En este punto se deben almacenar los datos necesario para registrar la venta.
     * 5-Necesitamos idUsuario, emailUsuario, idProducto, nameProducto, cantidad y fecha.
     * 6-Los dos primeros los extraemos del objeto session.
     * 7-El resto de los datos los capturamos desde el objeto document utilizando los id: nameProducto, cantidadProducto. 
     *   El idProducto lo recuperamos desde el atributo data-idproducto y a fecha la obtenemos desde la fecha del sistema con
     *   el objeto Date() de javascript.
     * 8-Una vez reunido todos los datos necesarios llamamos a la función ventasServices.crear pasando lo parámetros obtenidos. 
     * 9-Luego de registrar la venta utilizando el objeto location.replace("tienda.html") renderizamos nuevamente la página 
     *   dejando el sitio en el estado inicial.
     * 10-Finalmente emitimos una alerta con la leyenda "Compra finalizada."
     *   
     */
  
    // Recupera el objeto session
    const session = getUsuarioAutenticado();
  
    // Verifica si el usuario está autenticado
    if (!session.autenticado) {
      // Si el usuario no está autenticado, emite una alerta
      mostrarMensaje("Para realizar una compra debe iniciar sesión");
      return;
    }
  
    // Obtiene los datos necesarios para registrar la venta
    const idUsuario = session.idUsuario;
    const emailUsuario = session.email;
    const idProducto = document.querySelector("#idProducto").getAttribute("data-idproducto");
    const nameProducto = document.querySelector("#nameProducto").textContent;
    const cantidad = document.querySelector("#cantidadProducto").value;
    const fecha = new Date();
  
    // Registra la venta
    ventasServices.crear(idUsuario, emailUsuario, idProducto, nameProducto, cantidad, fecha);
  
    // Redirige a la página de inicio
    window.location.replace("tienda.html");
  
    // Emite una alerta
    mostrarMensaje("Compra finalizada");
}