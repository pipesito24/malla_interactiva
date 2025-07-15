document.addEventListener("DOMContentLoaded", () => {
  const cursos = document.querySelectorAll(".curso");

  // Buscar curso por nombre exacto
  function buscarCursoPorNombre(nombre) {
    for (const c of cursos) {
      if (c.dataset.nombre.trim() === nombre.trim()) return c;
    }
    return null;
  }

  // Buscar cursos que tienen como prerrequisito un nombre dado
  function buscarCursosConPrereq(nombrePrereq) {
    return Array.from(cursos).filter(c => c.dataset.prereq.trim() === nombrePrereq.trim());
  }

  // Estado global: cursos aprobados
  let aprobados = new Set();

  // Actualiza desbloqueo borroso recursivamente
  function actualizarEstado() {
    cursos.forEach(curso => {
      const prereq = curso.dataset.prereq.trim();
      if (prereq === "") {
        // Semestre 1 o sin prereq, desbloqueado siempre
        curso.classList.add("desbloqueado");
        curso.classList.remove("borroso");
      } else {
        // Si el prerrequisito está aprobado, desbloquea
        if (aprobados.has(prereq)) {
          curso.classList.add("desbloqueado");
          curso.classList.remove("borroso");
        } else {
          curso.classList.remove("desbloqueado");
          curso.classList.add("borroso");
        }
      }
    });
  }

  // Inicializa estados
  actualizarEstado();

  cursos.forEach(curso => {
    curso.addEventListener("click", () => {
      const nombre = curso.dataset.nombre.trim();

      // Toggle aprobado o no
      if (aprobados.has(nombre)) {
        aprobados.delete(nombre);
        curso.classList.remove("aprobado");
      } else {
        aprobados.add(nombre);
        curso.classList.add("aprobado");
      }

      // Actualizar desbloqueos
      actualizarEstado();
    });
  });
});
