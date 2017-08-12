import { InlineKeyboardMarkup } from "./InlineKeyboardMarkup";
import { SendMessageOptions } from "./SendMessageOptions";
import { Message } from "./Message";
import { ApiMessage } from "../api/ApiMessage";

export interface TelegramBot {

    /**
     * https://github.com/yagop/node-telegram-bot-api/blob/release/doc/api.md#TelegramBot+sendMessage
     * https://core.telegram.org/bots/api#message
     * @param chatId 
     * @param text 
     * @param options 
     */

    sendMessage(chatId: number | string, text: string, options?: SendMessageOptions): Promise<any>;
    onText(regexp: any, callback: ((msg: any, match: any[]) => void)): void;
    on(eventName: string, callback: ((msg: Message | ApiMessage) => void)): void;
    setWebHook(url: string, options?: any): Promise<any>;
    answerCallbackQuery(chatId: number | string, text: string, inline:boolean): Promise<any>;
    
}