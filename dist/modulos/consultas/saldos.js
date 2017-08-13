"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var initBot_1 = require("../../initBot");
var Data = require("../../data");
var core_1 = require("../../core");
var Saldo;
(function (Saldo) {
    var eventHandlers;
    (function (eventHandlers) {
        eventHandlers.listen = function () {
            initBot_1.bot.on('inline_query', function (msg) {
                if (!msg.query) {
                    return;
                }
                if (msg.query.indexOf(core_1.Contextos.Consultas.Saldos.saldos) === 0) {
                    Data.Productos.getProductosByCliente(msg.from.id).then(function (products) {
                        initBot_1.bot.answerInlineQuery(msg.id, products, {
                            cache_time: '0'
                        });
                    });
                }
            });
            initBot_1.bot.on('chosen_inline_result', function (msg) {
                if (msg.result_id == -1) {
                    return;
                }
            });
        };
    })(eventHandlers = Saldo.eventHandlers || (Saldo.eventHandlers = {}));
})(Saldo = exports.Saldo || (exports.Saldo = {}));
Saldo.eventHandlers.listen();
