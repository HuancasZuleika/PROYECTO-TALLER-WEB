/*=========================================
      URBAN ATHLETICS
=========================================*/

//==============================
// VARIABLES
//==============================

const formulario = document.getElementById("formSugerencia");

const nombre = document.getElementById("nombre");

const email = document.getElementById("email");

const categoria = document.getElementById("categoria");

const mensaje = document.getElementById("mensaje");

const contador = document.getElementById("contadorCaracteres");

const buscar = document.getElementById("buscar");

const tbody = document.querySelector("#tablaSugerencias tbody");

const toast = document.getElementById("toast");

const modal = document.getElementById("modal");

const tituloModal = document.getElementById("tituloModal");

const mensajeModal = document.getElementById("mensajeModal");

const btnAceptar = document.getElementById("btnAceptar");

const btnCancelar = document.getElementById("btnCancelar");

//==============================
// MODAL BIENVENIDA
//==============================

const modalBienvenida = document.getElementById("modalBienvenida");

const nombreUsuario = document.getElementById("nombreUsuario");

const btnContinuar = document.getElementById("btnContinuar");

//==============================
// SALUDO
//==============================

btnContinuar.addEventListener("click",function(){

    let usuario = nombreUsuario.value.trim();

    if(usuario==""){

        usuario="Visitante";

    }

    document.getElementById("saludo").innerHTML=

    "Hola, "+usuario+" 👋";

    modalBienvenida.style.display="none";

});

//==============================
// ARREGLO
//==============================

let sugerencias = JSON.parse(

    localStorage.getItem("sugerencias")

) || [];

//==============================
// VARIABLE EDITAR
//==============================

let indiceEditar = -1;

//==============================
// CONTADOR
//==============================

mensaje.addEventListener("input",function(){

    contador.innerHTML=

    mensaje.value.length+" / 300 caracteres";

});

//==============================
// FECHA
//==============================

function obtenerFecha(){

    let fecha = new Date();

    return fecha.toLocaleDateString();

}

//==============================
// HORA
//==============================

function obtenerHora(){

    let hora = new Date();

    return hora.toLocaleTimeString([],{

        hour:"2-digit",

        minute:"2-digit"

    });

}

//==============================
// CÓDIGO
//==============================

function generarCodigo(){

    return "SUG-"+

    String(sugerencias.length+1)

    .padStart(3,"0");

}
/*=========================================
      VALIDAR FORMULARIO
=========================================*/

formulario.addEventListener("submit", function(e){

    e.preventDefault();

    if(

        nombre.value.trim()=="" ||

        email.value.trim()=="" ||

        categoria.value=="" ||

        mensaje.value.trim()==""

    ){

        tituloModal.innerHTML="⚠ Campos incompletos";

        mensajeModal.innerHTML="Complete todos los campos antes de continuar.";

        document.getElementById("rNombre").innerHTML="-";
        document.getElementById("rCorreo").innerHTML="-";
        document.getElementById("rCategoria").innerHTML="-";
        document.getElementById("rMensaje").innerHTML="-";

        modal.style.display="flex";

        return;

    }

    document.getElementById("rNombre").innerHTML=

    nombre.value;

    document.getElementById("rCorreo").innerHTML=

    email.value;

    document.getElementById("rCategoria").innerHTML=

    categoria.value;

    document.getElementById("rMensaje").innerHTML=

    mensaje.value;

    tituloModal.innerHTML="Confirmar registro";

    mensajeModal.innerHTML="¿Desea registrar esta sugerencia?";

    modal.style.display="flex";

});

/*=========================================
      BOTÓN CANCELAR
=========================================*/

btnCancelar.addEventListener("click",function(){

    modal.style.display="none";

});

/*=========================================
      BOTÓN ACEPTAR
=========================================*/

btnAceptar.addEventListener("click",function(){

    modal.style.display="none";

    let sugerencia={

        codigo:

        indiceEditar==-1 ?

        generarCodigo() :

        sugerencias[indiceEditar].codigo,

        nombre:nombre.value,

        correo:email.value,

        categoria:categoria.value,

        mensaje:mensaje.value,

        fecha:obtenerFecha(),

        hora:obtenerHora()

    };

    if(indiceEditar==-1){

        sugerencias.push(sugerencia);

    }else{

        sugerencias[indiceEditar]=sugerencia;

        indiceEditar=-1;

    }

    localStorage.setItem(

        "sugerencias",

        JSON.stringify(sugerencias)

    );

    formulario.reset();

    contador.innerHTML="0 / 300 caracteres";

    mostrarToast(

        "✔ Sugerencia registrada correctamente"

    );

    cargarTabla();

});
/*=========================================
      CARGAR TABLA
=========================================*/

function cargarTabla(){

    tbody.innerHTML="";

    sugerencias.forEach(function(item,indice){

        let fila=document.createElement("tr");

        fila.innerHTML=

        "<td>"+item.codigo+"</td>"+

        "<td>"+item.nombre+"</td>"+

        "<td>"+item.categoria+"</td>"+

        "<td>"+item.fecha+"</td>"+

        "<td>"+item.hora+"</td>"+

        "<td>"+

        "<button class='btnEditar' onclick='editar("+indice+")'>Editar</button> "+

        "<button class='btnEliminar' onclick='eliminar("+indice+")'>Eliminar</button>"+

        "</td>";

        tbody.appendChild(fila);

    });

}

/*=========================================
      EDITAR
=========================================*/

function editar(indice){

    indiceEditar=indice;

    nombre.value=sugerencias[indice].nombre;

    email.value=sugerencias[indice].correo;

    categoria.value=sugerencias[indice].categoria;

    mensaje.value=sugerencias[indice].mensaje;

    contador.innerHTML=

    mensaje.value.length+" / 300 caracteres";

    window.scrollTo({

        top:0,

        behavior:"smooth"

    });

}

/*=========================================
      ELIMINAR
=========================================*/

function eliminar(indice){

    if(confirm("¿Desea eliminar esta sugerencia?")){

        sugerencias.splice(indice,1);

        localStorage.setItem(

            "sugerencias",

            JSON.stringify(sugerencias)

        );

        mostrarToast("🗑 Sugerencia eliminada");

        cargarTabla();

    }

}

/*=========================================
      BUSCADOR
=========================================*/

buscar.addEventListener("keyup",function(){

    let texto=buscar.value.toLowerCase();

    let filas=tbody.getElementsByTagName("tr");

    for(let i=0;i<filas.length;i++){

        let nombreFila=

        filas[i].cells[1].textContent.toLowerCase();

        let categoriaFila=

        filas[i].cells[2].textContent.toLowerCase();

        if(

            nombreFila.includes(texto) ||

            categoriaFila.includes(texto)

        ){

            filas[i].style.display="";

        }

        else{

            filas[i].style.display="none";

        }

    }

});

/*=========================================
      TOAST
=========================================*/

function mostrarToast(texto){

    toast.innerHTML=texto;

    toast.classList.add("mostrar");

    setTimeout(function(){

        toast.classList.remove("mostrar");

    },3000);

}

/*=========================================
      INICIO
=========================================*/

window.onload=function(){

    cargarTabla();

    contador.innerHTML="0 / 300 caracteres";

    modalBienvenida.style.display="flex";

};

/*=========================================
      CERRAR MODAL
=========================================*/

window.onclick=function(e){

    if(e.target==modal){

        modal.style.display="none";

    }

};