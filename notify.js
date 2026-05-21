// ============================================================
//  notify.js — универсальный модуль уведомлений в Telegram
//  Меняй только эти 2 строки для каждого нового проекта:
// ============================================================

const TELEGRAM_BOT_TOKEN = "8939878557:AAH5L8F5kG-Ifk1y3_BPxEMhI9qHWqtbKCM"; // <-- твой токен от @BotFather
const TELEGRAM_CHAT_ID = "280746926"; // <-- твой chat_id (см. инструкцию ниже)

// ============================================================
//  КАК ПОЛУЧИТЬ ТОКЕН И CHAT_ID (один раз на все проекты):
//
//  1. Открой Telegram → найди @BotFather
//  2. Напиши /newbot → придумай имя → получишь токен вида:
//     7123456789:AAFxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
//
//  3. Чтобы узнать свой chat_id:
//     → Напиши любое сообщение своему боту
//     → Открой в браузере:
//       https://api.telegram.org/bot<ТОКЕН>/getUpdates
//     → Найди "chat":{"id": 123456789}  ← это и есть твой chat_id
//
//  4. Бот будет слать уведомления ТЕБЕ в личку.
//     Хочешь в группу/канал — добавь бота туда и используй id группы.
// ============================================================

/**
 * Отправляет уведомление в Telegram.
 * @param {Object} fields — объект с полями заявки, например:
 *   { "Имя": "Иван", "Контакт": "@ivan", "Сообщение": "Нужен лендинг" }
 * @param {string} projectName — название проекта (отображается в шапке сообщения)
 * @returns {Promise<boolean>} — true если успешно, false если ошибка
 */

async function sendTelegramNotification(fields, projectName = "Сайт") {
   const lines = Object.entries(fields)
      .map(([key, val]) => `<b>${key}:</b> ${escapeHtml(val)}`)
      .join("\n");

   const text =
      `🔔 <b>Новая заявка — ${escapeHtml(projectName)}</b>\n` +
      `━━━━━━━━━━━━━━━━\n` +
      lines +
      `\n━━━━━━━━━━━━━━━━\n` +
      `🕐 ${new Date().toLocaleString("ru-RU", { timeZone: "Europe/Moscow" })}`;

   try {
      const res = await fetch(
         `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`,
         {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
               chat_id: TELEGRAM_CHAT_ID,
               text,
               parse_mode: "HTML",
            }),
         },
      );

      const data = await res.json();

      if (!data.ok) {
         console.error("Telegram API error:", data.description);
         return false;
      }

      return true;
   } catch (err) {
      console.error("Ошибка отправки в Telegram:", err);
      return false;
   }
}

// Экранируем HTML-спецсимволы чтобы Telegram не сломал разметку
function escapeHtml(str) {
   return String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
}
// мой
