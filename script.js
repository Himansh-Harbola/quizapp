const quizData = [
    {
        question: "What is the capital of France?",
        options: ["Berlin", "Madrid", "Paris", "Lisbon"],
        correct: "Paris"
    },
    {
        question: "Which planet is known as the Red Planet?",
        options: ["Earth", "Mars", "Jupiter", "Venus"],
        correct: "Mars"
    },
    {
        question: "What is the largest ocean on Earth?",
        options: ["Atlantic Ocean", "Indian Ocean", "Arctic Ocean", "Pacific Ocean"],
        correct: "Pacific Ocean"
    },
    {
        question: "What is the capital of India?",
        options: ["Paris", "New Delhi", "London", "None"],
        correct: "New Delhi"
    }
];

let currentQuestionIndex = 0;
let score = 0;

const questionElement = document.getElementById('question');
const optionsElement = document.getElementById('options');
const questionNumberElement = document.getElementById('question-number');
const scoreElement = document.getElementById('score');
const nextButton = document.getElementById('next-button');

function loadQuestion() {
    console.log(`Loading question ${currentQuestionIndex + 1}`);  // Debug statement
    const currentQuestion = quizData[currentQuestionIndex];
    questionElement.textContent = currentQuestion.question;
    questionNumberElement.textContent = `Question ${currentQuestionIndex + 1} of ${quizData.length}`;
    
    optionsElement.innerHTML = '';
    currentQuestion.options.forEach(option => {
        const button = document.createElement('button');
        button.textContent = option;
        button.classList.add('option');
        button.addEventListener('click', () => selectOption(button, currentQuestion.correct));
        optionsElement.appendChild(button);
    });
    
    nextButton.style.display = 'none'; // Hide the next button initially
}

function selectOption(selectedOption, correctAnswer) {
    const allOptions = document.querySelectorAll('.option');
    allOptions.forEach(option => option.disabled = true);
    
    if (selectedOption.textContent === correctAnswer) {
        selectedOption.style.backgroundColor = '#28a745'; // Green for correct answer
        score++;
    } else {
        selectedOption.style.backgroundColor = '#dc3545'; // Red for incorrect answer
    }
    
    nextButton.style.display = 'block'; // Show the next button after selection
}

function showScore() {
    console.log("Quiz completed, showing score.");  // Debug statement
    questionElement.textContent = '';
    optionsElement.innerHTML = '';
    questionNumberElement.textContent = '';
    scoreElement.textContent = `Your Score: ${score} / ${quizData.length}`;
    nextButton.style.display = 'none'; // Hide next button
    
    // Add a Restart button
    const restartButton = document.createElement('button');
    restartButton.textContent = 'Restart Quiz';
    restartButton.id = 'restart-button';
    restartButton.addEventListener('click', restartQuiz);
    const quizFooter = document.getElementById('quiz-footer');
    if (quizFooter) {
        quizFooter.appendChild(restartButton);
    }
}

function restartQuiz() {
    console.log("Restarting quiz.");  // Debug statement
    currentQuestionIndex = 0;
    score = 0;
    scoreElement.textContent = '';
    nextButton.style.display = 'block'; // Show next button
    
    // Remove the restart button
    const restartButton = document.getElementById('restart-button');
    if (restartButton) {
        restartButton.remove();
    }
    
    // Reload the first question
    loadQuestion();
}

nextButton.addEventListener('click', () => {
    console.log("Next button clicked.");  // Debug statement
    currentQuestionIndex++;
    if (currentQuestionIndex < quizData.length) {
        loadQuestion();
    } else {
        showScore();
    }
});

// Load the first question when the page loads
loadQuestion();