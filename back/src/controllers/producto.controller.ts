import { type Request, type Response } from "express";
import { ProductoService } from "../services/producto.service.js";
import { ProductoRepository } from "../repository/producto.repository.js";

const productoRepository = new ProductoRepository();
const productoService = new ProductoService(productoRepository);

export class ProductoController {

  constructor() {}

  public getProductos = async (req: Request, res: Response) => {
    try {
      const productos = await productoService.obtenerProductos();
      res.status(200).json(productos);
    } catch (error) {
      res.status(500).json({ message: "Error al obtener los productos", error });
    }
  };
}
