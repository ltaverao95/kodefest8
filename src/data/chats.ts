import { Message } from "../bot/Message";
import { dataBase } from '../initDatabase';

import { Model } from "../core/models";

export namespace Chats {
    export const guardarContexto = (msg: Message, contexto: string): Promise<any> => {
        return dataBase.ref('chats/' + msg.chat.id + '/contexto').set(contexto);
    }

    export const guardarComando = (msg: Message, comando: string): Promise<any> => {
        return dataBase.ref('chats/' + msg.chat.id + '/comando').set(comando);
    }

    export const actualizarChat = (msg: Message, contexto: string, comando: string): Promise<any> => {
        return dataBase.ref('chats/' + msg.chat.id).set({
            contexto,
            comando
        });
    }

    export const guardarNuevaConfiguracionDeUsuario = (msg: Message): Promise<any> => {
        return dataBase.ref('chats/' + msg.chat.id).set({
            contexto: "",
            comando: ""
        });
    } 

    export const getChat = (msg: Message): Promise<Model.ChatModel> => {
        return dataBase.ref('chats/' + msg.chat.id).once('value')
            .then((snapshot: any) => {
                return snapshot.val();
            })
            .catch((error: any) => {
                console.log("Chats/getChat" + error);
            });
    }
}