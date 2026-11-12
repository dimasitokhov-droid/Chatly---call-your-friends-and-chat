
/* Chatly Mobile Navigation — FIX 2 */
(() => {
  const mq = window.matchMedia("(max-width: 899px)");
  const NAV_ID = "chatly-mobile-nav";

  function goTo(id, focus = false) {
    const element = document.getElementById(id);

    if (!element) {
      console.warn("Chatly navigation: element not found:", id);
      return;
    }

    element.scrollIntoView({
      behavior: "smooth",
      block: "center"
    });

    if (focus) {
      setTimeout(() => element.focus(), 400);
    }
  }

  function goSearch() {
    goTo("searchUsername", true);
  }

  function goRecent() {
    goTo("recentUsersList");
  }

  function goNotifications() {
    goTo("notificationStatus");
  }

  function goProfile() {
    const target =
      document.getElementById("accountOptionsPanel") ||
      document.getElementById("profileSetupPanel");

    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    }
  }

  const items = [
    ["Главная", "⌂", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }],
    ["Поиск", "⌕", goSearch],
    ["Недавние", "◷", goRecent],
    ["Уведомления", "♧", goNotifications],
    ["Профиль", "☻", goProfile]
  ];

  function createNavigation() {
    document.getElementById(NAV_ID)?.remove();

    if (!mq.matches) return;

    const nav = document.createElement("nav");
    nav.id = NAV_ID;
    nav.className = "chatly-mobile-nav";

    items.forEach(([label, icon, action], index) => {
      const button = document.createElement("button");
      button.type = "button";

      button.innerHTML = `
        <span class="nav-icon">${icon}</span>
        <span class="nav-label">${label}</span>
      `;

      if (index === 0) button.classList.add("active");

      button.addEventListener("click", () => {
        action();

        nav.querySelectorAll("button").forEach(item => {
          item.classList.remove("active");
        });

        button.classList.add("active");
      });

      nav.appendChild(button);
    });

    document.body.appendChild(nav);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", createNavigation);
  } else {
    createNavigation();
  }

  if (mq.addEventListener) {
    mq.addEventListener("change", createNavigation);
  } else {
    window.addEventListener("resize", createNavigation);
  }
})();
