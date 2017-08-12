"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var initBot_1 = require("../initBot");
var index;
(function (index) {
    var messages;
    (function (messages) {
        var messageOptions = {
            parse_mode: 'HTML'
        };
        messages.sendMessage = function (msg) {
            initBot_1.bot.sendMessage(msg.chat.id, "Hola <b>" + msg.from.first_name + "</b>, bienvenido al banco KodeFest8", messageOptions);
        };
    })(messages = index.messages || (index.messages = {}));
    var eventHandlers;
    (function (eventHandlers) {
        eventHandlers.listen = function () {
            initBot_1.bot.onText(/^\/start$/, function (msg, match) {
                messages.sendMessage(msg);
            });
        };
    })(eventHandlers = index.eventHandlers || (index.eventHandlers = {}));
})(index = exports.index || (exports.index = {}));
index.eventHandlers.listen();
