import { bot } from '../initBot';
import * as Data from '../data';

import { Message } from "../bot/Message";
import { SendMessageOptions } from "../bot/SendMessageOptions";

import { Model } from "../core/models";
import {
    Contextos,
    Comandos
} from '../core';
import { Validaciones } from '../utils';

import { index as paginaInicialIndex } from './pagina-inicial';

export namespace index {

    export namespace messages {

        const messageOptions = {
            parse_mode: 'HTML'
        } as SendMessageOptions;

        export const sendMessage = (msg: Message) => {
            bot.sendMessage(
                msg.chat.id,
                `Hola <b>${msg.from.first_name}</b>, bienvenido al banco KodeFest8, por favor ingresa tu identificación`,
                messageOptions
            );
        };
    }

    export namespace eventHandlers {

        export const listen = () => {

            bot.onText(/^\/start$/, (msg: Message, match: any) => {

                Data.Chats.actualizarChat(msg, 
                                          Contextos.PaginaInicial.index, 
                                          Comandos.PaginaInicial.Index.getUsuario).then(() => {
                    messages.sendMessage(msg);
                });
            });

            bot.on('message', (msg: Message) => {

                if (!msg.text) {
                    return;
                }

                if (msg.text === '/start') {
                    return;
                }

                Data.Chats.getChat(msg).then((chat: Model.ChatModel) => {
                    if (chat.contexto == Contextos.PaginaInicial.index
                        && chat.comando == Comandos.PaginaInicial.Index.getUsuario) {
                        if (Validaciones.esNumeroRequeridoValido(msg.text)) {
                            Data.Clientes.actualizarDocumento(msg, parseInt(msg.text)).then(() => {
                                solicitarClave(msg);
                            });
                        } else {
                            enviarMensajeIdentificacionInvalido(msg);
                        }
                    }
                });
            });
        }

        const enviarMensajeIdentificacionInvalido = (msg: Message) => {
            bot.sendMessage(
                msg.chat.id,
                `❌ La identificación que ingresaste no es válida, esta debe tener sólo números.`
            );
        };

        const solicitarClave = (msg: Message) => {

            Data.Chats.actualizarChat(msg, 
                                      Contextos.PaginaInicial.index, 
                                      Comandos.PaginaInicial.Index.getClave).then(() => {
                paginaInicialIndex.messages.sendMessage(msg);
            });
        };
    }
}

index.eventHandlers.listen();