// Анимации при скролле
const flyElements = document.querySelectorAll(".fly-from-center");
const flyObserver = new IntersectionObserver(
   (entries) =>
      entries.forEach(
         (entry) =>
            entry.isIntersecting && entry.target.classList.add("visible"),
      ),
   { threshold: 0.1 },
);
flyElements.forEach((el) => flyObserver.observe(el));

const fadeElements = document.querySelectorAll(
   ".fade-up, .slide-left, .slide-right",
);
const fadeObserver = new IntersectionObserver(
   (entries) =>
      entries.forEach(
         (entry) =>
            entry.isIntersecting && entry.target.classList.add("visible"),
      ),
   { threshold: 0.1 },
);
fadeElements.forEach((el) => fadeObserver.observe(el));

// Мобильное меню
const hamburger = document.getElementById("hamburgerBtn");
const mobileNav = document.getElementById("mobileNav");

if (hamburger && mobileNav) {
   hamburger.addEventListener("click", () => {
      hamburger.classList.toggle("open");
      mobileNav.classList.toggle("open");
      document.body.style.overflow = mobileNav.classList.contains("open")
         ? "hidden"
         : "";
   });

   const closeMenu = () => {
      hamburger.classList.remove("open");
      mobileNav.classList.remove("open");
      document.body.style.overflow = "";
   };

   document.querySelectorAll(".mobile-link").forEach((link) => {
      link.addEventListener("click", closeMenu);
   });

   const logoLink = document.querySelector(".logo");
   if (logoLink) logoLink.addEventListener("click", closeMenu);

   const orderBtn = document.querySelector(".order-btn");
   if (orderBtn) orderBtn.addEventListener("click", closeMenu);
}

// Активная навигация при скролле
function setNav() {
   const sections = ["about", "services", "works", "contact", "contactForm"];
   let current = "";

   for (let sec of sections) {
      const el = document.getElementById(sec);
      if (el) {
         const rect = el.getBoundingClientRect();
         if (rect.top <= 150 && rect.bottom >= 150) {
            current = sec;
            break;
         }
      }
   }

   document.querySelectorAll(".nav-links a, .mobile-link").forEach((link) => {
      link.classList.remove("active");
      if (link.dataset.nav === current) link.classList.add("active");
   });
}

window.addEventListener("scroll", setNav);
window.addEventListener("load", setNav);

// ========== ПЕРЕКЛЮЧЕНИЕ ТЕМЫ (СВЕТЛАЯ/ТЁМНАЯ) ==========
const themeToggle = document.getElementById("themeToggle");
const themeIcon = themeToggle ? themeToggle.querySelector("i") : null;

// Проверяем сохранённую тему или используем светлую по умолчанию
const savedTheme = localStorage.getItem("theme") || "dark";
document.documentElement.setAttribute("data-theme", savedTheme);
if (themeIcon) {
   themeIcon.className = savedTheme === "dark" ? "fas fa-sun" : "fas fa-moon";
}

if (themeToggle) {
   themeToggle.addEventListener("click", () => {
      const currentTheme = document.documentElement.getAttribute("data-theme");
      const newTheme = currentTheme === "dark" ? "light" : "dark";

      document.documentElement.setAttribute("data-theme", newTheme);
      localStorage.setItem("theme", newTheme);

      if (themeIcon) {
         themeIcon.className =
            newTheme === "dark" ? "fas fa-sun" : "fas fa-moon";
      }
   });
}

