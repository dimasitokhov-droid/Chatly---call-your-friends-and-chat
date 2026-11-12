/* Chatly — мобильная нижняя навигация.
   Работает только на экранах телефона и не обращается к Firebase. */
(() => {
  const mobile = () => window.matchMedia("(max-width: 899px)").matches;
  if (!mobile()) return;

  const items = [
    { label: "Главная", icon: "⌂", words: ["привет", "главная"] },
    { label: "Поиск", icon: "⌕", words: ["найти пользователя", "поиск пользователя", "поиск"] },
    { label: "Недавние", icon: "◷", words: ["недавние", "недавние поиски"] },
    { label: "Уведомления", icon: "♧", words: ["уведомления", "заявки"] },
    { label: "Профиль", icon: "☻", words: ["профиль", "мой профиль"] }
  ];

  function visible(el) {
    return !!(el && (el.offsetWidth || el.offsetHeight || el.getClientRects().length));
  }

  function findTarget(item) {
    if (item.label === "Главная") return document.querySelector("body > main") || document.body;

    const candidates = [...document.querySelectorAll("h1,h2,h3,h4,section,article,[id],[class]")];
    for (const el of candidates) {
      if (!visible(el)) continue;
      const text = (el.innerText || el.textContent || "").trim().toLowerCase();
      if (item.words.some(word => text.includes(word))) {
        if (el.matches("h1,h2,h3,h4")) return el;
        return el;
      }
    }

    if (item.label === "Поиск") {
      return document.querySelector('input[placeholder*="польз" i], input[type="search"], input[placeholder*="ник" i]');
    }
    return null;
  }

  function go(item, button) {
    const target = findTarget(item);
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
      document.querySelectorAll(".chatly-mobile-nav button").forEach(b => b.classList.remove("active"));
      button.classList.add("active");
    } else if (item.label === "Главная") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }

  function install() {
    if (!mobile() || document.querySelector(".chatly-mobile-nav")) return;
    const nav = document.createElement("nav");
    nav.className = "chatly-mobile-nav";
    nav.setAttribute("aria-label", "Мобильная навигация Chatly");

    items.forEach((item, index) => {
      const button = document.createElement("button");
      button.type = "button";
      button.innerHTML = `<span class="nav-icon" aria-hidden="true">${item.icon}</span><span class="nav-label">${item.label}</span>`;
      if (index === 0) button.classList.add("active");
      button.addEventListener("click", () => go(item, button));
      nav.appendChild(button);
    });
    document.body.appendChild(nav);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", install, { once: true });
  } else {
    install();
  }
  window.addEventListener("resize", () => {
    if (mobile()) install();
    else document.querySelector(".chatly-mobile-nav")?.remove();
  });
})();
