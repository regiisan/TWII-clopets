// src/controllers/producto.controller.ts
import { type Request, type Response } from "express";
import { ProductoService } from "../services/producto.service.js";
import { ProductoRepository } from "../repository/producto.repository.js";
import type {
  ProductoFilter,
  Clasificacion,
  Animal,
} from "../models/productoFilter.model.js";

const productoService = new ProductoService(new ProductoRepository());


const CLASIFICACIONES: readonly Clasificacion[] = ["pañuelo", "sweater"] as const;
const ANIMALES: readonly Animal[] = ["perro", "gato"] as const;


const toArray = (v: unknown): string[] | undefined =>
  typeof v === "string"
    ? v.split(",").map(s => s.trim()).filter(Boolean)
    : Array.isArray(v)
      ? (v as string[]).filter(Boolean)
      : undefined;


const isClasificacion = (x: string): x is Clasificacion =>
  (CLASIFICACIONES as readonly string[]).includes(x);


const isAnimal = (x: string): x is Animal =>
  (ANIMALES as readonly string[]).includes(x);

export class ProductoController {
  constructor() {}

  public getProductos = async (req: Request, res: Response) => {
    try {
      const q = (req.query.q as string | undefined)?.trim() || undefined;

      
      const rawClasif = toArray(req.query.clasificacion);
      const rawAnimal = toArray(req.query.animal);

      
      const clasificacion = rawClasif?.filter(isClasificacion);
      const animal        = rawAnimal?.filter(isAnimal);

      const minPrecio = req.query.precioMin ? Number(req.query.precioMin) : undefined;
      const maxPrecio = req.query.precioMax ? Number(req.query.precioMax) : undefined;

      const sort = (req.query.sort as "price_asc" | "price_desc" | "newest" | undefined) ?? "newest";
      const page = req.query.page ? Math.max(1, Number(req.query.page)) : 1;
      const pageSize = req.query.pageSize ? Math.min(60, Math.max(1, Number(req.query.pageSize))) : 12;

      const filters: ProductoFilter = {
        q,
        clasificacion,   
        animal,          
        minPrecio,
        maxPrecio,
        sort,
        page,
        pageSize,
      };

      const data = await productoService.obtenerProductos(filters);
      res.status(200).json(data);
    } catch (error) {
      res.status(500).json({ message: "Error al obtener los productos", error });
    }
  };

  public getFacetas = async (_req: Request, res: Response) => {
    try {
      const f = await productoService.obtenerFacetas();
      res.status(200).json(f);
    } catch (error) {
      res.status(500).json({ message: "Error al obtener facetas", error });
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
