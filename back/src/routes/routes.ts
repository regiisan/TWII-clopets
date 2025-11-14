import { Router } from "express";
import productoRouter from "./producto-router/producto.routes.js";
import usuarioRouter from "./usuario-router/usuario.routes.js";
import carritoRouter from "./carrito-router/carrito.routes.js";
import pedidoRouter from "./pedido-router/pedido.routes.js";

export class AppRoutes {

  static get routes(): Router {
    
    const router = Router();

    router.use("/api/producto", productoRouter);
    router.use("/api/usuario", usuarioRouter);
    router.use("/api/carrito", carritoRouter);
    router.use("/api/pedido", pedidoRouter);

    return router;
  }
}
