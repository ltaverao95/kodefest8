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

    enum Options {
        Volver = '<< Volver',
    }

    export namespace Metodos {

        export const sendMessage = (msg: Message, update?: boolean) => {

            Data.Chats.actualizarChat(msg, Contextos.Consultas.Saldos.saldos, "").then(() => {
                const messageOptions = {
                    reply_markup: {
                        inline_keyboard: [
                            [
                                {
                                    text: "Ver saldo de mis productos",
                                    switch_inline_query_current_chat: ''
                                }
                            ],
                            [
                                {
                                    text: Options.Volver,
                                    callback_data: Contextos.Consultas.Index.index
                                }
                            ]

                        ] as ReplyKeyboardMarkup
                    } as InlineKeyboardMarkup
                } as SendMessageOptions;

                if (!update) {
                    bot.editMessageText(
                        msg.chat.id,
                        `Opciones`,
                        messageOptions
                    );
                    return;
                }

                bot.editMessageText(`Opciones`, {
                    chat_id: msg.chat.id,
                    message_id: msg.message_id,
                    reply_markup: messageOptions.reply_markup
                } as EditMessageTextOptions);
            });
        }

        export const onSaldo = (msg: Message, update?: boolean) => {
            sendMessage(msg, update);
        }
    }

    export namespace eventHandlers {

        export const listen = () => {

            bot.on('message', (msg: Message) => {

                if (!msg.text) {
                    return;
                }

                if (msg.text.indexOf(Contextos.Consultas.Saldos.saldos) === 0) {
                    Metodos.onSaldo(msg);
                }
            });

            bot.on('callback_query', (msg: ApiMessage) => {

                if (!msg.data) {
                    return;
                }

                if (msg.data.indexOf(Contextos.Consultas.Saldos.saldos) === 0) {
                    Metodos.onSaldo(msg.message, true);
                }
            });

            bot.on('inline_query', (msg: ApiMessage) => {

                if (!msg) {
                    return;
                }

                Data.Chats.getChatByUserId(msg.from.id).then((chat: ChatModel) => {

                    if (chat.contexto.indexOf(Contextos.Consultas.Saldos.saldos) === 0) {

                        Data.Productos.getProductosByCliente(chat.id).then((result) => {

                            bot.answerInlineQuery(msg.id,
                                [
                                    {
                                        id: '1',
                                        type: 'article',
                                        title: 'Opción 1..',
                                        description: 'Descripción de la opción 1',
                                        input_message_content: {
                                            message_text: 'contenido de opción 1'
                                        },
                                        thumb_url: 'http://icons.iconarchive.com/icons/custom-icon-design/flatastic-10/128/Edit-validated-icon.png'
                                    },
                                    {
                                        id: '2',
                                        type: 'article',
                                        title: 'Opción 2..',
                                        description: 'Descripción de la opción 2',
                                        input_message_content: {
                                            message_text: 'contenido de opción 2'
                                        },
                                        thumb_url: 'http://icons.iconarchive.com/icons/custom-icon-design/flatastic-10/128/File-info-icon.png',
                                    },
                                    {
                                        id: '3',
                                        type: 'article',
                                        title: 'Opción 3..',
                                        description: 'Descripción de la opción 3',
                                        input_message_content: {
                                            message_text: 'contenido de opción 3'
                                        },
                                        thumb_url: 'http://icons.iconarchive.com/icons/custom-icon-design/flatastic-10/128/Font-color-icon.png',
                                    },
                                    {
                                        id: '4',
                                        type: 'article',
                                        title: 'Opción 4..',
                                        description: 'Descripción de la opción 4',
                                        input_message_content: {
                                            message_text: 'contenido de opción 4'
                                        },
                                        thumb_url: 'http://icons.iconarchive.com/icons/custom-icon-design/flatastic-10/128/Portrait-icon.png',
                                    },
                                    {
                                        id: '5',
                                        type: 'article',
                                        title: 'Opción 5..',
                                        description: 'Descripción de la opción 5',
                                        input_message_content: {
                                            message_text: 'contenido de opción 5'
                                        },
                                        thumb_url: 'http://icons.iconarchive.com/icons/custom-icon-design/flatastic-10/128/File-complete-icon.png',
                                    },
                                    {
                                        id: '6',
                                        type: 'article',
                                        title: 'Opción 6..',
                                        description: 'Descripción de la opción 6',
                                        input_message_content: {
                                            message_text: 'contenido de opción 6'
                                        },
                                        thumb_url: 'http://icons.iconarchive.com/icons/custom-icon-design/flatastic-10/128/Email-receive-icon.png',
                                    }

                                ], {
                                    cache_time: '10'
                                });
                        });
                    }
                });
            });

        }
    }
}

Saldo.eventHandlers.listen();