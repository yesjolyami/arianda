const searchItems = [
  {
    title: "Мобильное приложение",
    href: "./app.html",
    text: "",
    compact: true,
    keywords: "мобильное приложение ариадна",
  },
  {
    title: "Денежные переводы от «Ариадны» — это быстро, понятно и надёжно",
    href: "./index.html",
    text:
      "...безопасности при использовании сайта ваши личные данные не сохраняются, поэтому необходимо будет ввести их ещё раз при каждом новом переводе. Сделать перевод Способ 2: Перевод через мобильное приложение Выбирайте приложение...",
    keywords: "денежные переводы ариадна мобильное приложение",
  },
  {
    title: "Переводы",
    href: "./index.html",
    text:
      "Только до 1 ноября отправляйте переводы с комиссией всего 5%! Денежные переводы в Ариадне – это быстро, понятно и надежно Как это работает? Для начала вам нужно открыть мобильное приложение...",
    keywords: "переводы деньги мобильное приложение",
  },
  {
    title: "Инструкция для Realme",
    href: "./realme.html",
    text:
      "Как настроить приложение «Ариадна» на Realme Зайти в настройки телефона и выбрать раздел «Приложения» Затем нажать на «Ариадна» Выдайте «Разрешения» Разрешите уведомления для приложения Откройте пункт «Использование батареи» и выдайте...",
    keywords: "инструкция realme мобильное приложение приложения",
  },
  {
    title: "Инструкция для Huawei",
    href: "./huawei.html",
    text:
      "Как настроить приложение «Ариадна» на Huawei Зайти в настройки телефона и выбрать раздел «Приложения» Затем нажать на «Ариадна» Выдайте «Разрешения» Разрешите уведомления для приложения и разрешите доступ к выделенным пунктам...",
    keywords: "инструкция huawei мобильное приложение приложения",
  },
  {
    title: "Инструкция для Samsung",
    href: "./samsung.html",
    text:
      "Как настроить приложение «Ариадна» на Samsung Зайти в настройки телефона и выбрать раздел «Приложения» Затем нажать на «Ариадна» Разрешите уведомления для приложения Выдайте «Разрешения» и выключите индикатор, выделенный на снимке...",
    keywords: "инструкция samsung мобильное приложение приложения",
    highlighted: true,
  },
];

const canonicalQuery = "Мобильное приложение";
const searchForms = document.querySelectorAll('form[role="search"]');

const mobileMenuLinks = [
  { title: "Главная", href: "./main.html", match: ["main.html", ""] },
  { title: "Видеосвидание", href: "./videomeeting.html", match: ["videomeeting.html"] },
  { title: "Денежные переводы", href: "./index.html", match: ["index.html"] },
  { title: "Оплата услуг", href: "./payment.html", match: ["payment.html"] },
  { title: "Вопросы и ответы", href: "./faq.html", match: ["faq.html"] },
  { title: "Информирование", href: "./news.html", match: ["news.html"] },
  { title: "Документы", href: "./docs.html", match: ["docs.html"] },
  { title: "Контакты", href: "./contacts.html", match: ["contacts.html"] },
  { title: "Инструкция для приложения", href: "./app.html#app-setup", match: ["app.html", "realme.html", "huawei.html", "samsung.html"] },
  { title: "Безлимитный тариф в приложении «Ариадна»", href: "./unlimited.html", match: ["unlimited.html"] },
];

function submitSearch(form) {
  const input = form.querySelector('input[name="q"]');
  const query = (input?.value || "").trim();
  const params = new URLSearchParams();

  if (query) params.set("q", query);

  window.location.href = `./search.html${params.toString() ? `?${params.toString()}` : ""}`;
}

function getCurrentPageName() {
  const path = window.location.pathname.split("/").pop();
  return path || "main.html";
}

function createIconLink(className, href, icon, text, ariaLabel) {
  const link = document.createElement("a");
  link.className = className;
  link.href = href;
  if (ariaLabel) link.setAttribute("aria-label", ariaLabel);

  const image = document.createElement("img");
  image.src = icon;
  image.width = 20;
  image.height = 20;
  image.alt = "";
  link.append(image);

  const span = document.createElement("span");
  span.textContent = text;
  link.append(span);

  return link;
}

