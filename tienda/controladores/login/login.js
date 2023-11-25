/**ESTE MODULO SE ENCARGA DE RENDERIZAR LA PANTALLA DE LOGIN Y DE REGISTRO SEGUN CORRESPONDA */
import { usuariosServices } from "../../../servicios/usuarios-servicios.js";

/**1- Se debe asignar a la siguiente constante todo el código correspondiente al componente de login (/asset/modulos/login.html)  */
const htmlLogin=
`
<div class="contenedorLogin">
    <div class="cajaLogin">
        <p >Iniciar sesión</p>

        <form  class="formLogin" >

            <div class="input-group">
                
                <input type="email" class="form-control" id="loginEmail" placeholder="Email" name="loginEmail" autocomplete required>
                
            </div>

            <div class="input-group">
                
                <input type="password" class="form-control" id="loginPassword" placeholder="Password" name="loginPassword" autocomplete required>
            
            </div>

            <div class="input-group">
                
                <input type="password" class="form-control" id="reLoginPassword" placeholder="Repetir Password" name="reLoginPassword"  required>
            
            </div>
                        
            <div class="row">
                                
                <div class="col-4">
                <button type="submit"  id="iniciar-sesion" class="btnAmarillo">Login</button>
                </div>
                    
            </div>
        </form>
            
    </div>
</div>
`;
/*2-Se deben definir 4 variables globales al módulo, una para el formulario html, y otras tres para los inputs de email, contraseña y 
*   repetir contraseña
*/
var formulario;
var inputEmail;
var inputPassword;
var inputRepetirPass;



export async function login(){
    /** 3- Esta función se encarga de llamar a la función crearFormulario y de enlazar el evento submit del formulario de login
     *
    **/
   crearFormulario();
   
}  

export async function register(){
    /**
     * 4- Esta función se encarga de llamar a la función crearFormulario y de enlazar el evento submit del formulario de registro.
     *    Esta función es similar a la de login, pero en el llamado a la función crearFormulario lo hace pasando el valor true al
     *    al parámetro registro que espera función mencionada.
     *    Por último enlaza el evento submit del formulario a la función registrarUsuario.
     *
     */
  
    // Llama a la función crearFormulario pasando el valor true al parámetro registro
    crearFormulario(true);
  
    // Obtiene el formulario de registro
    const formulario = document.querySelector(".formLogin");
  
    // Enlaza el evento submit del formulario a la función registrarUsuario
    formulario.addEventListener("submit", registrarUsuario);
}

function crearFormulario(registrar){
    /* 1- Esta función deberá capturar el elemento cuya clase es .carrusel y le asignará en su interior un blanco para eliminar su contenido previo. */

    var seccionCarrusel = document.querySelector(".carrusel");
    seccionCarrusel.outerHTML = ' ';

    /* 2- Deberá realizar lo mismo para la clase .seccionProductos y .vistaProducto. */

    var seccionProductos = document.querySelector(".seccionProductos");
    seccionProductos.outerHTML = ' ';

    var vistaProducto = document.querySelector(".vistaProducto");
    vistaProducto.outerHTML = ' ';

    /* 3- Luego deberá capturar la .seccionLogin para asignarle el contenido html del componente login, el cual se encuentra previamente 
     *    cargado en la constante htmlLogin. */

    var seccionLogin = document.querySelector(".seccionLogin");
    seccionLogin.innerHTML = htmlLogin;

    /* 4- Deberá capturar los id correspondientes a loginEmail, loginPassword y reLoginPassword para asignarlos a las variable definidas
     *    inputEmail, inputPassword e inputRepetirPass. */

    var loginMail = document.getElementById("loginEmail");
    var loginPass = document.getElementById("loginPassword");
    var loginRePass = document.getElementById("reLoginPassword");

    /* 5- En el caso que el parámetro registrar sea falso deberá eliminar el contenido del elemento id reLoginPassword. */

    if (!registrar) {
        loginRePass.innerHTML = "";
    }

    /* 6- Para el caso que el parámetro registrar sea verdadero deberá cambiar el valor de la propiedad css dysplay a block. De esta forma
     *    el input reLoginPassword se mostrará en pantalla. */

    else {
        loginRePass.style.display = "block";
    }

    /* 7- Por último se deberá capturar el formulario indentificado con la clase .formLogin y asignarlo a la variable global formulario. */

    formulario = document.querySelector(".formLogin");
}

async function ingresar(e){
    /**
     * 1- Esta función tiene como objetivo controlar que el texto en inputEmail e inputPassword se corresponda con alguna cuenta almacenada
     *    en el REST-API.
     * 2- Para ello en primera instancia deberá cancelar el comportamiento por defecto del envento recibido . Para ello deberá
     *     tomar el parámetro evento ( e ) y ejecutar el método preventDefault().
     * 3- Luego se deberá llamar la función llamada usuarioExiste. La misma devuelve un valor falso si el usuario no existe y el id del
     *      usuario en el caso que la cuenta sea válida.
     * 4- A través de una estructura de desición se deberá, en el caso de que el usuario sea válido :
     *     a- Llamar a la función setUsuarioAutenticado (usuariosServices) pasandole como parámetro el valor true y el id del usuario. De esta forma dicha
     *        función guardará estos datos en el sessionStorage del navegado, para poder ser consultados en el momento de la compra.
     *     b- Llamar a la función mostrarUsuario, pasandole como parámetro el texto del email de la cuenta.
     * 5- En el caso de que el usuario no sea válido se deberá mostrar una alerta con el texto 'Email o contraseña incorrecto, intenta nuevamente'.
     */
  
    // Cancela el comportamiento por defecto del evento submit
    e.preventDefault();
  
    // Obtiene los valores de los campos inputEmail e inputPassword
    const email = document.querySelector("input[name='loginEmail']").value;
    const password = document.querySelector("input[name='loginPassword']").value;
  
    // Llama a la función usuarioExiste
    const idUsuario = await usuarioExiste(email, password);
  
    // Compara el valor devuelto por la función usuarioExiste
    if (idUsuario) {
      // Si el usuario existe, llama a la función setUsuarioAutenticado
      await setUsuarioAutenticado(true, idUsuario);
  
      // Llama a la función mostrarUsuario
      mostrarUsuario(email);
    } else {
      // En caso contrario, muestra un mensaje de error
      mostrarMensaje("Email o contraseña incorrecto, intenta nuevamente");
    }
}