// ========== МУЛЬТИЯЗЫЧНОСТЬ ==========
const translations = {
   ru: {
      heroBadge: "✨ Студия цифровых продуктов ✨",
      heroTitle1: "Делаем сайты,",
      heroTitle2: "которые увеличивают продажи",
      heroDesc: "Сайты под ключ, которые работают на твой бизнес.",
      orderBtn: "🚀 Заказать сайт",
      servicesBtn: "Узнать услуги",
      aboutTitle: "О нас",
      aboutText:
         " — это команда разработчиков и дизайнеров, которые создают сайты, решающие задачи бизнеса. Мы любим яркий дизайн, быструю вёрстку и довольных клиентов. Работаем под ключ — от идеи до запуска. Ваш успех — наша главная цель!",
      servicesTitle: "Наши услуги",
      servicesSub: "Что мы делаем лучше всего",
      landingTitle: "Лендинги",
      landingDesc:
         "Одностраничные сайты для продаж с высокой конверсией. Идеально для запуска товаров и услуг.",
      bizTitle: "Сайты-визитки",
      bizDesc:
         "Представьте свой бизнес или себя стильно. Адаптивно, современно, запоминающеся.",
      shopTitle: "Интернет-магазины",
      shopDesc:
         "Полноценные магазины с корзиной, фильтрами и оплатой. Под любой товар.",
      adaptTitle: "Адаптивная вёрстка",
      adaptDesc:
         "Верстаем под любые устройства: ПК, планшеты, телефоны. Всё идеально работает везде.",
      tildaTitle: "Дизайн сайта",
      priceIncluded: "включено в каждый проект",
      tildaDesc:
         "Быстрая сборка с нуля или по вашему дизайну. Подключаем аналитику и формы.",
      supportTitle: "Техподдержка сайтов",
      supportDesc:
         "Регулярные обновления, правки, бэкапы и защита. Ваш сайт всегда в идеальном состоянии.",
      worksTitle: "Наши работы",
      worksSub: "Реальные проекты, которые мы запустили",
      p1Tag: "Сайт-визитка",
      p1Title: "Elena English",
      p1Desc: "Сайт репетитора английского языка с онлайн‑записью и отзывами",
      p2Tag: "Интернет-магазин",
      p2Title: "Sofyx",
      p2Desc: "Маркетплейс товаров с каталогом, поиском и фильтрами",
      p3Tag: "Лендинг",
      p3Title: "TrimZone",
      p3Desc: "Сайт барбершопа с прайсом, услугами и онлайн-записью",
      p4Tag: "Веб-приложение",
      p4Title: "MoviesBox",
      p4Desc: "Кинотека с рейтингами, фильтрами и карточками фильмов",
      portfolioVisit: "Открыть сайт",
      contactTitle: "Свяжитесь с нами",
      contactSub: "Мы на связи 24/7. Напишите — обсудим ваш проект",
      formTitle: "Отправить заявку",
      namePlace: "Ваше имя",
      contactPlace: "Telegram / WhatsApp / Viber",
      messagePlace: "Кратко опишите задачу: какой сайт нужен, сроки, бюджет",
      submit: "📩 Отправить →",
      navAbout: "О нас",
      navServices: "Услуги",
      navWorks: "Работы",
      contactMethodLabel: "Выберите удобную связь",
      navContact: "Контакты",
      navOrder: "Заявка",
      darkTheme: "Светлая тема",
      lightTheme: "Тёмная тема",
      orderBtnText: "Заказать",
      footerText: " — сайты, которые работают на вас. 2025",
   },
   uk: {
      heroBadge: "✨ Студія цифрових продуктів ✨",
      heroTitle1: "Робимо сайти,",
      heroTitle2: "які збільшують продажі",
      heroDesc: "Сайти під ключ, які працюють на твій бізнес.",
      orderBtn: "🚀 Замовити сайт",
      servicesBtn: "Дізнатись послуги",
      aboutTitle: "Про нас",
      aboutText:
         " — це команда розробників та дизайнерів, які створюють сайти, що вирішують задачі бізнесу. Ми любимо яскравий дизайн, швидку верстку та задоволених клієнтів. Працюємо під ключ — від ідеї до запуску. Ваш успіх — наша головна мета!",

      servicesTitle: "Наші послуги",
      servicesSub: "Що ми робимо найкраще",
      landingTitle: "Лендинги",
      landingDesc: "Односторінкові сайти для продажів з високою конверсією.",
      bizTitle: "Сайти-візитки",
      bizDesc: "Представте свій бізнес або себе стильно. Адаптивно, сучасно.",
      shopTitle: "Інтернет-магазини",
      shopDesc: "Повноцінні магазини з кошиком, фільтрами та оплатою.",
      adaptTitle: "Адаптивна верстка",
      adaptDesc: "Верстаємо під будь-які пристрої: ПК, планшети, телефони.",
      tildaTitle: "Дизайн сайту",
      tildaDesc:
         "Швидка збірка з нуля або за вашим дизайном. Підключаємо аналітику та форми.",
      priceIncluded: "включено в кожен проєкт",
      supportTitle: "Техпідтримка сайтів",
      supportDesc:
         "Регулярні оновлення, правки, бекапи та захист. Ваш сайт завжди в ідеальному стані.",
      worksTitle: "Наші роботи",
      worksSub: "Реальні проекти, які ми запустили",
      p1Tag: "Сайт-візитка",
      p1Title: "Elena English",
      p1Desc: "Сайт репетитора англійської мови з онлайн‑записом та відгуками",
      p2Tag: "Інтернет-магазин",
      p2Title: "Sofyx",
      p2Desc: "Маркетплейс товарів з каталогом, пошуком та фільтрами",
      p3Tag: "Лендинг",
      p3Title: "TrimZone",
      p3Desc: "Сайт барбершопу з прайсом, послугами та онлайн-записом",
      p4Tag: "Веб-застосунок",
      p4Title: "MoviesBox",
      p4Desc: "Кінотека з рейтингами, фільтрами та картками фільмів",
      portfolioVisit: "Відкрити сайт",
      contactTitle: "Зв'яжіться з нами",
      contactSub: "Ми на зв'язку 24/7. Напишіть — обговоримо ваш проєкт",
      formTitle: "Відправити заявку",
      namePlace: "Ваше ім'я",
      contactPlace: "Telegram / WhatsApp / Viber",
      messagePlace:
         "Коротко опишіть задачу: який сайт потрібен, терміни, бюджет",
      submit: "📩 Відправити →",
      navAbout: "Про нас",
      navServices: "Послуги",
      navWorks: "Роботи",
      navContact: "Контакти",
      contactMethodLabel: "Оберіть зручний зв'язок",
      navOrder: "Заявка",
      darkTheme: "Світла тема",
      lightTheme: "Темна тема",
      orderBtnText: "Замовити",
      footerText: " — сайти, які працюють на вас. 2025",
   },
   en: {
      heroBadge: "✨ Digital Product Studio ✨",
      heroTitle1: "We build websites",
      heroTitle2: "that boost your sales",
      heroDesc: "Turnkey websites that work for your business.",
      orderBtn: "🚀 Order website",
      servicesBtn: "View services",
      aboutTitle: "About Us",
      aboutText:
         " — is a team of developers and designers who create websites that solve business problems. We love bright design, fast coding, and happy clients. Turnkey work — from idea to launch. Your success is our main goal!",
      servicesTitle: "Our Services",
      servicesSub: "What we do best",
      landingTitle: "Landing Pages",
      landingDesc:
         "Single-page sales sites with high conversion. Perfect for launching products and services.",
      bizTitle: "Business Cards",
      bizDesc:
         "Present your business or yourself stylishly. Responsive, modern, memorable.",
      shopTitle: "Online Stores",
      shopDesc:
         "Full-featured stores with cart, filters, and payment. For any product.",
      adaptTitle: "Responsive Layout",
      adaptDesc:
         "We build for any device: PC, tablets, phones. Everything works perfectly everywhere.",
      tildaTitle: "Website Design",
      tildaDesc:
         "Fast assembly from scratch or according to your design. Connecting analytics and forms.",
      priceIncluded: "included in every project",
      supportTitle: "Website Support",
      supportDesc:
         "Regular updates, fixes, backups and protection. Your site is always in perfect condition.",
      worksTitle: "Our Works",
      worksSub: "Real projects we have launched",
      p1Tag: "Business Card",
      p1Title: "Elena English",
      p1Desc: "English tutor website with online booking and reviews",
      p2Tag: "Online Store",
      p2Title: "Sofyx",
      p2Desc: "Product marketplace with catalog, search and filters",
      p3Tag: "Landing Page",
      p3Title: "TrimZone",
      p3Desc: "Barber shop website with price list, services and booking",
      p4Tag: "Web App",
      p4Title: "MoviesBox",
      p4Desc: "Movie catalog with ratings, filters and film cards",
      portfolioVisit: "Visit site",
      contactTitle: "Contact Us",
      contactSub:
         "We're available 24/7. Write to us — let's discuss your project",
      formTitle: "Send request",
      namePlace: "Your name",
      contactPlace: "Telegram / WhatsApp / Viber",
      messagePlace:
         "Briefly describe your task: what website you need, deadlines, budget",
      submit: "📩 Send →",
      navAbout: "About",
      navServices: "Services",
      navWorks: "Works",
      navContact: "Contact",
      contactMethodLabel: "Choose your preferred contact",
      navOrder: "Request",
      darkTheme: "Light theme",
      lightTheme: "Dark theme",
      orderBtnText: "Order",
      footerText: " — websites that work for you. 2025",
   },
};