function initMobileMenu() {
  const header = document.querySelector(".site-header");
  const headerInner = document.querySelector(".site-header__inner");
  const logo = document.querySelector(".logo-link");
  if (!header || !headerInner || !logo) return;

  let openButton = headerInner.querySelector(".mobile-menu-button");
  if (!openButton) {
    openButton = document.createElement("button");
    openButton.className = "mobile-menu-button";
    openButton.type = "button";
    openButton.innerHTML = "<span></span><span></span><span></span>";
    headerInner.append(openButton);
  }

  const menuId = "mobile-menu";
  openButton.setAttribute("aria-label", "Открыть меню");
  openButton.setAttribute("aria-controls", menuId);
  openButton.setAttribute("aria-expanded", "false");

  const menu = document.createElement("div");
  menu.className = "mobile-menu";
  menu.id = menuId;
  menu.hidden = true;

  const menuHeader = document.createElement("div");
  menuHeader.className = "mobile-menu__header";
  const menuLogo = logo.cloneNode(true);
  menuLogo.classList.add("mobile-menu__logo");

  const closeButton = document.createElement("button");
  closeButton.className = "mobile-menu__close";
  closeButton.type = "button";
  closeButton.setAttribute("aria-label", "Закрыть меню");
  closeButton.innerHTML = "<span></span><span></span>";

  menuHeader.append(menuLogo, closeButton);

  const content = document.createElement("div");
  content.className = "mobile-menu__content";

  const searchForm = document.createElement("form");
  searchForm.className = "mobile-menu__search";
  searchForm.setAttribute("role", "search");
  searchForm.innerHTML = `
    <label class="sr-only" for="mobile-menu-search-input">Поиск по сайту</label>
    <input id="mobile-menu-search-input" name="q" type="search" placeholder="Поиск по сайту" />
    <button type="submit" aria-label="Найти">
      <img src="./icon/Label.svg" width="24" height="24" alt="" />
    </button>
  `;

  const nav = document.createElement("nav");
  nav.className = "mobile-menu__nav";
  nav.setAttribute("aria-label", "Мобильная навигация");

  const currentPage = getCurrentPageName();
  mobileMenuLinks.forEach((item) => {
    const link = document.createElement("a");
    link.href = item.href;
    link.textContent = item.title;
    if (item.match.includes(currentPage)) {
      link.classList.add("is-active");
      link.setAttribute("aria-current", "page");
    }
    nav.append(link);
  });

  const contacts = document.createElement("div");
  contacts.className = "mobile-menu__contacts";
  contacts.append(
    createIconLink("mobile-menu__contact", "#", "./icon/Group.svg", "Личный кабинет"),
    createIconLink("mobile-menu__contact", "tel:88005053712", "./icon/Group-1.svg", "8 (800) 505 37 12", "Позвонить 8 (800) 505 37 12"),
    createIconLink("mobile-menu__contact", "mailto:info@aripay.ru", "./icon/mail.svg", "info@aripay.ru", "Написать на info@aripay.ru")
  );

  const payLink = document.createElement("a");
  payLink.className = "mobile-menu__pay";
  payLink.href = "./payment.html";
  payLink.textContent = "Оплатить связь";

  content.append(searchForm, nav, contacts, payLink);
  menu.append(menuHeader, content);
  header.after(menu);

  const open = () => {
    menu.hidden = false;
    document.body.classList.add("is-mobile-menu-open");
    openButton.setAttribute("aria-expanded", "true");
    window.requestAnimationFrame(() => closeButton.focus());
  };

  const close = () => {
    menu.hidden = true;
    document.body.classList.remove("is-mobile-menu-open");
    openButton.setAttribute("aria-expanded", "false");
  };

  openButton.addEventListener("click", open);
  closeButton.addEventListener("click", close);
  nav.addEventListener("click", (event) => {
    if (event.target.closest("a")) close();
  });
  payLink.addEventListener("click", close);

  searchForm.addEventListener("submit", (event) => {
    event.preventDefault();
    submitSearch(searchForm);
  });
  bindSearchFormState(searchForm);

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !menu.hidden) close();
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 760 && !menu.hidden) close();
  });
}

function normalize(value) {
  return value.toLocaleLowerCase("ru-RU").replace(/\s+/g, " ").trim();
}

