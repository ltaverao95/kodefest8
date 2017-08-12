import { Message } from "../bot/Message";
import { dataBase } from '../initDatabase';

export namespace Productos {

    export const getProductosByCliente = (msg: Message): Promise<any> => {

        return dataBase.ref('clientes/' + msg.chat.id + '/productos').once('value')
            .then((snapshot: any) => {
                console.log(JSON.stringify(snapshot.val()));
                return snapshot.val();
            })
            .catch((error: any) => {
                console.log("Productos/getProductosByCliente" + error);
            });
    }
}