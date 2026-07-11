/* 
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/ClientSide/javascript.js to edit this template
 */
/*carrito*/
function agregarCarrito(nombre, precio, imagen, mostrarAlerta = true) {

    if (localStorage.getItem("sesionActiva") !== "true") {

        Swal.fire({
            icon: "warning",
            title: "Debes iniciar sesión",
            text: "Inicia sesión para agregar productos al carrito.",
            confirmButtonText: "Ir a iniciar sesión",
            confirmButtonColor: "#3AB397"
        }).then(() => {

            window.location.href = "../Formulario_InicioSesion/index.html";

        });

        return;
    }

    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

    let producto = {
        nombre: nombre,
        precio: precio,
        imagen: imagen,
        cantidad: 1
    };

    // CORRECCIÓN: Ahora busca que coincidan Nombre E Imagen para considerarlo el mismo artículo
    let existe = carrito.find(p => p.nombre === nombre && p.imagen === imagen);

    if (existe) {
        existe.cantidad++;
    } else {
        carrito.push(producto);
    }

    localStorage.setItem("carrito", JSON.stringify(carrito));

    actualizarContador();

    console.log("Alerta:", mostrarAlerta);


    Swal.fire({
        position: "top-end",
        icon: "success",
        title: "¡Producto agregado al carrito! 🛒",
        showConfirmButton: false,
        timer: 1500
    });
}

function actualizarContador() {

    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

    let contador = document.getElementById("contador-carrito");

    if (contador) {
        contador.innerText = carrito.length;
    }

}

/*buscar un productor*/
function buscarProducto() {

    let texto = document
            .getElementById("buscador")
            .value
            .toLowerCase();

    let productos =
            document.querySelectorAll(".tarjeta-categoria");

    productos.forEach(producto => {

        let nombre = producto
                .querySelector("h3")
                .textContent
                .toLowerCase();

        if (nombre.includes(texto)) {
            producto.style.display = "block";
        } else {
            producto.style.display = "none";
        }

    });
}
/*corazon dentro de laimgen */
function toggleFavorito(corazon) {

// Verificar si el usuario inició sesión
    if (localStorage.getItem("sesionActiva") !== "true") {

        Swal.fire({
            icon: "warning",
            title: "Debes iniciar sesión",
            text: "Inicia sesión para guardar productos en Favoritos.",
            confirmButtonText: "Ir a iniciar sesión",
            confirmButtonColor: "#3AB397"
        }).then(() => {

            window.location.href = "../Formulario_InicioSesion/index.html";

        });

        return;
    }

    let icono = corazon.querySelector("i");

    const tarjeta = corazon.closest(".tarjeta-categoria");

    const nombre = tarjeta.querySelector("h3").textContent;
    const precio = tarjeta.querySelector("h2").textContent;
    const imagen = tarjeta.querySelector("img").src;

    let favoritos =
            JSON.parse(localStorage.getItem("favoritos")) || [];

    const indice = favoritos.findIndex(
            producto =>
        producto.nombre === nombre &&
                producto.imagen === imagen
    );

    if (indice === -1) {

        favoritos.push({
            nombre,
            precio,
            imagen,
            fecha: new Date().toLocaleDateString("es-PE")
        });

        icono.classList.remove("fa-regular");
        icono.classList.add("fa-solid");
        icono.style.color = "#2df58a";

    } else {

        favoritos.splice(indice, 1);

        icono.classList.remove("fa-solid");
        icono.classList.add("fa-regular");
        icono.style.color = "black";

    }

    localStorage.setItem(
            "favoritos",
            JSON.stringify(favoritos)
            );

    actualizarContadorCorazon();
}
/*n° d cora sigue intacto al volver a la pag*/
function cargarFavoritos() {

    let favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];

    document.querySelectorAll(".tarjeta-categoria").forEach(tarjeta => {

        let nombre = tarjeta.querySelector("h3").textContent;

        let imagen = tarjeta.querySelector("img").src;

        let existe = favoritos.some(
                producto =>
            producto.nombre === nombre &&
                    producto.imagen === imagen
        );

        let icono = tarjeta.querySelector(".favorito i, .favorito ion-icon");


        if (existe && icono) {

            icono.classList.remove("fa-regular");
            icono.classList.add("fa-solid");
            icono.style.color = "#2df58a";

        }

    });

}

