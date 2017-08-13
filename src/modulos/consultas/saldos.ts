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

                if (!msg) {
                    return;
                }

                if (msg.query.indexOf(Contextos.Consultas.Saldos.saldos) === 0) {
                    Data.Productos.getProductosByCliente(msg.from.id).then((products) => {

                        bot.answerInlineQuery(
                            msg.id,
                            products,
                            {
                                cache_time: '10'
                            }
                        );
                    });
                }
            });

            bot.on('chosen_inline_result', (msg: ApiMessage) => {
                console.log('chosen_inline_result');
                console.log(JSON.stringify(msg));
                bot.sendMessage(msg.from.id, `result selected id: ` + msg.result_id);
            });

        }

    }
}

Saldo.eventHandlers.listen();