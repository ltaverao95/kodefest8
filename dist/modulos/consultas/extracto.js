"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var initBot_1 = require("../../initBot");
var Data = require("../../data");
var core_1 = require("../../core");
var Extracto;
(function (Extracto) {
    var Options;
    (function (Options) {
        Options["Ene"] = "Ene";
        Options["Feb"] = "Feb";
        Options["Mar"] = "Mar";
        Options["Abr"] = "Abr";
        Options["May"] = "May";
        Options["Jun"] = "Jun";
        Options["Jul"] = "Jul";
        Options["Ago"] = "Ago";
        Options["Sep"] = "Sep";
        Options["Oct"] = "Oct";
        Options["Nov"] = "Nov";
        Options["Dic"] = "Dic";
        Options["Volver"] = "<< Volver";
    })(Options || (Options = {}));
    var Metodos;
    (function (Metodos) {
        Metodos.sendMessage = function (msg, update) {
            Data.Chats.actualizarChat(msg, core_1.Contextos.Consultas.Extracto.seleccionMes, "").then(function () {
                var messageOptions = {
                    reply_markup: {
                        inline_keyboard: [
                            [
                                { text: Options.Ene, callback_data: core_1.Comandos.Consultas.Extracto.ene },
                                { text: Options.Feb, callback_data: core_1.Comandos.Consultas.Extracto.feb },
                                { text: Options.Mar, callback_data: Options.Mar }
                            ],
                            [
                                { text: Options.Abr, callback_data: core_1.Comandos.Consultas.Extracto.abr },
                                { text: Options.May, callback_data: core_1.Comandos.Consultas.Extracto.may },
                                { text: Options.Jun, callback_data: core_1.Comandos.Consultas.Extracto.jun }
                            ],
                            [
                                { text: Options.Jul, callback_data: core_1.Comandos.Consultas.Extracto.jul },
                                { text: Options.Ago, callback_data: core_1.Comandos.Consultas.Extracto.ago },
                                { text: Options.Sep, callback_data: core_1.Comandos.Consultas.Extracto.sep }
                            ],
                            [
                                { text: Options.Oct, callback_data: core_1.Comandos.Consultas.Extracto.oct },
                                { text: Options.Nov, callback_data: core_1.Comandos.Consultas.Extracto.nov },
                                { text: Options.Dic, callback_data: core_1.Comandos.Consultas.Extracto.dic }
                            ],
                            [
                                { text: Options.Volver, callback_data: core_1.Contextos.Consultas.Index.index }
                            ]
                        ]
                    }
                };
                if (!update) {
                    initBot_1.bot.sendMessage(msg.chat.id, "Elige una operaci\u00F3n", messageOptions);
                    return;
                }
                initBot_1.bot.editMessageText("Elige un mes para consultar", {
                    message_id: msg.message_id,
                    chat_id: msg.chat.id,
                    reply_markup: messageOptions.reply_markup
                });
            });
        };
        Metodos.onOperacionProducto = function (msg) {
            Metodos.sendMessage(msg.message, true);
        };
    })(Metodos = Extracto.Metodos || (Extracto.Metodos = {}));
    var eventHandlers;
    (function (eventHandlers) {
        eventHandlers.listen = function () {
            initBot_1.bot.on('message', function (msg) {
                if (!msg.text) {
                    return;
                }
            });
            initBot_1.bot.on('callback_query', function (msg) {
                if (!msg.data) {
                    return;
                }
                if (msg.data.indexOf(core_1.Contextos.Consultas.Extracto.operacionProducto) === 0) {
                    Metodos.onOperacionProducto(msg);
                }
            });
        };
    })(eventHandlers = Extracto.eventHandlers || (Extracto.eventHandlers = {}));
})(Extracto = exports.Extracto || (exports.Extracto = {}));
Extracto.eventHandlers.listen();
