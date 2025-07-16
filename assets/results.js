
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
    const num1 = Math.floor(Math.random() * 10) + 1;
    const num2 = Math.floor(Math.random() * 10) + 1;
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
        questionText = `What is ${num1 * num2} ÷ ${num2}?`;
        break;
    }

    questionEl.textContent = questionText;
    answerEl.value = '';
    feedbackEl.textContent = '';
    feedbackEl.className = '';
    questionHistory.push({ question: questionText, answer: correctAnswer });
  }

  submitBtn.addEventListener('click', function () {
    const userAnswer = Number(answerEl.value);
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

        // Store round data
        localStorage.setItem('mathQuestResults', JSON.stringify(questionHistory));

        let totalScore = Number(localStorage.getItem('totalScore')) || 0;
        let totalQuestions = Number(localStorage.getItem('totalQuestions')) || 0;

        totalScore += score;
        totalQuestions += maxQuestions;

        localStorage.setItem('totalScore', totalScore);
        localStorage.setItem('totalQuestions', totalQuestions);

        // Redirect to results page
        window.location.href = 'results.html';
      }, 1000);
    }
  });

  questionEl.textContent = 'Get ready for your first question...';
  setTimeout(generateQuestion, 1000);
});



document.addEventListener('DOMContentLoaded', function () {
  if (!window.location.pathname.includes('results.html')) return;

  const resultsContainer = document.getElementById("results-list");
  const summaryInput = document.getElementById("game-summary");
  const totalScoreEl = document.getElementById("total-score");
  const form = document.getElementById("share-form");
  const nextSectionWrap = document.getElementById("next-section-wrap");

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

    let list = '';
    for (let i = 0; i < results.length; i++) {
      list += `<p><strong>Q${i + 1}:</strong> ${results[i].question} → <em>${results[i].answer}</em></p>`;
    }
    resultsContainer.innerHTML += list;

    let summaryText = '';
    for (let i = 0; i < results.length; i++) {
      summaryText += `Q${i + 1}: ${results[i].question} → ${results[i].answer}`;
      if (i < results.length - 1) {
        summaryText += ' | ';
      }
    }
    summaryInput.value = summaryText;
  }

  if (totalScore && totalQuestions && totalScoreEl) {
    totalScoreEl.textContent = `🧠 Total Score: ${totalScore} out of ${totalQuestions} correct`;
  }

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
});
