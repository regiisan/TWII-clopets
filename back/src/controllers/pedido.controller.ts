import { type Request, type Response } from "express";
import { PedidoService } from "../services/pedido.service.js";
import { PedidoRepository } from "../repository/pedido.repository.js";
import { CarritoRepository } from "../repository/carrito.repository.js";

const pedidoRepository = new PedidoRepository();
const carritoRepository = new CarritoRepository();
const pedidoService = new PedidoService(pedidoRepository, carritoRepository);

export class PedidoController {

  constructor() { }

  public getPedidos = async (req: Request, res: Response) => {
    try {
      const id_usuario = Number(req.query.id_usuario);

      if (isNaN(id_usuario)) {
        return res.status(400).json({ message: "ID de usuario inválido" });
      }

      const pedidos = await pedidoService.obtenerPedidos(id_usuario);
      res.status(200).json(pedidos);
    } catch (error: any) {
      res.status(500).json({ message: "Error al obtener pedidos", error: error.message });
    }
  }

  public getPedido = async (req: Request, res: Response) => {
    try {
      const id_pedido = Number(req.params.id);
      const id_usuario = Number(req.query.id_usuario);

      if (isNaN(id_pedido) || isNaN(id_usuario)) {
        return res.status(400).json({ message: "Datos inválidos" });
      }

      const pedido = await pedidoService.obtenerPedido(id_pedido, id_usuario);
      res.status(200).json(pedido);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  public crearPedido = async (req: Request, res: Response) => {
    try {
      const { id_usuario, direccion_envio } = req.body;

      if (!id_usuario || !direccion_envio) {
        return res.status(400).json({ message: "Datos incompletos" });
      }

      const pedido = await pedidoService.crearPedido(id_usuario, direccion_envio);
      res.status(201).json(pedido);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }
}
