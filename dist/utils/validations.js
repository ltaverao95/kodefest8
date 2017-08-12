"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Validaciones;
(function (Validaciones) {
    Validaciones.esStringRequeridoValido = function (value) {
        if (!value) {
            return false;
        }
        if (value.trim().length < 1) {
            return false;
        }
        return true;
    };
    Validaciones.esNumeroRequeridoValido = function (value, minValue) {
        if (!value) {
            return false;
        }
        else {
            if (isNaN(value)) {
                return false;
            }
            else if (minValue && value && value < minValue) {
                return false;
            }
        }
        return true;
    };
    Validaciones.esNumeroOpcionalValido = function (value, minValue) {
        if (value) {
            if (isNaN(value)) {
                return false;
            }
            else if (minValue && value && value < minValue) {
                return false;
            }
        }
        return true;
    };
})(Validaciones = exports.Validaciones || (exports.Validaciones = {}));
