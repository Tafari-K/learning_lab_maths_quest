document.addEventListener('DOMContentLoaded', function () {
    const summaryDisplay = document.getElementById("submission-summary");
    const scoreSummaryInput = document.getElementById("score-summary");

    const stored = localStorage.getItem("mathQuestREsults");
    if (stored) {
        const results = JSON.parse(stored);
        let formatted = '';

        for (let i = 0; i < results.length; i++) {
            formatted += 'Q${i + 1}: ${results[i].question} = ${results[i].answer}';
            if (i < results.length - 1) formatted += ' | ';
        }

        summaryDisplay.textContent = 'Summary: ${formatted}';
        scoreSummaryInput.value = formatted;
    } else {
        summaryDisplay.textContent = "No score data found.";
    }
});