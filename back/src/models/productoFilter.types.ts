import { clasificacion, animal } from "@prisma/client";

export interface ProductoFilter {
  clasificacion?: clasificacion;
  animal?: animal;
  minPrecio?: number;
  maxPrecio?: number;
}