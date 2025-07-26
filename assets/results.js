document.addEventListener('DOMContentLoaded', function () {
  if (!window.location.pathname.includes('results.html')) return;

  const resultsContainer = document.getElementById("results-list");
  const totalScoreEl = document.getElementById("total-score");
  const finalScoreWrap = document.getElementById("final-score-wrap");
  const submitFinalBtn = document.getElementById("submit-final");
  const resetBtn = document.getElementById("reset-btn");

  const stored = localStorage.getItem("mathQuestResults");
  const totalScore = localStorage.getItem("totalScore");
  const totalQuestions = localStorage.getItem("totalQuestions");
  const lastCategory = localStorage.getItem("lastCompletedCategory") || "Challenge";

  if (stored) {
    const results = JSON.parse(stored);
    const correctAnswers = results.filter(r => r.correct).length;
    const totalThisRound = results.length;

    const sectionScore = document.createElement("p");
    sectionScore.innerHTML = `<strong>${lastCategory.charAt(0).toUpperCase() + lastCategory.slice(1)} Results: You scored ${correctAnswers} out of ${totalThisRound}!</strong>`;
    sectionScore.style.fontSize = "1.5rem";
    sectionScore.style.marginBottom = "1rem";
    sectionScore.style.color = "#22c55e";
    sectionScore.style.textAlign = "center";
    resultsContainer.insertBefore(sectionScore, resultsContainer.firstChild);

    let list = '';
    for (let i = 0; i < results.length; i++) {
      list += `<p><strong>${lastCategory} Q${i + 1}:</strong> ${results[i].question} → <em>${results[i].answer}</em> ${results[i].correct ? '✅' : '❌'}</p>`;
    }
    resultsContainer.innerHTML += list;
  }

  if (totalScore && totalQuestions && totalScoreEl) {
    totalScoreEl.textContent = `🧠 Total Score: ${totalScore} out of ${totalQuestions} correct`;
  }

  const scores = JSON.parse(localStorage.getItem("scores")) || {};
  const categories = ['addition', 'subtraction', 'multiplication', 'division'];
  const allCompleted = categories.every(cat => scores[cat]);

  if (allCompleted && finalScoreWrap) {
    finalScoreWrap.style.display = 'block';

    submitFinalBtn.addEventListener('click', () => {
      submitFinalBtn.disabled = true;
      submitFinalBtn.textContent = "✅ Score Submitted!";
    });

    resetBtn.addEventListener('click', () => {
      localStorage.clear();
      window.location.href = "menu-page.html";
    });
  }
});
