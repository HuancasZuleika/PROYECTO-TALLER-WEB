/* 
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/ClientSide/javascript.js to edit this template
 */
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
function toggleFavorito(corazon){

    let icono = corazon.querySelector("ion-icon");

    const tarjeta = corazon.closest(".tarjeta-categoria");

    const nombre = tarjeta.querySelector("h3").textContent;
    const precio = tarjeta.querySelector("h2").textContent;
    const imagen = tarjeta.querySelector("img").src;

    let favoritos =
        JSON.parse(localStorage.getItem("favoritos")) || [];

    if(icono.getAttribute("name") === "heart-outline"){

        icono.setAttribute("name","heart");
        icono.style.color = "#2df58a";

        favoritos.push({
            nombre,
            precio,
            imagen
        });

    }else{

        icono.setAttribute("name","heart-outline");
        icono.style.color = "black";

        favoritos = favoritos.filter(
            p => !(p.nombre === nombre && p.precio === precio)
        );
    }

    localStorage.setItem(
        "favoritos",
        JSON.stringify(favoritos)
    );

    actualizarContadorCorazon();
}

/*actualizar corazon*/
function actualizarContadorCorazon(){

    let favoritos =
        JSON.parse(localStorage.getItem("favoritos")) || [];

    document.getElementById("contador-favoritos")
        .textContent = favoritos.length;
}