function getSearchState(query) {
  const normalized = normalize(query);
  const canonical = normalize(canonicalQuery);

  if (!normalized) {
    return {
      className: "state-default",
      title: "Поиск по сайту",
      crumb: "Поиск по сайту",
      summary: "",
      items: [],
    };
  }

  if (canonical.startsWith(normalized) && normalized !== canonical) {
    return {
      className: "state-suggest",
      title: `Поиск по запросу: ${query}`,
      crumb: `Поиск по запросу: ${query}`,
      summary: `Возможно, вы имели в виду «${canonicalQuery}». Найдено: ${searchItems.length} результатов`,
      items: searchItems,
    };
  }

  const items =
    normalized === canonical
      ? searchItems
      : searchItems.filter((item) => normalize(`${item.title} ${item.text} ${item.keywords}`).includes(normalized));

  return {
    className: items.length ? "state-exact" : "state-empty",
    title: `Поиск по запросу: ${query}`,
    crumb: `Поиск по запросу: ${query}`,
    summary: items.length ? `Найдено: ${items.length} результатов` : "Совпадений не найдено. Попробуйте другой запрос",
    items,
  };
}

function appendTextWithHighlights(container, text) {
  const fragment = document.createDocumentFragment();
  const parts = text.split(/(приложение|приложения)/gi);

  parts.forEach((part) => {
    if (!part) return;

    if (/^приложени[ея]$/i.test(part)) {
      const strong = document.createElement("strong");
      strong.textContent = part;
      fragment.append(strong);
      return;
    }

    fragment.append(document.createTextNode(part));
  });

  container.append(fragment);
}

function renderSearchResult(item) {
  const link = document.createElement("a");
  link.className = `result-card${item.compact ? " result-card--compact" : ""}`;
  link.href = item.href || "#";

  const title = document.createElement("span");
  title.className = `result-card__title${item.highlighted ? " is-highlighted" : ""}`;
  title.textContent = item.title;
  link.append(title);

  if (item.text) {
    const text = document.createElement("span");
    text.className = "result-card__text";
    appendTextWithHighlights(text, item.text);
    link.append(text);
  }

  const arrow = document.createElement("span");
  arrow.className = "result-card__arrow";
  arrow.setAttribute("aria-hidden", "true");
  link.append(arrow);

  return link;
}

function syncSearchFormState(form) {
  const input = form.querySelector('input[name="q"]');
  const hasValue = Boolean(input?.value.trim());
  const isFocused = form.contains(document.activeElement);

  form.classList.toggle("is-empty", !hasValue);
  form.classList.toggle("is-filled", hasValue);
  form.classList.toggle("is-focused", isFocused);
}

function bindSearchFormState(form) {
  const input = form.querySelector('input[name="q"]');
  const button = form.querySelector("button");

  syncSearchFormState(form);

  input?.addEventListener("input", () => syncSearchFormState(form));
  input?.addEventListener("focus", () => syncSearchFormState(form));
  input?.addEventListener("blur", () => syncSearchFormState(form));

  button?.addEventListener("pointerenter", () => form.classList.add("is-button-hovered"));
  button?.addEventListener("pointerleave", () => form.classList.remove("is-button-hovered"));
  button?.addEventListener("focus", () => {
    form.classList.add("is-button-hovered");
    syncSearchFormState(form);
  });
  button?.addEventListener("blur", () => {
    form.classList.remove("is-button-hovered");
    syncSearchFormState(form);
  });
}

function initSearchPage() {
  const pageTitle = document.querySelector("#pageTitle");
  const crumbText = document.querySelector("#crumbText");
  const pageSearch = document.querySelector("#page-search");
  const resultSummary = document.querySelector("#resultSummary");
  const resultsList = document.querySelector("#resultsList");

  if (!pageTitle || !crumbText || !pageSearch || !resultSummary || !resultsList) return;

  const params = new URLSearchParams(window.location.search);
  const query = (params.get("q") || "").trim();
  const activeSearch = getSearchState(query);

  document.body.classList.add(activeSearch.className);
  pageTitle.textContent = activeSearch.title;
  crumbText.textContent = activeSearch.crumb;
  pageSearch.value = query;
  resultSummary.textContent = activeSearch.summary;
  resultSummary.hidden = !activeSearch.summary;
  resultsList.replaceChildren(...activeSearch.items.map(renderSearchResult));
}

function initQrModal() {
  const modal = document.querySelector("#qr-modal");
  const openButtons = document.querySelectorAll("[data-open-qr]");
  const closeButtons = modal?.querySelectorAll("[data-close-qr]");

  if (!modal || !openButtons.length) return;

  const close = () => {
    modal.hidden = true;
    document.body.classList.remove("is-qr-open");
  };

  const open = () => {
    modal.hidden = false;
    document.body.classList.add("is-qr-open");
  };

  openButtons.forEach((button) => {
    button.addEventListener("click", open);
  });

  closeButtons?.forEach((button) => {
    button.addEventListener("click", close);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !modal.hidden) close();
  });
}

