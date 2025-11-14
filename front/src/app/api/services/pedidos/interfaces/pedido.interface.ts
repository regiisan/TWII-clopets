import { Producto } from "../../productos/interfaces/producto.interface";

export interface Pedido{
    id_pedido: number;
    id_usuario: number;
    total: number;
    fecha: string;
    estado: string;
    direccion_envio: string;
    productos?: PedidoProducto[];
}

export interface PedidoProducto {
    id_detalle: number;
    id_pedido: number;
    id_producto: number;
    talle: string;
    cantidad: number;
    precio: number;
    producto?: Producto;
}