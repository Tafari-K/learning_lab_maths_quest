// ✅ Run when the page is fully loaded
document.addEventListener('DOMContentLoaded', function () {

  // ✅ Link to your game elements
  const questionEl = document.getElementById('question');
  const answerEl = document.getElementById('user-answer');
  const feedbackEl = document.getElementById('feedback');
  const scoreEl = document.getElementById('score');
  const submitBtn = document.getElementById('submit-btn');
  const nextBtn = document.getElementById('next-section'); // Optional extra button

  if (!questionEl) return; // If not on a game page, stop here

  // ✅ Feedback message options
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

  // ✅ Game variables
  let correctAnswer = 0;
  let score = 0;
  let questionCount = 0;
  const maxQuestions = 5;

  // ✅ Detect which page this is (addition, etc.)
  function getPageType() {
    const path = window.location.pathname;
    if (path.includes('addition')) return 'addition';
    if (path.includes('subtraction')) return 'subtraction';
    if (path.includes('multiplication')) return 'multiplication';
    if (path.includes('division')) return 'division';
    return null;
  }

  // ✅ Generate a random question
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
        num1 = num1 * num2;
        questionEl.textContent = `What is ${num1} ÷ ${num2}?`;
        break;
    }

    answerEl.value = '';
    feedbackEl.textContent = '';
  }

  // ✅ Handle answer submission
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
      setTimeout(generateQuestion, 1000);
    } else {
      setTimeout(() => {
        questionEl.textContent = "🎉 Well done! You've completed this round.";
        feedbackEl.textContent = '';
        answerEl.style.display = 'none';
        submitBtn.style.display = 'none';
        if (nextBtn) nextBtn.style.display = 'inline-block'; // show next button if it's in HTML
      }, 1500);
    }
  });

  // ✅ Start first question
  generateQuestion();
});
