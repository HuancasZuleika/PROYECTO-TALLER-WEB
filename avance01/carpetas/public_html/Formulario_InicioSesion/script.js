


const container = document.querySelector(".container");
const btnSignIn = document.getElementById("btn-sign-in");
const btnSignUp = document.getElementById("btn-sign-up");

btnSignIn.addEventListener("click", () => {
    container.classList.remove("toggle");
});

btnSignUp.addEventListener("click", () => {
    container.classList.add("toggle");
});

// =======================
// REGISTRO DE USUARIO
// =======================

const formRegistro = document.getElementById("formRegistro");

formRegistro.addEventListener("submit", function (e) {

    e.preventDefault();

    const nombre = document.getElementById("registroNombre").value.trim();
    const correo = document.getElementById("registroCorreo").value.trim();
    const password = document.getElementById("registroPassword").value;

    // Validar campos vacíos
    if (nombre === "" || correo === "" || password === "") {

        alert("Complete todos los campos.");
        return;
    }

    // Obtener usuarios registrados
    let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

    // Verificar si el correo ya existe
    let existe = usuarios.some(usuario => usuario.correo === correo);

    if (existe) {

        alert("Este correo ya está registrado.");
        return;
    }

    // Crear usuario
    const nuevoUsuario = {
        nombre,
        correo,
        password,
        carrito: [],
        favoritos: [],
        fechaRegistro: new Date().toLocaleDateString("es-PE")
    };

    usuarios.push(nuevoUsuario);

    localStorage.setItem("usuarios", JSON.stringify(usuarios));

    Swal.fire({
        icon: "success",
        title: "¡Registro exitoso!",
        text: "Ahora puedes iniciar sesión.",
        confirmButtonColor: "#3AB397"
    }).then(() => {
        formRegistro.reset();
        container.classList.remove("toggle");
    });

    formRegistro.reset();

    // Cambiar automáticamente al formulario de iniciar sesión
    container.classList.remove("toggle");

});

// =======================
// INICIAR SESIÓN
// =======================

const formLogin = document.getElementById("formLogin");

formLogin.addEventListener("submit", function (e) {

    e.preventDefault();

    const correo = document.getElementById("loginCorreo").value.trim();
    const password = document.getElementById("loginPassword").value;

    let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

    let usuario = usuarios.find(u =>
        u.correo === correo &&
                u.password === password
    );

    if (!usuario) {

        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Correo o contraseña incorrectos",
            confirmButtonColor: "#3AB397"
        });
        return;
    }

    // Guardar sesión
    localStorage.setItem("sesionActiva", "true");
    localStorage.setItem("usuarioActual", JSON.stringify(usuario));

    Swal.fire({
        icon: "success",
        title: "¡Bienvenido!",
        text: usuario.nombre,
        confirmButtonColor: "#3AB397"
    }).then(() => {

        window.location.href = "../Pag.Principal/indexPag.html";

    });

});