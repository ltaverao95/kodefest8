import { Message } from "../../bot/Message";
import { ReplyKeyboardMarkup } from "../../bot/ReplyKeyboardMarkup";
import { SendMessageOptions } from "../../bot/SendMessageOptions";

import { bot } from '../../initBot';
import * as Data from '../../data';

import { ChatModel } from "../../core/models";
import {
    Contextos,
    Comandos,
    ServicioModel
} from '../../core';
import { ApiMessage } from "../../api/ApiMessage";
import { EditMessageTextOptions } from "../../bot/EditMessageTextOptions";
import { InlineKeyboardMarkup } from "../../bot/InlineKeyboardMarkup";

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

                    if (chat.contexto.indexOf(Contextos.Facturas.PagarServicio.pagarServicio) === 0) {
                        Data.Clientes.getEmpresasInscritasFromCliente({ chat: { id: msg.from.id } } as Message).then((empresasInscritasByCliente: Array<ServicioModel>) => {

                            let serviciosInscritosList = [];

                            if (empresasInscritasByCliente.length == 0) {
                                return;
                            }

                            for (var i = 0; i < empresasInscritasByCliente.length; i++) {

                                serviciosInscritosList.push({
                                    id: !empresasInscritasByCliente[i].id ? '' : empresasInscritasByCliente[i].id,
                                    type: 'article',
                                    title: !empresasInscritasByCliente[i].nombre ? '' : empresasInscritasByCliente[i].nombre,
                                    description: !empresasInscritasByCliente[i].descripcion ? '' : empresasInscritasByCliente[i].descripcion,
                                    input_message_content: {
                                        message_text: `${!empresasInscritasByCliente[i].nombre ? '' : empresasInscritasByCliente[i].nombre} seleccionada`
                                    },
                                    thumb_url: !empresasInscritasByCliente[i].icono ? '' : empresasInscritasByCliente[i].icono
                                });
                            }

                            bot.answerInlineQuery(msg.id, serviciosInscritosList, {
                                cache_time: '10'
                            });
                        });
                    }
                });
            });

            bot.on('chosen_inline_result', (msg: ApiMessage) => {

                if (!msg) {
                    return;
                }

                if (!msg.result_id) {
                    return;
                }

                Data.Chats.getChatByUserId(msg.from.id).then((chat: ChatModel) => {

                    if (chat.contexto.indexOf(Contextos.Facturas.PagarServicio.pagarServicio) === 0) {
                        Data.EmpresaServicio.getEmpresaServiciosById(msg.from.id, msg.result_id).then((snapshot: any) => {
                            if (!snapshot.val()) {
                                return;
                            }

                            Data.Clientes.setEmpresasInscritasToCliente({
                                chat: {
                                    id: msg.from.id
                                }
                            } as Message, msg.result_id, snapshot.val())
                        });
                    }
                });
            });
        }
    }
}

PagarServicios.eventHandlers.listen();