async function registrarUsuario(e){
    /**
     * 1- Esta función tiene como objetivo controlar que el texto en inputPassword sea exactamente igual al texto ingresado en
     *    inputRepetirPass y luego registrar la cuenta en el REST-API.
     * 2- Para ello en primera instancia deberá cancelar el comportamiento por defecto del envento recibido . Para ello deberá
     *     tomar el parámetro evento ( e ) y ejecutar el método preventDefault().
     * 3- Luego se comparará con una estructura de decisión si los textos ingresados en los controles mencionados son exactamente iguales.
     * 4- En caso afirmativo utilizando usuariosServices mediante el método crear, dará de alta el nuevo usuario.
     * 5- Deberá mostrar una alerta con la leyenda "Email registrado" y cambiará el valor del objeto window.location.href a "#login", para que
     *     se muestre la pantalla de login.
     * 5- En caso negativo o falso mostrará una alerta indicando que las contraseñas ingresadas no son iguales.
     */
  
    // Cancela el comportamiento por defecto del evento submit
    e.preventDefault();
  
    // Obtiene los valores de los campos inputPassword e inputRepetirPass
    const password = document.querySelector("input[name='password']").value;
    const repetirPassword = document.querySelector("input[name='repetirPassword']").value;
  
    // Compara los valores de los campos inputPassword e inputRepetirPass
    if (password === repetirPassword) {
      // Registra el nuevo usuario
      const usuario = await usuariosServices.crear({
        email: inputEmail.value,
        password: password
      });
  
      // Muestra un mensaje de confirmación
      mostrarMensaje("Email registrado");
  
      // Redirige a la pantalla de login
      window.location.href = "#login";
    } else {
      // Muestra un mensaje de error
      mostrarMensaje("Las contraseñas no son iguales");
    }
}

async function usuarioExiste(email, password) {
    /**
     * 1- El objetivo de esta función es consultar la lista de usuarios con la función usuariosServices.listar() y mediante
     *     un bucle comparar el email y la contraseña ingresado por el usuario en inputEmail e inputPassword con los previamente
     *      almacenados dentro del API-REST sobre el recuros usuarios.
     * 2- Si el email y la contraseña son válidos devuelve el id de usuario.
     * 3- Si el email y la contraseña no son válido devuelve falso.
     */
  
    // Obtiene la lista de usuarios
    const usuarios = await usuariosServices.listar();
  
    // Itera sobre la lista de usuarios
    for (const usuario of usuarios) {
      // Si el email y la contraseña coinciden con los del usuario de la lista
      if (usuario.email === email && usuario.password === password) {
        // Devuelve el id del usuario
        return usuario.id;
      }
    }
  
    // Si no se encuentra ningún usuario con los datos coincidentes
    return false;
}

  export function mostrarUsuario(email) {
    /**
     * 1- Esta función deberá capturar del dom la clase .btnLogin y asignarle el texto existente en el parámetro email.
     * 2- Deberá capturar del dom la clase .btnRegister y asignarle el texto "Logout" y a este elemento asignarle el valor
     *    "#logout" sobre el atributo href.
     */
  
    // Captura el botón .btnLogin
    const btnLogin = document.querySelector(".btnLogin");
  
    // Asigna al botón el texto del email
    btnLogin.textContent = email;
  
    // Captura el botón .btnRegister
    const btnRegister = document.querySelector(".btnRegister");
  
    // Asigna al botón el texto "Logout"
    btnRegister.textContent = "Logout";
  
    // Asigna al botón el valor "#logout" en el atributo href
    btnRegister.href = "#logout";
}

function mostrarMensaje(msj) {
    /**
     * Esta función muestra una alerta con el texto recibido en el parámetro msj.
     */
    alert(msj);
}

export function setUsuarioAutenticado(booleano, idUsuario) {
    /**
     * 1- Esta función deberá registar en el sessionStorage tres valores: autenticado, idUsuario y email.
     * 2- Los valores de los mismos serán tomados de los dos parámetros recibidos y el email será tomado desde la variable
     *    inputEmail.
     */
  
    // Obtiene el valor del email
    const email = document.querySelector("input[name='loginEmail']").value;
  
    // Registra los valores en el sessionStorage
    sessionStorage.setItem("autenticado", booleano);
    sessionStorage.setItem("idUsuario", idUsuario);
    sessionStorage.setItem("email", email);
}

export function getUsuarioAutenticado() {
    /**
     * 1- Esta función debera leer los valores almacenados en el sessionStorage y construir un objeto con los valores
     *    autenticado, idUsuario y email.
     * 2- Luego los devolverá como resultado.
     */
  
    // Obtiene los valores almacenados en el sessionStorage
    const autenticado = sessionStorage.getItem("autenticado");
    const idUsuario = sessionStorage.getItem("idUsuario");
    const email = sessionStorage.getItem("email");
  
    // Construye el objeto con los valores obtenidos
    const usuario = {
      autenticado,
      idUsuario,
      email
    };
  
    // Devuelve el objeto
    return usuario;
}
