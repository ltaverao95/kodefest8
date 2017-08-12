"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var initBot_1 = require("../../initBot");
var Data = require("../../data");
var core_1 = require("../../core");
var Saldo;
(function (Saldo) {
    var Options;
    (function (Options) {
        Options["Volver"] = "<< Volver";
    })(Options || (Options = {}));
    var Metodos;
    (function (Metodos) {
        Metodos.sendMessage = function (msg) {
            Data.Chats.actualizarChat(msg, core_1.Contextos.Consultas.Saldos.saldos, "").then(function () {
                var messageOptions = {
                    reply_markup: {
                        inline_keyboard: [
                            [
                                {
                                    text: Options.Volver,
                                    callback_data: core_1.Contextos.Consultas.Index.index
                                }
                            ]
                        ]
                    }
                };
                initBot_1.bot.sendMessage(msg.chat.id, "Elige una operaci\u00F3n", messageOptions);
            });
        };
        Metodos.onSaldo = function (msg) {
            Metodos.sendMessage(msg.message);
        };
    })(Metodos = Saldo.Metodos || (Saldo.Metodos = {}));
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
                if (msg.data.indexOf(core_1.Contextos.Consultas.Saldos.saldos) === 0) {
                    Metodos.onSaldo(msg);
                }
            });
        };
    })(eventHandlers = Saldo.eventHandlers || (Saldo.eventHandlers = {}));
})(Saldo = exports.Saldo || (exports.Saldo = {}));
Saldo.eventHandlers.listen();
/*
export namespace Saldo {

    export enum Options {
        Volver = "<< Volver"
    }

    const inlineOptions = {
        inlineQueries: {
            GetPictures: 'CM_GETQUERIES'
        }
    };

    export namespace Metodos {

        export const sendMessage = (msg: Message) => {

            console.log(JSON.stringify(msg));

            Data.Chats.actualizarChat(msg, Contextos.Consultas.Saldos.saldos, "").then(() => {

                console.log("Chat Actualizado saldos");

                Data.Productos.getProductosByCliente(msg).then((value) => {

                    console.log(JSON.stringify(value));
                });
            });
        }
    }

    export namespace eventHandlers {

        export const listen = () => {

            bot.on('callback_query', (msg: ApiMessage) => {

                console.log("callback_query saldos");
                console.log(JSON.stringify(msg));
                
                if (!msg.data) {
                    return;
                }

                if (msg.data.indexOf(Contextos.Consultas.Saldos.saldos) === 0) {
                    Metodos.sendMessage(msg.message);
                }
            });
        }
    }
}

Saldo.eventHandlers.listen();

*/ 
