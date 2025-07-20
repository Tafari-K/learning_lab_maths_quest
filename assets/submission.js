document.addEventListener('DOMContentLoaded', function () {
  const message = document.getElementById("submission-message");
  const scoreSummary = document.getElementById("submission-summary");
  const continueBtn = document.getElementById("continue-btn");
  const submitBtn = document.getElementById("submission-button");

  const totalScore = localStorage.getItem("totalScore") || 0;
  const totalQuestions = localStorage.getItem("totalQuestions") || 0;

  scoreSummary.textContent = `🎯 Your total score is ${totalScore} out of ${totalQuestions}!`;
  submitBtn.textContent = "✅ Submitted!";
  submitBtn.disabled = true;

  continueBtn.addEventListener("click", function () {
    window.location.href = "game.html";
  });
});