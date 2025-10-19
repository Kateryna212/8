document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("cardsContainer");
  const buttons = document.querySelectorAll(".view-switch button");
  let currentPeriod = "daily";
  let activities = [];

  // Отримуємо дані з JSON
  fetch("data.json")
    .then(response => response.json())
    .then(data => {
      activities = data;
      renderCards();
    })
    .catch(error => console.error("Помилка завантаження:", error));

  // Відображаємо карточки
  function renderCards() {
    container.innerHTML = "";
    activities.forEach(activity => {
      const time = activity.timeframes[currentPeriod];
      const card = document.createElement("div");
      card.classList.add("card");

      card.innerHTML = `
        <h3>${activity.title}</h3>
        <p>Поточний час: ${time.current} год</p>
        <p>Минулого періоду: ${time.previous} год</p>
      `;

      container.appendChild(card);
    });
  }

  // Перемикання періоду (День / Тиждень / Місяць)
  buttons.forEach(btn => {
    btn.addEventListener("click", () => {
      buttons.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      currentPeriod = btn.dataset.period;
      renderCards();
    });
  });
});
