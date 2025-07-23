document.addEventListener('DOMContentLoaded', function () {
  const resultsContainer = document.getElementById("results-list");
  const summaryInput = document.getElementById("game-summary");
  const totalScoreEl = document.getElementById("total-score");
  const form = document.getElementById("share-form");
  const nextSectionWrap = document.getElementById("next-section-wrap");
  const leaderboard = document.getElementById("leaderboard");

  const stored = localStorage.getItem("mathQuestResults");
  const totalScore = localStorage.getItem("totalScore");
  const totalQuestions = localStorage.getItem("totalQuestions");
  const scores = JSON.parse(localStorage.getItem("scores")) || {};

  if (stored) {
    const results = JSON.parse(stored);
    const correctAnswers = results.filter(r => r.correct).length;
    const totalThisRound = results.length;

    const sectionScore = document.createElement("p");
    sectionScore.innerHTML = `<strong>You scored ${correctAnswers} out of ${totalThisRound}!</strong>`;
    sectionScore.style.fontSize = "1.5rem";
    sectionScore.style.marginBottom = "1rem";
    sectionScore.style.color = "#22c55e";
    sectionScore.style.textAlign = "center";

    resultsContainer.insertBefore(sectionScore, resultsContainer.firstChild);

    let list = '';
    for (let i = 0; i < results.length; i++) {
      const { question, answer, correct } = results[i];
      list += `<p><strong>Q${i + 1}:</strong> ${question} → <em>${answer}</em> ${correct ? '✅' : '❌'}</p>`;
    }
    resultsContainer.innerHTML += list;

    let summaryText = '';
    for (let i = 0; i < results.length; i++) {
      summaryText += `Q${i + 1}: ${results[i].question} → ${results[i].answer}`;
      if (i < results.length - 1) summaryText += ' | ';
    }
    if (summaryInput) summaryInput.value = summaryText;
  }

  if (totalScore && totalQuestions && totalScoreEl) {
    totalScoreEl.textContent = `🧠 Total Score: ${totalScore} out of ${totalQuestions} correct`;
  }
 
  if (leaderboard && Object.keys(scores).length) {
    let html = "<h3>Category Scores:</h3><ul>";
    for (let category in scores) {
      const { score, outOf } = scores[category];
      html += `<li>${category.charAt(0).toUpperCase() + category.slice(1)}: ${score}/${outOf}</li>`;
    }
    html += "</ul>";
    leaderboard.innerHTML = html;
  }

  const completedAll = ['addition', 'subtraction', 'multiplication', 'division']
    .every(type => scores.hasOwnProperty(type));

  if (!completedAll) {
    if (form) form.style.display = 'none';
    if (nextSectionWrap) nextSectionWrap.style.display = 'block';
  } else {
    if (form) form.style.display = 'block';
  }
});
