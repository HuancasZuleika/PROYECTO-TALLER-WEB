/* 
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/ClientSide/javascript.js to edit this template
 */

window.addEventListener("load", function () {

    mostrarFavoritos();

});

document.addEventListener("DOMContentLoaded", function () {

    actualizarContador();

    actualizarContadorCorazon();

});


function mostrarFavoritos() {

    const lista = document.getElementById("listaFavoritos");
    const cantidad = document.getElementById("cantidadFavoritos");
    const btnVaciar = document.getElementById("btnVaciarFavoritos");
    const btnMover = document.getElementById("btnMoverCarrito");

    let favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];


    cantidad.textContent = `Artículos (${favoritos.length})`;


    lista.innerHTML = "";


    if (favoritos.length === 0) {

        btnVaciar.style.display = "none";
        btnMover.style.display = "none";

        lista.innerHTML = `
        <div class="favoritos-vacio">

            <div class="icono-vacio">
                <i class="fa-regular fa-heart"></i>
            </div>
            <h2>No tienes productos favoritos</h2>

            <p>
                Guarda los productos que más te gusten para encontrarlos fácilmente.
            </p>


        </div>
    `;

        cantidad.innerText = "Artículos (0)";

        return;
    }

    cantidad.textContent = `Artículos (${favoritos.length})`;

    btnVaciar.style.display = "inline-block";
    btnMover.style.display = "inline-block";


    favoritos.forEach((producto, indice) => {

        lista.innerHTML += `

                <div class="producto-favorito">

                    <span class="etiqueta-favorito">
                         Guardado
                    </span>

                    <img src="${producto.imagen}" alt="${producto.nombre}">

                    <div class="info-favorito">

                        <h2>${producto.nombre}</h2>

                        <p>${producto.precio}</p>
        
                        <p class="fecha-favorito">
                            ❤️ Agregado el ${producto.fecha}
                        
                        </p>


                    <button class="btn-carrito" onclick="agregarCarritoFavorito(${indice})">
                        <i class="fa-solid fa-cart-shopping"></i>
                        Agregar al carrito
                    </button>

                    <button class="btn-eliminar" onclick="eliminarFavorito(${indice})">
                        <i class="fa-solid fa-trash"></i>
                        Eliminar
                    </button>


                </div>

            </div>

        `;

    });

}



// eliminar favorito desde esta página

function eliminarFavorito(indice) {

    let favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];

    Swal.fire({
        title: "¿Eliminar de favoritos?",
        text: `Se eliminará "${favoritos[indice].nombre}" de tu lista de favoritos.`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#6c757d",
        confirmButtonText: "Sí, eliminar",
        cancelButtonText: "Cancelar"
    }).then((result) => {

        if (result.isConfirmed) {

            favoritos.splice(indice, 1);

            localStorage.setItem(
                    "favoritos",
                    JSON.stringify(favoritos)
                    );

            mostrarFavoritos();

            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Producto eliminado",
                showConfirmButton: false,
                timer: 1500
            });

        }

    });

}
/*para agregar al carrito */
function agregarCarritoFavorito(indice) {

    // Verificar si el usuario inició sesión
    if (localStorage.getItem("sesionActiva") !== "true") {

        Swal.fire({
            icon: "warning",
            title: "Debes iniciar sesión",
            text: "Para usar esta función primero debes iniciar sesión.",
            showCancelButton: true,
            confirmButtonText: "Ir a iniciar sesión",
            cancelButtonText: "Cancelar",
            confirmButtonColor: "#3AB397",
            cancelButtonColor: "#d33"
        }).then((result) => {

            if (result.isConfirmed) {
                window.location.href = "../Formulario_InicioSesion/index.html";
            }

        });

        return;
    }

    let favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];

    let producto = favoritos[indice];


    agregarCarrito(
            producto.nombre,
            parseFloat(producto.precio.replace("S/ ", "")),
            producto.imagen,
            false
            );


    Swal.fire({
        position: "top-end",
        icon: "success",
        title: "¡Producto agregado al carrito! 🛒",
        showConfirmButton: false,
        timer: 1500
    });

}

/*vaciar todos los favoritos*/
function vaciarFavoritos() {

    let favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];



    if (favoritos.length === 0) {

        Swal.fire({
            icon: "info",
            title: "No hay favoritos",
            text: "Tu lista de favoritos ya está vacía."
        });

        return;
    }

    Swal.fire({
        title: "¿Vaciar todos los favoritos?",
        text: "Esta acción eliminará todos los productos guardados.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#6c757d",
        confirmButtonText: "Sí, vaciar",
        cancelButtonText: "Cancelar"
    }).then((result) => {

        if (result.isConfirmed) {

            localStorage.removeItem("favoritos");

            mostrarFavoritos();

            Swal.fire({
                icon: "success",
                title: "¡Favoritos eliminados!",
                text: "Tu lista quedó vacía.",
                timer: 1500,
                showConfirmButton: false
            });

        }

    });

}

/*todo al carrito */
function moverTodosAlCarrito() {

    let favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];

    if (favoritos.length === 0) {

        Swal.fire({
            icon: "info",
            title: "No tienes favoritos",
            text: "Agrega productos a favoritos primero."
        });

        return;
    }

    Swal.fire({
        title: "¿Agregar todos al carrito?",
        text: `Se agregarán ${favoritos.length} producto(s) al carrito.`,
        icon: "question",
        showCancelButton: true,
        confirmButtonColor: "#28a745",
        cancelButtonColor: "#6c757d",
        confirmButtonText: "🛒 Sí, agregar",
        cancelButtonText: "Cancelar"
    }).then((result) => {

        if (result.isConfirmed) {

            favoritos.forEach(producto => {

                agregarCarrito(
                        producto.nombre,
                        parseFloat(producto.precio.replace("S/ ", "")),
                        producto.imagen,
                        false
                        );

            });

            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "¡Todos los productos fueron agregados al carrito! 🛒",
                showConfirmButton: false,
                timer: 1800
            });

        }

    });

}
