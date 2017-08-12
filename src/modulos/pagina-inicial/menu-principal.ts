import { Message } from "../../bot/Message";
import { ReplyKeyboardMarkup } from "../../bot/ReplyKeyboardMarkup";
import { SendMessageOptions } from "../../bot/SendMessageOptions";

import { bot } from '../../initBot';
import * as Data from '../../data';

import { Model } from "../../core/models";
import {
    Contextos,
    Comandos,
} from '../../core';
import { ApiMessage } from "../../api/ApiMessage";

import { Index as ConsultasImpl } from '../consultas';

export namespace MenuPrincipal {

    export enum Opciones {
        Consultas = '🔍 Consultas',
        Facturas = '📄 Facturas',
        Transferencias = '💳 Transferencias',
        Configuración = '⚙️ Configuración'
    }

    export const sendMessage = (msg: Message) => {
        Data.Chats.guardarContexto(msg,
            Contextos.PaginaInicial.menuPrincipal).then(() => {
                const messageOptions = {
                    reply_markup: {
                        inline_keyboard: [
                            [
                                {
                                    text: Opciones.Consultas,
                                    callback_data: Opciones.Consultas
                                }
                            ],
                            [
                                {
                                    text: Opciones.Facturas,
                                    callback_data: Opciones.Facturas
                                }
                            ],
                            [
                                {
                                    text: Opciones.Transferencias,
                                    callback_data: Opciones.Transferencias,
                                }
                            ],
                            [
                                {
                                    text: Opciones.Configuración,
                                    callback_data: Opciones.Configuración,
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
    };

    export namespace eventHandlers {

        export const listen = () => {

            bot.on('callback_query', (msg: ApiMessage) => {

                if (!msg.data) {
                    return;
                }

                if (msg.data.indexOf(Opciones.Consultas) === 0) {
                    onIrAConsultas(msg);
                }
                else if (msg.data.indexOf(Opciones.Facturas) === 0) {
                    onIrAFacturas(msg);
                }
                else if (msg.data.indexOf(Opciones.Transferencias) === 0) {
                    onIrATransferencias(msg);
                } else if (msg.data.indexOf(Opciones.Configuración) === 0) {
                    onIrAConfiguracion(msg);
                }
            });

            bot.on('message', (msg: Message) => {

                if (!msg.text) {
                    return;
                }
            });
        }

        const onIrAConsultas = (msg: ApiMessage) => {
            Data.Chats.guardarComando(msg.message, Comandos.PaginaInicial.MenuPrincipal.consultas).then(() => {
                ConsultasImpl.Metodos.sendMessage(msg.message);
            });
        }

        const onIrAFacturas = (msg: ApiMessage) => {
            Data.Chats.guardarComando(msg.message, Comandos.PaginaInicial.MenuPrincipal.facturas).then(() => {
                console.log('Facturas...');
            });
        }

        const onIrATransferencias = (msg: ApiMessage) => {
            Data.Chats.guardarComando(msg.message, Comandos.PaginaInicial.MenuPrincipal.transferencias).then(() => {
                console.log('Transferencias...');
            });
        }

        const onIrAConfiguracion = (msg: ApiMessage) => {
            Data.Chats.guardarComando(msg.message, Comandos.PaginaInicial.MenuPrincipal.configuracion).then(() => {
                console.log('Configuracion...');
            });
        }
    }
}

MenuPrincipal.eventHandlers.listen();