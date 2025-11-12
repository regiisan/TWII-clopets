import { Router } from "express";
import { PedidoController } from "../../controllers/pedido.controller.js";

const pedidoRouter = Router();
const pedidoController = new PedidoController();

pedidoRouter.get('/', pedidoController.getPedidos.bind(pedidoController));
pedidoRouter.get('/:id', pedidoController.getPedido.bind(pedidoController));
pedidoRouter.post('/', pedidoController.crearPedido.bind(pedidoController));

export default pedidoRouter;
