import { Message } from "../bot/Message";
import { dataBase } from '../initDatabase';

export namespace Clientes {
    export const actualizarDocumento = (msg: Message, documento: number): Promise<any> => {
        return dataBase.ref('clientes/' + msg.chat.id).set({
            documento,
            nombre:msg.from.first_name ? msg.from.first_name : '' + msg.from.last_name ? msg.from.last_name : ''
        });
    }
}