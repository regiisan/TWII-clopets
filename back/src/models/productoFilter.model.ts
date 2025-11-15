export type Clasificacion = 'pañuelo' | 'sweater' | 'bota' | 'campera' | 'buzo' | 'collar' | 'remera';
export type Animal        = 'perro'   | 'gato';

export interface ProductoFilter {
  q?: string;
  clasificacion?: Clasificacion[];   
  animal?: Animal[];                 
  minPrecio?: number;
  maxPrecio?: number;
  sort?: 'price_asc' | 'price_desc' | 'newest';
  page?: number;
  pageSize?: number;
}
