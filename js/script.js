// Cargar el JSON y procesar la información
fetch('tema1.json')
  .then(response => response.json())
  .then(data => {
    const unidad = data.unidad;
    const tema = data.tema;
    let currentStep = 0;

    function showContent(content) {
      document.getElementById('content').innerHTML = content;
    }

    function showQuestion(question) {
      let questionHtml = `<h2>${question.pregunta}</h2>`;
      question.opciones.forEach((opcion, index) => {
        questionHtml += `<button class="option" onclick="checkAnswer(${index}, ${question.respuesta_correcta})">${opcion}</button>`;
      });
      document.getElementById('content').innerHTML = questionHtml;
    }

    function checkAnswer(selected, correct) {
      if (selected === correct) {
        alert('¡Respuesta correcta!');
      } else {
        alert(question.retroalimentacion);
      }
    }

    function loadNextStep() {
      const contentType = data.contenido[currentStep].tipo;

      if (contentType === 'teoria') {
        let theory = data.contenido[currentStep].contenido.join('<br>');
        showContent(theory);
      } else if (contentType === 'pregunta') {
        showQuestion(data.contenido[currentStep]);
      }

      currentStep++;
    }

    loadNextStep();
  });
