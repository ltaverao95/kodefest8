import { Message } from "../bot/Message";
import { dataBase } from '../initDatabase';

import {
    ProductoModel,
    ChatModel,
    Contextos,
    ProductoBanco
} from "../core";

import { getListFromFirebaseObject } from "./common";

import { Chats } from "./chats";

export namespace Productos {

    export const getProductosByCliente = (chatId: number): Promise<any> => {

        return getAllProductosBanco().then((productosBanco: Array<ProductoBanco>) => {

            return getProductosDeCliente(chatId).then((productosDeCliente: Array<ProductoModel>) => {

                let productos = new Array();

                if (!productosDeCliente || productosDeCliente.length === 0) {
                    return productos;
                }

                for (let i = 0; i < productosDeCliente.length; i++) {

                    if (!productosDeCliente[i]) {
                        continue;
                    }

                    productos.push({
                        id: productosDeCliente[i].id.toString(),
                        type: 'article',
                        title: productosBanco[productosDeCliente[i].idProducto].nombre,
                        input_message_content: {
                            message_text: productosBanco[productosDeCliente[i].idProducto].nombre + ", Saldo: $" + productosDeCliente[i].saldo
                        },
                        description: "Saldo: $" + productosDeCliente[i].saldo.toString(),
                        thumb_url: productosBanco[productosDeCliente[i].idProducto].icono
                    })
                }

                return productos;
            });
        });
    }

    export const getProductosPorAdquirirByClienteArticles = (chatId: number): Promise<any> => {
        return getProductosPorAdquirirByCliente(chatId).then((productosPorAdquirir: Array<ProductoBanco>) => {

            let articles = [];

            for (var i = 0; i < productosPorAdquirir.length; i++) {
                articles.push({
                    id: productosPorAdquirir[i].id.toString(),
                    type: 'article',
                    title: productosPorAdquirir[i].nombre,
                    input_message_content: {
                        message_text: `Ahora ingresa el saldo inicial para tu <b>${productosPorAdquirir[i].nombre}</b>`,
                        parse_mode: 'HTML'
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

                    if (productosDeCliente.findIndex((productoCliente: ProductoModel) => productoCliente.idProducto == productosBanco[i].id) === -1) {
                        productosPorAdquirir.push(productosBanco[i]);
                    }
                }

                return productosPorAdquirir;
            });
        })
    }

    export const getProductosDeCliente = (chatId: number | string): Promise<Array<ProductoModel>> => {
        return dataBase.ref('clientes/' + chatId + '/productos').once('value')
            .then((snapshot: any) => {
                return getListFromFirebaseObject<ProductoModel>(snapshot.val());
            })
            .catch((error: any) => {
                console.log("Productos/getProductosDeCliente" + error);
            });
    }

    export const getAllProductosBanco = (): Promise<Array<ProductoBanco>> => {
        return dataBase.ref('productos').once('value')
            .then((snapshot: any) => {
                return getListFromFirebaseObject<ProductoBanco>(snapshot.val());
            })
            .catch((error: any) => {
                console.log("Productos/getAllProductosBanco" + error);
            });
    }

    export const getProductoBancoById = (idProducto: number | string): Promise<ProductoBanco> => {
        return dataBase.ref('productos/' + idProducto).once('value')
            .then((snapshot: any) => {
                return snapshot.val();
            })
            .catch((error: any) => {
                console.log("Productos/getProductoBancoById" + error);
            });
    }

    export const getProductoClienteByProductoBancoId = (chatId: number | string, productoBancoId: number): Promise<ProductoModel> => {

        return getProductosDeCliente(chatId).then((productosDeCliente: Array<ProductoModel>) => {

            for (var i = 0; i < productosDeCliente.length; i++) {

                if (productosDeCliente[i].idProducto == productoBancoId) {
                    return productosDeCliente[i];
                }
            }

            return { id: -1 } as ProductoModel;
        })
    }

    export const saveProductosCliente = (chatId: string | number, producto: ProductoModel): Promise<any> => {
        return dataBase.ref('clientes/' + chatId + '/productos').push(producto);
    }

    export const updateSaldoProducto = (chatId: string | number, idProducto: string, saldo: number) => {
        dataBase.ref('clientes/' + chatId + '/productos/' + idProducto + '/saldo').set(saldo);
    }
}