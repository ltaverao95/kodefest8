export namespace Constants {

    export enum TipoMovimientoEnum {
        TransferenciaAOtrasEntidades = 'Transferencia a otras entidades',
        TransferenciaDesdeOtrasEntidades = 'Transferencia desde otras entidades',        
        PagoServicios = 'Pago servicios',
        PagoProducto = 'Pago producto'
    }

    export namespace Chat {

        export namespace Contexto {
            
            export namespace PaginaInicial {
                export const Inicio = 'Inicio';
                export const Acceso = 'Acceso';
                export const MenuPrincipal = 'MenuPrincipal';
            }
            
            export namespace Consultas {
                export const Inicio = 'Inicio';
                export const Saldos = 'Saldos';
                export const OperacionProducto = 'OperacionProducto';
                export const SeleccionMes = 'SeleccionMes';
                export const Reporte = 'Reporte';
            }
        }

        export namespace Comando {

        }
    }
}

export const Contexto = Constants.Chat.Contexto;
//export const Commands = Constants.Chat.Command;