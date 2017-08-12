import { Message } from "../bot/Message";
import { dataBase } from '../initDatabase';

import { ProductoModel } from "../core";

export namespace Productos {

    export const getProductosByCliente = (chatId: string | number): Promise<any> => {

        return dataBase.ref('productos').once('value')
            .then((snapshot: any) => {

                let productsResult = snapshot.val();

                console.log(JSON.stringify(snapshot));

                for (var i = 0; i < productsResult.length; i++) {
                    console.log(i);                    
                }

            })
            .catch((error: any) => {
                console.log("Productos/getProductosByCliente" + error);
            });


            
        /*
                //return dataBase.ref('clientes/' + chatId + '/productos').once('value')
                return dataBase.ref('clientes/123412344/productos').once('value')
                    .then((snapshot: any) => {
        
                        let productosCliente: Array<ProductoModel> = new Array<ProductoModel>();
        
                        for (var i = 0; i < array.length; i++) {
                            var element = array[i];
        
                        }
        
        
                        console.log(JSON.stringify(snapshot.val()));
                        //return snapshot.val();
                    })
                    .catch((error: any) => {
                        console.log("Productos/getProductosByCliente" + error);
                    });
                    */
    }
}