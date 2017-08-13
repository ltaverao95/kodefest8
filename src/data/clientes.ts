import { Message } from "../bot/Message";
import { dataBase } from '../initDatabase';

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
}