function initNewsModal() {
  const modal = document.querySelector("#news-modal");
  const modalWrap = modal?.querySelector(".news-modal__wrap");
  const openButtons = document.querySelectorAll("[data-open-news]");
  const closeButtons = modal?.querySelectorAll("[data-close-news]");
  const title = modal?.querySelector("#news-modal-title");
  const date = modal?.querySelector("#news-modal-date");
  const intro = modal?.querySelector("#news-modal-intro");
  const text = modal?.querySelector("#news-modal-text");

  if (!modal || !modalWrap || !openButtons.length || !title || !date || !intro || !text) return;

  let activeButton = null;
  let activeCard = null;

  const updateModalPosition = () => {
    if (!activeCard || modal.hidden) return;

    if (window.innerWidth <= 760) {
      modal.style.setProperty("--news-modal-top", "24px");
      return;
    }

    const wrapHeight = modalWrap.offsetHeight;
    const cardRect = activeCard.getBoundingClientRect();
    const viewportPadding = 40;
    const desiredTop = cardRect.top + cardRect.height / 2 - wrapHeight / 2;
    const maxTop = Math.max(viewportPadding, window.innerHeight - wrapHeight - viewportPadding);
    const top = Math.min(Math.max(desiredTop, viewportPadding), maxTop);

    modal.style.setProperty("--news-modal-top", `${Math.round(top)}px`);
  };

  const close = () => {
    modal.hidden = true;
    document.body.classList.remove("is-news-open");
    activeCard = null;
    activeButton?.focus();
  };

  const open = (button) => {
    const card = button.closest("[data-news-card]");
    if (!card) return;

    title.textContent = card.dataset.newsTitle || "";
    date.textContent = card.dataset.newsDate || "";
    intro.textContent = card.dataset.newsIntro || "";
    text.textContent = card.dataset.newsText || "";
    activeButton = button;
    activeCard = card;

    modal.hidden = false;
    document.body.classList.add("is-news-open");
    modal.style.setProperty("--news-modal-top", window.innerWidth <= 760 ? "24px" : "72px");
    requestAnimationFrame(updateModalPosition);
    closeButtons?.[closeButtons.length - 1]?.focus();
  };

  openButtons.forEach((button) => {
    button.addEventListener("click", () => open(button));
  });

  closeButtons?.forEach((button) => {
    button.addEventListener("click", close);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !modal.hidden) close();
  });

  window.addEventListener("resize", updateModalPosition);
}

