const TelegramBot = require("node-telegram-bot-api");
const express = require("express");
const cors = require("cors");
const { commands, url, startOptions, coursesOptions, coursesMsg, startMsg } = require("./constants");
const { getTitles } = require("./helpers");
require("dotenv").config();

const token = process.env.BOT_TOKEN;
const bot = new TelegramBot(token, { polling: true });
const app = express();

app.use(express.json());
app.use(cors());

const botStart = () => {
  bot.setMyCommands(commands);

  bot.on("message", async msg => {
    const chatId = msg.chat.id;
    const text = msg.text || "";
    const webData = msg.web_app_data?.data;

    if (text === "/start") return bot.sendMessage(chatId, startMsg, startOptions);
    else if (text === "/courses") return bot.sendMessage(chatId, coursesMsg, coursesOptions);
    else if (webData) {
      try {
        const data = JSON.parse(webData);
        const images = data.map(({ image }) => ({ type: "photo", media: `${url}${image}`, parse_mode: "HTML" }));
        images[0].caption = getTitles(data);

        await bot.sendMediaGroup(chatId, images);
        return;
      } catch (err) {
        console.log(err);
      }
    } else if ((!text.includes("/") && !msg.via_bot) || (!commands.map(c => c.command).includes(text) && !msg.via_bot))
      return bot.sendMessage(chatId, "Noma'lum buyruqdan foydalandingiz!, /start");
  });
};

botStart();

app.post("/web-bot", async (req, res) => {
  const { courses, queryId } = req.body;

  try {
    await bot.answerWebAppQuery(queryId, {
      type: "article",
      id: queryId,
      title: "Muvaffaqiyatli xarid qildingiz",
      input_message_content: { message_text: getTitles(courses), parse_mode: "HTML" },
    });
    return res.status(200).json({});
  } catch (err) {
    return res.status(500).json({});
  }
});

app.listen(process.env.PORT || 8000, () => console.log("Server 8000-portda ishga tushdi"));
