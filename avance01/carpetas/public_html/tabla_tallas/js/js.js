document.addEventListener("DOMContentLoaded", () => {
  const modal = document.getElementById("modalTalla");
  const abrir = document.getElementById("abrirModal");
  const cerrar = document.getElementById("cerrarModal");
  const calcular = document.getElementById("calcularTalla");
  const limpiar = document.getElementById("limpiarCampos");

  abrir.addEventListener("click", () => {
    modal.style.display = "block";
  });

  cerrar.addEventListener("click", () => {
    modal.style.display = "none";
  });

  calcular.addEventListener("click", () => {
    const cadera = parseInt(document.getElementById("cadera").value);
    let talla = "";

    if (isNaN(cadera)) {
      talla = "Por favor ingresa tu medida de cadera";
    } else {
      // Definimos las tallas con su rango de cadera
      const tallas = [
        { nombre: "S", rango: [32, 34] },
        { nombre: "M", rango: [34, 36] },
        { nombre: "L", rango: [36, 38] },
        { nombre: "XL", rango: [38, 40] },
        { nombre: "XXL", rango: [40, 43] }
      ];

      // Calculamos la diferencia mínima
      let diferenciaMin = Infinity;
      let tallaCercana = "";

      tallas.forEach(t => {
        const centro = (t.rango[0] + t.rango[1]) / 2;
        const diferencia = Math.abs(cadera - centro);
        if (diferencia < diferenciaMin) {
          diferenciaMin = diferencia;
          tallaCercana = t.nombre;
        }
      });

      talla = tallaCercana;
    }

    document.getElementById("resultadoTalla").textContent = "Tu talla más próxima es: " + talla;
  });
  limpiar.addEventListener("click", () => {
    document.getElementById("cintura").value = "";
    document.getElementById("cadera").value = "";
    document.getElementById("resultadoTalla").textContent = "";
  });
});
