import { bot } from '../initBot';

import { Message } from "../bot/Message";
import { SendMessageOptions } from "../bot/SendMessageOptions";

import * as Data from '../data';

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

                Data.Chats.guardarNuevaConfiguracionDeUsuario(msg).then(() => {
                    messages.sendMessage(msg);
                });
            });
        }
    }
}

index.eventHandlers.listen();