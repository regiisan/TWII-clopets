import { Router } from "express";
import { ProductoController } from "../../controllers/producto.controller.js";

const productoRouter = Router();
const productoController = new ProductoController();

productoRouter.get("/", productoController.getProductos.bind(productoController));
productoRouter.get("/:id", productoController.getProductoPorId.bind(productoController));
productoRouter.get("/facetas", productoController.getFacetas.bind(productoController)); 

export default productoRouter;