function updateLanguage(lang) {
   const t = translations[lang];
   if (!t) return;

   // Hero секция
   const heroBadge = document.querySelector(".hero-badge");
   if (heroBadge) heroBadge.textContent = t.heroBadge;

   const heroTitleSpans = document.querySelectorAll(".hero h1 span");
   if (heroTitleSpans[0]) heroTitleSpans[0].textContent = t.heroTitle1;
   const accentText = document.querySelector(".hero h1 .accent-text");
   if (accentText) accentText.textContent = t.heroTitle2;

   const heroDesc = document.querySelector(".hero p");
   if (heroDesc) heroDesc.textContent = t.heroDesc;

   const orderBtn = document.querySelector(".hero-buttons .btn-primary");
   if (orderBtn) orderBtn.innerHTML = t.orderBtn;

   const servicesBtn = document.querySelector(".hero-buttons .btn-outline");
   if (servicesBtn) servicesBtn.textContent = t.servicesBtn;

   // О нас
   const aboutText = document.getElementById("aboutText");
   if (aboutText) aboutText.textContent = t.aboutText;

   const aboutTitle = document.querySelector("#about .section-title");
   if (aboutTitle) aboutTitle.textContent = t.aboutTitle;

   // Услуги
   const servicesTitle = document.querySelector("#services .section-title");
   if (servicesTitle) servicesTitle.textContent = t.servicesTitle;

   const servicesSub = document.querySelector("#services .section-sub");
   if (servicesSub) servicesSub.textContent = t.servicesSub;

   const serviceCards = document.querySelectorAll(".service-card");
   if (serviceCards[0]) {
      serviceCards[0].querySelector("h3").textContent = t.landingTitle;
      serviceCards[0].querySelector("p").textContent = t.landingDesc;
   }
   if (serviceCards[1]) {
      serviceCards[1].querySelector("h3").textContent = t.bizTitle;
      serviceCards[1].querySelector("p").textContent = t.bizDesc;
   }
   if (serviceCards[2]) {
      serviceCards[2].querySelector("h3").textContent = t.shopTitle;
      serviceCards[2].querySelector("p").textContent = t.shopDesc;
   }
   if (serviceCards[3]) {
      serviceCards[3].querySelector("h3").textContent = t.adaptTitle;
      serviceCards[3].querySelector("p").textContent = t.adaptDesc;

      //
      const price = serviceCards[3].querySelector(".service-price");
      if (price) price.textContent = t.priceIncluded;
   }
   if (serviceCards[4]) {
      serviceCards[4].querySelector("h3").textContent = t.tildaTitle;
      serviceCards[4].querySelector("p").textContent = t.tildaDesc;
   }
   if (serviceCards[5]) {
      serviceCards[5].querySelector("h3").textContent = t.supportTitle;
      serviceCards[5].querySelector("p").textContent = t.supportDesc;
   }

   // Работы
   const worksTitle = document.querySelector("#works .section-title");
   if (worksTitle) worksTitle.textContent = t.worksTitle;

   const worksSub = document.querySelector("#works .section-sub");
   if (worksSub) worksSub.textContent = t.worksSub;

   // Карточки портфолио
   const portfolioCards = document.querySelectorAll(".portfolio-card");
   const pData = [
      { tag: t.p1Tag, title: t.p1Title, desc: t.p1Desc },
      { tag: t.p2Tag, title: t.p2Title, desc: t.p2Desc },
      { tag: t.p3Tag, title: t.p3Title, desc: t.p3Desc },
      { tag: t.p4Tag, title: t.p4Title, desc: t.p4Desc },
   ];
   portfolioCards.forEach((card, i) => {
      if (!pData[i]) return;
      const tagEl = card.querySelector(".portfolio-tag");
      const titleEl = card.querySelector(".portfolio-title");
      const descEl = card.querySelector(".portfolio-desc");
      const visitEl = card.querySelector(".portfolio-visit");
      if (tagEl) tagEl.textContent = pData[i].tag;
      if (titleEl) titleEl.textContent = pData[i].title;
      if (descEl) descEl.textContent = pData[i].desc;
      if (visitEl)
         visitEl.innerHTML = `${t.portfolioVisit} <i class="fas fa-arrow-right"></i>`;
   });

   // Контакты
   const contactTitle = document.querySelector("#contact .section-title");
   if (contactTitle) contactTitle.textContent = t.contactTitle;

   const contactSub = document.querySelector("#contact .section-sub");
   if (contactSub) contactSub.textContent = t.contactSub;

   const formTitle = document.querySelector(".contact-form h3");
   if (formTitle) formTitle.textContent = t.formTitle;

   const nameInput = document.querySelector("#userName");
   if (nameInput) nameInput.placeholder = t.namePlace;

   const contactMethodLabel = document.getElementById("contactMethodLabel");
   if (contactMethodLabel)
      contactMethodLabel.textContent = t.contactMethodLabel;

   // const contactInput = document.querySelector("#userContact");
   // if (contactInput) contactInput.placeholder = t.contactPlace;

   const messageTextarea = document.querySelector("#userMessage");
   if (messageTextarea) messageTextarea.placeholder = t.messagePlace;

   const submitButton = document.querySelector(".submit-btn");
   if (submitButton && !submitButton.classList.contains("success")) {
      submitButton.innerHTML = t.submit;
   }

   // Навигация
   const navLinks = document.querySelectorAll(".nav-links a");
   const navTexts = [
      t.navAbout,
      t.navServices,
      t.navWorks,
      t.navContact,
      t.navOrder,
   ];
   navLinks.forEach((link, i) => {
      if (navTexts[i]) link.textContent = navTexts[i];
   });

   const mobileLinks = document.querySelectorAll(".mobile-link");
   mobileLinks.forEach((link, i) => {
      if (navTexts[i]) link.textContent = navTexts[i];
   });

   const orderBtnNav = document.querySelector(".order-btn");
   if (orderBtnNav) orderBtnNav.textContent = t.orderBtnText;

   // перевод кнопки темы в бургер меню начало
   const themeLabel = document.querySelector(".mobile-theme-row span");
   if (themeLabel) {
      const currentTheme = document.documentElement.getAttribute("data-theme");
      themeLabel.textContent =
         currentTheme === "dark" ? t.darkTheme : t.lightTheme;
   }

   //footer перевод
   const footerText = document.getElementById("footerText");
   if (footerText) footerText.textContent = t.footerText;
}