/*actualizar corazon*/
function actualizarContadorCorazon() {

    let favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];

    let contador = document.getElementById("contador-favoritos");

    if (contador) {

        contador.textContent = favoritos.length;

    }

}

/*el cora en las imagen mas rapido*/
document.querySelectorAll(".contenedor-imagen").forEach(contenedor => {

    let favorito = document.createElement("div");

    favorito.classList.add("favorito");

    favorito.setAttribute("onclick", "toggleFavorito(this)");

    favorito.innerHTML = `
        <i class="fa-regular fa-heart"></i>
    `;

    contenedor.appendChild(favorito);

});

window.addEventListener("load", function () {

    cargarFavoritos();

    actualizarContador();

    actualizarContadorCorazon();
    
    mostrarUsuario();

});

// =========================
// USUARIO
// =========================

const usuario = JSON.parse(localStorage.getItem("usuarioActual"));

const nombreUsuario = document.getElementById("nombreUsuario");

const menuUsuario = document.getElementById("menuUsuario");

const btnUsuario = document.getElementById("btnUsuario");

if(usuario){

    nombreUsuario.textContent = usuario.nombre;

}else{

    nombreUsuario.textContent = "Iniciar sesión";

}

btnUsuario.addEventListener("click",function(e){

    e.preventDefault();

    if(localStorage.getItem("sesionActiva")!=="true"){

        window.location.href="../Formulario_InicioSesion/index.html";

        return;

    }

    if(menuUsuario.style.display==="block"){

        menuUsuario.style.display="none";

    }else{

        menuUsuario.style.display="block";

    }

});

window.addEventListener("click",function(e){

    if(!e.target.closest(".usuario-menu")){

        menuUsuario.style.display="none";

    }

});

function cerrarSesion(){

    Swal.fire({

        title:"¿Cerrar sesión?",

        icon:"question",

        showCancelButton:true,

        confirmButtonColor:"#3AB397",

        cancelButtonColor:"#d33",

        cancelButtonText:"Cancelar",

        confirmButtonText:"Cerrar sesión"

    }).then((result)=>{

        if(result.isConfirmed){

            // Eliminar sesión
            localStorage.removeItem("sesionActiva");
            localStorage.removeItem("usuarioActual");

            // Vaciar carrito y favoritos
            localStorage.removeItem("carrito");
            localStorage.removeItem("favoritos");

            // Actualizar contadores
            actualizarContador();
            actualizarContadorCorazon();

            // Recargar la página
            window.location.reload();

        }

    });

}

//=====================================
// FUNCIONES DEL USUARIO
//=====================================

function obtenerUsuarioActual() {

    return JSON.parse(localStorage.getItem("usuarioActual"));

}

function obtenerUsuarios() {

    return JSON.parse(localStorage.getItem("usuarios")) || [];

}

function guardarUsuarios(usuarios) {

    localStorage.setItem("usuarios", JSON.stringify(usuarios));

}

function obtenerIndiceUsuario() {

    const usuario = obtenerUsuarioActual();

    if (!usuario) return -1;

    const usuarios = obtenerUsuarios();

    return usuarios.findIndex(u => u.correo === usuario.correo);

}

function mostrarUsuario() {

    let usuario = JSON.parse(localStorage.getItem("usuarioActual"));

    const nombre = document.getElementById("nombreUsuario");
    const boton = document.getElementById("btnUsuario");

    if (!nombre || !boton) return;

    if (usuario) {

        nombre.textContent = "Hola, " + usuario.nombre;
        boton.href = "#";

    } else {

        nombre.textContent = "Iniciar sesión";
        boton.href = "../Formulario_InicioSesion/index.html";

    }

}

//=====================================
// CARRITO DEL USUARIO
//=====================================

function obtenerCarrito() {

    const indice = obtenerIndiceUsuario();

    if (indice === -1) return [];

    const usuarios = obtenerUsuarios();

    return usuarios[indice].carrito || [];

}

function guardarCarrito(carrito) {

    const indice = obtenerIndiceUsuario();

    if (indice === -1) return;

    const usuarios = obtenerUsuarios();

    usuarios[indice].carrito = carrito;

    guardarUsuarios(usuarios);

}