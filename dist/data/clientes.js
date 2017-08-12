"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var initDatabase_1 = require("../initDatabase");
var Clientes;
(function (Clientes) {
    Clientes.actualizarDocumento = function (msg, documento) {
        return initDatabase_1.dataBase.ref('clientes/' + msg.chat.id).set({
            documento: documento
        });
    };
})(Clientes = exports.Clientes || (exports.Clientes = {}));
