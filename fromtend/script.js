document.addEventListener('DOMContentLoaded', () => {
    
    // --- Reveal Animations ---
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

    // --- Quiz Lab Logic ---
    const quizData = [
        {
            q: "¿Qué ligamento conecta los cuernos uterinos con los labios mayores?",
            o: ["Ligamento Ancho", "Ligamento Redondo", "Ligamento Cardinal", "Ligamento Uterosacro"],
            a: 1
        },
        {
            q: "¿Cuál es la arteria principal que irriga el útero?",
            o: ["Arteria Ovárica", "Arteria Vaginal", "Arteria Uterina", "Arteria Rectal"],
            a: 2
        },
        {
            q: "¿Qué arterias son responsables del sangrado durante la menstruación?",
            o: ["Arterias Arqueadas", "Arterias Espirales", "Arterias Ilíacas", "Arterias Pudendas"],
            a: 1
        },
        {
            q: "¿Cuál es el ligamento que ayuda a prevenir el prolapso uterino?",
            o: ["Ligamento Uterosacro", "Ligamento Redondo", "Mesosálpinx", "Mesovario"],
            a: 0
        },
        {
            q: "¿De dónde se origina directamente la arteria ovárica?",
            o: ["Arteria Ilíaca Interna", "Arteria Uterina", "Aorta Abdominal", "Arteria Pudenda"],
            a: 2
        },
        {
            q: "¿Qué hormona provoca el pico que dispara la ovulación?",
            o: ["FSH", "LH", "Progesterona", "Estradiol"],
            a: 1
        },
        {
            q: "¿Cuál es la función principal de la progesterona tras la ovulación?",
            o: ["Hacer que el endometrio crezca", "Estabilizar el endometrio", "Destruir el cuerpo lúteo", "Reducir la temperatura corporal"],
            a: 1
        },
        {
            q: "¿Cómo se llama la porción del ligamento ancho que rodea la trompa?",
            o: ["Mesometrio", "Mesovario", "Mesosálpinx", "Fimbria"],
            a: 2
        },
        {
            q: "¿Qué sucede con la temperatura corporal tras la ovulación?",
            o: ["Baja significativamente", "Se mantiene igual", "Sube unos 0.5 grados", "Sube 2 grados"],
            a: 2
        },
        {
            q: "¿Cuál es el estudio clave para detectar cambios por VPH?",
            o: ["Ecografía", "Tomografía", "Papanicolau (PAP)", "Radiografía"],
            a: 2
        }
    ];

    let currentStep = 0;
    let score = 0;
    let selectedOption = null;

    const quizBody = document.getElementById('quiz-body');
    const quizFooter = document.getElementById('quiz-footer');
    const resultWindow = document.getElementById('result-window');
    const nextBtn = document.getElementById('next-btn');
    const progressBar = document.getElementById('progress');
    const statusText = document.getElementById('quiz-status');

    function loadQuestion() {
        const data = quizData[currentStep];
        selectedOption = null;
        nextBtn.style.opacity = '0.5';
        nextBtn.style.pointerEvents = 'none';

        quizBody.innerHTML = `
            <h3 style="margin-bottom: 25px; font-size: 1.5rem;">${data.q}</h3>
            <div id="options-container">
                ${data.o.map((opt, i) => `
                    <button class="quiz-option" data-index="${i}">${opt}</button>
                `).join('')}
            </div>
        `;

        document.querySelectorAll('.quiz-option').forEach(btn => {
            btn.addEventListener('click', (e) => {
                document.querySelectorAll('.quiz-option').forEach(b => b.classList.remove('selected'));
                e.target.classList.add('selected');
                selectedOption = parseInt(e.target.dataset.index);
                nextBtn.style.opacity = '1';
                nextBtn.style.pointerEvents = 'auto';
            });
        });

        // Update UI
        statusText.innerText = `Pregunta ${currentStep + 1} de ${quizData.length}`;
        progressBar.style.width = `${((currentStep) / quizData.length) * 100}%`;
    }

    nextBtn.addEventListener('click', () => {
        if (selectedOption === quizData[currentStep].a) {
            score++;
        }

        currentStep++;

        if (currentStep < quizData.length) {
            loadQuestion();
        } else {
            showResults();
        }
    });

    function showResults() {
        quizBody.style.display = 'none';
        quizFooter.style.display = 'none';
        progressBar.style.width = '100%';
        resultWindow.style.display = 'block';

        const resultText = document.getElementById('result-text');
        const resultTitle = document.getElementById('result-title');
        
        let message = "";
        if (score === 10) message = "¡Perfecto! Eres un experto en anatomía femenina.";
        else if (score >= 7) message = "¡Muy bien! Tienes un conocimiento sólido.";
        else if (score >= 5) message = "Buen intento. Te recomendamos repasar las secciones de ligamentos e irrigación.";
        else message = "Te sugerimos leer nuevamente la información para mejorar tu conocimiento.";

        resultText.innerHTML = `Has acertado <strong>${score}</strong> de ${quizData.length} preguntas.<br><span style="display:block; margin-top:15px; color: var(--accent-purple);">${message}</span>`;
    }

    loadQuestion();
});
