document.addEventListener("DOMContentLoaded", () => {
  const cursos = document.querySelectorAll(".curso");

  // Función para buscar un curso por nombre exacto
  function buscarCursoPorNombre(nombre) {
    for (const c of cursos) {
      if (c.textContent.trim() === nombre.trim()) return c;
    }
    return null;
  }

  cursos.forEach(curso => {
    curso.addEventListener("click", () => {
      // Si ya está aprobado, no hacer nada
      if (curso.classList.contains("aprobado")) return;

      // Marcar como aprobado
      curso.classList.add("aprobado");
      curso.classList.remove("resaltado");

      // Abrir el prerrequisito si no es "Ninguno"
      const prereq = curso.getAttribute("data-prereq");
      if (prereq && prereq !== "Ninguno") {
        const cursoPrereq = buscarCursoPorNombre(prereq);
        if (cursoPrereq && !cursoPrereq.classList.contains("aprobado")) {
          // Resaltar el prerrequisito
          cursoPrereq.classList.add("resaltado");

          // Scroll suave al ramo prerrequisito
          cursoPrereq.scrollIntoView({ behavior: "smooth", block: "center" });

          // Quitar resaltado después de 3 segundos
          setTimeout(() => {
            cursoPrereq.classList.remove("resaltado");
          }, 3000);
        }
      }
    });

    // Hover efectos (para agrandar)
    curso.addEventListener("mouseenter", () => {
      if (!curso.classList.contains("aprobado")) {
        curso.style.transform = "scale(1.05)";
      }
    });

    curso.addEventListener("mouseleave", () => {
      if (!curso.classList.contains("aprobado")) {
        curso.style.transform = "scale(1)";
      }
    });
  });
});