function initPaymentModal() {
  const modal = document.querySelector("#payment-modal");
  const sourceForm = document.querySelector("[data-payment-source]");
  const sourceLogin = sourceForm?.querySelector("#payment-login");
  const sourceAmount = sourceForm?.querySelector("#payment-amount");
  const sourceLoginError = sourceForm?.querySelector("#payment-login-error");
  const sourceAmountError = sourceForm?.querySelector("#payment-amount-error");
  const sourceSubmit = sourceForm?.querySelector('button[type="submit"]');
  const openButtons = document.querySelectorAll("[data-open-payment]");
  const closeButtons = modal?.querySelectorAll("[data-close-payment]");
  const form = modal?.querySelector(".payment-modal__panel");
  const login = modal?.querySelector("#modal-payment-login");
  const amount = modal?.querySelector("#modal-payment-amount");
  const email = modal?.querySelector("#modal-payment-email");
  const captcha = modal?.querySelector("#modal-payment-captcha");
  const submit = modal?.querySelector(".payment-modal__submit");
  const errors = modal?.querySelector("#payment-modal-errors");
  const captchaLabel = captcha?.closest(".payment-modal__check");

  if (!modal || !form || !login || !amount || !email || !captcha || !submit || !errors || !captchaLabel) return;

  let activeTrigger = null;
  let hasValidated = false;
  let forceCaseNotFound = false;
  let sourceHasValidated = false;

  const isValidLogin = () => /^88\d{7}$/.test(login.value.trim());
  const getAmountNumber = () => Number(amount.value.replace(/\s+/g, "").replace(",", "."));
  const isValidAmount = () => {
    const value = getAmountNumber();
    return Number.isFinite(value) && value >= 100 && value <= 15000;
  };
  const isValidEmail = () => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim());
  const getSourceAmountNumber = () => Number(String(sourceAmount?.value || "").replace(/\s+/g, "").replace(",", "."));
  const isValidSourceLogin = () => /^88\d{7}$/.test(sourceLogin?.value.trim() || "");
  const isValidSourceAmount = () => {
    const value = getSourceAmountNumber();
    return Number.isFinite(value) && value >= 100 && value <= 15000;
  };

  const setSourceError = (input, error, message) => {
    if (!input || !error) return;
    error.textContent = message || "";
    error.hidden = !message;
  };

  const validateSource = () => {
    if (!sourceForm || !sourceLogin || !sourceAmount || !sourceLoginError || !sourceAmountError) return true;

    const loginValue = sourceLogin.value.trim();
    const amountValue = sourceAmount.value.trim();
    let loginMessage = "";
    let amountMessage = "";

    if (!loginValue || !amountValue) {
      loginMessage = "Пожалуйста, заполните все поля";
      if (!amountValue) amountMessage = "";
    } else {
      if (!isValidSourceLogin()) loginMessage = "Логин должен состоять из 9 цифр и начинаться с «88»";
      if (!isValidSourceAmount()) amountMessage = "Пожалуйста, введите сумму от 100 ₽ до 15 000 ₽";
    }

    const showInvalid = sourceHasValidated;
    sourceLogin.classList.toggle("is-invalid", showInvalid && (!loginValue || Boolean(loginMessage)));
    sourceAmount.classList.toggle("is-invalid", showInvalid && (!amountValue || Boolean(amountMessage)));
    sourceLogin.setAttribute("aria-invalid", String(sourceLogin.classList.contains("is-invalid")));
    sourceAmount.setAttribute("aria-invalid", String(sourceAmount.classList.contains("is-invalid")));

    setSourceError(sourceLogin, sourceLoginError, showInvalid ? loginMessage : "");
    setSourceError(sourceAmount, sourceAmountError, showInvalid ? amountMessage : "");

    const isReady = Boolean(loginValue && amountValue && !loginMessage && !amountMessage);
    if (sourceSubmit) sourceSubmit.disabled = showInvalid && !isReady;
    return isReady;
  };

  const renderErrors = (messages) => {
    errors.replaceChildren(
      ...messages.map((message) => {
        const item = document.createElement("div");
        item.className = "payment-modal__error";

        const icon = document.createElement("span");
        icon.setAttribute("aria-hidden", "true");
        icon.textContent = "!";

        const text = document.createElement("p");
        text.innerHTML = message;

        item.append(icon, text);
        return item;
      }),
    );
    errors.hidden = !messages.length;
  };

  const validate = ({ includeCaseNotFound = false } = {}) => {
    const loginValue = login.value.trim();
    const amountValue = amount.value.trim();
    const emailValue = email.value.trim();
    const emptyFields = !loginValue || !amountValue || !emailValue;
    const messages = [];

    if (emptyFields) {
      messages.push("Пожалуйста, заполните все поля");
    } else {
      if (!isValidLogin()) messages.push("Логин должен состоять из 9 цифр<br />и начинаться с «88»");
      if (!isValidAmount()) messages.push("Пожалуйста, введите сумму от 100 ₽ до 15 000 ₽");
      if (!isValidEmail()) messages.push("Email введен неверно");
    }

    if (includeCaseNotFound && !messages.length && captcha.checked) {
      messages.push("Дело не найдено");
    }

    const showInvalid = hasValidated;
    login.classList.toggle("is-invalid", showInvalid && (!loginValue || (!!loginValue && !isValidLogin())));
    amount.classList.toggle("is-invalid", showInvalid && (!amountValue || (!!amountValue && !isValidAmount())));
    email.classList.toggle("is-invalid", showInvalid && (!emailValue || (!!emailValue && !isValidEmail())));
    captchaLabel.classList.toggle("is-invalid", showInvalid && !captcha.checked);

    login.setAttribute("aria-invalid", String(login.classList.contains("is-invalid")));
    amount.setAttribute("aria-invalid", String(amount.classList.contains("is-invalid")));
    email.setAttribute("aria-invalid", String(email.classList.contains("is-invalid")));

    renderErrors(showInvalid ? messages : []);
    submit.disabled = showInvalid && (messages.length > 0 || !captcha.checked);

    return { messages, isReady: !messages.length && captcha.checked };
  };

  const close = () => {
    modal.hidden = true;
    document.body.classList.remove("is-payment-open");
    activeTrigger?.focus();
  };

  const open = (trigger = null) => {
    activeTrigger = trigger;
    hasValidated = false;
    forceCaseNotFound = false;

    login.value = sourceLogin?.value || "";
    amount.value = sourceAmount?.value || "";
    email.value = "";
    captcha.checked = false;
    validate();

    modal.hidden = false;
    document.body.classList.add("is-payment-open");
    login.focus();
  };

  openButtons.forEach((button) => {
    button.addEventListener("click", (event) => {
      event.preventDefault();
      open(button);
    });
  });

  sourceForm?.addEventListener("submit", (event) => {
    event.preventDefault();
    sourceHasValidated = true;
    if (validateSource()) open(sourceSubmit);
  });

  sourceLogin?.addEventListener("input", () => {
    if (sourceHasValidated) validateSource();
  });

  sourceAmount?.addEventListener("input", () => {
    if (sourceHasValidated) validateSource();
  });

  const resetCaseError = () => {
    forceCaseNotFound = false;
    if (hasValidated) validate();
  };

  login.addEventListener("input", resetCaseError);

  login.addEventListener("blur", () => {
    hasValidated = true;
    forceCaseNotFound = false;
    validate();
  });

  amount.addEventListener("input", resetCaseError);

  email.addEventListener("input", resetCaseError);

  captcha.addEventListener("change", resetCaseError);

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    hasValidated = true;
    forceCaseNotFound = false;
    let result = validate();

    if (result.isReady) {
      forceCaseNotFound = true;
      result = validate({ includeCaseNotFound: true });
    }

    if (login.classList.contains("is-invalid")) login.focus();
    else if (amount.classList.contains("is-invalid")) amount.focus();
    else if (email.classList.contains("is-invalid")) email.focus();
  });

  closeButtons?.forEach((button) => {
    button.addEventListener("click", close);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !modal.hidden) close();
  });
}

