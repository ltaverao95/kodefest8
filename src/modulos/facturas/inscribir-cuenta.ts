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
                                    text: "Ver servicios no inscritos",
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

                Data.Chats.getChatByUserId(msg.from.id).then((chat: ChatModel) => {

                    if (chat.contexto.indexOf(Contextos.Facturas.InscribirCuentaServicios.seleccionServicio) === 0) {

                        InscribirCuentaServicios.getEmpresaServiciosByCliente(chat).then((serviciosResponseList: Array<ServicioModel>) => {

                            let serviciosInscritosList = [];

                            for (var i = 0; i < serviciosResponseList.length; i++) {
                                serviciosInscritosList.push({
                                    id: (i + 1).toString(),
                                    type: 'article',
                                    title: serviciosResponseList[i].empresa,
                                    description: serviciosResponseList[i].descripcion,
                                    input_message_content: {
                                        message_text:`${serviciosResponseList[i].empresa} seleccionada`
                                    },
                                    thumb_url: serviciosResponseList[i].icono
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

                console.log(msg);

                Data.EmpresaServicio.getEmpresaServiciosById(msg.from.id, msg.result_id).then((snapshot: any) => {
                    if(!snapshot.val()){
                        return;
                    }

                    Data.Clientes.setEmpresasInscritasToCliente({
                        chat: {
                            id: msg.from.id
                        }
                    } as Message, msg.result_id, snapshot.val())
                });
            });
        }
    }
}

InscribirCuentaServicio.eventHandlers.listen();