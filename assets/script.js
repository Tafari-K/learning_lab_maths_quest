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

});