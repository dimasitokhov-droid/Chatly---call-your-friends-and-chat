/* Chatly Desktop Sidebar — создаёт навигацию только на широком экране.
   Не обращается к Firebase и не меняет существующие обработчики. */
(() => {
  if (document.getElementById("chatlyDesktopSidebar")) return;

  const navItems = [
    { icon: "⌂", label: "Главная", selector: "#appPanel > .profile-required:first-child" },
    { icon: "⌕", label: "Найти пользователя", selector: "#searchUsername" },
    { icon: "◷", label: "Недавние", selector: "#recentUsersList" },
    { icon: "⚙", label: "Дополнительно", selector: "#accountOptionsPanel" },
    { icon: "🔔", label: "Уведомления", selector: "#notificationStatus" },
    { icon: "🔵", label: "Верификация", selector: "#verificationBtn" }
  ];

  const sidebar = document.createElement("aside");
  sidebar.id = "chatlyDesktopSidebar";
  sidebar.setAttribute("aria-label", "Навигация Chatly");

  const brand = document.createElement("div");
  brand.className = "chatly-sidebar-brand";
  brand.textContent = "Chatly 💬";
  sidebar.append(brand);

  const caption = document.createElement("div");
  caption.className = "chatly-sidebar-caption";
  caption.textContent = "Меню";
  sidebar.append(caption);

  const buttons = [];

  navItems.forEach((item, index) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "chatly-sidebar-link" + (index === 0 ? " is-active" : "");
    button.innerHTML = `<span class="chatly-sidebar-icon" aria-hidden="true">${item.icon}</span><span></span>`;
    button.querySelector("span:last-child").textContent = item.label;
    button.addEventListener("click", () => {
      const target = document.querySelector(item.selector);
      if (!target) return;

      const section = target.closest(".panel") || target;
      if (section.classList.contains("hidden")) {
        // Разделы с ограниченным доступом не раскрываем навигацией.
        return;
      }

      section.scrollIntoView({ behavior: "smooth", block: "start" });
      buttons.forEach(x => x.classList.remove("is-active"));
      button.classList.add("is-active");
    });
    buttons.push(button);
    sidebar.append(button);
  });

  const header = document.querySelector("body > header");
  const main = document.querySelector("body > main");
  if (header && main) {
    main.before(sidebar);
  }
})();
