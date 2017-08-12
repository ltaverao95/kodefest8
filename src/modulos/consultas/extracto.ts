import { Message } from "../../bot/Message";
import { ReplyKeyboardMarkup } from "../../bot/ReplyKeyboardMarkup";
import { SendMessageOptions } from "../../bot/SendMessageOptions";

import { bot } from '../../initBot';
import * as Data from '../../data';
import {
    Contextos,
    Comandos
} from '../../core';
import { ApiMessage } from "../../api/ApiMessage";
import { EditMessageReplyMarkupOptions } from "../../bot/EditMessageReplyMarkupOptions";
import { InlineKeyboardMarkup } from "../../bot/InlineKeyboardMarkup";
import { EditMessageTextOptions } from "../../bot/EditMessageTextOptions";

export namespace Extracto {

    export enum Options {
        Ene = 'Ene',
        Feb = 'Feb',
        Mar = 'Mar',
        Abr = 'Abr',
        May = 'May',
        Jun = 'Jun',
        Jul = 'Jul',
        Ago = 'Ago',
        Sep = 'Sep',
        Oct = 'Oct',
        Nov = 'Nov',
        Dic = 'Dic',

        Volver = '<< Volver',
    }

    export namespace Metodos {

        export const sendMessage = (msg: Message) => {

            Data.Chats.actualizarChat(msg, Contextos.Consultas.Extracto.operacionProducto, "").then(() => {

                //let inlinkeKeyboardMarkup = ;

                const messageOptions = {
                    reply_markup: {
                        inline_keyboard: [
                            [
                                { text: Options.Ene, callback_data: Options.Ene },
                                { text: Options.Feb, callback_data: Options.Feb },
                                { text: Options.Mar, callback_data: Options.Mar }
                            ],
                            [
                                { text: Options.Abr, callback_data: Options.Abr },
                                { text: Options.May, callback_data: Options.May },
                                { text: Options.Jun, callback_data: Options.Jun }
                            ],
                            [
                                { text: Options.Jul, callback_data: Options.Jul },
                                { text: Options.Ago, callback_data: Options.Ago },
                                { text: Options.Sep, callback_data: Options.Sep }
                            ],
                            [
                                { text: Options.Oct, callback_data: Options.Oct },
                                { text: Options.Nov, callback_data: Options.Nov },
                                { text: Options.Dic, callback_data: Options.Dic }
                            ],
                            [
                                { text: Options.Volver, callback_data: Options.Volver }
                            ]

                        ] as ReplyKeyboardMarkup
                    } as InlineKeyboardMarkup
                } as SendMessageOptions;

                bot.editMessageText(`Elige un mes`, {
                    message_id: msg.message_id,
                    chat_id: msg.chat.id
                } as EditMessageTextOptions).then(
                    () => {
                        bot.editMessageReplyMarkup(messageOptions.reply_markup as InlineKeyboardMarkup, {
                            message_id: msg.message_id,
                            chat_id: msg.chat.id
                        } as EditMessageReplyMarkupOptions);
                    }
                );
            });
        }

        export const onOperacionProducto = (msg: ApiMessage) => {
            sendMessage(msg.message);
        }
    }

    export namespace eventHandlers {

        export const listen = () => {
            bot.on('message', (msg: Message) => {

                if (!msg.text) {
                    return;
                }

            });

            bot.on('callback_query', (msg: ApiMessage) => {

                if (!msg.data) {
                    return;
                }

                if (msg.data.indexOf(Contextos.Consultas.Extracto.operacionProducto) === 0) {
                    Metodos.onOperacionProducto(msg);
                }
            });

        }
    }
}

Extracto.eventHandlers.listen();