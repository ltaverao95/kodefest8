export namespace Constants {

    export enum TipoMovimientoEnum {
        TransferenciaAOtrasEntidades = 'Transferencia a otras entidades',
        TransferenciaDesdeOtrasEntidades = 'Transferencia desde otras entidades',
        PagoServicios = 'Pago servicios',
        PagoProducto = 'Pago producto'
    }

    export namespace Chat {

        export namespace Contextos {

            export namespace PaginaInicial {
                export const index = 'PaginaInicial/index';
                export const menuPrincipal = 'PaginaInicial/menuPrincipal';
            }

            export namespace Consultas {
                export const index = 'Consultas/index';
                export const saldos = 'Consultas/saldos';
                export const extracto = 'Consultas/extracto';
            }
        }

        export namespace Comandos {

            export namespace PaginaInicial {

                export namespace Index {
                    export const getUsuario = 'getUsuario';
                    export const getClave = 'getClave';
                }

                export namespace MenuPrincipal {
                    export const consultas = 'consultas';
                    export const facturas = 'facturas';
                    export const transferencias = 'transferencias';
                    export const configuracion = 'configuracion';
                }
            }

            export namespace Consultas {

            }
        }
    }
}

export const Contextos = Constants.Chat.Contextos;
export const Comandos = Constants.Chat.Comandos;