import { Message } from "../../bot/Message";
import { ReplyKeyboardMarkup } from "../../bot/ReplyKeyboardMarkup";
import { SendMessageOptions } from "../../bot/SendMessageOptions";

import { bot } from '../../initBot';
import * as Data from '../../data';

import { ChatModel } from "../../core/models";
import {
    Contextos,
    Comandos,
} from '../../core';
import { ApiMessage } from "../../api/ApiMessage";

import { Index as ConsultasImpl } from '../consultas';

export namespace MenuPrincipal {

    export namespace Metodos {

        export const sendMessage = (msg: Message) => {
            Data.Chats.guardarContexto(msg,  Contextos.PaginaInicial.menuPrincipal).then(() => {
                    const messageOptions = {
                        reply_markup: {
                            one_time_keyboard:true,
                            keyboard: [
                                [
                                    {
                                        text: Comandos.PaginaInicial.MenuPrincipal.consultas,
                                        //callback_data: Opciones.Consultas
                                    }
                                ],
                                [
                                    {
                                        text: Comandos.PaginaInicial.MenuPrincipal.facturas,
                                        //callback_data: Opciones.Facturas
                                    }
                                ],
                                [
                                    {
                                        text: Comandos.PaginaInicial.MenuPrincipal.transferencias,
                                        //callback_data: Opciones.Transferencias,
                                    }
                                ],
                                [
                                    {
                                        text: Comandos.PaginaInicial.MenuPrincipal.configuracion,
                                        //callback_data: Opciones.Configuración,
                                    }
                                ]
                            ],
                        } as ReplyKeyboardMarkup
                    } as SendMessageOptions;

                    bot.sendMessage(
                        msg.chat.id,
                        `¿Qué quieres hacer?`,
                        messageOptions
                    );
                });
        }

        export const onMenuPrincipal = (msg: Message) => { 
            sendMessage(msg);
        }
    }    

    export namespace eventHandlers {

        export const listen = () => {

            bot.on('callback_query', (msg: ApiMessage) => {

                if (!msg.data) {
                    return;
                }

                if (msg.data.indexOf(Contextos.PaginaInicial.menuPrincipal) === 0) {
                    Metodos.onMenuPrincipal(msg.message);
                }
            });
        }
    }
}

MenuPrincipal.eventHandlers.listen();