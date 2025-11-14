// enums (según tu dominio actual)
export type Clasificacion = 'pañuelo' | 'sweater';
export type Animal        = 'perro'   | 'gato';

// Filtro ampliado a múltiples valores
export interface ProductoFilter {
  q?: string;
  clasificacion?: Clasificacion[];   // ← múltiple
  animal?: Animal[];                 // ← múltiple
  minPrecio?: number;
  maxPrecio?: number;
  sort?: 'price_asc' | 'price_desc' | 'newest';
  page?: number;
  pageSize?: number;
}
