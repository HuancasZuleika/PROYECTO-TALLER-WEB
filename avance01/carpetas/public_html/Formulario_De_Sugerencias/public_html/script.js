/* 
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/ClientSide/javascript.js to edit this template
 */
let sugerencias =
JSON.parse(localStorage.getItem("sugerencias")) || [];

document.getElementById("contador").innerHTML =
"Sugerencias registradas: " + sugerencias.length;

let modal =
document.getElementById("modal");

let titulo =
document.getElementById("modalTitulo");

let mensaje =
document.getElementById("modalMensaje");

let btnAceptar =
document.getElementById("btnAceptar");

let btnCancelar =
document.getElementById("btnCancelar");

let datosFormulario = null;

document.getElementById("formSugerencia")
.addEventListener("submit", function(e){

    e.preventDefault();

    let nombre =
    document.getElementById("nombre").value;

    let email =
    document.getElementById("email").value;

    let mensajeTexto =
    document.getElementById("mensaje").value;

    if(
        nombre === "" ||
        email === "" ||
        mensajeTexto === ""
    ){

        titulo.innerHTML =
        "⚠ Atención";

        mensaje.innerHTML =
        "Completa todos los campos.";

        btnCancelar.style.display =
        "none";

        btnAceptar.innerHTML =
        "Aceptar";

        modal.style.display =
        "flex";

        return;
    }

    datosFormulario = {

        nombre: nombre,

        email: email,

        mensaje: mensajeTexto
    };

    titulo.innerHTML =
    "¿Deseas enviar tu sugerencia?";

    mensaje.innerHTML =
    "Confirma el envío del formulario.";

    btnCancelar.style.display =
    "inline-block";

    btnAceptar.innerHTML =
    "Enviar";

    modal.style.display =
    "flex";
});

btnAceptar.addEventListener("click", function(){

    if(btnAceptar.innerHTML === "Enviar"){

        sugerencias.push(datosFormulario);

        localStorage.setItem(
            "sugerencias",
            JSON.stringify(sugerencias)
        );

        document.getElementById("contador")
        .innerHTML =
        "Sugerencias registradas: " +
        sugerencias.length;

        document.getElementById("formSugerencia")
        .reset();

        titulo.innerHTML =
        "✅ Envío exitoso";

        mensaje.innerHTML =
        "¡Gracias por tu sugerencia!";

        btnCancelar.style.display =
        "none";

        btnAceptar.innerHTML =
        "Aceptar";

        return;
    }

    modal.style.display = "none";
});

btnCancelar.addEventListener("click", function(){

    modal.style.display = "none";
});