export type Clasificacion = "pañuelo" | "sweater";
export type Animal = "perro" | "gato";

export interface ProductoFilter {
  clasificacion?: Clasificacion;
  animal?: Animal;
  minPrecio?: number;
  maxPrecio?: number;
}