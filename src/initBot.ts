import {
  TelegramBot as TelegramBotModel
} from './bot/TelegramBot';

const TelegramBot = require('node-telegram-bot-api');

// replace the value below with the Telegram token you receive from @BotFather
const token = '436331165:AAGcARHfHuuSSaJ_e1iAOx2q_0lrxpWoYYM';

// Create a bot that uses 'polling' to fetch new updates
const prodOptions = {
  webHook: {
    port: process.env.PORT || 5000
  }
};

const devOptions = {
  polling: true
};

export const bot = new TelegramBot(token, prodOptions);

const url = 'https://kodefest8.herokuapp.com/dist/index.js';

bot.setWebHook(`${url}/bot${token}`);