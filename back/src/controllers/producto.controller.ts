import { type Request, type Response } from "express";
import { ProductoService } from "../services/producto.service.js";
import { ProductoRepository } from "../repository/producto.repository.js";
import type {
  ProductoFilter,
  Clasificacion,
  Animal,
} from "../models/productoFilter.model.js";

const productoRepository = new ProductoRepository();
const productoService = new ProductoService(productoRepository);

export class ProductoController {
  constructor() {}

  public getProductos = async (req: Request, res: Response) => {
    try {
      const { clasificacion, animal, precioMin, precioMax } = req.query;

      const filters: ProductoFilter = {
        ...(clasificacion && { clasificacion: clasificacion as Clasificacion }),
        ...(animal && { animal: animal as Animal }),
        ...(precioMin && { minPrecio: parseFloat(precioMin as string) }),
        ...(precioMax && { maxPrecio: parseFloat(precioMax as string) }),
      };

      const productos = await productoService.obtenerProductos(filters);
      res.status(200).json(productos);
    } catch (error) {
      res.status(500).json({ message: "Error al obtener los productos", error });
    }
  };

  public getProductoPorId = async (req: Request, res: Response) => {
    try {
      const id = Number(req.params.id);
      const producto = await productoService.obtenerProductoPorId(id);
      if (!producto) {
        return res.status(404).json({ message: "Producto no encontrado" });
      }
      res.status(200).json(producto);
    } catch (error) {
      res.status(500).json({ message: "Error al obtener el producto", error });
    }
  };
  
}
