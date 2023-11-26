/**ESTE MODULO SE ENCARGA DE RENDERIZAR LA PANTALLA DE LOGIN Y DE REGISTRO SEGUN CORRESPONDA */
import { usuariosServices } from "../../../servicios/usuarios-servicios.js";

/**1- Se debe asignar a la siguiente constante todo el código correspondiente al componente de login (/asset/modulos/login.html)  */
var htmlLogin=
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
const formLogin = document.querySelector(".formLogin");
const loginEmail = document.getElementById("loginEmail");
const loginPassword = document.getElementById("loginPassword");
const reLoginPassword = document.getElementById("reLoginPassword");

export { htmlLogin, formLogin, loginEmail, loginPassword, reLoginPassword };



export async function login() {
    // 1. Llamamos a la función `crearFormulario()` para renderizar el formulario de login
    crearFormulario();
  
    // 2. Enlazamos el evento `submit` del formulario con la función `enviarFormulario()`
    formLogin.addEventListener("submit", enviarFormulario);
  }
  

  export async function register() {
    // 1. Llamamos a la función `crearFormulario()` para renderizar el formulario de registro
    crearFormulario(true);
  
    // 2. Enlazamos el evento `submit` del formulario con la función `registrarUsuario()`
    formLogin.addEventListener("submit", registrarUsuario);
}
  



function crearFormulario(registrar) {
    // 1- Capturamos el elemento cuya clase es .carrusel y le asignamos en su interior un blanco para eliminar su contenido previo.
    const carrusel = document.querySelector(".carrusel");
    carrusel.innerHTML = "";
  
    // 2- Realizamos lo mismo para la clase .seccionProductos y .vistaProducto.
    const seccionProductos = document.querySelector(".seccionProductos");
    seccionProductos.innerHTML = "";
    const vistaProducto = document.querySelector(".vistaProducto");
    vistaProducto.innerHTML = "";
  
    // 3- Capturamos la .seccionLogin para asignarle el contenido html del componente login.
    const seccionLogin = document.querySelector(".seccionLogin");
    var htmlLogin=
    `
    <div class="contenedorLogin">
    <div class="cajaLogin">
        <p >Registrarse</p>

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
                <button type="submit"  id="iniciar-sesion" class="btnAmarillo">Registrarse</button>
                </div>
                    
            </div>
        </form>
            
    </div>
    </div>
    `;

    let hash = location.hash;
    if (hash === '#login' ) {

        var htmlLogin=
        `
        <div class="contenedorLogin">
        <div class="cajaLogin">
            <p >Iniciar Sesion</p>
    
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
                    <button type="submit"  id="iniciar-sesion" class="btnAmarillo">Iniciar Sesion</button>
                    </div>
                        
                </div>
            </form>
                
        </div>
        </div>
        `;
       
        
    }
    seccionLogin.innerHTML = htmlLogin;


    //No es la forma practica de hacerlo en absoluto pero funcionó xd
  
    // 4- Capturamos los id correspondientes a loginEmail, loginPassword y reLoginPassword.
    const inputEmail = document.getElementById("loginEmail");
    const inputPassword = document.getElementById("loginPassword");
    const inputRepetirPass = document.getElementById("reLoginPassword");
  
    // 5- En el caso que el parámetro registrar sea falso eliminamos el contenido del elemento id reLoginPassword.
    if (!registrar) {
      inputRepetirPass.value = "";
    }
  
    // 6- Para el caso que el parámetro registrar sea verdadero cambiamos el valor de la propiedad css dysplay a block.
    if (registrar) {
      inputRepetirPass.style.display = "block";
    }
  
    // 7- Capturamos el formulario indentificado con la clase .formLogin y asignamoslo a la variable global formulario.
    formulario = document.querySelector(".formLogin");
}

async function ingresar(e) {
    // 1- Cancelamos el comportamiento predeterminado del evento recibido
    e.preventDefault();
  
    // 2- Obtenemos los valores de los campos del formulario
    const email = loginEmail.value;
    const password = loginPassword.value;
  
    // 3- Llamamos a la función usuarioExiste()
    const idUsuario = await usuariosServices.usuarioExiste(email, password);
  
    // 4- Analizamos el resultado de la función usuarioExiste()
    if (idUsuario) {
      // 4.a- Llamamos a la función setUsuarioAutenticado()
      usuariosServices.setUsuarioAutenticado(true, idUsuario);
  
      // 4.b- Llamamos a la función mostrarUsuario()
      mostrarUsuario(email);
    } else {
      // 5- Mostramos un mensaje de error
      alert("Email o contraseña incorrecto, intenta nuevamente");
    }
  }

async function registrarUsuario(e) {
    // 1- Cancelamos el comportamiento predeterminado del evento recibido
    e.preventDefault();
  
    // 2- Obtenemos los valores de los campos del formulario
    const email = loginEmail.value;
    const password = loginPassword.value;
    const rePassword = reLoginPassword.value;
  
    // 3- Comparamos los valores de los campos
    if (password === rePassword) {
      // 4- Registramos el usuario
      const response = await usuariosServices.crear(email, password);
  
      // 5- Mostramos un mensaje de éxito
      alert("Email registrado");
      window.location.href = "#login";
    } else {
      // 6- Mostramos un mensaje de error
      alert("Las contraseñas ingresadas no son iguales");
    }
}

async function usuarioExiste() {
    // 1- Consultamos la lista de usuarios
    const usuarios = await usuariosServices.listar();
  
    // 2- Iteramos sobre la lista de usuarios
    for (const usuario of usuarios) {
      // 3- Comparamos el email y la contraseña del usuario actual con los ingresados por el usuario
      if (usuario.email === loginEmail.value && usuario.password === loginPassword.value) {
        // 4- Si son iguales, devolvemos el ID del usuario
        return usuario.id;
      }
    }
  
    // 5- Si no se encuentra ningún usuario con los datos ingresados, devolvemos falso
    return false;
}

export function mostrarUsuario(email) {
    // 1- Capturamos la clase .btnLogin
    const btnLogin = document.querySelector(".btnLogin");
  
    // 2- Asignamos el texto del email al botón
    btnLogin.textContent = email;
  
    // 3- Capturamos la clase .btnRegister
    const btnRegister = document.querySelector(".btnRegister");
  
    // 4- Asignamos el texto "Logout" al botón
    btnRegister.textContent = "Logout";
  
    // 5- Asignamos el valor "#logout" al atributo href del botón
    btnRegister.href = "#logout";
  }

function mostrarMensaje(msj) {
    /**
     * Esta función muestra una alerta con el texto recibido en el parámetro msj.
     */
    alert(msj);
}

export function setUsuarioAutenticado(booleano, idUsuario) {
    // 1- Capturamos el email del formulario
    const email = loginEmail.value;
  
    // 2- Guardamos los valores en el sessionStorage
    sessionStorage.setItem("autenticado", booleano);
    sessionStorage.setItem("idUsuario", idUsuario);
    sessionStorage.setItem("email", email);
  }

  export function getUsuarioAutenticado() {
    // 1- Obtenemos los valores almacenados en el sessionStorage
    const autenticado = sessionStorage.getItem("autenticado");
    const idUsuario = sessionStorage.getItem("idUsuario");
    const email = sessionStorage.getItem("email");
  
    // 2- Construimos un objeto con los valores obtenidos
    const usuarioAutenticado = {
      autenticado,
      idUsuario,
      email,
    };
  
    // 3- Devolvemos el objeto
    return usuarioAutenticado;
}
