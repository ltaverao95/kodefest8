"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var initDatabase_1 = require("../initDatabase");
var Productos;
(function (Productos) {
    Productos.getProductosByCliente = function (msg) {
        return initDatabase_1.dataBase.ref('clientes/' + msg.chat.id + '/productos').once('value')
            .then(function (snapshot) {
            console.log(JSON.stringify(snapshot.val()));
            return snapshot.val();
        })
            .catch(function (error) {
            console.log("Productos/getProductosByCliente" + error);
        });
    };
})(Productos = exports.Productos || (exports.Productos = {}));
