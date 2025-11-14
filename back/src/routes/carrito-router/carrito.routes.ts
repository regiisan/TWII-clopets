import { Router } from "express";
import { CarritoController } from "../../controllers/carrito.controller.js";

const carritoRouter = Router();
const carritoController = new CarritoController();

carritoRouter.get('/', carritoController.getCarrito.bind(carritoController));
carritoRouter.post('/', carritoController.agregarProducto.bind(carritoController));
carritoRouter.put('/:id', carritoController.actualizarCantidad.bind(carritoController));
carritoRouter.delete('/:id', carritoController.eliminarProducto.bind(carritoController));
carritoRouter.delete('/', carritoController.vaciarCarrito.bind(carritoController));

export default carritoRouter;
