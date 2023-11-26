import { categoriasServices } from "../../../servicios/categorias-servicios.js";
import { productosServices } from "../../../servicios/productos-servicios.js";

function htmlCategoria(id, categoria) {
    return `
        <!-- Código HTML correspondiente al componente listarProducto.html -->
        <div class="categoria" data-idCategoria="${id}">
            <h2>${categoria}</h2>
            <!-- Otro contenido de la categoría si es necesario -->
        </div>
    `;
}

function htmlItemProducto(id, imagen, nombre, precio) {
    return `
        <!-- Código HTML correspondiente al componente itemProducto.html -->
        <div class="producto">
            <h3>${id}</h3> 
            <img src="${imagen}" alt="${nombre}">
            <h3>${nombre}</h3>
            <p>Precio: $${precio}</p>
            <!-- Otro contenido del producto si es necesario -->
        </div>
    `;
}

//La linea 17 no va, la agregué para usar ID

async function asignarProducto(id) {
    const productos = await productosServices.listarPorCategoria(id);
    let htmlProductos = "";

    for (const producto of productos) {
        htmlProductos += htmlItemProducto(producto.id, producto.imagen, producto.nombre, producto.precio);
    }

    const categoriaElement = document.querySelector(`[data-idCategoria="${id}"]`);
    categoriaElement.innerHTML = htmlProductos;
}

export async function listarProductos() {
    const seccionProductos = document.querySelector(".seccionProductos");
    seccionProductos.innerHTML = "";

    const categorias = await categoriasServices.listar();

    for (const categoria of categorias) {
        const htmlCategoriaElement = htmlCategoria(categoria.id, categoria.nombre);
        seccionProductos.innerHTML += htmlCategoriaElement;

        // Asignar productos a la categoría
        asignarProducto(categoria.id);
    }
}
