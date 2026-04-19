/* 
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/ClientSide/javascript.js to edit this template
 */
document.getElementById("formSugerencia").addEventListener("submit", function(e) {
    e.preventDefault();

    let nombre = document.getElementById("nombre").value;
    let email = document.getElementById("email").value;
    let mensaje = document.getElementById("mensaje").value;

    if(nombre === "" || email === "" || mensaje === "") {
        alert("Completa todos los campos");
    } else {
        document.getElementById("respuesta").innerText = "¡Gracias por tu sugerencia!";
        this.reset();
    }
});

