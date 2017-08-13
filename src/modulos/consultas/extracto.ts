import { Message } from "../../bot/Message";
import { ReplyKeyboardMarkup } from "../../bot/ReplyKeyboardMarkup";
import { SendMessageOptions } from "../../bot/SendMessageOptions";

import { bot } from '../../initBot';
import * as Data from '../../data';
import {
    Contextos,
    Comandos,
    ChatModel
} from '../../core';
import { ApiMessage } from "../../api/ApiMessage";
import { EditMessageReplyMarkupOptions } from "../../bot/EditMessageReplyMarkupOptions";
import { InlineKeyboardMarkup } from "../../bot/InlineKeyboardMarkup";
import { EditMessageTextOptions } from "../../bot/EditMessageTextOptions";

export namespace Extracto {

    enum Options {
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

    const nombresMeses = {
        [Comandos.Consultas.Extracto.ene]: 'Enero',
        [Comandos.Consultas.Extracto.feb]: 'Febrero',
    };

    export namespace Metodos {

        export const sendMessageSeleccionarMes = (msg: Message, update?: boolean) => {

            Data.Chats.actualizarChat(msg.chat.id, Contextos.Consultas.Extracto.seleccionMes, "").then(() => {

                const messageOptions = {
                    reply_markup: {
                        inline_keyboard: [
                            [
                                { text: Options.Ene, callback_data: Comandos.Consultas.Extracto.ene },
                                { text: Options.Feb, callback_data: Comandos.Consultas.Extracto.feb },
                                { text: Options.Mar, callback_data: Options.Mar }
                            ],
                            [
                                { text: Options.Abr, callback_data: Comandos.Consultas.Extracto.abr },
                                { text: Options.May, callback_data: Comandos.Consultas.Extracto.may },
                                { text: Options.Jun, callback_data: Comandos.Consultas.Extracto.jun }
                            ],
                            [
                                { text: Options.Jul, callback_data: Comandos.Consultas.Extracto.jul },
                                { text: Options.Ago, callback_data: Comandos.Consultas.Extracto.ago },
                                { text: Options.Sep, callback_data: Comandos.Consultas.Extracto.sep }
                            ],
                            [
                                { text: Options.Oct, callback_data: Comandos.Consultas.Extracto.oct },
                                { text: Options.Nov, callback_data: Comandos.Consultas.Extracto.nov },
                                { text: Options.Dic, callback_data: Comandos.Consultas.Extracto.dic }
                            ],
                            [
                                { text: Options.Volver, callback_data: Contextos.Consultas.Index.index }
                            ]

                        ] as ReplyKeyboardMarkup
                    } as InlineKeyboardMarkup
                } as SendMessageOptions;

                if (!update) {
                    bot.sendMessage(
                        msg.chat.id,
                        `Elige una operación`,
                        messageOptions
                    );

                    return;
                }

                bot.editMessageText(`📅 Elige un mes para consultar`, {
                    message_id: msg.message_id,
                    chat_id: msg.chat.id,
                    reply_markup: messageOptions.reply_markup
                } as EditMessageTextOptions);
            });
        }

        export const sendMessageReporteXMes = (msg: Message, mes: string) => {

            Data.Chats.actualizarChat(msg.chat.id, Contextos.Consultas.Extracto.reporte, "").then(() => {

                const messageOptions = {
                    parse_mode: 'HTML',
                    message_id: msg.message_id,
                    chat_id: msg.chat.id,
                    reply_markup: {
                        inline_keyboard: [
                            [
                                { text: Options.Volver, callback_data: Contextos.Consultas.Extracto.operacionProducto }
                            ]

                        ] as ReplyKeyboardMarkup
                    } as InlineKeyboardMarkup
                } as EditMessageTextOptions;

                let fechaHoy = new Date().toJSON().slice(0, 10).replace(/-/g, '/');

                let textoMensaje = 
`<b>Banco. KodeFest8</b>, ${fechaHoy}
<b>Cliente:</b>, ${fechaHoy}
Has elegido: ${nombresMeses[mes]}`;

                bot.editMessageText(textoMensaje, messageOptions);
            });
        }

        export const onOperacionProducto = (msg: ApiMessage) => {
            sendMessageSeleccionarMes(msg.message, true);
        }

        export const onSelectMes = (msg: ApiMessage, mes: string) => {
            sendMessageReporteXMes(msg.message, mes);
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

                Data.Chats.getChat(msg.message).then((chat: ChatModel) => {

                    if (chat.contexto != Contextos.Consultas.Extracto.seleccionMes) {
                        return;
                    }

                    if (msg.data.indexOf(Comandos.Consultas.Extracto.ene) === 0) {
                        Metodos.onSelectMes(msg, Comandos.Consultas.Extracto.ene);
                    }
                })
            });
        }
    }
}

Extracto.eventHandlers.listen();