const faqData = {
  about: {
    title: "О связи «Ариадна»",
    items: [
      {
        question: "Что такое связь «Ариадна»?",
        answer: "Это сервисы для общения с близкими: видеосвязь, звонки, оплата связи и мобильное приложение.",
      },
      {
        question: "Где доступны услуги «Ариадна»?",
        answer: "Услуги доступны в учреждениях, подключённых к системе. Список может меняться в зависимости от региона и технической готовности учреждения.",
      },
      {
        question: "Как обратиться в поддержку?",
        answer: "Позвоните по телефону 8 800 505 37 12, напишите на info@aripay.ru или используйте раздел «Помощь» в мобильном приложении.",
      },
    ],
  },
  login: {
    title: "Логин осуждённого",
    items: [
      {
        question: "Где узнать логин осуждённого?",
        answer: "Логин можно уточнить у самого осуждённого или у сотрудников учреждения, если внутренний порядок учреждения это допускает.",
      },
      {
        question: "Что делать, если логин указан неверно?",
        answer: "Проверьте введённые данные и обратитесь в поддержку до повторной оплаты, чтобы исключить зачисление средств на другой логин.",
      },
      {
        question: "Можно ли перенести средства на другой логин?",
        answer: "Для переноса средств потребуется заявление. Бланки заявлений находятся в разделе «Документы».",
      },
    ],
  },
  app: {
    title: "Мобильное приложение «Ариадна»",
    items: [
      {
        question: "Где скачать мобильное приложение «Ариадна»?",
        answer: "Скачайте приложение из Google Play или воспользуйтесь QR-кодом на сайте.",
      },
      {
        question: "Зачем нужен раздел «Помощь»?",
        answer: "В разделе «Помощь» можно обратиться к консультантам и получить ответ по работе приложения, оплатам и услугам связи.",
      },
      {
        question: "Почему приложение не присылает уведомления?",
        answer: "Проверьте разрешения на уведомления в настройках телефона и убедитесь, что для приложения не включены жёсткие ограничения батареи.",
      },
    ],
  },
  video: {
    title: "Видеосвязь «Ариадна»",
    items: [
      {
        question: "Как подключиться к видеосвиданию?",
        answer: "Откройте мобильное приложение, выберите контакт и следуйте подсказкам на экране. Перед звонком проверьте баланс и качество интернета.",
      },
      {
        question: "Что делать, если видеосвязь прервалась?",
        answer: "Проверьте интернет-соединение и перезапустите приложение. Если проблема повторяется, обратитесь в поддержку.",
      },
      {
        question: "Нужна ли предварительная запись?",
        answer: "Порядок видеосвиданий зависит от правил конкретного учреждения. Уточните условия у сотрудников учреждения.",
      },
    ],
  },
  unlimited: {
    title: "Безлимитный тариф в приложении «Ариадна»",
    openIndex: 4,
    items: [
      {
        question: "Зачем родственнику подключать безлимитный тариф?",
        answer: "Тариф снижает стоимость регулярного общения и денежных переводов, если вы часто пользуетесь сервисами «Ариадна».",
      },
      {
        question: "Как подключить безлимитный тариф?",
        answer: "Откройте мобильное приложение «Ариадна», перейдите в профиль и выберите подключение безлимитного тарифа.",
      },
      {
        question: "Сколько стоит «Безлимит»?",
        answer: "Актуальная стоимость отображается в мобильном приложении перед подключением тарифа.",
      },
      {
        question: "Сколько человек может пользоваться «Безлимитом»?",
        answer: "Тариф подключается для пользователя приложения и действует в рамках условий, показанных при подключении.",
      },
      {
        question: "Сколько действует «Безлимит»?",
        answer: "30 дней с момента подключения. Проверить срок действия «Безлимита» вы можете в «Истории «Безлимита» в разделе «Профиль» мобильного приложения.",
        image: "./assets/sc4.jpg",
        imageAlt: "Экран истории безлимитного тарифа в приложении Ариадна",
      },
      {
        question: "Видеозвонки включены в «Безлимит»?",
        answer: "Да, для подключённого тарифа действуют специальные условия на видеозвонки согласно информации в приложении.",
      },
      {
        question: "В «Безлимит» включаются звонки на телефон, на котором нет приложения «Ариадна»?",
        answer: "Условия тарифа распространяются на услуги, перечисленные в мобильном приложении при подключении.",
      },
      {
        question: "Какие звонки включены в «Безлимит»?",
        answer: "Список включённых звонков и скидок отображается в описании тарифа в мобильном приложении.",
      },
    ],
  },
  payment: {
    title: "Оплата связи «Ариадна»",
    items: [
      {
        question: "Как оплатить связь «Ариадна»?",
        answer: "Оплатить связь можно на сайте или в мобильном приложении. Для оплаты потребуется логин и сумма пополнения.",
      },
      {
        question: "Когда деньги поступают на баланс?",
        answer: "Обычно зачисление проходит быстро, но точное время зависит от банка и технической обработки платежа.",
      },
      {
        question: "Что делать, если платёж не прошёл?",
        answer: "Проверьте статус операции в банке. Если деньги списаны, но баланс не пополнился, обратитесь в поддержку.",
      },
    ],
  },
  transfer: {
    title: "Денежные переводы",
    items: [
      {
        question: "Как отправить денежный перевод?",
        answer: "Выберите учреждение, заполните данные получателя, укажите сумму и подтвердите оплату.",
      },
      {
        question: "Какая комиссия у перевода?",
        answer: "Комиссия зависит от выбранного способа и условий тарифа. Перед оплатой итоговая сумма показывается на экране.",
      },
      {
        question: "Когда перевод поступит в учреждение?",
        answer: "Деньги поступают в учреждение в срок до 3 рабочих дней.",
      },
    ],
  },
  other: {
    title: "Прочее",
    openIndex: 1,
    help: true,
    items: [
      {
        question: "Как узнать, кому звонит осуждённый помимо меня?",
        answer: "Такая информация не предоставляется третьим лицам без предусмотренных законом оснований.",
      },
      {
        question: "Что делать, если осуждённый случайно стёр код доступа на карте оплаты услуг?",
        answer: "Необходимо сообщить об этом сотруднику ФСИН. Далее он должен связаться с нашей службой поддержки, которая восстановит утраченные данные.",
      },
      {
        question: "Как вернуть деньги после освобождения из исправительного учреждения?",
        answer: "Заполните заявление на возврат денежных средств. Форму заявления можно найти в разделе «Документы».",
      },
    ],
  },
};

