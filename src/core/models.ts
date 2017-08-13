import {
    Constants
} from './constants';



export interface ChatModel {
    id: number | string;
    contexto: string;
    comando: string;
}

export interface ClienteModel {
    documento: string;
    nombre: string;
    productos: Array<ProductoModel>;
    serviciosPublicosInscritos: Array<ServicioModel>;
}

export interface ProductoModel {
    numero: string;
    idProducto: number;
    cupoMaximo: number;
    cupoMinimo: number;
    saldo: number;
    movimientos: Array<MovimientoModel>;
    saldosMensuales: Array<SaldoMensualModel>;
    confirmado: boolean;
}

export interface ProductoBanco {
    id: number,
    icono: string,
    nombre: string
}

export interface MovimientoModel {
    numero: string;
    tipo: Constants.TipoMovimientoEnum;
    fechaHora: number;
    valor: number;
}

export interface ServicioModel {
    empresa: string;
    descripcion: string;
    icono: string;
    id: number;
}

export interface SaldoMensualModel {
    mes: string; //{'ene', 'feb', 'mar', 'abr'...'dic'}
    valor: number;
}
