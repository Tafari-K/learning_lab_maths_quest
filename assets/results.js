document.addEventListener('DOMContentLoaded', function () {
  if (!window.location.pathname.includes('results.html')) return;

  const resultsContainer = document.getElementById("results-list");
  const summaryInput = document.getElementById("game-summary");
  const totalScoreEl = document.getElementById("total-score");
  const nextSectionWrap = document.getElementById("next-section-wrap");
  const redirectMsg = document.getElementById("redirect-msg");

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

    let summaryText = '';
    for (let i = 0; i < results.length; i++) {
      summaryText += `Q${i + 1}: ${results[i].question} → ${results[i].answer}`;
      if (i < results.length - 1) {
        summaryText += ' | ';
      }
    }
    if (summaryInput) summaryInput.value = summaryText;
  }

  if (totalScore && totalQuestions && totalScoreEl) {
    totalScoreEl.textContent = `🧠 Total Score: ${totalScore} out of ${totalQuestions} correct`;
  }
});
