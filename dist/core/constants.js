"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Constants;
(function (Constants) {
    var TipoMovimientoEnum;
    (function (TipoMovimientoEnum) {
        TipoMovimientoEnum["TransferenciaAOtrasEntidades"] = "Transferencia a otras entidades";
        TipoMovimientoEnum["TransferenciaDesdeOtrasEntidades"] = "Transferencia desde otras entidades";
        TipoMovimientoEnum["PagoServicios"] = "Pago servicios";
        TipoMovimientoEnum["PagoProducto"] = "Pago producto";
    })(TipoMovimientoEnum = Constants.TipoMovimientoEnum || (Constants.TipoMovimientoEnum = {}));
    var Chat;
    (function (Chat) {
        var Contexto;
        (function (Contexto) {
            var PaginaInicial;
            (function (PaginaInicial) {
                PaginaInicial.Inicio = 'Inicio';
                PaginaInicial.Acceso = 'Acceso';
                PaginaInicial.MenuPrincipal = 'MenuPrincipal';
            })(PaginaInicial = Contexto.PaginaInicial || (Contexto.PaginaInicial = {}));
            var Consultas;
            (function (Consultas) {
                Consultas.Inicio = 'Inicio';
                Consultas.Saldos = 'Saldos';
                Consultas.OperacionProducto = 'OperacionProducto';
                Consultas.SeleccionMes = 'SeleccionMes';
                Consultas.Reporte = 'Reporte';
            })(Consultas = Contexto.Consultas || (Contexto.Consultas = {}));
        })(Contexto = Chat.Contexto || (Chat.Contexto = {}));
    })(Chat = Constants.Chat || (Constants.Chat = {}));
})(Constants = exports.Constants || (exports.Constants = {}));
exports.Contexto = Constants.Chat.Contexto;
//export const Commands = Constants.Chat.Command; 
