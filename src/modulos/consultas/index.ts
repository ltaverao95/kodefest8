//export * from './index';
export * from './extracto';

import { bot } from '../../initBot';

import { ApiMessage } from "../../api/ApiMessage";
import { Message } from "../../bot/Message";
import { SendMessageOptions } from "../../bot/SendMessageOptions";
import { ReplyKeyboardMarkup } from "../../bot/ReplyKeyboardMarkup";
import { InlineKeyboardButton } from "../../bot/InlineKeyboardButton";

import { Constants as CoreConstants } from "../../core";

import * as Data from '../../data';

export namespace Consultas {

    export enum InlineKeyBoardOptions {
        Saldos = 'Saldos',
        Extracto = 'Extracto',
        Movimientos = 'Movimientos',
        Volver = "Volver"
    }


    export namespace Metodos {

        export const sendMessage = (msg: Message) => {
            Data.Chats.guardarContexto(msg, CoreConstants.Chat.Contextos.Consultas.Index.index).then(() => {
                const messageOptions = {
                    reply_markup: {
                        inline_keyboard: [
                            [
                                {
                                    text: InlineKeyBoardOptions.Saldos,
                                    callback_data: CoreConstants.Chat.Contextos.Consultas.Saldos.saldos
                                } as InlineKeyboardButton
                            ],
                            [
                                {
                                    text: InlineKeyBoardOptions.Extracto,
                                    callback_data: CoreConstants.Chat.Contextos.Consultas.Extracto.operacionProducto
                                } as InlineKeyboardButton
                            ],
                            [
                                {
                                    text: InlineKeyBoardOptions.Movimientos,
                                    callback_data: ''
                                } as InlineKeyboardButton
                            ],
                            [
                                {
                                    text: InlineKeyBoardOptions.Volver,
                                    callback_data: CoreConstants.Chat.Contextos.PaginaInicial.menuPrincipal
                                } as InlineKeyboardButton
                            ]
                        ]
                    } as ReplyKeyboardMarkup
                } as SendMessageOptions;

                bot.sendMessage(
                    msg.chat.id,
                    `Elige una operación`,
                    messageOptions
                );
            });
        }
    }
}