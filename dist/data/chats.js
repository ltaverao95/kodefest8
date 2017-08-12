"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var initDatabase_1 = require("../initDatabase");
var Chats;
(function (Chats) {
    Chats.guardarContexto = function (msg, contexto) {
        return initDatabase_1.dataBase.ref('chats/' + msg.chat.id + '/contexto').set(contexto);
    };
    Chats.guardarComando = function (msg, comando) {
        return initDatabase_1.dataBase.ref('chats/' + msg.chat.id + '/comando').set(comando);
    };
    Chats.actualizarChat = function (msg, contexto, comando) {
        return initDatabase_1.dataBase.ref('chats/' + msg.chat.id).set({
            contexto: contexto,
            comando: comando
        });
    };
    Chats.guardarNuevaConfiguracionDeUsuario = function (msg) {
        return initDatabase_1.dataBase.ref('chats/' + msg.chat.id).set({
            contexto: "",
            comando: ""
        });
    };
    Chats.getChat = function (msg) {
        return initDatabase_1.dataBase.ref('chats/' + msg.chat.id).once('value')
            .then(function (snapshot) {
            return snapshot.val();
        })
            .catch(function (error) {
            console.log("Chats/getChat" + error);
        });
    };
})(Chats = exports.Chats || (exports.Chats = {}));
