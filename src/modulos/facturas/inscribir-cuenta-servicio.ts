import { Message } from "../../bot/Message";
import { ReplyKeyboardMarkup } from "../../bot/ReplyKeyboardMarkup";
import { SendMessageOptions } from "../../bot/SendMessageOptions";

import { bot } from '../../initBot';
import * as Data from '../../data';

import { ChatModel } from "../../core/models";
import {
    Contextos,
    Comandos,
    Constants
} from '../../core';
import { ApiMessage } from "../../api/ApiMessage";
import { EditMessageTextOptions } from "../../bot/EditMessageTextOptions";
import { InlineKeyboardMarkup } from "../../bot/InlineKeyboardMarkup";

export namespace InscribirCuentaServicio {

    enum Options {
        Volver = '<< Volver',
    }

    export namespace Metodos {

        export const sendMessage = (msg: Message, update?: boolean) => {

            Data.Chats.actualizarChat(msg, Contextos.Facturas.InscribirCuentaServicios.seleccionServicio, "").then(() => {
                const messageOptions = {
                    parse_mode: "HTML",
                    reply_markup: {
                        inline_keyboard: [
                            [
                                {
                                    text: "",
                                    switch_inline_query_current_chat: ''
                                }
                            ],
                            [
                                {
                                    text: Options.Volver,
                                    callback_data: Contextos.Facturas.Index.index
                                }
                            ]

                        ] as ReplyKeyboardMarkup
                    } as InlineKeyboardMarkup
                } as SendMessageOptions;

                if (!update) {
                    bot.sendMessage(
                        msg.chat.id,
                        `Selecciona el servicio a inscribir`,
                        messageOptions
                    );

                    return;
                }

                bot.editMessageText(`Elige una operación`, {
                    message_id: msg.message_id,
                    chat_id: msg.chat.id
                } as EditMessageTextOptions);
            });
        };

        export const onInscribirCuentaServicios = (msg: Message, update?: boolean) => {
            sendMessage(msg, update);
        }
    }

    export namespace eventHandlers {

        export const listen = () => {

            bot.on('callback_query', (msg: ApiMessage) => {
                if (!msg.data) {
                    return;
                }

                if (msg.data.indexOf(Contextos.Facturas.InscribirCuentaServicios.seleccionServicio) === 0) {
                    Metodos.onInscribirCuentaServicios(msg.message);
                }
            });

            bot.on('inline_query', (msg: ApiMessage) => {

                if (!msg) {
                    return;
                }

                console.log(msg);

                Data.Chats.getChatByUserId(msg.from.id).then((chat: ChatModel) => {

                    console.log(chat);

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
            });
        }
    }
}

InscribirCuentaServicio.eventHandlers.listen();