export class Pedido {
  id_pedido: number;
  id_usuario: number;
  total: number;
  fecha?: Date;
  estado?: string;
  direccion_envio?: string;
}

export class PedidoProducto {
  id_detalle: number;
  id_pedido: number;
  id_producto: number;
  talle: string;
  cantidad: number;
  precio: number;
}
