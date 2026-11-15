// Модалка выбора языка при первом заходе
const langSelectOverlay = document.getElementById("langSelectOverlay");

if (langSelectOverlay) {
   const savedLangChoice = localStorage.getItem("lang");

   if (savedLangChoice) {
      langSelectOverlay.classList.add("hidden");
   }

   document.querySelectorAll(".lang-select-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
         const lang = btn.dataset.lang;
         applyLang(lang);
         langSelectOverlay.classList.add("hidden");
      });
   });
}

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
   const mobileNavOverlay = document.getElementById("mobileNavOverlay"); // затемнение при открытии меню
   hamburger.addEventListener("click", () => {
      hamburger.classList.toggle("open");
      mobileNav.classList.toggle("open");
      if (mobileNavOverlay) mobileNavOverlay.classList.toggle("show"); // затемнение при открытии меню
      document.body.style.overflow = mobileNav.classList.contains("open")
         ? "hidden"
         : "";
   });

   const closeMenu = () => {
      hamburger.classList.remove("open");
      mobileNav.classList.remove("open");
      if (mobileNavOverlay) mobileNavOverlay.classList.remove("show"); // затемнение при открытии меню
      document.body.style.overflow = "";
   };

   document.querySelectorAll(".mobile-link").forEach((link) => {
      link.addEventListener("click", closeMenu);
   });

   const logoLink = document.querySelector(".logo");
   if (logoLink) logoLink.addEventListener("click", closeMenu);

   const orderBtn = document.querySelector(".order-btn");
   if (orderBtn) orderBtn.addEventListener("click", closeMenu);
   if (mobileNavOverlay) {
      mobileNavOverlay.addEventListener("click", closeMenu);
   }
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
      heroBadge: "Делаем сайты под ключ",
      heroTitle1: "AI-администратор,",
      heroTitle2: "который увеличит ваши продажи",
      heroDesc: "Отвечает клиентам 24/7, записывает их и уведомляет вас.",
      orderBtn: "Подключить AI",
      servicesBtn: "Заказать сайт",
      aiTitle: "AI-администратор",
      aiDesc:
         "Принимает записи и заказы 24/7, отвечает клиентам за вас и помогает увеличить продажи.",
      aiPrefill: "Хочу подключить AI-администратора",
      priceFrom: "от",
      perMonth: "/мес",
      robotPhrases: ["Привет!", "Запишу 24/7", "Отвечу за вас", "Не сплю никогда", "Чем помочь?"],
      robotFly: "Полетели!",
      robotBack: "Я на месте!",
      robotCta: "Напишите нам!",
      aboutTitle: "О нас",
      aboutText:
         " — команда, которая делает лендинги, интернет-магазины и сайты, решающие задачи бизнеса. Пишем чистый код, который остаётся полностью вашим — без ежемесячной абонплаты и привязки к чужим платформам. Работаем под ключ, от идеи до запуска. На связи менеджер — Алекс, ты можешь написать мне:",
      servicesTitle: "Наши услуги",
      servicesSub: "Что мы делаем лучше всего",
      landingTitle: "Лендинги",
      landingDesc:
         "Одностраничные сайты для продаж с высокой конверсией. Идеально для запуска товаров и услуг.",
      bizTitle: "Сайты-визитки",
      bizDesc:
         "Представьте свой бизнес или себя стильно. Адаптивно, современно, запоминающиеся.",
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
      p1Tag: "Интернет-магазин",
      p1Title: "Milfey",
      p1Desc: "Магазин вафельных десертов с каталогом, корзиной и онлайн-консультантом",
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
      heroBadge: "Робимо сайти під ключ",
      heroTitle1: "AI-адміністратор,",
      heroTitle2: "який збільшить ваші продажі",
      heroDesc: "Відповідає клієнтам 24/7, записує їх і сповіщає вас.",
      orderBtn: "Підключити AI",
      servicesBtn: "Замовити сайт",
      aiTitle: "AI-адміністратор",
      aiDesc:
         "Приймає записи та замовлення 24/7, відповідає клієнтам замість вас і допомагає збільшити продажі.",
      aiPrefill: "Хочу підключити AI-адміністратора",
      priceFrom: "від",
      perMonth: "/міс",
      robotPhrases: ["Привіт!", "Запишу 24/7", "Відповім за вас", "Ніколи не сплю", "Чим допомогти?"],
      robotFly: "Полетіли!",
      robotBack: "Я на місці!",
      robotCta: "Напишіть нам!",
      aboutTitle: "Про нас",
      aboutText:
         " — команда, яка робить лендинги, інтернет-магазини та сайти, що вирішують задачі бізнесу. Пишемо чистий код, який залишається повністю вашим — без щомісячної абонплати та прив'язки до чужих платформ. Працюємо під ключ, від ідеї до запуску. На зв'язку менеджер — Алекс, ти можеш написати мені:",
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
      p1Tag: "Інтернет-магазин",
      p1Title: "Milfey",
      p1Desc: "Магазин вафельних десертів з каталогом, кошиком та онлайн-консультантом",
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
      heroBadge: "Turnkey websites",
      heroTitle1: "AI administrator",
      heroTitle2: "that boosts your sales",
      heroDesc: "Answers customers 24/7, books them in and notifies you.",
      orderBtn: "Get AI",
      servicesBtn: "Order website",
      aiTitle: "AI Administrator",
      aiDesc:
         "Takes bookings and orders 24/7, answers customers for you and helps boost sales.",
      aiPrefill: "I want to connect the AI administrator",
      priceFrom: "from",
      perMonth: "/mo",
      robotPhrases: ["Hi there!", "Booking 24/7", "Replies for you", "Never sleeps", "How can I help?"],
      robotFly: "Let's fly!",
      robotBack: "I'm back!",
      robotCta: "Message us!",
      aboutTitle: "About Us",
      aboutText:
         " — a team that builds landing pages, online stores, and websites that solve business problems. We write clean code that stays fully yours — no monthly fees, no lock-in to third-party platforms. Turnkey work, from idea to launch. Manager on duty — Alex, feel free to reach out:",
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
      p1Tag: "Online Store",
      p1Title: "Milfey",
      p1Desc: "Waffle dessert shop with catalog, cart and online assistant",
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
   window.siteLang = lang;

   const heroBadge = document.querySelector(".hero-badge-text");
   if (heroBadge) heroBadge.textContent = t.heroBadge;

   const heroTitleSpans = document.querySelectorAll(".hero-title span");
   if (heroTitleSpans[0]) heroTitleSpans[0].textContent = t.heroTitle1;
   const accentText = document.querySelector(".hero-title .accent-text");
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
   const sData = [
      [t.aiTitle, t.aiDesc],
      [t.landingTitle, t.landingDesc],
      [t.bizTitle, t.bizDesc],
      [t.shopTitle, t.shopDesc],
      [t.tildaTitle, t.tildaDesc],
      [t.supportTitle, t.supportDesc],
   ];
   serviceCards.forEach((card, i) => {
      if (!sData[i]) return;
      const h3 = card.querySelector("h3");
      const desc = card.querySelector("p:not(.service-price)");
      if (h3) h3.textContent = sData[i][0];
      if (desc) desc.textContent = sData[i][1];
      const price = card.querySelector(".service-price[data-price]");
      if (price)
         price.textContent = `${t.priceFrom} $${price.dataset.price}${price.dataset.monthly ? t.perMonth : ""}`;
   });

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

