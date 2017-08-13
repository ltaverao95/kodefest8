"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var initBotTokenDev_1 = require("./initBotTokenDev");
var initBotTokenDist_1 = require("./initBotTokenDist");
var TelegramBot = require('node-telegram-bot-api');
// replace the value below with the Telegram token you receive from @BotFather
var token = '';
var bot = null;
exports.bot = bot;
if (process.env.NODE_ENV.trim() == 'development') {
    console.log('dev stage');
    token = initBotTokenDev_1.token;
    // Create a bot that uses 'polling' to fetch new updates
    var prodOptions = {
        webHook: {
            port: process.env.PORT || 5000
        }
    };
    var devOptions = {
        polling: true
    };
    exports.bot = bot = new TelegramBot(token, devOptions);
}
else {
    console.log('prod stage');
    token = initBotTokenDist_1.token;
    // Create a bot that uses 'polling' to fetch new updates
    var prodOptions = {
        webHook: {
            port: process.env.PORT || 5000
        }
    };
    exports.bot = bot = new TelegramBot(token, prodOptions);
    var url = 'https://kodefest8.herokuapp.com/dist/index.js';
    bot.setWebHook(url + "/bot" + token);
}
