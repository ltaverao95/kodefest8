import * as Data from '../../data';
import { ServicioModel, ChatModel } from "../../core/models";
import { Message } from "../../bot/Message";

export namespace InscribirCuentaServicios {

    export const getEmpresaServiciosByCliente = (chat: ChatModel): Promise<Array<ServicioModel>> => {

        return Data.EmpresaServicio.getEmpresaServicios(chat.id).then((empresaServicioResultList: Array<ServicioModel>) => {
            return Data.Clientes.getEmpresasInscritasFromCliente({
                chat: {
                    id: chat.id
                }
            } as Message).then((snapshot: any) => {
                let empresasInscritasByClienteResult = snapshot.val();
                let empresasInscritasByClienteList = new Array<ServicioModel>();

                if(!empresasInscritasByClienteResult){
                    empresasInscritasByClienteList = empresaServicioResultList;
                    return empresasInscritasByClienteList;
                }

                for (let empresaInscritaByClienteIndex in empresasInscritasByClienteResult) {
                    for (var i = 0; i < empresaServicioResultList.length; i++) {
                        if(empresasInscritasByClienteResult[empresaInscritaByClienteIndex].empresa === empresaServicioResultList[i].empresa){
                           continue; 
                        }
                        
                        empresasInscritasByClienteList.push(empresasInscritasByClienteResult[i] as ServicioModel);
                    }
                }

                return empresasInscritasByClienteList;
            });
        });
    }
}