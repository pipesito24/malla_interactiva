document.addEventListener("DOMContentLoaded", () => {
  const cursos = document.querySelectorAll(".curso");
  const graduacion = document.getElementById("graduacion");
  let aprobados = new Set();

  function buscarCursoPorNombre(nombre) {
    for (const c of cursos) {
      if (c.dataset.nombre.trim() === nombre.trim()) return c;
    }
    return null;
  }

  function buscarCursosConPrereq(nombrePrereq) {
    return Array.from(cursos).filter(c => c.dataset.prereq.trim() === nombrePrereq.trim());
  }

  function actualizarEstado() {
    cursos.forEach(curso => {
      const prereq = curso.dataset.prereq.trim();
      if (prereq === "") {
        curso.classList.add("desbloqueado");
        curso.classList.remove("borroso");
      } else {
        if (aprobados.has(prereq)) {
          curso.classList.add("desbloqueado", "anim-zoom-in");
          curso.classList.remove("borroso");
          setTimeout(() => curso.classList.remove("anim-zoom-in"), 600);
        } else {
          curso.classList.remove("desbloqueado");
          curso.classList.add("borroso");
        }
      }
    });
  }

  function verificarGraduacion() {
    const totalCursos = document.querySelectorAll(".curso").length;
    const totalAprobados = aprobados.size;
    if (totalAprobados === totalCursos) {
      graduacion.classList.remove("oculto");
      lanzarSerpentinas();
    }
  }

  cursos.forEach(curso => {
    curso.addEventListener("click", () => {
      const nombre = curso.dataset.nombre.trim();
      if (aprobados.has(nombre)) {
        aprobados.delete(nombre);
        curso.classList.remove("aprobado", "anim-bounce");
      } else {
        aprobados.add(nombre);
        curso.classList.add("aprobado", "anim-bounce");
        setTimeout(() => curso.classList.remove("anim-bounce"), 700);
      }
      actualizarEstado();
      verificarGraduacion();
    });
  });

  actualizarEstado();
});

function lanzarSerpentinas() {
  const canvas = document.getElementById("serpentinas");
  const ctx = canvas.getContext("2d");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const particles = [];

  for (let i = 0; i < 300; i++) {
    particles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * -canvas.height,
      size: Math.random() * 5 + 5,
      color: `hsl(${Math.random() * 360}, 100%, 60%)`,
      speedY: Math.random() * 3 + 2
    });
  }

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => {
      ctx.beginPath();
      ctx.fillStyle = p.color;
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fill();
    });
  }

  function update() {
    particles.forEach(p => {
      p.y += p.speedY;
      if (p.y > canvas.height) p.y = 0;
    });
  }

  function animate() {
    draw();
    update();
    requestAnimationFrame(animate);
  }

  animate();
}
