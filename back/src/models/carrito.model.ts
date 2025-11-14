export class Carrito {
  id_carrito: number;
  id_usuario: number;
  creado_en?: Date;
  estado?: string;
}

export class CarritoProducto {
  id_detalle: number;
  id_carrito: number;
  id_producto: number;
  talle: string;
  cantidad: number;
  precio: number;
}
