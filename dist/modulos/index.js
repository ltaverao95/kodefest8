"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var initBot_1 = require("../initBot");
var Data = require("../data");
var core_1 = require("../core");
var utils_1 = require("../utils");
var pagina_inicial_1 = require("./pagina-inicial");
var index;
(function (index) {
    var Metodos;
    (function (Metodos) {
        Metodos.sendMessage = function (msg) {
            var messageOptions = {
                parse_mode: 'HTML'
            };
            initBot_1.bot.sendMessage(msg.chat.id, "Hola <b>" + msg.from.first_name + "</b>, bienvenido al banco KodeFest8, por favor ingresa tu identificaci\u00F3n", messageOptions);
        };
        Metodos.enviarMensajeIdentificacionInvalido = function (msg) {
            initBot_1.bot.sendMessage(msg.chat.id, "\u274C La identificaci\u00F3n que ingresaste no es v\u00E1lida, esta debe tener s\u00F3lo n\u00FAmeros.");
        };
        Metodos.solicitarClave = function (msg) {
            Data.Chats.actualizarChat(msg, core_1.Contextos.PaginaInicial.index, core_1.Comandos.PaginaInicial.Index.getClave).then(function () {
                pagina_inicial_1.index.Metodos.sendMessage(msg);
            });
        };
    })(Metodos = index.Metodos || (index.Metodos = {}));
    var eventHandlers;
    (function (eventHandlers) {
        eventHandlers.listen = function () {
            initBot_1.bot.onText(/^\/start$/, function (msg, match) {
                Data.Chats.actualizarChat(msg, core_1.Contextos.PaginaInicial.index, core_1.Comandos.PaginaInicial.Index.getUsuario).then(function () {
                    Metodos.sendMessage(msg);
                });
            });
            initBot_1.bot.on('message', function (msg) {
                if (!msg.text ||
                    msg.text === '/start') {
                    return;
                }
                Data.Chats.getChat(msg).then(function (chat) {
                    if (chat.contexto == core_1.Contextos.PaginaInicial.index
                        && chat.comando == core_1.Comandos.PaginaInicial.Index.getUsuario) {
                        if (utils_1.Validaciones.esNumeroRequeridoValido(msg.text)) {
                            Data.Clientes.actualizarDocumento(msg, parseInt(msg.text)).then(function () {
                                Metodos.solicitarClave(msg);
                            });
                        }
                        else {
                            Metodos.enviarMensajeIdentificacionInvalido(msg);
                        }
                    }
                });
            });
        };
    })(eventHandlers = index.eventHandlers || (index.eventHandlers = {}));
})(index = exports.index || (exports.index = {}));
index.eventHandlers.listen();