function createFaqItem(item, isOpen) {
  const details = document.createElement("details");
  if (isOpen) details.open = true;

  const summary = document.createElement("summary");
  summary.textContent = item.question;
  details.append(summary);

  const answer = document.createElement("div");
  answer.className = "faq-answer";

  const text = document.createElement("p");
  text.textContent = item.answer;
  answer.append(text);

  if (item.image) {
    const image = document.createElement("img");
    image.src = item.image;
    image.alt = item.imageAlt || "";
    image.width = 62;
    image.height = 127;
    answer.append(image);
  }

  details.append(answer);
  return details;
}

function initFaqPage() {
  const tabs = Array.from(document.querySelectorAll("[data-faq-tab]"));
  const title = document.querySelector("#faq-panel-title");
  const accordion = document.querySelector("#faq-accordion");
  const help = document.querySelector("#faq-help");

  if (!tabs.length || !title || !accordion || !help) return;

  const render = (key, updateHash = true) => {
    const data = faqData[key] || faqData.other;
    title.textContent = data.title;
    accordion.replaceChildren(...data.items.map((item, index) => createFaqItem(item, index === data.openIndex)));
    help.hidden = !data.help;

    tabs.forEach((tab) => {
      const isActive = tab.dataset.faqTab === key;
      tab.classList.toggle("is-active", isActive);
      tab.setAttribute("aria-pressed", String(isActive));
    });

    if (updateHash) history.replaceState(null, "", `#${key}`);
  };

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => render(tab.dataset.faqTab || "other"));
  });

  window.addEventListener("hashchange", () => {
    const key = window.location.hash.replace("#", "") || "other";
    render(faqData[key] ? key : "other", false);
  });

  const initialKey = window.location.hash.replace("#", "") || "other";
  render(faqData[initialKey] ? initialKey : "other", false);
}