// Обработчики для кнопок языка
// Дропдаун языка в мобильной шапке
const navLangMobile = document.getElementById("navLangMobile");
const navLangTrigger = document.getElementById("navLangTrigger");
const navLangCurrent = document.getElementById("navLangCurrent");

const langLabels = { ru: "РУС", uk: "УКР", en: "ENG" };

if (navLangTrigger) {
   navLangTrigger.addEventListener("click", (e) => {
      e.stopPropagation();
      navLangMobile.classList.toggle("open");
   });
   document.addEventListener("click", () => {
      if (navLangMobile) navLangMobile.classList.remove("open");
   });
}

// Опции в мобильном дропдауне
document.querySelectorAll(".nav-lang-option").forEach((btn) => {
   btn.addEventListener("click", () => {
      const lang = btn.dataset.lang;
      document
         .querySelectorAll(".nav-lang-option")
         .forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      if (navLangCurrent) navLangCurrent.textContent = langLabels[lang];
      if (navLangMobile) navLangMobile.classList.remove("open");
      // Синхронизируем .lang-btn везде
      document
         .querySelectorAll(".lang-btn")
         .forEach((b) => b.classList.remove("active"));
      document
         .querySelectorAll(`.lang-btn[data-lang="${lang}"]`)
         .forEach((b) => b.classList.add("active"));
      updateLanguage(lang);
   });
});

