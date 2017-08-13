import { bot } from '../../initBot';
import * as Data from '../../data';

import { Message } from "../../bot/Message";
import { Comandos } from "../../core/constants";
import { ApiMessage } from "../../api/ApiMessage";
import { Contextos } from "../../core/index";
import { ReplyKeyboardMarkup } from "../../bot/ReplyKeyboardMarkup";
import { SendMessageOptions } from "../../bot/SendMessageOptions";

import { Validaciones } from "../../utils";

import {
    ChatModel,
    ProductoModel,
    ProductoBanco
} from "../../core/models";

export namespace AdquirirProducto {

    export enum Options {
        verProductosDisponibles = 'Ver productos disponibles'
    }

    export namespace Metodos {

        export const sendMessage = (msg: Message) => {
            Data.Chats.actualizarChat(msg, Contextos.AdquirirProducto.Index.index, Comandos.AdquirirProducto.Index.verProductosDisponibles).then(() => {

                const messageOptions = {
                    reply_markup: {
                        inline_keyboard: [
                            [
                                {
                                    text: Options.verProductosDisponibles,
                                    switch_inline_query_current_chat: Comandos.AdquirirProducto.Index.verProductosDisponibles
                                }
                            ]
                        ],
                    } as ReplyKeyboardMarkup
                } as SendMessageOptions;

                bot.sendMessage(
                    msg.chat.id,
                    `Selecciona uno de los productos disponibles`,
                    messageOptions
                );
            });
        }

        export const onAdquirirProducto = (msg: Message) => {
            sendMessage(msg);
        }
    }

    export namespace eventHandlers {

        export const listen = () => {

            bot.on('message', (msg: Message) => {

                if (!msg.text) {
                    return;
                }

                if (msg.text.indexOf(Comandos.PaginaInicial.MenuPrincipal.adquirirProducto) === 0) {
                    Metodos.onAdquirirProducto(msg);
                }
            });

            bot.on('inline_query', (msg: ApiMessage) => {

                if (!msg.query) {
                    return;
                }

                Data.Chats.getChatByUserId(msg.from.id).then((chat: ChatModel) => {

                    if (chat.contexto.indexOf(Contextos.AdquirirProducto.Index.index) === 0 &&
                        chat.comando.indexOf(Comandos.AdquirirProducto.Index.verProductosDisponibles) === 0) {

                        Data.Productos.getProductosPorAdquirirByClienteArticles(msg.from.id).then((productosPorAdquirir) => {
                            bot.answerInlineQuery(
                                msg.id,
                                productosPorAdquirir
                            );
                        });
                    }
                });
            });

            bot.on('chosen_inline_result', (msg: ApiMessage) => {

                Data.Chats.getChatByUserId(msg.from.id).then((chat: ChatModel) => {

                    if (chat.contexto.indexOf(Contextos.AdquirirProducto.Index.index) === 0) {

                        Data.Productos.getProductoBancoById(msg.result_id).then((producto: ProductoBanco) => {

                            if (!producto) {
                                return;
                            }

                            Data.Productos.saveProductosCliente(msg.from.id, {
                                idProducto: producto.id,
                                confirmado:false,
                                numero: Validaciones.generarGUID()
                            } as ProductoModel);
                        });
                    }
                });
            });

        }
    }
}

AdquirirProducto.eventHandlers.listen();