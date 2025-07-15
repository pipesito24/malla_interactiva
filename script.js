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
@keyframes pulse {
  0% { transform: scale(1); }
  50% { transform: scale(1.06); }
  100% { transform: scale(1); }
}

@keyframes bounce {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-8px); }
}

@keyframes rotateIn {
  0% { transform: rotate(-15deg) scale(0.8); opacity: 0; }
  100% { transform: rotate(0deg) scale(1); opacity: 1; }
}

@keyframes zoomIn {
  0% { transform: scale(0.8); opacity: 0; }
  100% { transform: scale(1); opacity: 1; }
}

.anim-bounce {
  animation: bounce 0.6s ease;
}

.anim-zoom-in {
  animation: zoomIn 0.6s ease;
}

#graduacion {
  position: fixed;
  inset: 0;
  background: white;
  z-index: 9999;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 40px;
  padding: 40px;
  text-align: center;
}

#graduacion h1 {
  font-size: 2.8rem;
  color: #003366;
  animation: zoomIn 1s ease-out;
}

#stickers {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
}

.sticker {
  width: 100px;
  height: 100px;
  animation: bounce 2s infinite;
}

.oculto {
  display: none !important;
}
