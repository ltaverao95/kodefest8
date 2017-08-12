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

export namespace Index {

    export enum Options {
        Saldos = 'Saldos',
        Extracto = 'Extracto',
        Movimientos = 'Movimientos',
        Volver = "⬅️ Volver"
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

                //TODO: update code.
            });
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