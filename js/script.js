// Este script servirá para cargar dinámicamente el contenido de cada tema
document.addEventListener('DOMContentLoaded', () => {
  const contentContainer = document.getElementById('contenido');

  if (contentContainer) {
    const tema = contentContainer.getAttribute('data-tema');
    fetch(`${tema}.json`)
      .then(response => response.json())
      .then(data => renderizarContenido(data))
      .catch(error => {
        contentContainer.innerHTML = "<p>Error cargando el contenido.</p>";
        console.error(error);
      });
  }
});

function renderizarContenido(data) {
  const container = document.getElementById('contenido');
  container.innerHTML = '';

  data.secciones.forEach(seccion => {
    switch (seccion.tipo) {
      case 'teoria':
        container.innerHTML += `<section><h2>${seccion.titulo}</h2><div>${seccion.contenido}</div></section>`;
        break;
      case 'pregunta':
        renderizarPregunta(seccion, container);
        break;
      case 'ejemplo':
        container.innerHTML += `<section><h2>${seccion.titulo}</h2><div>${seccion.contenido}</div></section>`;
        break;
      case 'generador':
        renderizarGenerador(seccion, container);
        break;
      case 'evaluacion-fin':
        renderizarFinal(seccion, container);
        break;
    }
  });
}

function renderizarPregunta(seccion, container) {
  const preguntaHTML = `
    <section>
      <h3>Pregunta</h3>
      <p>${seccion.pregunta}</p>
      ${seccion.subtipo === 'falso-verdadero' ? `
        <button onclick="verificarRespuesta(this, '${seccion.respuestaCorrecta}', '${seccion.retroalimentacion}')">Verdadero</button>
        <button onclick="verificarRespuesta(this, '${seccion.respuestaCorrecta}', '${seccion.retroalimentacion}')">Falso</button>
      ` : `
        ${seccion.opciones.map((opcion, i) => `
          <button onclick="verificarRespuesta(this, '${seccion.opciones[seccion.respuestaCorrecta]}', '${seccion.retroalimentacion}')">${opcion}</button>
        `).join('')}
      `}
    </section>
  `;
  container.innerHTML += preguntaHTML;
}

function verificarRespuesta(boton, correcta, retroalimentacion) {
  if (boton.innerText === correcta) {
    alert("¡Correcto! " + retroalimentacion);
  } else {
    alert("Incorrecto. " + retroalimentacion);
  }
}

function renderizarGenerador(seccion, container) {
  const generadorHTML = `
    <section>
      <h2>${seccion.titulo}</h2>
      <p>${seccion.contenido}</p>
      <button onclick="generarEjemplo()">Generar un nuevo ejemplo</button>
      <div id="ejemplo-generado"></div>
    </section>
  `;
  container.innerHTML += generadorHTML;
}

function generarEjemplo() {
  const ejemplos = [
    { enunciado: "dy/dx = 3y", solucion: "Separando variables y resolviendo: y = Ce^(3x)." },
    { enunciado: "dy/dx = x²", solucion: "Integrando directamente: y = (1/3)x³ + C." },
    { enunciado: "dy/dx = sin(x)", solucion: "Integrando: y = -cos(x) + C." }
  ];

  const ejemplo = ejemplos[Math.floor(Math.random() * ejemplos.length)];
  const div = document.getElementById('ejemplo-generado');
  div.innerHTML = `
    <p><strong>Problema:</strong> ${ejemplo.enunciado}</p>
    <p><strong>Solución paso a paso:</strong> ${ejemplo.solucion}</p>
    <p>¿Quieres resolver otro?</p>
    <button onclick="generarEjemplo()">Sí, otro ejemplo</button>
    <button onclick="finalizarGenerador()">No, continuar</button>
  `;
}

function finalizarGenerador() {
  location.reload(); // Simplemente recarga para mostrar el siguiente contenido
}

function renderizarFinal(seccion, container) {
  let finalHTML = `<section><h2>${seccion.titulo}</h2><div>${seccion.contenido}</div><ul>`;
  seccion.materialComplementario.forEach(ref => {
    finalHTML += `<li><a href="${ref.url}" target="_blank">${ref.texto}</a></li>`;
  });
  finalHTML += '</ul></section>';
  container.innerHTML += finalHTML;
}
