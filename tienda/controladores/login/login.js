/**ESTE MODULO SE ENCARGA DE RENDERIZAR LA PANTALLA DE LOGIN Y DE REGISTRO SEGUN CORRESPONDA */
import { usuariosServices } from "../../../servicios/usuarios-servicios.js";

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
`

var formulario
var inputEmail
var contra
var repContra

export async function login(){
    crearFormulario()
    formulario.addEventListener("submit",ingresar)
}  

export async function register(){
   crearFormulario(true)
   formulario.addEventListener("submit",registrarUsuario)
}  

function crearFormulario(registrar){

    var carrusel = document.querySelector(".carrusel")
    carrusel.innerHTML = ""
    var seccionProductos = document.querySelector(".seccionProductos")
    seccionProductos.innerHTML = ""
    var vistaProducto = document.querySelector(".vistaProducto")
    vistaProducto.innerHTML = ""

    var seccionLogin = document.querySelector(".seccionLogin")
    seccionLogin.innerHTML = htmlLogin
    inputEmail = document.getElementById("loginEmail")
    contra = document.getElementById("loginPassword")
    repContra = document.getElementById("reLoginPassword")
    if (!registrar){
        repContra.outerHTML = ""
    }else{
        repContra.style.display = "block"
        document.querySelector(".cajaLogin p").innerHTML = "Registrar Usuario"
    }
    formulario = seccionLogin.querySelector(".formLogin")
} 

async function  ingresar(e){
    e.preventDefault()
    var idUsuario = await usuarioExiste()
    if(idUsuario){
        setUsuarioAutenticado(true,idUsuario)
        mostrarUsuario(inputEmail.value)
        window.location.href='#'
    }else{
        mostrarMensaje("email o contrasena incorrecto")
    }
}

async function  registrarUsuario(e){
    e.preventDefault()

    if(contra.value===repContra.value){ 
        await usuariosServices.crear(null,null,inputEmail.value,contra.value) 
        mostrarMensaje("registrado")
        window.location.href = "#login"
    }else{
        mostrarMensaje("Las contraseñas deben ser iguales")
    }  
}
async function usuarioExiste(){
    var existeUsuario
    var idUsuario
    await usuariosServices.listar()
        .then(respuesta => {
            respuesta.forEach(usuario => {
                if(usuario.correo === inputEmail.value && usuario.password === contra.value){
                    idUsuario = usuario.id
                    return existeUsuario = true
                }else{
                    return
                }
            });
        })
        .catch(error => console.log(error))

    if (!usuarioExiste){
        return false
    } else {
        return idUsuario
    }     
}

export function mostrarUsuario(email){
    const btnLogin = document.querySelector('.btnLogin')
    const btnRegister = document.querySelector('.btnRegister')
    
    if(btnLogin) {
        btnLogin.textContent = email
    }

    if(btnRegister){
        btnRegister.textContent = 'Logout'
        btnRegister.href = '#logout'
    }
}

function mostrarMensaje(msj){
    alert(msj)
}

export function setUsuarioAutenticado(booleano, idUsuario){
    var email = ""
    if (inputEmail)
        email = inputEmail.value
    sessionStorage.setItem('autenticado',booleano)
    sessionStorage.setItem('idUsuario',idUsuario)
    sessionStorage.setItem('email',email)
}

export function getUsuarioAutenticado(){
    var session = new Object()
    session.autenticado = sessionStorage.getItem('autenticado') === "true"
    session.idUsuario = sessionStorage.getItem('idUsuario')
    session.email = sessionStorage.getItem('email')
    return session
}
