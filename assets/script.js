document.addEventListener('DOMContentLoaded', function () {
  // 1. Get elements from the page
  const questionEl = document.getElementById('question');
  const answerEl = document.getElementById('user-answer');
  const feedbackEl = document.getElementById('feedback');
  const scoreEl = document.getElementById('score');
  const submitBtn = document.getElementById('submit-btn');
  const nextBtn = document.getElementById('next-section');
  const endMsg = document.getElementById('end-message');
  function getPageType() {
    const type = localStorage.getItem('gameType');
    if (!quizTitle) return type;
    quizTitle.textContent = `${type.charAt(0).toUpperCase() + type.slice(1)} Challenge`;
    return type;
  }

  // 2. If it's not a game page, exit
  if (!questionEl) return;

  // 3. Positive & retry messages
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

  // 4. Game variables
  let correctAnswer = 0;
  let score = 0;
  let questionCount = 0;
  const maxQuestions = 5;
  let questionHistory = [];

  // 5. Detect which game mode based on filename
  function getPageType() {
    const path = window.location.pathname;
    if (path.includes('addition')) return 'addition';
    if (path.includes('subtraction')) return 'subtraction';
    if (path.includes('multiplication')) return 'multiplication';
    if (path.includes('division')) return 'division';
    return null;
  }

  // 6. Generate a new random question
  function generateQuestion() {
    const mode = getPageType();
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

    // Save this question for the results page
    questionHistory.push({ question: questionText, answer: correctAnswer });
  }

  // 7. Handle answer submission
  submitBtn.addEventListener('click', function () {
    const userAnswer = Number(answerEl.value);
    questionCount++;

    feedbackEl.className = '';
    scoreEl.classList.remove('score-pulse');

    if (userAnswer === correctAnswer) {
      const praise = praiseMessages[Math.floor(Math.random() * praiseMessages.length)];
      feedbackEl.textContent = praise;
      feedbackEl.classList.add('correct');
      score++;
      scoreEl.textContent = `Score: ${score}`;
      scoreEl.classList.add('score-pulse');
    } else {
      const retry = retryMessages[Math.floor(Math.random() * retryMessages.length)];
      feedbackEl.textContent = retry;
      feedbackEl.classList.add('incorrect');
    }

    if (questionCount < maxQuestions) {
      setTimeout(generateQuestion, 1200);
    } else {
      setTimeout(() => {
        questionEl.textContent = '';
        feedbackEl.textContent = '';
        answerEl.style.display = 'none';
        submitBtn.style.display = 'none';
        if (nextBtn) nextBtn.style.display = 'inline-block';
        if (endMsg) endMsg.style.display = 'block';

        // ✅ Save current round
        localStorage.setItem("mathQuestResults", JSON.stringify(questionHistory));

        // ✅ Update cumulative score
        let totalScore = Number(localStorage.getItem("totalScore")) || 0;
        let totalQuestions = Number(localStorage.getItem("totalQuestions")) || 0;

        totalScore += score;
        totalQuestions += maxQuestions;

        localStorage.setItem("totalScore", totalScore);
        localStorage.setItem("totalQuestions", totalQuestions);

        // ✅ Go to results page
        window.location.href = "results.html";
      }, 1500);
    }
  });

  // 8. Start with a short delay
  questionEl.textContent = "Get ready for your first question...";
  setTimeout(generateQuestion, 1000);
});

document.addEventListener('DOMContentLoaded', function () {
  // Only run this on the results page
  if (!window.location.pathname.includes('results.html')) return;

  const resultsContainer = document.getElementById("results-list");
  const summaryInput = document.getElementById("game-summary");
  const totalScoreEl = document.getElementById("total-score");

  const stored = localStorage.getItem("mathQuestResults");
  const totalScore = localStorage.getItem("totalScore");
  const totalQuestions = localStorage.getItem("totalQuestions");

  if (stored) {
    const results = JSON.parse(stored);
    const correctAnswers = results.length;
    const totalThisRound = 5;

    const sectionScore = document.createElement("p");
    sectionScore.innerHTML = `<strong>You scored ${correctAnswers} out of ${totalThisRound}!</strong>`;
    sectionScore.style.fontSize = "1.2rem";
    sectionScore.style.marginBottom = "1rem";
    sectionScore.style.color = "#22c55e";

    resultsContainer.insertBefore(sectionScore, resultsContainer.firstChild);

    const list = results.map((item, i) =>
      `<p><strong>Q${i + 1}:</strong> ${item.question} → <em>${item.answer}</em></p>`
    ).join("");
    resultsContainer.innerHTML += list;

    const summaryText = results.map((item, i) =>
      `Q${i + 1}: ${item.question} → ${item.answer}`
    ).join(" | ");
    summaryInput.value = summaryText;
  }

  const form = document.getElementById("share-form");
  const nextSectionWrap = document.getElementById("next-section-wrap");

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    const formData = new FormData(form);

    fetch(form.action, {
      method: "POST",
      body: formData
    }).then(() => {
      nextSectionWrap.style.display = "block";
      const nextBtn = nextSectionWrap.querySelector("button");
      nextBtn.textContent = "✅ Submitted! Continue";
      form.querySelector("button[type='submit']").disabled = true;
    }).catch(() => {
      alert("There was a problem submitting your score. Please try again.");
    });
  });

  if (totalScore && totalQuestions && totalScoreEl) {
    totalScoreEl.textContent = `🧠 Total Score: ${totalScore} out of ${totalQuestions} correct`;
  }
});

