export interface Producto {
  id_producto: number;
  nombre: string;
  descripcion?: string | null;
  clasificacion: string; 
  animal: string;          
  precio: number;
  imagen_principal?: string | null;
  imagen_secundaria?: string | null;
}

export interface ProductosResponse {
  items: Producto[];
  total: number;
  page: number;
  pageSize: number;
}

export interface ProductosQuery {
  q?: string;
  clasificacion?: string[]; 
  animal?: string[];          
  precioMin?: number;
  precioMax?: number;
  sort?: 'price_asc'|'price_desc'|'newest';
  page?: number;
  pageSize?: number;
}
