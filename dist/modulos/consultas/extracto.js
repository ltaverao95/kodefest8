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
    var nombresMeses = (_a = {},
        _a[core_1.Comandos.Consultas.Extracto.ene] = 'Enero',
        _a[core_1.Comandos.Consultas.Extracto.feb] = 'Febrero',
        _a);
    var Metodos;
    (function (Metodos) {
        Metodos.sendMessageSeleccionarMes = function (msg, update) {
            Data.Chats.actualizarChat(msg.chat.id, core_1.Contextos.Consultas.Extracto.seleccionMes, "").then(function () {
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
                initBot_1.bot.editMessageText("\uD83D\uDCC5 Elige un mes para consultar", {
                    message_id: msg.message_id,
                    chat_id: msg.chat.id,
                    reply_markup: messageOptions.reply_markup
                });
            });
        };
        Metodos.sendMessageReporteXMes = function (msg, mes) {
            Data.Chats.actualizarChat(msg.chat.id, core_1.Contextos.Consultas.Extracto.reporte, "").then(function () {
                var messageOptions = {
                    parse_mode: 'HTML',
                    message_id: msg.message_id,
                    chat_id: msg.chat.id,
                    reply_markup: {
                        inline_keyboard: [
                            [
                                { text: Options.Volver, callback_data: core_1.Contextos.Consultas.Extracto.operacionProducto }
                            ]
                        ]
                    }
                };
                var fechaHoy = new Date().toJSON().slice(0, 10).replace(/-/g, '/');
                var textoMensaje = "<b>Banco. KodeFest8</b>, " + fechaHoy + "\n<b>Cliente:</b>, " + fechaHoy + "\nHas elegido: " + nombresMeses[mes];
                initBot_1.bot.editMessageText(textoMensaje, messageOptions);
            });
        };
        Metodos.onOperacionProducto = function (msg) {
            Metodos.sendMessageSeleccionarMes(msg.message, true);
        };
        Metodos.onSelectMes = function (msg, mes) {
            Metodos.sendMessageReporteXMes(msg.message, mes);
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
                Data.Chats.getChat(msg.message).then(function (chat) {
                    if (chat.contexto != core_1.Contextos.Consultas.Extracto.seleccionMes) {
                        return;
                    }
                    if (msg.data.indexOf(core_1.Comandos.Consultas.Extracto.ene) === 0) {
                        Metodos.onSelectMes(msg, core_1.Comandos.Consultas.Extracto.ene);
                    }
                });
            });
        };
    })(eventHandlers = Extracto.eventHandlers || (Extracto.eventHandlers = {}));
    var _a;
})(Extracto = exports.Extracto || (exports.Extracto = {}));
Extracto.eventHandlers.listen();
