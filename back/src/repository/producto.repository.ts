import { prisma } from "../prisma.js";

export class ProductoRepository {
  async findAllProductos() {
    return await prisma.producto.findMany({
      include: {
        producto_talle: true,
      },
    });
  }

  async findProductoById(id: number) {
    return await prisma.producto.findUnique({
      where: { id_producto: id },
      include: {
        producto_talle: true,
      },
    });
  }
}
