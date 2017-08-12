"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var TelegramBot = require('node-telegram-bot-api');
// replace the value below with the Telegram token you receive from @BotFather
var token = '436331165:AAGcARHfHuuSSaJ_e1iAOx2q_0lrxpWoYYM';
// Create a bot that uses 'polling' to fetch new updates
var prodOptions = {
    webHook: {
        port: process.env.PORT || 5000
    }
};
var devOptions = {
    polling: true
};
exports.bot = new TelegramBot(token, devOptions);
var url = 'https://kodefest8.herokuapp.com/dist/index.js';
//bot.setWebHook(`${url}/bot${token}`); 
