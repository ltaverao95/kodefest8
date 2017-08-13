"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var initBot_1 = require("../../initBot");
var Data = require("../../data");
var core_1 = require("../../core");
var menu_principal_1 = require("./menu-principal");
var index;
(function (index) {
    var Metodos;
    (function (Metodos) {
        Metodos.sendMessage = function (msg) {
            var messageOptions = {
                parse_mode: 'HTML'
            };
            initBot_1.bot.sendMessage(msg.chat.id, "\u2705 Ahora ingresa tu clave de acceso (Contrase\u00F1a: Cualquier valor es v\u00E1lido)", messageOptions);
        };
        Metodos.enviarMensajeClaveIncorrecta = function (msg) {
            initBot_1.bot.sendMessage(msg.chat.id, "\u274C La contrase\u00F1a que ingresaste es incorrecta, vuelve a intentarlo.");
        };
        Metodos.enviarMensajeClaveInvalida = function (msg) {
            initBot_1.bot.sendMessage(msg.chat.id, "\u274C La contrase\u00F1a que ingresaste no es v\u00E1lida, esta debe tener s\u00F3lo n\u00FAmeros.");
        };
    })(Metodos = index.Metodos || (index.Metodos = {}));
    var eventHandlers;
    (function (eventHandlers) {
        eventHandlers.listen = function () {
            initBot_1.bot.on('message', function (msg) {
                if (!msg.text ||
                    msg.text === '/start') {
                    return;
                }
                Data.Chats.getChat(msg).then(function (chat) {
                    if (chat.contexto == core_1.Contextos.PaginaInicial.index
                        && chat.comando == core_1.Comandos.PaginaInicial.Index.getClave) {
                        if (msg.text) {
                            menu_principal_1.MenuPrincipal.Metodos.sendMessage(msg);
                        }
                        else {
                            Metodos.enviarMensajeClaveIncorrecta(msg);
                        }
                    }
                });
            });
        };
    })(eventHandlers = index.eventHandlers || (index.eventHandlers = {}));
})(index = exports.index || (exports.index = {}));
index.eventHandlers.listen();
