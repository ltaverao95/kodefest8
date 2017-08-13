import { bot } from '../../initBot';
import * as Data from '../../data';

import { Message } from "../../bot/Message";
import { Comandos } from "../../core/constants";
import { ApiMessage } from "../../api/ApiMessage";
import { Contextos } from "../../core/index";
import { ReplyKeyboardMarkup } from "../../bot/ReplyKeyboardMarkup";
import { SendMessageOptions } from "../../bot/SendMessageOptions";

export namespace AdquirirProducto {

    export enum Options {
        verProductosDisponibles = 'Ver productos disponibles'
    }

    export namespace Metodos {

        export const sendMessage = (msg: Message) => {
            Data.Chats.actualizarChat(msg, Contextos.AdquirirProducto.Index.index, "").then(() => {

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

                if (msg.query.indexOf(Comandos.AdquirirProducto.Index.verProductosDisponibles) === 0) {
                    Data.Productos.getProductosPorAdquirirByClienteArticles(msg.from.id).then((productosPorAdquirir) => {
                        bot.answerInlineQuery(
                            msg.id,
                            productosPorAdquirir
                        );
                    });
                }

            });
            
            /*
            bot.on('chosen_inline_result', (msg: ApiMessage) => {
                console.log('chosen_inline_result');
                console.log(JSON.stringify(msg));
                bot.sendMessage(msg.from.id, `result selected id: ` + msg.result_id);
            });
            */
        }
    }
}

AdquirirProducto.eventHandlers.listen();