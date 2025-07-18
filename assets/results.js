document.addEventListener('DOMContentLoaded', function () {
  if (!window.location.pathname.includes('results.html')) return;

  const resultsContainer = document.getElementById("results-list");
  const summaryInput = document.getElementById("game-summary");
  const totalScoreEl = document.getElementById("total-score");
  const form = document.getElementById("share-form");
  const nextSectionWrap = document.getElementById("next-section-wrap");
  const leaderboardContainer = document.getElementById("leaderboard");

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
    const playerName = formData.get("player-name");
    const summary = formData.get("game-summary");

    // Save to local leaderboard
    let leaderboard = JSON.parse(localStorage.getItem("mathQuestLeaderboard")) || [];
    leaderboard.push({ name: playerName, summary: summary });
    localStorage.setItem("mathQuestLeaderboard", JSON.stringify(leaderboard));

    // Submit form
    fetch(form.action, {
      method: "POST",
      body: formData
    }).then(() => {
      nextSectionWrap.style.display = "block";
      const nextBtn = nextSectionWrap.querySelector("button");
      nextBtn.textContent = "✅ Submitted! Continue";
      form.querySelector("button[type='submit']").disabled = true;
      renderLeaderboard();
    }).catch(() => {
      alert("There was a problem submitting your score. Please try again.");
    });
  });

  function renderLeaderboard() {
    if (!leaderboardContainer) return;
    leaderboardContainer.innerHTML = '<h3>🏆 Leaderboard</h3>';
    const leaderboard = JSON.parse(localStorage.getItem("mathQuestLeaderboard")) || [];
    if (leaderboard.length === 0) {
      leaderboardContainer.innerHTML += '<p>No scores submitted yet.</p>';
      return;
    }

    const ul = document.createElement("ul");
    for (let i = 0; i < leaderboard.length; i++) {
      const li = document.createElement("li");
      li.textContent = `${leaderboard[i].name}: ${leaderboard[i].summary}`;
      ul.appendChild(li);
    }
    leaderboardContainer.appendChild(ul);
  }

  renderLeaderboard();
});