// Обычные кнопки языка (десктоп + бургер меню)
document.querySelectorAll(".lang-btn").forEach((btn) => {
   btn.addEventListener("click", () => {
      const lang = btn.dataset.lang;
      document
         .querySelectorAll(".lang-btn")
         .forEach((b) => b.classList.remove("active"));
      document
         .querySelectorAll(`.lang-btn[data-lang="${lang}"]`)
         .forEach((b) => b.classList.add("active"));
      // Синхронизируем мобильный дропдаун
      document
         .querySelectorAll(".nav-lang-option")
         .forEach((b) => b.classList.remove("active"));
      const activeOpt = document.querySelector(
         `.nav-lang-option[data-lang="${lang}"]`,
      );
      if (activeOpt) activeOpt.classList.add("active");
      if (navLangCurrent) navLangCurrent.textContent = langLabels[lang];
      updateLanguage(lang);
   });
});

// ========== ВАЛИДАЦИЯ ФОРМЫ И ОТПРАВКА ==========
const form = document.getElementById("requestForm");
const submitBtn = document.getElementById("submitBtn");
const userName = document.getElementById("userName");
const userContact = document.getElementById("userContact");
const userMessage = document.getElementById("userMessage");
const charCounter = document.getElementById("charCounter");

// Счетчик символов для textarea (ограничение 99 символов)
if (userMessage && charCounter) {
   userMessage.addEventListener("input", () => {
      const length = userMessage.value.length;
      charCounter.textContent = `${length} / 99`;

      if (length > 99) {
         userMessage.value = userMessage.value.slice(0, 99);
         charCounter.textContent = `99 / 99`;
      }
   });
}

