
/* Chatly Mobile Navigation — точная привязка к разделам */
(() => {
  const mq = window.matchMedia("(max-width: 899px)");
  const NAV_ID = "chatly-mobile-nav";

  function findSection(exactText) {
    const elements = document.querySelectorAll(
      "h1, h2, h3, h4"
    );

    for (const el of elements) {
      const text = (el.textContent || "")
        .trim()
        .toLowerCase();

      if (text.includes(exactText.toLowerCase())) {
        return el.closest("section, article, .card") ||
               el.parentElement?.parentElement ||
               el;
      }
    }

    return null;
  }

  function goTo(element) {
    if (!element) {
      console.warn("Chatly: раздел не найден");
      return;
    }

    element.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });
  }

  const actions = [
    {
      name: "Главная",
      icon: "⌂",
      run: () => goTo(document.getElementById("appPanel"))
    },
    {
      name: "Поиск",
      icon: "⌕",
      run: () => goTo(findSection("Найти пользователя"))
    },
    {
      name: "Недавние",
      icon: "◷",
      run: () => goTo(findSection("Недавно введённые ники"))
    },
    {
      name: "Уведомления",
      icon: "♧",
      run: () => goTo(findSection("Chatly Guard"))
    },
    {
      name: "Профиль",
      icon: "☻",
      run: () => goTo(document.getElementById("appPanel"))
    }
  ];

  function createNav() {
    document.getElementById(NAV_ID)?.remove();

    if (!mq.matches) return;

    const nav = document.createElement("nav");
    nav.id = NAV_ID;
    nav.className = "chatly-mobile-nav";

    actions.forEach((item, index) => {
      const button = document.createElement("button");
      button.type = "button";

      button.innerHTML = `
        <span class="nav-icon">${item.icon}</span>
        <span class="nav-label">${item.name}</span>
      `;

      if (index === 0) button.classList.add("active");

      button.addEventListener("click", () => {
        item.run();

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
    document.addEventListener("DOMContentLoaded", createNav);
  } else {
    createNav();
  }

  mq.addEventListener("change", createNav);
})();
