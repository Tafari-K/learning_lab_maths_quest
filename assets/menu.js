document.addEventListener('DOMContentLoaded', function () {
  const buttons = document.querySelectorAll('.category-btn');
  const completed = JSON.parse(localStorage.getItem('scores')) || {};

  buttons.forEach(button => {
    const type = button.dataset.type;

    if (completed[type]) {
      button.disabled = true;
      button.textContent = `${type.charAt(0).toUpperCase() + type.slice(1)} ✅`;
      button.classList.add('completed');
    }

    button.addEventListener('click', () => {
      localStorage.setItem('gameType', type);
      window.location.href = 'game.html';
    });
  });
});
