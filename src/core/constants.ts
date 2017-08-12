export namespace Constants {

    export enum TipoMovimientoEnum {
        TransferenciaAOtrasEntidades = 'Transferencia a otras entidades',
        TransferenciaDesdeOtrasEntidades = 'Transferencia desde otras entidades',
        PagoServicios = 'Pago servicios',
        PagoProducto = 'Pago producto'
    }

    export enum ProductosEnum {
        CuentaDeAhorros = 'Cuenta de ahorros',
        TarjetaDeCredito = 'Tarjeta de crédito',
        CuentaCorriente = 'Cuenta corriente',
        TarjetaDebito = 'Tarjeta débito'
    }

    export enum IconosEnum {
        CuentaDeAhorros = 'CuentaDeAhorros.png',
        TarjetaDeCredito = 'TarjetaDeCredito.png',
        CuentaCorriente = 'CuentaCorriente.png',
        TarjetaDebito = 'TarjetaDebito.png'
    }
    
    export namespace Chat {

        export namespace Contextos {

            export namespace PaginaInicial {
                export const index = 'PaginaInicial/index';
                export const menuPrincipal = 'PaginaInicial/menuPrincipal';
            }

            export namespace Consultas {

                export namespace Index {
                    export const index = 'Consultas/index';
                }

                export namespace Saldos {
                    export const saldos = 'Consultas/saldos';
                }

                export namespace Extracto {
                    export const operacionProducto = 'Consultas/Extracto/operacionProducto';
                    export const seleccionMes = 'Consultas/Extracto/seleccionMes';
                    export const reporte = 'Consultas/Extracto/reporte';
                }                                                
            }
        }

        export namespace Comandos {

            export namespace PaginaInicial {
                export namespace Index {
                    export const getUsuario = 'getUsuario';
                    export const getClave = 'getClave';
                }
                export namespace MenuPrincipal {
                    export const consultas = '🔍 Consultas';
                    export const facturas = '📄 Facturas';
                    export const transferencias = '💳 Transferencias';
                    export const configuracion = '⚙️ Configuración';
                }
            }

            export namespace Consultas {
                export namespace Index {
                    export const saldos = 'saldos';
                    export const extracto = 'extracto';
                    export const movimientos = 'movimientos';
                    export const volver = 'volver';
                }
                export namespace Saldos {
                    export const volver = 'volver';
                }
                export namespace Extracto {
                    export const ene = 'ene';
                    export const feb = 'feb';
                    export const abr = 'abr';
                    export const may = 'may';
                    export const jun = 'jun';
                    export const jul = 'jul';
                    export const ago = 'ago';
                    export const sep = 'sep';
                    export const oct = 'oct';
                    export const nov = 'nov';
                    export const dic = 'dic';
                    export const volver = 'volver';
                }                
            }
        }
    }

    export const RUTA_SERVIDOR = '';
}

export const Contextos = Constants.Chat.Contextos;
export const Comandos = Constants.Chat.Comandos;