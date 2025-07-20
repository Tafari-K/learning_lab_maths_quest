document.addEventListener('DOMContentLoaded', function () {
  if (!window.location.pathname.includes('results.html')) return;

  const resultsContainer = document.getElementById("results-list");
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
});


// ✅ FILE: assets/submission.js

document.addEventListener('DOMContentLoaded', function () {
  const message = document.getElementById("submission-message");
  const totalScore = localStorage.getItem("totalScore") || 0;
  const totalQuestions = localStorage.getItem("totalQuestions") || 0;

  if (message) {
    message.innerHTML = `🎉 Score submitted successfully!<br><strong>Total Score: ${totalScore} out of ${totalQuestions}</strong>`;
  }

  const submitButton = document.getElementById("submitted-button");
  if (submitButton) {
    submitButton.disabled = true;
    submitButton.textContent = "✅ Submitted";
  }

  const continueButton = document.getElementById("continue-button");
  if (continueButton) {
    continueButton.style.display = "block";
  }
});
