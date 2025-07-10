document.addEventListener('DOMContentLoaded', function () {
  const questionEl = document.getElementById('question');
  const answerEl = document.getElementById('user-answer');
  const feedbackEl = document.getElementById('feedback');
  const scoreEl = document.getElementById('score');
  const submitBtn = document.getElementById('submit-btn');

  if (!questionEl) return; // If on menu or welcome, skip this

  let correctAnswer = 0;
  let score = 0;

  function getPageType() {
    const path = window.location.pathname;
    if (path.includes('addition')) return 'addition';
    if (path.includes('subtraction')) return 'subtraction';
    if (path.includes('multiplication')) return 'multiplication';
    if (path.includes('division')) return 'division';
    return null;
  }

  function generateQuestion() {
    const mode = getPageType();
    let num1 = Math.floor(Math.random() * 10) + 1;
    let num2 = Math.floor(Math.random() * 10) + 1;

    switch (mode) {
      case 'addition':
        correctAnswer = num1 + num2;
        questionEl.textContent = `What is ${num1} + ${num2}?`;
        break;
      case 'subtraction':
        // Ensure positive result
        if (num2 > num1) [num1, num2] = [num2, num1];
        correctAnswer = num1 - num2;
        questionEl.textContent = `What is ${num1} - ${num2}?`;
        break;
      case 'multiplication':
        correctAnswer = num1 * num2;
        questionEl.textContent = `What is ${num1} × ${num2}?`;
        break;
      case 'division':
        correctAnswer = num1;
        num1 = num1 * num2; // Make divisible
        questionEl.textContent = `What is ${num1} ÷ ${num2}?`;
        break;
    }

    answerEl.value = '';
    feedbackEl.textContent = '';
  }

  submitBtn.addEventListener('click', function () {
    const userAnswer = Number(answerEl.value);
    if (userAnswer === correctAnswer) {
      feedbackEl.textContent = '🎉 Yes, that’s correct!';
      score++;
      scoreEl.textContent = `Score: ${score}`;
    } else {
      feedbackEl.textContent = '🤔 Can you try again?';
    }
    generateQuestion();
  });

  generateQuestion();
});
