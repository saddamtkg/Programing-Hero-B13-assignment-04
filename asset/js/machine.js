function themeToggle() {
  const themeToggleBtn = document.getElementById("theme-toggle");
  const themeIcon = document.getElementById("theme-icon");
  themeToggleBtn.addEventListener("click", function () {
    const currentTheme = document.documentElement.getAttribute("data-theme");
    if (currentTheme === "dark") {
      document.documentElement.setAttribute("data-theme", "light");
    } else {
      document.documentElement.setAttribute("data-theme", "dark");
    }
    themeIcon.classList.toggle("fa-moon", currentTheme === "dark");
    themeIcon.classList.toggle("fa-sun", currentTheme === "light");
  });
}

themeToggle();

function showOnly(id) {
  const jobsCardContainer = document.getElementById("jobs-card-container");
  const jobsEmptyState = document.getElementById("jobs-empty-state");
  jobsCardContainer.classList.add("hidden");
  jobsEmptyState.classList.add("hidden");
  document.getElementById(id).classList.remove("hidden");
}
