/* 
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/ClientSide/javascript.js to edit this template
 */

const localStorageReviews = "fitReviews";
let currentRating = 0;

function setRating(rating) {
  currentRating = rating;
  const stars = document.querySelectorAll("#stars span");
  stars.forEach((star, index) => {
    star.classList.toggle("active", index < rating);
  });
}

function guardarReview() {
  const comentario = document.getElementById("comentario").value.trim();
  if (currentRating ===0) {
    alert("Por favor selecciona las estrellas");
    return;
  }
if (comentario === "") {
    alert("Por favor escribe tu opinión.");
    return;
    }
  const nuevaReview = { estrellas: currentRating, comentario };
  let memoria = JSON.parse(localStorage.getItem(localStorageReviews)) || [];
  memoria.push(nuevaReview);
  localStorage.setItem(localStorageReviews, JSON.stringify(memoria));

  document.getElementById("comentario").value = "";
  setRating(0);
  mostrarReviews();
}

function mostrarReviews() {
  const contenedor = document.getElementById("reviews-container");
  contenedor.innerHTML = "";
  const memoria = JSON.parse(localStorage.getItem(localStorageReviews)) || [];

  if (memoria.length === 0) {
    contenedor.innerHTML = "<p style='color:#555;'>No hay reseñas todavía.</p>";
    return;
  }

  memoria.forEach((review) => {
    if (review.comentario && review.comentario.trim() !== "" && review.estrellas > 0) {
      const div = document.createElement("div");
      div.classList.add("review");
      div.innerHTML = `
        <p><strong>${"★".repeat(review.estrellas)}</strong></p>
        <p>${review.comentario}</p>
      `;
      contenedor.appendChild(div);
    }
  });
  
 
}
 mostrarReviews();