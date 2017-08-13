import { Message } from "../bot/Message";
import { dataBase } from '../initDatabase';
import { ServicioModel } from "../core/models";

export namespace EmpresaServicio {

    export const getEmpresaServicios = (chatId: string | number): Promise<Array<ServicioModel>> => {

        return dataBase.ref('empresaServicio').once('value')
            .then((snapshot: any) => {

                let empresaServicioResult = snapshot.val();
                let empresaServicioResultList = new Array<ServicioModel>();

                if(!empresaServicioResult){
                    return empresaServicioResultList;
                }

                for (let i in empresaServicioResult) {
                    empresaServicioResultList.push({
                        empresa: empresaServicioResult[i].nombre,
                        ...empresaServicioResult[i]
                    } as ServicioModel);       
                }

                return empresaServicioResultList;
            })
            .catch((error: any) => {
                console.log("EmpresaServicio/getEmpresaServicios" + error);
            });
    }
}