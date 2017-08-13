import { Message } from "../bot/Message";
import { dataBase } from '../initDatabase';
import { getListFromFirebaseObject } from './common';
import { ServicioModel, MovimientoModel } from "../core/models";

export namespace Movimientos {

    export const setMovimiento = (chatId: string | number, movimientoModel: MovimientoModel): Promise<Array<ServicioModel>> => {

        return dataBase.ref('movimientos/' + chatId).push(movimientoModel);
    }
}