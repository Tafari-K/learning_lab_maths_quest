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
