export interface Producto {
  id_producto: number;
  nombre: string;
  descripcion?: string | null;
  clasificacion: string;   // 'pañuelo' | 'sweater' (mapea 'pa_uelo' a 'pañuelo' si quisieras)
  animal: string;          // 'perro' | 'gato'
  precio: number;
  imagen_principal?: string | null;
  imagen_secundaria?: string | null;
  // producto_talle?: { talle: string }[] // si querés usarlo después
}

export interface ProductosResponse {
  items: Producto[];
  total: number;
  page: number;
  pageSize: number;
}

export interface ProductosQuery {
  q?: string;
  clasificacion?: string[];   // múltiples
  animal?: string[];          // múltiples
  precioMin?: number;
  precioMax?: number;
  sort?: 'price_asc'|'price_desc'|'newest';
  page?: number;
  pageSize?: number;
}
