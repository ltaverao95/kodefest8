import { Message } from "../bot/Message";
import { dataBase } from '../initDatabase';

export namespace Chats {
    export const guardarContexto = (msg: Message, contexto: string): Promise<any> => {
        return dataBase.ref('chats/' + msg.chat.id + '/contexto').set(contexto);
    }

    export const guardarComando = (msg: Message, comando: string): Promise<any> => {
        return dataBase.ref('chats/' + msg.chat.id + '/comando').set(comando);
    }

    export const guardarNuevaConfiguracionDeUsuario = (msg: Message): Promise<any> => {
        return dataBase.ref('chats/' + msg.chat.id).set({
            contexto: "",
            comando: ""
        });
    } 
}