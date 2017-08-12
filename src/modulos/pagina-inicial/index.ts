import { bot } from '../../initBot';
import * as Data from '../../data';

import { Message } from "../../bot/Message";
import { SendMessageOptions } from "../../bot/SendMessageOptions";

import { Model } from "../../core/models";
import {
    Contextos,
    Comandos
} from '../../core';
import { Validaciones } from '../../utils';

import { MenuPrincipal as MenuPrincipalImpl } from './menu-principal';

export namespace index {

    export namespace messages {

        const messageOptions = {
            parse_mode: 'HTML'
        } as SendMessageOptions;

        export const sendMessage = (msg: Message) => {
            bot.sendMessage(
                msg.chat.id,
                `✅ Ahora ingresa tu clave de acceso (Contraseña: 123)`,
                messageOptions
            );
        };
    }

    export namespace eventHandlers {

        export const listen = () => {

            bot.on('message', (msg: Message) => {

                if (!msg.text) {
                    return;
                }

                Data.Chats.getChat(msg).then((chat: Model.ChatModel) => {
                    if (chat.contexto == Contextos.PaginaInicial.index
                        && chat.comando == Comandos.PaginaInicial.Index.getClave) {
                        if (Validaciones.esNumeroRequeridoValido(msg.text)) {
                            if (msg.text === "123") {
                                MenuPrincipalImpl.Metodos.sendMessage(msg);
                            } else {
                                enviarMensajeClaveIncorrecta(msg);
                            }
                        } else {
                            enviarMensajeClaveInvalida(msg);
                        }
                    }
                });
            });
        }

        const enviarMensajeClaveIncorrecta = (msg: Message) => {
            bot.sendMessage(
                msg.chat.id,
                `❌ La contraseña que ingresaste es incorrecta, vuelve a intentarlo.`
            );
        };

        const enviarMensajeClaveInvalida = (msg: Message) => {
            bot.sendMessage(
                msg.chat.id,
                `❌ La contraseña que ingresaste no es válida, esta debe tener sólo números.`
            );
        };
    }
}

index.eventHandlers.listen();