document.addEventListener('DOMContentLoaded', function () {
  if (!window.location.pathname.includes('results.html')) return;

  const resultsContainer = document.getElementById("results-list");
  const summaryInput = document.getElementById("game-summary");
  const totalScoreEl = document.getElementById("total-score");
  const form = document.getElementById("share-form");
  const nextSectionWrap = document.getElementById("next-section-wrap");
  const redirectMsg = document.getElementById("redirect-msg");

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
      const submitButton = form.querySelector("button[type='submit']");
      submitButton.textContent = "✅ Submitted!";
      submitButton.disabled = true;

      nextSectionWrap.style.display = "block";
      if (redirectMsg) {
        redirectMsg.style.display = "block";
      }

      setTimeout(() => {
        window.location.href = "submission.html";
      }, 3000);
    }).catch(() => {
      alert("There was a problem submitting your score. Please try again.");
    });
  });
});