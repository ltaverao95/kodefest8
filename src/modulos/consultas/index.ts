//export * from './index';
export * from './extracto';

import { bot } from '../../initBot';

import { ApiMessage } from "../../api/ApiMessage";
import { Message } from "../../bot/Message";
import { SendMessageOptions } from "../../bot/SendMessageOptions";
import { ReplyKeyboardMarkup } from "../../bot/ReplyKeyboardMarkup";
import { InlineKeyboardButton } from "../../bot/InlineKeyboardButton";

import {
    Contextos,
    Comandos
} from '../../core';

import * as Data from '../../data';
import { EditMessageTextOptions } from "../../bot/EditMessageTextOptions";
import { InlineKeyboardMarkup } from "../../bot/InlineKeyboardMarkup";
import { EditMessageReplyMarkupOptions } from "../../bot/EditMessageReplyMarkupOptions";

export namespace Index {

    export enum Options {
        Saldos = 'Saldos',
        Extracto = 'Extracto',
        Movimientos = 'Movimientos',
        Volver = "<< Volver"
    }

    export namespace Metodos {

        export const sendMessage = (msg: Message, update?: boolean) => {
            Data.Chats.guardarContexto(msg, Contextos.Consultas.Index.index).then(() => {
                const messageOptions = {
                    reply_markup: {
                        inline_keyboard: [
                            [
                                {
                                    text: Options.Saldos,
                                    callback_data: Contextos.Consultas.Saldos.saldos
                                }
                            ],
                            [
                                {
                                    text: Options.Extracto,
                                    callback_data: Contextos.Consultas.Extracto.operacionProducto
                                }
                            ],
                            [
                                {
                                    text: Options.Movimientos,
                                    callback_data: 'lkj'
                                }
                            ],
                            [
                                {
                                    text: Options.Volver,
                                    callback_data: Contextos.PaginaInicial.menuPrincipal
                                }
                            ]
                        ]
                    } as ReplyKeyboardMarkup
                } as SendMessageOptions;

                if (!update) {
                    bot.sendMessage(
                        msg.chat.id,
                        `Elige una operación`,
                        messageOptions
                    );

                    return;
                }

                bot.editMessageText(`Elige una operación`, {
                    message_id: msg.message_id,
                    chat_id: msg.chat.id,
                    reply_markup: messageOptions.reply_markup
                } as EditMessageTextOptions);
            });
        }

        export const onConsultas = (msg: ApiMessage) => {
            sendMessage(msg.message, true);
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

                if (msg.data.indexOf(Contextos.Consultas.Index.index) === 0) {
                    Metodos.onConsultas(msg);
                }
            });

            bot.onText(/^\/consultas$/, (msg: Message, match: any) => {
                Data.Chats.guardarNuevaConfiguracionDeUsuario(msg).then(() => {
                    Metodos.sendMessage(msg);
                });
            });
        }
    }
}

Index.eventHandlers.listen();