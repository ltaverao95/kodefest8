import { Message } from "../../bot/Message";
import { ReplyKeyboardMarkup } from "../../bot/ReplyKeyboardMarkup";
import { SendMessageOptions } from "../../bot/SendMessageOptions";

import { bot } from '../../initBot';
import * as Data from '../../data';
import {
    Contextos,
    Comandos
} from '../../core';

export namespace Extracto {

    export enum ReplyKeyBoardOptions {
        Ene = 'Ene',
        Feb = 'Feb',
        Mar = 'Mar',
        Abr = 'Abr',
        May = 'May',
        Jun = 'Jun',
        Jul = 'Jul',
        Ago = 'Ago',
        Sep = 'Sep',
        Oct = 'Oct',
    }

    export enum InlineKeyBoardOptions {
        Volver = 'Volver',
    }
}