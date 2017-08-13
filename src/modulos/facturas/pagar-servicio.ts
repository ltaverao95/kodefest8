import { Message } from "../../bot/Message";
import { ReplyKeyboardMarkup } from "../../bot/ReplyKeyboardMarkup";
import { SendMessageOptions } from "../../bot/SendMessageOptions";

import { bot } from '../../initBot';
import * as Data from '../../data';

import { ChatModel } from "../../core/models";
import {
    Contextos,
    Comandos,
    Constants,
    ServicioModel
} from '../../core';
import { ApiMessage } from "../../api/ApiMessage";
import { EditMessageTextOptions } from "../../bot/EditMessageTextOptions";
import { InlineKeyboardMarkup } from "../../bot/InlineKeyboardMarkup";

import {
    InscribirCuentaServicios
} from './inscribir-cuenta-servicios';

export namespace PagarServicios {

    enum Options {
        Volver = '<< Volver',
    }

    export namespace Metodos {

        export const sendMessage = (msg: Message, update?: boolean) => {

            Data.Chats.actualizarChat(msg, Contextos.Facturas.PagarServicio.pagarServicio, "").then(() => {
                const messageOptions = {
                    parse_mode: "HTML",
                    reply_markup: {
                        inline_keyboard: [
                            [
                                {
                                    text: "Ver servicios inscritos",
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
                        `Seleccionar servicio`,
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

        export const onPagarServicios = (msg: Message, update?: boolean) => {
            sendMessage(msg, update);
        }
    }

    export namespace eventHandlers {

        export const listen = () => {

            bot.on('callback_query', (msg: ApiMessage) => {
                if (!msg.data) {
                    return;
                }

                if (msg.data.indexOf(Contextos.Facturas.PagarServicio.pagarServicio) === 0) {
                    Metodos.onPagarServicios(msg.message);
                }
            });

            bot.on('inline_query', (msg: ApiMessage) => {

                if (!msg) {
                    return;
                }

                Data.Chats.getChatByUserId(msg.from.id).then((chat: ChatModel) => {

                    if (chat.contexto.indexOf(Contextos.Facturas.InscribirCuentaServicios.seleccionServicio) === 0) {

                    }
                });
            });

            bot.on('chosen_inline_result', (msg: ApiMessage) => {

                if (!msg) {
                    return;
                }

                
            });
        }
    }
}

PagarServicios.eventHandlers.listen();