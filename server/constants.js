const url = "https://sbk-telegram-web-bot.netlify.app";

const startMsg = `Assalomu aleykum <a href="${url}">SBK WEB BOT</a> platformasining kurslarini sotib olish uchun maxsus bot`;

const coursesMsg = `Assalomu aleykum <a href="${url}">SBK WEB BOT</a> platformasining kurslarini sotib olish uchun maxsus botdan foydalanganingiz uchun rahmat\n\n kurslarimizni sotib olish uchun bosing!`;

const commands = [
  { command: "/start", description: "Botni ishga tushirish" },
  { command: "/courses", description: "Kurslarni ko'rish" },
];

const startOptions = {
  reply_markup: {
    resize_keyboard: true,
    one_time_keyboard: true,
    keyboard: [[{ text: "Kurslarni xarid qilish", web_app: { url } }]],
  },
  parse_mode: "HTML",
};

const coursesOptions = {
  reply_markup: {
    inline_keyboard: [[{ text: "Kurslarni ko'rish", web_app: { url } }]],
  },
  parse_mode: "HTML",
};

module.exports = { commands, startMsg, coursesMsg, startOptions, coursesOptions, url };
