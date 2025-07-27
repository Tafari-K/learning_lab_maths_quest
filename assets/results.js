document.addEventListener('DOMContentLoaded', function () {
  const resultsContainer = document.getElementById("results-list");
  const summaryInput = document.getElementById("game-summary");
  const totalScoreEl = document.getElementById("total-score");
  const finalModal = document.getElementById("final-modal");
  const submitFinalBtn = document.getElementById("submit-final-score");
  const resetBtn = document.getElementById("reset-btn");

  const stored = localStorage.getItem("mathQuestResults");
  const totalScore = localStorage.getItem("totalScore");
  const totalQuestions = localStorage.getItem("totalQuestions");
  const lastCategory = localStorage.getItem("lastCompletedCategory") || "Challenge";
  const scores = JSON.parse(localStorage.getItem("scores")) || {};

  // Show score for most recently completed category
  if (stored) {
    const results = JSON.parse(stored);
    const correctAnswers = results.filter(r => r.correct).length;
    const totalThisRound = results.length;

    const sectionScore = document.createElement("p");
    sectionScore.innerHTML = `<strong>${lastCategory.charAt(0).toUpperCase() + lastCategory.slice(1)} Results: You scored ${correctAnswers} out of ${totalThisRound}!</strong>`;
    sectionScore.classList.add("score-summary");
    resultsContainer.appendChild(sectionScore);

    let list = '';
    for (let i = 0; i < results.length; i++) {
      list += `<p><strong>${lastCategory} Q${i + 1}:</strong> ${results[i].question} → <em>${results[i].answer}</em> ${results[i].correct ? '✅' : '❌'}</p>`;
    }
    resultsContainer.innerHTML += list;

    let summaryText = '';
    for (let i = 0; i < results.length; i++) {
      summaryText += `Q${i + 1}: ${results[i].question} → ${results[i].answer}`;
      if (i < results.length - 1) summaryText += ' | ';
    }
    if (summaryInput) summaryInput.value = summaryText;
  }

  // Show total score
  if (totalScore && totalQuestions && totalScoreEl) {
    totalScoreEl.textContent = `🧠 Total Score: ${totalScore} out of ${totalQuestions} correct`;
  }

  //Check if all categories are completed
  const categories = ["addition", "subtraction", "multiplication", "division"];
  const allComplete = categories.every(cat => scores.hasOwnProperty(cat));

  if (allComplete && finalModal) {
    finalModal.style.display = "block";
  }

  //Submit Final Score
  submitFinalBtn?.addEventListener("click", () => {
    const name = document.getElementById("player-name")?.value || "Anonymous";
    const summary = `Final Score: ${totalScore}/${totalQuestions}`;
    alert(`✅ Final Score Submitted for ${name}!\n${summary}`);
    submitFinalBtn.disabled = true;
  });

  //Reset everything and return to home
  resetBtn?.addEventListener("click", () => {
    localStorage.clear();
    window.location.href = "menu-page.html";
  });
});
