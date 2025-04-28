// Cargar el JSON y procesar la información
fetch('tema1.json')
  .then(response => response.json())
  .then(data => {
    let currentStep = 0;
    let sections = [];
    const contentContainer = document.getElementById("content");

    // Función para crear un bloque de teoría
    function createTheoryBlock(teoria) {
      let section = document.createElement("div");
      section.classList.add("section");
      section.innerHTML = `
        <h3>${teoria.titulo}</h3>
        <p>${teoria.contenido}</p>
      `;
      return section;
    }

    // Función para crear una pregunta de verdadero-falso
    function createTrueFalseQuestion(pregunta, respuestaCorrecta) {
      let section = document.createElement("div");
      section.classList.add("section");
      section.innerHTML = `
        <h3>Pregunta: ${pregunta}</h3>
        <button class="option" onclick="checkAnswer(true, ${respuestaCorrecta})">Verdadero</button>
        <button class="option" onclick="checkAnswer(false, ${respuestaCorrecta})">Falso</button>
      `;
      return section;
    }

    // Función para crear una pregunta de opción múltiple
    function createMultipleChoiceQuestion(pregunta, opciones) {
      let section = document.createElement("div");
      section.classList.add("section");
      section.innerHTML = `
        <h3>${pregunta}</h3>
        ${opciones.map((opcion, index) => `
          <button class="option" onclick="checkAnswer(${index}, ${opcion.esCorrecta})">${opcion.texto}</button>
        `).join('')}
      `;
      return section;
    }

    // Función para crear un bloque de ejemplo
    function createExampleBlock(ejemplo) {
      let section = document.createElement("div");
      section.classList.add("section");
      section.innerHTML = `
        <h3>${ejemplo.titulo}</h3>
        <p>${ejemplo.contenido}</p>
      `;
      return section;
    }

    // Función para mostrar una sección
    function showSection(sectionIndex) {
      // Ocultar todas las secciones
      sections.forEach(section => section.style.display = 'none');
      
      // Mostrar la sección actual
      if (sections[sectionIndex]) {
        sections[sectionIndex].style.display = 'block';
      }
    }

    // Función para gestionar las respuestas y avanzar
    window.checkAnswer = function(selected, correct) {
      if (selected === correct) {
        alert('¡Respuesta correcta!');
      } else {
        alert('Respuesta incorrecta, intenta de nuevo.');
      }
      currentStep++;
      if (currentStep < sections.length) {
        showSection(currentStep);
      }
    };

    // Crear y agregar todas las secciones dinámicamente
    data.teoria.forEach(teoria => {
      sections.push(createTheoryBlock(teoria));
    });

    data.preguntas.forEach(pregunta => {
      sections.push(createTrueFalseQuestion(pregunta.pregunta, pregunta.respuesta_correcta));
    });

    data.ejemplos.forEach(ejemplo => {
      sections.push(createExampleBlock(ejemplo));
    });

    data.opcion_multiple.forEach(opcion => {
      sections.push(createMultipleChoiceQuestion(opcion.pregunta, opcion.opciones));
    });

    // Insertar todas las secciones en el contenedor
    sections.forEach(section => contentContainer.appendChild(section));

    // Mostrar la primera sección
    showSection(currentStep);
  });
