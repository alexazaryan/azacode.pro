// ============================================================
//  notify.js — отправка заявок с формы сайта
//  Заявка уходит на сервер AzaCode (widget.azacode.pro), а оттуда — в Telegram-бот.
//  Токен бота хранится только на сервере (Vercel), в коде сайта его нет.
// ============================================================

const NOTIFY_URL = "https://widget.azacode.pro/api/chat";
const NOTIFY_CLINIC = "azacode";

/**
 * Отправляет заявку в Telegram через сервер AzaCode.
 * @param {Object} fields — поля заявки, например:
 *   { "Имя": "Иван", "Контакт": "@ivan", "Сообщение": "Нужен лендинг" }
 * @param {string} projectName — название проекта (в шапке сообщения)
 * @returns {Promise<boolean>} — true если успешно, false если ошибка
 */
async function sendTelegramNotification(fields, projectName = "Сайт") {
   try {
      const res = await fetch(NOTIFY_URL, {
         method: "POST",
         headers: { "Content-Type": "application/json" },
         body: JSON.stringify({ clinic: NOTIFY_CLINIC, form: fields, project: projectName }),
      });

      const data = await res.json().catch(() => ({}));

      if (!data.ok) {
         console.error("Ошибка отправки заявки:", data.error || res.status);
         return false;
      }

      return true;
   } catch (err) {
      console.error("Ошибка отправки заявки:", err);
      return false;
   }
}
