
/* Chatly Mobile Navigation — FIX */
(() => {
  const mobile = window.matchMedia("(max-width: 899px)");
  const NAV_ID = "chatly-mobile-nav";

  function getMain() {
    return document.querySelector("body > main") ||
           document.querySelector("main") ||
           document.body;
  }

  function scrollTo(el, focus = false) {
    if (!el) {
      alert("Раздел пока не найден на странице.");
      return;
    }

    const target = el.closest("section, article") || el;

    target.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });

    if (focus) {
      setTimeout(() => el.focus(), 400);
    }
  }

  function findHeading(words) {
    const headings = getMain().querySelectorAll("h1,h2,h3,h4");

    for (const heading of headings) {
      const text = heading.textContent.toLowerCase();

      if (words.some(word => text.includes(word))) {
        return heading;
      }
    }

    return null;
  }

  function search() {
    const inputs = getMain().querySelectorAll(
      'input:not([type="hidden"]), textarea'
    );

    for (const input of inputs) {
      const hint = (
        input.placeholder + " " +
        input.getAttribute("aria-label")
      ).toLowerCase();

      if (/поиск|польз|ник|найти|username/.test(hint)) {
        scrollTo(input, true);
        return;
      }
    }

    scrollTo(findHeading(["найти", "поиск"]));
  }

  function recent() {
    scrollTo(findHeading(["недавние", "история", "последние"]));
  }

  function notifications() {
    scrollTo(findHeading(["уведомления", "верификация", "заявки"]));
  }

  function profile() {
    const heading = findHeading(["привет"]);
    if (heading) {
      scrollTo(heading);
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }

  const items = [
    ["Главная", "⌂", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }],
    ["Поиск", "⌕", search],
    ["Недавние", "◷", recent],
    ["Уведомления", "♧", notifications],
    ["Профиль", "☻", profile]
  ];

  function createNavigation() {
    document.getElementById(NAV_ID)?.remove();

    if (!mobile.matches) return;

    const nav = document.createElement("nav");
    nav.id = NAV_ID;
    nav.className = "chatly-mobile-nav";

    nav.setAttribute("aria-label", "Навигация Chatly");

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

        nav.querySelectorAll("button").forEach(btn => {
          btn.classList.remove("active");
        });

        button.classList.add("active");
      });

      nav.appendChild(button);
    });

    document.body.appendChild(nav);
  }

  if (document.readyState === "loading") {
    document.addEventListener(
      "DOMContentLoaded",
      createNavigation
    );
  } else {
    createNavigation();
  }

  mobile.addEventListener("change", createNavigation);
})();
