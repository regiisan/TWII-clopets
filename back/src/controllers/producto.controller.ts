import { type Request, type Response } from "express";
import { ProductoService } from "../services/producto.service.js";
import { ProductoRepository } from "../repository/producto.repository.js";
import type { clasificacion as ClasificacionEnum, animal as AnimalEnum} from "@prisma/client";
import type { ProductoFilter } from "../models/productoFilter.types.js";

const productoRepository = new ProductoRepository();
const productoService = new ProductoService(productoRepository);

export class ProductoController {
  constructor() {}

  public getProductos = async (req: Request, res: Response) => {
    try {
      const { clasificacion, animal, precioMin, precioMax } = req.query;

      const filters: ProductoFilter = {
        ...(clasificacion && { clasificacion: clasificacion as ClasificacionEnum}),
        ...(animal && { animal: animal as AnimalEnum }),
        ...(precioMin && { minPrecio: parseFloat(precioMin as string) }),
        ...(precioMax && { maxPrecio: parseFloat(precioMax as string) }),
      };

      const productos = await productoService.obtenerProductos(filters);
      res.status(200).json(productos);
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error al obtener los productos", error });
    }
  };
}
