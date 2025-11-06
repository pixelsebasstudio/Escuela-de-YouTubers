function toggleMenu() {
  document.querySelector('.nav-links').classList.toggle('active');
}

const hamburger = document.querySelector(".hamburger");
const navLinks = document.querySelector(".nav-links");

hamburger.addEventListener("click", () => {
  navLinks.classList.toggle("active");
});

// Cierra el menú al hacer click en un enlace
document.querySelectorAll(".nav-links a").forEach(link => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("active");
  });
});

const reveals = document.querySelectorAll('.reveal');

function checkReveal() {
  reveals.forEach((sec) => {
    const top = sec.getBoundingClientRect().top;
    const trigger = window.innerHeight * 0.85;

    if (top < trigger) {
      sec.classList.add('active');
    }
  });
}

window.addEventListener('scroll', checkReveal);
checkReveal(); 

// Asume que ya tienes este archivo enlazado con defer
const form = document.getElementById('contact-form');
const successEl = document.getElementById('form-success');

if (form) {
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const data = new FormData(form);

    // endpoint en action del form
    const action = form.getAttribute('action');

    try {
      const res = await fetch(action, {
        method: 'POST',
        body: data,
        headers: { 'Accept': 'application/json' }
      });

      if (res.ok) {
        // mostrar confirmación visual
        successEl.style.display = 'block';
        form.reset();
        setTimeout(()=> successEl.style.display = 'none', 5000);
      } else {
        const err = await res.json();
        alert('Ocurrió un error: ' + (err.error || 'inténtalo más tarde'));
      }
    } catch (err) {
      alert('Error en la red. Intenta de nuevo.');
      console.error(err);
    }
  });
}

// Botón de preguntas (modal simple con prompt como fallback)
const btnPreguntas = document.getElementById('btn-preguntas');
if (btnPreguntas) {
  btnPreguntas.addEventListener('click', async () => {
    const pregunta = prompt('Escribe tu pregunta para Sebas:');
    if (!pregunta) return;

    // enviar pregunta a Formspree (usa el mismo form endpoint)
    const endpoint = form.getAttribute('action');
    const fd = new FormData();
    fd.append('nombre', 'Pregunta pública');
    fd.append('correo', 'pregunta@anonimo.local');
    fd.append('mensaje', pregunta);
    fd.append('_subject', 'Pregunta desde botón Preguntas');

    try {
      await fetch(endpoint, { method: 'POST', body: fd, headers: { 'Accept': 'application/json' }});
      alert('Pregunta enviada. Escuela de Youtubers la revisará pronto.');
    } catch (e) {
      alert('No se pudo enviar la pregunta, intenta de nuevo.');
    }
  });
}
