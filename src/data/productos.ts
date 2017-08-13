import { Message } from "../bot/Message";
import { dataBase } from '../initDatabase';

import {
    ProductoModel,
    ChatModel,
    Contextos,
    ProductoBanco
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
                        let productosCliente = new Array();

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

    export const getProductosPorAdquirirByClienteArticles = (chatId: number): Promise<any> => {
        return getProductosPorAdquirirByCliente(chatId).then((productosPorAdquirir: Array<ProductoBanco>) => {
            let articles = [];

            for (var i = 0; i < productosPorAdquirir.length; i++) {

                if (!productosPorAdquirir[i]) {
                    continue;
                }

                articles.push({
                    id: productosPorAdquirir[i].id.toString(),
                    type: 'article',
                    title: productosPorAdquirir[i].nombre,
                    input_message_content: {
                        message_text: "Adquiere este producto ahora"
                    },
                    description: 'Clic aquí para adquirir este producto',
                    thumb_url: productosPorAdquirir[i].icono
                })
            }

            return articles;
        })
    }

    export const getProductosPorAdquirirByCliente = (chatId: number): Promise<Array<ProductoBanco>> => {
        return getAllProductosBanco().then((productosBanco: Array<ProductoBanco>) => {

            return getProductosDeCliente(chatId).then((productosDeCliente: Array<ProductoModel>) => {

                if (!productosDeCliente || productosDeCliente.length === 0) {
                    return productosBanco;
                }
                
                let productosPorAdquirir = new Array<ProductoBanco>();

                for (var i = 0; i < productosBanco.length; i++) {

                    if (!productosBanco[i]) {
                        continue;
                    }

                    if (productosDeCliente.findIndex((productoCliente: ProductoModel) => {
                        if (!productoCliente) {
                            return false;
                        }
                        return productoCliente.idProducto === productosBanco[i].id
                    }) === -1) {
                        productosPorAdquirir.push(productosBanco[i]);
                    }
                }

                return productosPorAdquirir;
            });
        })
    }

    export const getProductosDeCliente = (chatId: number): Promise<any> => {
        return dataBase.ref('clientes/' + chatId + '/productos').once('value')
            .then((snapshot: any) => {
                return snapshot.val();
            })
            .catch((error: any) => {
                console.log("Productos/getProductosDeCliente" + error);
            });
    }

    export const getAllProductosBanco = (): Promise<Array<ProductoBanco>> => {
        return dataBase.ref('productos').once('value')
            .then((snapshot: any) => {
                return snapshot.val();
            })
            .catch((error: any) => {
                console.log("Productos/getAllProductosBanco" + error);
            });
    }
}