// Автоопределение языка по настройкам телефона/браузера
function detectLang() {
   const saved = localStorage.getItem("lang");
   if (saved) return saved; // если юзер уже выбирал сам — не трогаем

   const browserLang = navigator.language || navigator.userLanguage || "";
   if (browserLang.startsWith("uk")) return "uk";
   if (browserLang.startsWith("ru")) return "ru";
   return "en";
}

function applyLang(lang) {
   document
      .querySelectorAll(".lang-btn")
      .forEach((b) => b.classList.remove("active"));
   document
      .querySelectorAll(`.lang-btn[data-lang="${lang}"]`)
      .forEach((b) => b.classList.add("active"));
   document
      .querySelectorAll(".nav-lang-option")
      .forEach((b) => b.classList.remove("active"));
   const activeOpt = document.querySelector(
      `.nav-lang-option[data-lang="${lang}"]`,
   );
   if (activeOpt) activeOpt.classList.add("active");
   if (navLangCurrent) navLangCurrent.textContent = langLabels[lang];
   updateLanguage(lang);
   localStorage.setItem("lang", lang);
}

applyLang(detectLang());

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
      localStorage.setItem("lang", lang);
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
      localStorage.setItem("lang", lang);
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
   const namePattern = /^[a-zA-Zа-яА-ЯёЁіІїЇєЄ\s'-]+$/;
   if (!userName.value.trim()) {
      nameError.textContent = "Введите ваше имя";
      userName.classList.add("error");
      isValid = false;
   } else if (userName.value.trim().length < 2) {
      nameError.textContent = "Имя должно содержать минимум 2 символа";
      userName.classList.add("error");
      isValid = false;
   } else if (!namePattern.test(userName.value.trim())) {
      nameError.textContent = "Имя может содержать только буквы";
      userName.classList.add("error");
      isValid = false;
   } else {
      nameError.textContent = "";
      userName.classList.remove("error");
   }

   // Валидация контакта (не пустое)
   const contactError = document.getElementById("contactError");
   const contactValue = userContact.value.trim();
   const contactPattern = /^[a-zA-Zа-яА-Я0-9+@_.\s-]+$/;
   if (!contactValue) {
      contactError.textContent = "Введите ваш Telegram, WhatsApp или Viber";
      userContact.classList.add("error");
      isValid = false;
   } else if (contactValue.length < 5) {
      contactError.textContent = "Слишком короткий контакт";
      userContact.classList.add("error");
      isValid = false;
   } else if (!contactPattern.test(contactValue)) {
      contactError.textContent = "Недопустимые символы в контакте";
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

            // Google Ads: конверсия
            gtag("event", "conversion", {
               send_to: "AW-18307863906/4qMACLyJ5MwcEOKq75lE",
               value: 1.0,
               currency: "USD",
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


// ========== РОБОТ НА ПЕРВОМ ЭКРАНЕ ==========
(function () {
   const hero = document.querySelector(".hero");
   const flyer = document.getElementById("robotFlyer");
   if (!hero || !flyer) return;
   const head = document.getElementById("robotHead");
   const eyes = document.getElementById("robotEyes");
   const sparks = document.getElementById("robotSparks");
   const bubble = document.getElementById("robotBubble");
   const bubbleText = document.getElementById("robotBubbleText");
   const mouth = document.getElementById("robotMouth");
   const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
   const canHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
   let phraseIndex = 0;
   let flying = false;

   const tr = () => translations[window.siteLang] || translations.ru;

   function say(text) {
      bubble.style.opacity = 0;
      setTimeout(() => {
         bubbleText.textContent = text;
         bubble.style.opacity = 1;
         mouth.classList.add("talking");
         setTimeout(() => mouth.classList.remove("talking"), 900);
      }, 300);
   }

   say(tr().robotPhrases[0]);
   setInterval(() => {
      if (flying || document.hidden) return;
      const phrases = tr().robotPhrases;
      phraseIndex = (phraseIndex + 1) % phrases.length;
      say(phrases[phraseIndex]);
   }, 2600);

   function resetLook() {
      head.style.transform = "";
      eyes.style.transform = "";
      sparks.style.transform = "";
   }

   // Следит за курсором (только компьютер)
   if (canHover && !reduceMotion) {
      hero.addEventListener("mousemove", (e) => {
         if (flying) return;
         const r = hero.getBoundingClientRect();
         const x = (e.clientX - r.left) / r.width - 0.5;
         const y = (e.clientY - r.top) / r.height - 0.5;
         // вверх — сильнее, вниз — чуть-чуть, чтобы голова не уходила в корпус
         const headY = y < 0 ? y * 40 : y * 8;
         const eyesY = y < 0 ? y * 22 : y * 8;
         head.style.transform = `translate(${(x * 40).toFixed(1)}px, ${headY.toFixed(1)}px) rotate(${(x * 40).toFixed(1)}deg)`;
         eyes.style.transform = `translate(${(x * 28).toFixed(1)}px, ${eyesY.toFixed(1)}px)`;
         sparks.style.transform = `translate(${(-x * 20).toFixed(1)}px, ${(-y * 12).toFixed(1)}px)`;
      });
      hero.addEventListener("mouseleave", resetLook);
   }

   // По клику облетает экран (за текстом) и возвращается
   const colors = ["#ff1493", "#ffa500", "#ffd700", "#5ff5e0"];
   flyer.addEventListener("click", () => {
      if (flying || reduceMotion || !flyer.animate) return;
      flying = true;
      hero.classList.add("robot-flying");
      resetLook();
      say(tr().robotFly);

      const H = hero.getBoundingClientRect();
      const F = flyer.getBoundingClientRect();
      const ox = F.left - H.left;
      const oy = F.top - H.top;
      const pts = [
         [0, 0],
         [-ox * 0.4, -oy + 20],
         [-ox * 0.95, -oy * 0.2],
         [-ox * 0.6, H.height - oy - F.height * 0.8],
         [-ox * 0.1, -oy * 0.5],
         [40, -30],
         [0, 0],
      ];
      // два полных оборота в середине полёта
      const rot = [0, -18, 335, 735, 740, 728, 720];
      const sc = [1, 0.6, 0.55, 0.55, 0.6, 0.8, 1];
      const anim = flyer.animate(
         pts.map((p, k) => ({
            transform: `translate(${p[0]}px, ${p[1]}px) rotate(${rot[k]}deg) scale(${sc[k]})`,
         })),
         { duration: 6000, easing: "cubic-bezier(.45,0,.55,1)" },
      );

      const trail = setInterval(() => {
         const r = flyer.getBoundingClientRect();
         const H2 = hero.getBoundingClientRect();
         const dot = document.createElement("div");
         dot.className = "robot-trail";
         dot.style.background = colors[Math.floor(Math.random() * colors.length)];
         dot.style.left = r.left - H2.left + r.width / 2 + "px";
         dot.style.top = r.top - H2.top + r.height * 0.85 + "px";
         hero.appendChild(dot);
         requestAnimationFrame(() => {
            dot.style.opacity = 0;
            dot.style.transform = "scale(.2) translateY(20px)";
         });
         setTimeout(() => dot.remove(), 650);
      }, 45);

      anim.onfinish = () => {
         clearInterval(trail);
         flying = false;
         hero.classList.remove("robot-flying");
         say(tr().robotBack);
      };
   });
})();

// ========== КНОПКА «ПОДКЛЮЧИТЬ AI» ==========
// Открывает чат ассистента; если виджет не загрузился — форма с готовым текстом
(function () {
   const btn = document.getElementById("heroAiBtn");
   if (!btn) return;
   btn.addEventListener("click", (e) => {
      if (window.AzaCodeWidget && typeof window.AzaCodeWidget.open === "function") {
         e.preventDefault();
         window.AzaCodeWidget.open();
         return;
      }
      const msg = document.getElementById("userMessage");
      if (msg && !msg.value.trim()) msg.value = tr_ai();
   });
   function tr_ai() {
      const t = translations[window.siteLang] || translations.ru;
      return t.aiPrefill;
   }
})();

// ========== РОБОТ НА ТЕЛЕФОНЕ: СОБИРАЕТСЯ ПРИ ПРОКРУТКЕ ==========
(function () {
   const robot = document.getElementById("mRobot");
   if (!robot) return;
   const mq = window.matchMedia("(max-width: 900px)");
   const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
   const bubble = document.getElementById("mRobotBubble");
   const parts = [...robot.querySelectorAll(".m-part")];
   // откуда прилетает каждая часть (доли ширины/высоты экрана), поворот и задержка
   const from = {
      head: { x: 0.78, y: -0.62, r: -35, d: 0 },
      armR: { x: -0.05, y: -0.72, r: 80, d: 0.06 },
      body: { x: -0.12, y: -0.38, r: 25, d: 0.14 },
      armL: { x: 0.82, y: -0.2, r: -90, d: 0.22 },
      flame: { x: 0.45, y: 0.25, r: 140, d: 0.3 },
   };
   const ease = (t) => 1 - Math.pow(1 - t, 3);
   let ticking = false;

   function update() {
      ticking = false;
      if (!mq.matches) return;
      const t = translations[window.siteLang] || translations.ru;
      bubble.textContent = t.robotCta;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const p = max > 0 ? Math.min(1, window.scrollY / max) : 1;
      const W = window.innerWidth;
      const H = window.innerHeight;
      let sum = 0;
      parts.forEach((el) => {
         const f = from[el.dataset.k];
         const k = reduceMotion ? 1 : ease(Math.max(0, Math.min(1, (p - f.d) / (0.97 - f.d))));
         sum += k;
         const x = f.x * W * (1 - k);
         const y = f.y * H * (1 - k);
         const r = f.r * (1 - k);
         const sc = 0.7 + 0.3 * k;
         el.style.transform = `translate(${x.toFixed(1)}px, ${y.toFixed(1)}px) rotate(${r.toFixed(1)}deg) scale(${sc.toFixed(2)})`;
         el.style.opacity = (0.35 + 0.65 * k).toFixed(2);
      });
      robot.classList.toggle("done", sum / parts.length > 0.995);
   }

   function onScroll() {
      if (!ticking) {
         ticking = true;
         requestAnimationFrame(update);
      }
   }

   window.addEventListener("scroll", onScroll, { passive: true });
   window.addEventListener("resize", onScroll);
   update();

   // Собранный робот: открывает чат, а если виджета нет — ведёт к форме
   robot.addEventListener("click", () => {
      if (!robot.classList.contains("done")) return;
      if (window.AzaCodeWidget && typeof window.AzaCodeWidget.open === "function") {
         window.AzaCodeWidget.open();
         return;
      }
      const form = document.getElementById("contactForm");
      if (form) form.scrollIntoView({ behavior: "smooth" });
   });
})();
