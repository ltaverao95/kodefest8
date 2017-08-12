import { bot } from '../../initBot';
import * as Data from '../../data';
import {
    Contextos,
    Comandos
} from '../../core';

import { ApiMessage } from "../../api/ApiMessage";
import { Message } from "../../bot/Message";
import { SendMessageOptions } from "../../bot/SendMessageOptions";
import { ReplyKeyboardMarkup } from "../../bot/ReplyKeyboardMarkup";
import { InlineKeyboardMarkup } from "../../bot/InlineKeyboardMarkup";

export namespace Saldo {

    enum Options {
        Volver = '<< Volver',
    }

    export namespace Metodos {

        export const sendMessage = (msg: Message) => {

            Data.Chats.actualizarChat(msg, Contextos.Consultas.Saldos.saldos, "").then(() => {

                const messageOptions = {
                    reply_markup: {
                        inline_keyboard: [
                            [
                                {
                                    text: Options.Volver,
                                    callback_data: Contextos.Consultas.Index.index
                                }
                            ]

                        ] as ReplyKeyboardMarkup
                    } as InlineKeyboardMarkup
                } as SendMessageOptions;

                bot.sendMessage(
                    msg.chat.id,
                    `Elige una operación`,
                    messageOptions
                );
            });
        }

        export const onSaldo = (msg: ApiMessage) => {
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

                if (msg.data.indexOf(Contextos.Consultas.Saldos.saldos) === 0) {
                    Metodos.onSaldo(msg);
                }
            });
        }
    }
}

Saldo.eventHandlers.listen();

/*
export namespace Saldo {

    export enum Options {
        Volver = "<< Volver"
    }

    const inlineOptions = {
        inlineQueries: {
            GetPictures: 'CM_GETQUERIES'
        }
    };

    export namespace Metodos {

        export const sendMessage = (msg: Message) => {

            console.log(JSON.stringify(msg));

            Data.Chats.actualizarChat(msg, Contextos.Consultas.Saldos.saldos, "").then(() => {

                console.log("Chat Actualizado saldos");

                Data.Productos.getProductosByCliente(msg).then((value) => {

                    console.log(JSON.stringify(value));
                });
            });
        }
    }

    export namespace eventHandlers {

        export const listen = () => {

            bot.on('callback_query', (msg: ApiMessage) => {

                console.log("callback_query saldos");
                console.log(JSON.stringify(msg));
                
                if (!msg.data) {
                    return;
                }

                if (msg.data.indexOf(Contextos.Consultas.Saldos.saldos) === 0) {
                    Metodos.sendMessage(msg.message);
                }
            });
        }
    }
}

Saldo.eventHandlers.listen();

*/