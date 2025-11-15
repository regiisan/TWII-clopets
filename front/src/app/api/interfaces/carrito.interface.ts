// src/app/api/interfaces/carrito.interface.ts

export interface CarritoProductoBackend {
  id_detalle: number;
  id_carrito: number;
  id_producto: number;
  talle: string;
  cantidad: number;
  precio: number;
  producto_talle: {
    talle: string;
    producto: {
      id_producto: number;
      nombre: string;
      imagen_principal: string | null;
    };
  };
}

export interface CarritoBackend {
  id_carrito: number;
  id_usuario: number;
  estado: string;
  creado_en?: string;
  carrito_producto: CarritoProductoBackend[];
}

export interface CarritoItem {
  id_detalle: number;
  talle: string;
  cantidad: number;
  precio: number;
  subtotal: number;
  producto: {
    id_producto: number;
    nombre: string;
    imagen_principal: string | null;
  };
}

export interface CarritoUI {
  id_carrito: number;
  items: CarritoItem[];
  totalItems: number;
  totalAmount: number;
}
