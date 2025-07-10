document.addEventListener('DOMContentLoaded', function () {
  const questionEl = document.getElementById('question');
  const answerEl = document.getElementById('user-answer');
  const feedbackEl = document.getElementById('feedback');
  const scoreEl = document.getElementById('score');
  const submitBtn = document.getElementById('submit-btn');
  const nextBtn = document.getElementById('next-section');

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
    const praiseMessages = [
  "🎉 Yes, that’s correct!",
  "👏 Great job!",
  "🌟 You're getting it!",
  "🙌 Keep it up!",
  "💪 You're smashing it!"
];

const retryMessages = [
  "🤔 Can you try again?",
  "🔄 Not quite, give it another go!",
  "😅 Close, try once more!",
  "🧠 Let’s think about that one again!"
];

let questionCount = 0;
const maxQuestions = 5; // Limit number of questions per round

submitBtn.addEventListener('click', function () {
  const userAnswer = Number(answerEl.value);
  questionCount++;

  if (userAnswer === correctAnswer) {
    const praise = praiseMessages[Math.floor(Math.random() * praiseMessages.length)];
    feedbackEl.textContent = praise;
    score++;
    scoreEl.textContent = `Score: ${score}`;
  } else {
    const retry = retryMessages[Math.floor(Math.random() * retryMessages.length)];
    feedbackEl.textContent = retry;
  }

  if (questionCount < maxQuestions) {
    setTimeout(generateQuestion, 1000); // Wait 1s before next question
  } else {
    setTimeout(() => {
      questionEl.textContent = "🎉 Well done! You've completed this round.";
      feedbackEl.textContent = '';
      answerEl.style.display = 'none';
      submitBtn.style.display = 'none';
    }, 1500);
  }
});
