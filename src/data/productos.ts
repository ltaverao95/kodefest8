import { Message } from "../bot/Message";
import { dataBase } from '../initDatabase';

import {
    ProductoModel,
    ChatModel,
    Contextos
} from "../core";

import { Chats } from "./chats";

export namespace Productos {

    export const getProductosByCliente = (chatId: number): Promise<any> => {

        return dataBase.ref('productos').once('value')
            .then((snapshot: any) => {

                let productosBanco = snapshot.val();

                //return dataBase.ref('clientes/' + chatId + '/productos').once('value')
                return dataBase.ref('clientes/123412344/productos').once('value')
                    .then((snapshot: any) => {

                        let productosRegistrados: Array<ProductoModel> = snapshot.val();
                        let productosCliente = [];

                        for (let i = 1; i < productosRegistrados.length; i++) {
                            
                            if (!productosRegistrados[i]) {
                                continue;
                            }
                            
                            productosCliente.push({
                                id: i.toString(),
                                type: 'article',
                                title: productosBanco[productosRegistrados[i].idProducto].nombre,
                                input_message_content: {
                                    message_text: productosBanco[productosRegistrados[i].idProducto].nombre + ", Saldo: $" + productosRegistrados[i].saldo
                                },
                                description: "Saldo: $" + productosRegistrados[i].saldo.toString(),
                                thumb_url: productosBanco[productosRegistrados[i].idProducto].icono
                            })
                        }

                        return productosCliente;
                    })
                    .catch((error: any) => {
                        console.log("Productos/getProductosByCliente" + error);
                    });
            })
            .catch((error: any) => {
                console.log("Productos/getProductosByCliente" + error);
            });

    }
}