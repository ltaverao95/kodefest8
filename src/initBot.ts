import {
  TelegramBot as TelegramBotModel
} from './bot/TelegramBot';

import {
  bot as botDist
} from './initBotDist';

let bot: any;

declare const process: any;
if (process.env.NODE_ENV.trim() != 'development') {
  console.log('production stage');
  bot = botDist;
} else {
  console.log('development stage');
  const TelegramBot = require('node-telegram-bot-api');

  // replace the value below with the Telegram token you receive from @BotFather
  const token = '447133612:AAG96SqODQfDB9sXv9YB9GLdWEg15BxekPQ';

  // Create a bot that uses 'polling' to fetch new updates
  const prodOptions = {
    webHook: {
      port: process.env.PORT || 5000
    }
  };

  const devOptions = {
    polling: true
  };

  bot = new TelegramBot(token, devOptions);

  const url = 'https://kodefest8.herokuapp.com/dist/index.js';

  //bot.setWebHook(`${url}/bot${token}`);
}

export { bot };