// Функция валидации
function validateForm() {
   let isValid = true;

   // Валидация способа связи
   const methodError = document.getElementById("methodError");
   const methodChecked = document.querySelector(
      'input[name="contactMethod"]:checked',
   );
   if (!methodChecked) {
      methodError.textContent = "Выберите способ связи";
      isValid = false;
   } else {
      methodError.textContent = "";
   }

   // Валидация имени (не пустое, минимум 2 символа)
   const nameError = document.getElementById("nameError");
   if (!userName.value.trim()) {
      nameError.textContent = "Введите ваше имя";
      userName.classList.add("error");
      isValid = false;
   } else if (userName.value.trim().length < 2) {
      nameError.textContent = "Имя должно содержать минимум 2 символа";
      userName.classList.add("error");
      isValid = false;
   } else {
      nameError.textContent = "";
      userName.classList.remove("error");
   }

   // Валидация контакта (не пустое)
   const contactError = document.getElementById("contactError");
   if (!userContact.value.trim()) {
      contactError.textContent = "Введите ваш Telegram, WhatsApp или Viber";
      userContact.classList.add("error");
      isValid = false;
   } else {
      contactError.textContent = "";
      userContact.classList.remove("error");
   }

   // Валидация сообщения (не пустое, не более 99 символов)
   const messageError = document.getElementById("messageError");
   if (!userMessage.value.trim()) {
      messageError.textContent = "Опишите вашу задачу";
      userMessage.classList.add("error");
      isValid = false;
   } else if (userMessage.value.length > 99) {
      messageError.textContent = "Сообщение не должно превышать 99 символов";
      userMessage.classList.add("error");
      isValid = false;
   } else {
      messageError.textContent = "";
      userMessage.classList.remove("error");
   }

   return isValid;
}

// Функция сброса кнопки в исходное состояние
function resetButton() {
   submitBtn.classList.remove("success");
   // Возвращаем оригинальный текст в зависимости от текущего языка
   const activeLang = document.querySelector(".lang-btn.active");
   if (activeLang) {
      const lang = activeLang.dataset.lang;
      const t = translations[lang];
      if (t) submitBtn.innerHTML = t.submit;
   } else {
      submitBtn.innerHTML = "📩 Отправить →";
   }
}

// Обработчик отправки формы
if (form) {
   form.addEventListener("submit", async (e) => {
      e.preventDefault();

      if (!validateForm()) return;

      // Блокируем кнопку на время отправки
      submitBtn.disabled = true;
      submitBtn.innerHTML = "⏳ Отправляем...";

      const methodChecked = document.querySelector(
         'input[name="contactMethod"]:checked',
      );

      const ok = await sendTelegramNotification(
         {
            "👤 Имя": userName.value.trim(),
            "📱 Способ связи": methodChecked.value,
            "📞 Контакт": userContact.value.trim(),
            "💬 Задача": userMessage.value.trim(),
         },
         "A³ — Разработка сайтов",
      );

      submitBtn.disabled = false;

      if (ok) {
         // GA4: событие отправки формы
         if (typeof gtag === "function") {
            gtag("event", "form_submit", {
               contact_method: methodChecked.value,
               form_id: "requestForm",
            });
         }

         submitBtn.classList.add("success");
         submitBtn.innerHTML = "✓ Отправлено!";
         form.reset();
         if (charCounter) charCounter.textContent = "0 / 99";
         setTimeout(resetButton, 5000);
      } else {
         submitBtn.innerHTML = "❌ Ошибка — попробуйте снова";
         setTimeout(resetButton, 4000);
      }
   });
}