function initPaymentFaqAccordion() {
  const root = document.querySelector(".payment-faq-list");
  if (!root) return;

  const items = Array.from(root.querySelectorAll(".payment-faq-item"));
  const triggers = items.map((item) => item.querySelector(".payment-faq-trigger")).filter(Boolean);
  const panels = items.map((item) => item.querySelector(".payment-faq-answer")).filter(Boolean);

  if (!items.length || items.length !== triggers.length || items.length !== panels.length) return;

  const setItemState = (index, isOpen) => {
    items[index].classList.toggle("is-open", isOpen);
    triggers[index].setAttribute("aria-expanded", String(isOpen));
    panels[index].hidden = !isOpen;
  };

  const syncInitialState = () => {
    items.forEach((item, index) => {
      const isOpen = item.classList.contains("is-open");
      setItemState(index, isOpen);
    });
  };

  triggers.forEach((trigger, index) => {
    trigger.addEventListener("click", () => {
      const isOpen = trigger.getAttribute("aria-expanded") === "true";
      setItemState(index, !isOpen);
    });
  });

  syncInitialState();
}

function initMainHeroSlider() {
  const hero = document.querySelector("[data-main-hero]");
  if (!hero) return;

  const slides = Array.from(hero.querySelectorAll("[data-main-slide]"));
  const dots = Array.from(hero.querySelectorAll("[data-main-slide-to]"));
  const prev = hero.querySelector("[data-main-prev]");
  const next = hero.querySelector("[data-main-next]");
  if (!slides.length) return;

  let activeIndex = slides.findIndex((slide) => slide.classList.contains("is-active"));
  if (activeIndex < 0) activeIndex = 0;

  const showSlide = (index) => {
    activeIndex = (index + slides.length) % slides.length;

    slides.forEach((slide, slideIndex) => {
      const isActive = slideIndex === activeIndex;
      slide.hidden = false;
      slide.classList.toggle("is-active", isActive);
      slide.setAttribute("aria-hidden", String(!isActive));
    });

    dots.forEach((dot, dotIndex) => {
      const isActive = dotIndex === activeIndex;
      dot.classList.toggle("is-active", isActive);
      dot.setAttribute("aria-pressed", String(isActive));
    });
  };

  dots.forEach((dot) => {
    dot.addEventListener("click", () => showSlide(Number(dot.dataset.mainSlideTo || 0)));
  });

  prev?.addEventListener("click", () => showSlide(activeIndex - 1));
  next?.addEventListener("click", () => showSlide(activeIndex + 1));
  showSlide(activeIndex);
}

initMobileMenu();

searchForms.forEach((form) => {
  bindSearchFormState(form);

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    submitSearch(form);
  });
});

initSearchPage();
initQrModal();
initNewsModal();
initPaymentModal();
initFaqPage();
initPaymentFaqAccordion();
initMainHeroSlider();
