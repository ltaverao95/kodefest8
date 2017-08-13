import { bot } from '../../initBot';
import * as Data from '../../data';

import { Message } from "../../bot/Message";
import { Comandos } from "../../core/constants";
import { ApiMessage } from "../../api/ApiMessage";
import { Contextos } from "../../core/index";
import { ReplyKeyboardMarkup } from "../../bot/ReplyKeyboardMarkup";
import { SendMessageOptions } from "../../bot/SendMessageOptions";

import { Validaciones } from "../../utils";

import {
    ChatModel,
    ProductoModel,
    ProductoBanco
} from "../../core/models";

export namespace AdquirirProducto {

    export enum Options {
        verProductosDisponibles = 'Ver productos disponibles'
    }

    export namespace Metodos {

        export const sendMessage = (msg: Message) => {
            Data.Chats.actualizarChat(msg, Contextos.AdquirirProducto.Index.index, Comandos.AdquirirProducto.Index.verProductosDisponibles).then(() => {

                const messageOptions = {
                    reply_markup: {
                        inline_keyboard: [
                            [
                                {
                                    text: Options.verProductosDisponibles,
                                    switch_inline_query_current_chat: Comandos.AdquirirProducto.Index.verProductosDisponibles
                                }
                            ]
                        ],
                    } as ReplyKeyboardMarkup
                } as SendMessageOptions;

                bot.sendMessage(
                    msg.chat.id,
                    `Selecciona uno de los productos disponibles`,
                    messageOptions
                );
            });
        }

        export const sendErrorMessage = (msg: Message, errorMessage: string) => {
            bot.sendMessage(msg.chat.id, `❌ ${errorMessage}`);
        }

        export const onAdquirirProducto = (msg: Message) => {
            sendMessage(msg);
        }
    }

    export namespace eventHandlers {

        export const listen = () => {

            bot.on('message', (msg: Message) => {

                if (!msg.text) {
                    return;
                }

                if (msg.text.indexOf(Comandos.PaginaInicial.MenuPrincipal.adquirirProducto) === 0) {
                    Metodos.onAdquirirProducto(msg);
                } else {
                    Data.Chats.getChatByUserId(msg.from.id).then((chat: ChatModel) => {

                        if (chat.contexto.indexOf(Contextos.AdquirirProducto.Index.index) === 0 &&
                            chat.comando.indexOf(Comandos.AdquirirProducto.Index.setSaldoInicial) === 0) {

                            if (!chat.datosComando) {
                                return;
                            }

                            if (Validaciones.esNumeroRequeridoValido(msg.text)) {
                                let saldo = parseFloat(msg.text);

                                if (saldo > 0) {
                                    Data.Productos.updateSaldoProducto(msg.from.id, chat.datosComando, saldo);
                                } else {
                                    Metodos.sendErrorMessage(msg, `El saldo inicial no puede ser negativo, por favor ingresa nuevamente el valor`);
                                }

                            } else {
                                Metodos.sendErrorMessage(msg, `El valor que ingresaste no es valido, por favor ingresa nuevamente el valor`);
                            };

                        }

                    });
                }

            });

            bot.on('inline_query', (msg: ApiMessage) => {

                if (!msg.query) {
                    return;
                }

                Data.Chats.getChatByUserId(msg.from.id).then((chat: ChatModel) => {

                    if (chat.contexto.indexOf(Contextos.AdquirirProducto.Index.index) === 0 &&
                        chat.comando.indexOf(Comandos.AdquirirProducto.Index.verProductosDisponibles) === 0) {

                        Data.Productos.getProductosPorAdquirirByClienteArticles(msg.from.id).then((productosPorAdquirir) => {
                            bot.answerInlineQuery(
                                msg.id,
                                productosPorAdquirir,
                                {
                                    cache_time: '10'
                                }
                            );
                        });
                    }
                });
            });

            bot.on('chosen_inline_result', (msg: ApiMessage) => {

                Data.Chats.getChatByUserId(msg.from.id).then((chat: ChatModel) => {

                    if (chat.contexto.indexOf(Contextos.AdquirirProducto.Index.index) === 0 &&
                        chat.comando.indexOf(Comandos.AdquirirProducto.Index.verProductosDisponibles) === 0) {

                        Data.Chats.guardarComandoByChatId(msg.from.id, Comandos.AdquirirProducto.Index.setSaldoInicial);

                        Data.Productos.saveProductosCliente(msg.from.id, {
                            idProducto: msg.result_id,
                            numero: Validaciones.generarGUID()
                        } as ProductoModel);

                        Data.Productos.getProductoClienteByProductoBancoId(msg.from.id, msg.result_id).then((productoCliente: ProductoModel) => {
                            Data.Chats.actualizarDatoComando(msg.from.id, productoCliente.id.toString());
                        });
                    }
                });
            });

        }
    }
}

AdquirirProducto.eventHandlers.listen();