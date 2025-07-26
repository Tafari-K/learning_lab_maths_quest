document.addEventListener('DOMContentLoaded', function () {
  const questionEl = document.getElementById('question');
  const answerEl = document.getElementById('user-answer');
  const feedbackEl = document.getElementById('feedback');
  const scoreEl = document.getElementById('score');
  const submitBtn = document.getElementById('submit-btn');
  const nextBtn = document.getElementById('next-section');
  const endMsg = document.getElementById('end-message');
  const quizTitle = document.getElementById('game-title');

  let correctAnswer = 0;
  let score = 0;
  let questionCount = 0;
  const maxQuestions = 5;
  const questionHistory = [];

  function getPageType() {
    const type = localStorage.getItem('gameType');
    if (!quizTitle || !type) return null;
    quizTitle.textContent = `${type.charAt(0).toUpperCase() + type.slice(1)} Challenge`;
    return type;
  }

  const mode = getPageType();
  if (!mode) return;

  function generateQuestion() {
    let num1 = Math.floor(Math.random() * 10) + 1;
    let num2 = Math.floor(Math.random() * 10) + 1;
    let questionText = '';

    switch (mode) {
      case 'addition':
        correctAnswer = num1 + num2;
        questionText = `What is ${num1} + ${num2}?`;
        break;
      case 'subtraction':
        if (num2 > num1) [num1, num2] = [num2, num1];
        correctAnswer = num1 - num2;
        questionText = `What is ${num1} - ${num2}?`;
        break;
      case 'multiplication':
        correctAnswer = num1 * num2;
        questionText = `What is ${num1} × ${num2}?`;
        break;
      case 'division':
        correctAnswer = num1;
        num1 = num1 * num2;
        questionText = `What is ${num1} ÷ ${num2}?`;
        break;
    }

    questionEl.textContent = questionText;
    answerEl.value = '';
    feedbackEl.textContent = '';
    feedbackEl.className = '';
  }

  submitBtn.addEventListener('click', function () {
    const userInput = answerEl.value.trim();
    if (userInput === '') {
      feedbackEl.textContent = '⛔ Please enter an answer before submitting.';
      feedbackEl.className = 'incorrect';
      return;
    }

    const userAnswer = Number(userInput);
    questionCount++;

    if (userAnswer === correctAnswer) {
      feedbackEl.textContent = '🎉 Yes, that’s correct!';
      feedbackEl.classList.add('correct');
      score++;
      scoreEl.textContent = `Score: ${score}`;
    } else {
      feedbackEl.textContent = '🤔 Can you try again?';
      feedbackEl.classList.add('incorrect');
    }

    questionHistory.push({
      question: questionEl.textContent,
      answer: userAnswer,
      correct: userAnswer === correctAnswer
    });

    if (questionCount < maxQuestions) {
      setTimeout(generateQuestion, 1000);
    } else {
      setTimeout(() => {
      questionEl.textContent = '';
      feedbackEl.textContent = '';
      answerEl.style.display = 'none';
      submitBtn.style.display = 'none';
      nextBtn.style.display = 'inline-block';
      endMsg.style.display = 'block';

  // ✅ Save current category score
  let scores = JSON.parse(localStorage.getItem('scores')) || {};
  scores[mode] = {
    score: score,
    outOf: maxQuestions,
    completed: true
  };
  localStorage.setItem('scores', JSON.stringify(scores));
  localStorage.setItem("lastCompletedCategory", mode);

  // Redirect to results page
  window.location.href = 'results.html';
}, 1000);

    }
  });

  questionEl.textContent = 'Loading Question...';
  setTimeout(generateQuestion, 1000);
});
