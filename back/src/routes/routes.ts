import { Router } from "express";
import productoRouter from "./producto-router/producto.routes.js";

export class AppRoutes {

  static get routes(): Router {
    
    const router = Router();

    router.use("/api/producto", productoRouter);

    return router;
  }
}
