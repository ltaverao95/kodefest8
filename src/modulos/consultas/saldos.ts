import { bot } from '../../initBot';
import * as Data from '../../data';
import {
    Contextos,
    Comandos,
    ChatModel,
    ProductoModel
} from '../../core';

import { ApiMessage } from "../../api/ApiMessage";
import { Message } from "../../bot/Message";
import { SendMessageOptions } from "../../bot/SendMessageOptions";
import { ReplyKeyboardMarkup } from "../../bot/ReplyKeyboardMarkup";
import { InlineKeyboardMarkup } from "../../bot/InlineKeyboardMarkup";
import { EditMessageTextOptions } from "../../bot/EditMessageTextOptions";

export namespace Saldo {

    export namespace eventHandlers {

        export const listen = () => {

            bot.on('inline_query', (msg: ApiMessage) => {

                if (!msg.query) {
                    return;
                }

                if (msg.query.indexOf(Contextos.Consultas.Saldos.saldos) === 0) {
                    Data.Productos.getProductosByCliente(msg.from.id).then((products) => {
                        
                        bot.answerInlineQuery(
                            msg.id,
                            products,
                            {
                                cache_time: '0'
                            }
                        );
                    });
                }
            });

            bot.on('chosen_inline_result', (msg: ApiMessage) => {

                if (msg.result_id == -1) {
                    return;
                }

            });

        }

    }
}

Saldo.eventHandlers.listen();