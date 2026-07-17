// ========== ПЕРЕВОДЫ ФОРМЫ ==========
const formTranslations = {
   ru: {
      heroBadge: "🛡 Без предоплаты — платите после сдачи сайта",
      h1Part1: "Нужен сайт,",
      h1Part2: "который продаёт?",
      subText:
         "Заполните форму — мы напишем вам в выбранный мессенджер в течение 15 минут",
      price1: "💻 Сайт-визитка от $150",
      price2: "🛒 Магазин от $350",
      namePlace: "Ваше имя",
      contactMethodLabel: "Выберите способ связи",
      contactPlace: "+380 XX XXX XX XX",
      messagePlace: "Кратко опишите задачу: какой сайт нужен, сроки, бюджет",
      submit: "📩 Отправить заявку →",
      siteLinkText: "Наш сайт",
      trust1: "Без предоплаты",
      trust2: "Код — ваш",
   },
   uk: {
      heroBadge: "🛡 Без передоплати — платите після здачі сайту",
      h1Part1: "Потрібен сайт,",
      h1Part2: "який продає?",
      subText:
         "Заповніть форму — ми напишемо вам у обраний месенджер протягом 15 хвилин",
      price1: "💻 Сайт-візитка від $150",
      price2: "🛒 Магазин від $350",
      namePlace: "Ваше ім'я",
      contactMethodLabel: "Оберіть спосіб зв'язку",
      contactPlace: "+380 XX XXX XX XX",
      messagePlace:
         "Коротко опишіть задачу: який сайт потрібен, терміни, бюджет",
      submit: "📩 Відправити заявку →",
      siteLinkText: "Наш сайт",
      trust1: "Без передоплати",
      trust2: "Код — ваш",
   },
};

function applyFormLang(lang) {
   const t = formTranslations[lang];
   if (!t) return;

   const heroBadge = document.getElementById("heroBadge");
   if (heroBadge) heroBadge.textContent = t.heroBadge;

   const h1Part1 = document.getElementById("h1Part1");
   if (h1Part1) h1Part1.textContent = t.h1Part1;

   const h1Part2 = document.getElementById("h1Part2");
   if (h1Part2) h1Part2.textContent = t.h1Part2;

   const subText = document.getElementById("subText");
   if (subText) subText.textContent = t.subText;

   const price1 = document.getElementById("price1");
   if (price1) price1.textContent = t.price1;

   const price2 = document.getElementById("price2");
   if (price2) price2.textContent = t.price2;

   const nameInput = document.getElementById("userName");
   if (nameInput) nameInput.placeholder = t.namePlace;

   const contactMethodLabel = document.getElementById("contactMethodLabel");
   if (contactMethodLabel)
      contactMethodLabel.textContent = t.contactMethodLabel;

   const contactInput = document.getElementById("userContact");
   if (contactInput) contactInput.placeholder = t.contactPlace;

   const messageTextarea = document.getElementById("userMessage");
   if (messageTextarea) messageTextarea.placeholder = t.messagePlace;

   const submitButton = document.getElementById("submitBtn");
   if (submitButton && !submitButton.classList.contains("success")) {
      submitButton.innerHTML = t.submit;
   }

   const siteLinkText = document.getElementById("siteLinkText");
   if (siteLinkText) siteLinkText.textContent = t.siteLinkText;

   const trust1 = document.getElementById("trust1");
   if (trust1) trust1.textContent = t.trust1;

   const trust2 = document.getElementById("trust2");
   if (trust2) trust2.textContent = t.trust2;

   localStorage.setItem("lang", lang);
}

// Модалка выбора языка при первом заходе
const langSelectOverlay = document.getElementById("langSelectOverlay");

if (langSelectOverlay) {
   const savedLangChoice = localStorage.getItem("lang");

   if (savedLangChoice) {
      langSelectOverlay.classList.add("hidden");
      applyFormLang(savedLangChoice);
   }

   document.querySelectorAll(".lang-select-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
         const lang = btn.dataset.lang;
         applyFormLang(lang);
         langSelectOverlay.classList.add("hidden");
      });
   });
}

// ========== ВАЛИДАЦИЯ И ОТПРАВКА ФОРМЫ ==========
const form = document.getElementById("requestForm");
const submitBtn = document.getElementById("submitBtn");
const userName = document.getElementById("userName");
const userContact = document.getElementById("userContact");
const userMessage = document.getElementById("userMessage");
const charCounter = document.getElementById("charCounter");
const websiteHoneypot = document.getElementById("website");
const formLoadedAt = Date.now();

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

function validateForm() {
   let isValid = true;

   const methodError = document.getElementById("methodError");
   const methodChecked = document.querySelector(
      'input[name="contactMethod"]:checked',
   );
   methodError.textContent = methodChecked ? "" : "Выберите способ связи";
   if (!methodChecked) isValid = false;

   const nameError = document.getElementById("nameError");
   const namePattern = /^[a-zA-Zа-яА-ЯёЁіІїЇєЄ\s'-]+$/;
   if (!userName.value.trim()) {
      nameError.textContent = "Введите ваше имя";
      isValid = false;
   } else if (userName.value.trim().length < 2) {
      nameError.textContent = "Имя должно содержать минимум 2 символа";
      isValid = false;
   } else if (!namePattern.test(userName.value.trim())) {
      nameError.textContent = "Имя может содержать только буквы";
      isValid = false;
   } else {
      nameError.textContent = "";
   }

   const contactError = document.getElementById("contactError");
   const contactValue = userContact.value.trim();
   const contactPattern = /^[a-zA-Zа-яА-Я0-9+@_.\s-]+$/;
   if (!contactValue) {
      contactError.textContent = "Введите ваш Telegram, WhatsApp или Viber";
      isValid = false;
   } else if (contactValue.length < 5) {
      contactError.textContent = "Слишком короткий контакт";
      isValid = false;
   } else if (!contactPattern.test(contactValue)) {
      contactError.textContent = "Недопустимые символы в контакте";
      isValid = false;
   } else {
      contactError.textContent = "";
   }

   const messageError = document.getElementById("messageError");
   if (!userMessage.value.trim()) {
      messageError.textContent = "Опишите вашу задачу";
      isValid = false;
   } else {
      messageError.textContent = "";
   }

   return isValid;
}

function resetButton() {
   submitBtn.classList.remove("success");
   submitBtn.innerHTML = "📩 Отправить заявку →";
}

if (form) {
   form.addEventListener("submit", async (e) => {
      e.preventDefault();
      if (!validateForm()) return;

      if (websiteHoneypot && websiteHoneypot.value.trim() !== "") {
         return;
      }

      if (Date.now() - formLoadedAt < 3000) {
         return;
      }

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
         "A³ — Заявка с формы (Google Ads)",
      );

      submitBtn.disabled = false;

      if (ok) {
         if (typeof gtag === "function") {
            gtag("event", "form_submit", {
               contact_method: methodChecked.value,
               form_id: "requestForm",
            });
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

document.querySelectorAll('input[name="contactMethod"]').forEach((radio) => {
   radio.addEventListener("change", () => {
      const methodError = document.getElementById("methodError");
      if (methodError) methodError.textContent = "";
   });
});

[userName, userContact, userMessage].forEach((el) => {
   if (!el) return;
   el.addEventListener("input", () => {
      const errId = el.id.replace("user", "").toLowerCase() + "Error";
   });
});