// Смена плейсхолдера в зависимости от выбранного способа связи
const contactPlaceholders = {
   Telegram: "+380 XX XXX XX XX",
   Viber: "+380 XX XXX XX XX",
   WhatsApp: "+380 XX XXX XX XX",
};

document.querySelectorAll('input[name="contactMethod"]').forEach((radio) => {
   radio.addEventListener("change", () => {
      userContact.placeholder = contactPlaceholders[radio.value];
      const methodError = document.getElementById("methodError");
      if (methodError) methodError.textContent = "";
   });
});

// Очистка ошибок при вводе
if (userName) {
   userName.addEventListener("input", () => {
      const nameError = document.getElementById("nameError");
      if (nameError) nameError.textContent = "";
      userName.classList.remove("error");
   });
}

if (userContact) {
   userContact.addEventListener("input", () => {
      const contactError = document.getElementById("contactError");
      if (contactError) contactError.textContent = "";
      userContact.classList.remove("error");
   });
}

if (userMessage) {
   userMessage.addEventListener("input", () => {
      const messageError = document.getElementById("messageError");
      if (messageError && userMessage.value.length <= 99) {
         messageError.textContent = "";
         userMessage.classList.remove("error");
      }
   });
}

// Инициализация темы при загрузке
document.addEventListener("DOMContentLoaded", () => {
   // Убеждаемся, что тема применена
   const theme = localStorage.getItem("theme") || "dark";
   document.documentElement.setAttribute("data-theme", theme);
   if (themeIcon) {
      themeIcon.className = theme === "dark" ? "fas fa-sun" : "fas fa-moon";
   }
});

// удалить кнопка в бургер меню меняет тему// Мобильный переключатель темы
const themeToggleMobile = document.getElementById("themeToggleMobile");
const themeIconMobile = themeToggleMobile
   ? themeToggleMobile.querySelector("i")
   : null;
const themeLabel = document.querySelector(".mobile-theme-row span");

// Получаем тему (дублируем, потому что savedTheme ещё не объявлена)
const mobileSavedTheme = localStorage.getItem("theme") || "dark";

if (themeIconMobile) {
   themeIconMobile.className =
      mobileSavedTheme === "dark" ? "fas fa-sun" : "fas fa-moon";
}
if (themeLabel) {
   themeLabel.textContent =
      mobileSavedTheme === "dark" ? "Светлая тема" : "Тёмная тема";
}

if (themeToggleMobile) {
   themeToggleMobile.addEventListener("click", () => {
      const currentTheme = document.documentElement.getAttribute("data-theme");
      const newTheme = currentTheme === "dark" ? "light" : "dark";
      document.documentElement.setAttribute("data-theme", newTheme);
      localStorage.setItem("theme", newTheme);

      // Обновляем десктопную иконку
      if (themeIcon) {
         themeIcon.className =
            newTheme === "dark" ? "fas fa-sun" : "fas fa-moon";
      }

      // Обновляем мобильную иконку и текст
      if (themeIconMobile) {
         themeIconMobile.className =
            newTheme === "dark" ? "fas fa-sun" : "fas fa-moon";
      }
      if (themeLabel) {
         themeLabel.textContent =
            newTheme === "dark" ? "Светлая тема" : "Тёмная тема";
      }
   });
}
//  стрелочка вверх на мобилке прокрутка вверх
const scrollBtn = document.getElementById("scrollToTopBtn");
let lastScrollY = window.scrollY;

if (scrollBtn) {
   window.addEventListener("scroll", function () {
      const currentScrollY = window.scrollY;

      if (currentScrollY > 300 && currentScrollY > lastScrollY) {
         // Скролл ВНИЗ и ниже 300px → показываем
         scrollBtn.classList.add("show");
      } else if (currentScrollY < lastScrollY) {
         // Скролл ВВЕРХ → сразу скрываем
         scrollBtn.classList.remove("show");
      }

      lastScrollY = currentScrollY;
   });

   scrollBtn.addEventListener("click", function () {
      window.scrollTo({
         top: 0,
         behavior: "smooth",
      });
   });
}
