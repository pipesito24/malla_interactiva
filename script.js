// JavaScript para agregar interactividad a la malla
document.addEventListener("DOMContentLoaded", function() {
  const tooltip = document.getElementById("tooltip");
  const cursos = document.querySelectorAll(".curso");

  // Agregamos eventos a cada curso
  cursos.forEach(curso => {
    // Al pasar el mouse, mostramos el tooltip con el prerrequisito
    curso.addEventListener("mouseover", function(e) {
      const prereq = curso.getAttribute("data-prereq");
      tooltip.innerText = "Prerrequisito: " + prereq;
      tooltip.style.opacity = 1;
    });

    // Movemos el tooltip siguiendo el cursor
    curso.addEventListener("mousemove", function(e) {
      tooltip.style.left = (e.pageX + 10) + "px";
      tooltip.style.top = (e.pageY + 10) + "px";
    });

    // Al salir del elemento, ocultamos el tooltip
    curso.addEventListener("mouseout", function() {
      tooltip.style.opacity = 0;
    });

    // Al hacer click se puede mostrar una alerta con más detalles
    curso.addEventListener("click", function() {
      alert("Detalle del curso:\n" +
            "Nombre: " + curso.innerText + "\n" +
            "Prerrequisito: " + curso.getAttribute("data-prereq"));
    });
  });
});
