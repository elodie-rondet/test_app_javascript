// Questions pour le quiz
const questions = [
    {
        question: "Quel est le plat emblématique de la cuisine française ?",
        options: ["Baguette", "Pizza", "Sushi", "Tacos"],
        answer: 0
    },
    {
        question: "Quel est le principal ingrédient d'un soufflé au fromage ?",
        options: ["Chocolat", "Fromage", "Pommes de terre", "Pâtes"],
        answer: 1
    }
];

// Variables globales
let currentQuestion = 0;
let wheel; // Déclaration de la roue au niveau global

// Afficher la question du quiz
function showQuestion() {
    const question = questions[currentQuestion];
    document.getElementById('question').textContent = question.question;

    const answersDiv = document.getElementById('answers');
    answersDiv.innerHTML = '';
    question.options.forEach((option, index) => {
        const button = document.createElement('button');
        button.textContent = option;
        button.onclick = () => checkAnswer(index);
        answersDiv.appendChild(button);
    });
}

// Vérifier la réponse
function checkAnswer(selectedIndex) {
    const correctAnswer = questions[currentQuestion].answer;
    if (selectedIndex === correctAnswer) {
        currentQuestion++;
        if (currentQuestion === questions.length) {
            showReviewSection();
        } else {
            showQuestion();
        }
    } else {
        alert("Réponse incorrecte. Essayez encore !");
    }
}

// Afficher la section d'avis
function showReviewSection() {
    document.getElementById('quiz-section').style.display = 'none';
    document.getElementById('review-section').style.display = 'flex';
	document.getElementById("main").style.flexDirection = "column";
}

// Soumettre l'avis
document.getElementById('submit-review').onclick = function () {
    const review = document.getElementById('review-text').value.trim();
    if (review.length > 0) {
        alert("Merci pour votre avis !");
        showWheelSection();
    } else {
        alert("Veuillez laisser un avis avant de continuer.");
    }
};

// Afficher la roue de la fortune
function showWheelSection() {
    document.getElementById('review-section').style.display = 'none';
    document.getElementById('wheel-section').style.display = 'block';
    createWheel();
}

// Initialiser la roue
function createWheel() {
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    const segments = ['10% de réduction', 'Plat gratuit', 'Dessert gratuit', 'Boisson gratuite', 'Pas de prix'];

    const wheelRadius = 200;
    const segmentAngle = Math.PI * 2 / segments.length;

    // Dessiner chaque segment
    for (let i = 0; i < segments.length; i++) {
        const startAngle = segmentAngle * i;
        const endAngle = startAngle + segmentAngle;

        ctx.beginPath();
        ctx.moveTo(250, 250);
        ctx.arc(250, 250, wheelRadius, startAngle, endAngle);
        ctx.fillStyle = i % 2 === 0 ? '#FF5733' : '#FFC300';
        ctx.fill();

        ctx.save();
        ctx.translate(250, 250);
        ctx.rotate(startAngle + segmentAngle / 2);
        ctx.fillStyle = "white";
        ctx.font = "14px Arial";
        ctx.textAlign = "center";
        ctx.fillText(segments[i], wheelRadius - 60, 10);
        ctx.restore();
    }

    // Initialiser les données de la roue
    wheel = { ctx, segments, wheelRadius, startAngle: 0 };
}

// Faire tourner la roue
function spinWheel() {
    const spinDuration = 5000; // Durée de la rotation (en ms)
    const totalRotation = Math.random() * Math.PI * 10 + Math.PI * 5; // Nombre de rotations aléatoires
    const startTime = Date.now();

    function rotate() {
        const elapsedTime = Date.now() - startTime;
        if (elapsedTime < spinDuration) {
            const progress = elapsedTime / spinDuration;
            wheel.startAngle = (progress * totalRotation) % (Math.PI * 2);
            drawWheel();
            requestAnimationFrame(rotate);
        } else {
            const finalAngle = wheel.startAngle % (Math.PI * 2);
            const resultIndex = Math.floor(finalAngle / (Math.PI * 2 / wheel.segments.length)) % wheel.segments.length;
            document.getElementById('result').textContent = `Vous avez gagné : ${wheel.segments[resultIndex]}`;
        }
    }

    rotate();
}

// Redessiner la roue
function drawWheel() {
    const { ctx, segments, wheelRadius, startAngle } = wheel;
    ctx.clearRect(0, 0, 500, 500);

    const segmentAngle = Math.PI * 2 / segments.length;

    // Dessiner chaque segment
    for (let i = 0; i < segments.length; i++) {
        const startSegmentAngle = segmentAngle * i + startAngle;
        const endSegmentAngle = startSegmentAngle + segmentAngle;

        ctx.beginPath();
        ctx.moveTo(250, 250);
        ctx.arc(250, 250, wheelRadius, startSegmentAngle, endSegmentAngle);
        ctx.fillStyle = i % 2 === 0 ? '#FF5733' : '#FFC300';
        ctx.fill();

        ctx.save();
        ctx.translate(250, 250);
        ctx.rotate(startSegmentAngle + segmentAngle / 2);
        ctx.fillStyle = "white";
        ctx.font = "14px Arial";
        ctx.textAlign = "center";
        ctx.fillText(segments[i], wheelRadius - 60, 10);
        ctx.restore();
    }
}

// Initialiser le quiz
showQuestion();
