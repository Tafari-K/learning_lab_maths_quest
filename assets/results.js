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

    const list = results.map((item, i) =>
      `<p><strong>Q${i + 1}:</strong> ${item.question} → <em>${item.answer}</em></p>`
    ).join("");
    resultsContainer.innerHTML += list;

    const summaryText = results.map((item, i) =>
      `Q${i + 1}: ${item.question} → ${item.answer}`
    ).join(" | ");

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
