import * as Data from '../../data';
import { ServicioModel, ChatModel } from "../../core/models";
import { Message } from "../../bot/Message";

export namespace InscribirCuentaServicios {

    export const getEmpresaServiciosByCliente = (chatId: number | string): Promise<Array<ServicioModel>> => {

        return Data.EmpresaServicio.getEmpresaServicios(chatId).then((ListaEmpresaDeServicios: Array<ServicioModel>) => {
            return Data.Clientes.getEmpresasInscritasFromCliente({
                chat: {
                    id: chatId
                }
            } as Message).then((snapshot: any) => {
                let ListaEmpresasDeServiciosAsociadosACliente = snapshot.val();
                let empresasInscritasByClienteList = new Array<ServicioModel>();

                if (!ListaEmpresasDeServiciosAsociadosACliente) {
                    empresasInscritasByClienteList = ListaEmpresaDeServicios;
                    return empresasInscritasByClienteList;
                }

                for (let i = 0; i < ListaEmpresaDeServicios.length; i++) {

                    let result = ListaEmpresasDeServiciosAsociadosACliente.find((empresa: any) => empresa.nombre === ListaEmpresaDeServicios[i].empresa);
                    if(result){
                        empresasInscritasByClienteList.push({
                            empresa: "dummy"
                        } as ServicioModel);
                        continue;
                    }

                    empresasInscritasByClienteList.push(ListaEmpresaDeServicios[i]);
                }

                return empresasInscritasByClienteList;
            });
        });
    }
}