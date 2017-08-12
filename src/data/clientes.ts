import { Message } from "../bot/Message";
import { dataBase } from '../initDatabase';

import { Model } from "../core/models";

export namespace Clientes {
    export const actualizarDocumento = (msg: Message, documento: number): Promise<any> => {
        return dataBase.ref('clientes/' + msg.chat.id).set({
            documento
        });
    }
}