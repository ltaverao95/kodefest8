import { Message } from "../bot/Message";
import { dataBase } from '../initDatabase';
import { ServicioModel } from "../core/models";

export namespace Clientes {

    export const actualizarNombre = (msg: Message): Promise<any> => {
        return dataBase.ref('clientes/' + msg.chat.id + '/nombre').set(msg.from.first_name ? msg.from.first_name : '' + msg.from.last_name ? msg.from.last_name : '');
    }

    export const actualizarDocumento = (msg: Message, documento: number): Promise<any> => {
        return dataBase.ref('clientes/' + msg.chat.id + '/documento').set(documento);
    }

    export const actualizarDatosBasicos = (msg: Message, documento: number): Promise<any> => {
        actualizarNombre(msg);
        return actualizarDocumento(msg, documento);
    }

    export const getEmpresasInscritasFromCliente = (msg: Message): Promise<any> => {
        return dataBase.ref('clientes/' + msg.chat.id + '/empresasInscritas').once("value");
    }

    export const setEmpresasInscritasToCliente = (msg: Message, empresaInscritaId: number | string, empresaInscrita: ServicioModel): Promise<any> => {
        return dataBase.ref('clientes/' + msg.chat.id + '/empresasInscritas/' + empresaInscritaId).set(empresaInscrita);
    }

}