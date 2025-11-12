import { type Request, type Response } from "express";
import { CarritoService } from "../services/carrito.service.js";
import { CarritoRepository } from "../repository/carrito.repository.js";
import { ProductoRepository } from "../repository/producto.repository.js";

const carritoRepository = new CarritoRepository();
const productoRepository = new ProductoRepository();
const carritoService = new CarritoService(carritoRepository, productoRepository);

export class CarritoController {

  constructor() { }

  public getCarrito = async (req: Request, res: Response) => {
    try {
      const id_usuario = Number(req.query.id_usuario);

      if (isNaN(id_usuario)) {
        return res.status(400).json({ message: "ID de usuario inválido" });
      }

      const carrito = await carritoService.obtenerCarrito(id_usuario);
      res.status(200).json(carrito);
    } catch (error: any) {
      res.status(500).json({ message: "Error al obtener el carrito", error: error.message });
    }
  }

  public agregarProducto = async (req: Request, res: Response) => {
    try {
      const { id_usuario, id_producto, talle, cantidad } = req.body;

      if (!id_usuario || !id_producto || !talle || !cantidad) {
        return res.status(400).json({ message: "Datos incompletos" });
      }

      await carritoService.agregarProducto(id_usuario, id_producto, talle, cantidad);
      res.status(201).json({ message: "Producto agregado al carrito" });
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  public actualizarCantidad = async (req: Request, res: Response) => {
    try {
      const id_detalle = Number(req.params.id);
      const { id_usuario, cantidad } = req.body;

      if (isNaN(id_detalle) || !id_usuario || !cantidad) {
        return res.status(400).json({ message: "Datos inválidos" });
      }

      await carritoService.actualizarCantidad(id_usuario, id_detalle, cantidad);
      res.status(200).json({ message: "Cantidad actualizada" });
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  public eliminarProducto = async (req: Request, res: Response) => {
    try {
      const id_detalle = Number(req.params.id);
      const id_usuario = Number(req.query.id_usuario);

      if (isNaN(id_detalle) || isNaN(id_usuario)) {
        return res.status(400).json({ message: "Datos inválidos" });
      }

      await carritoService.eliminarProducto(id_usuario, id_detalle);
      res.status(200).json({ message: "Producto eliminado del carrito" });
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  public vaciarCarrito = async (req: Request, res: Response) => {
    try {
      const id_usuario = Number(req.query.id_usuario);

      if (isNaN(id_usuario)) {
        return res.status(400).json({ message: "ID de usuario inválido" });
      }

      await carritoService.vaciarCarrito(id_usuario);
      res.status(200).json({ message: "Carrito vaciado" });
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }
}
