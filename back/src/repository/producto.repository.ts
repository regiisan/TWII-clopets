import { prisma } from "../prisma.js";
import { type ProductoFilter } from "../models/productoFilter.types.js";

export class ProductoRepository {
  async findAllProductos(filters: ProductoFilter = {}) {
    const { clasificacion, animal, minPrecio, maxPrecio } = filters;

    const where = {
      ...(clasificacion && { clasificacion }),
      ...(animal && { animal }),
      ...((minPrecio !== undefined || maxPrecio !== undefined) && {
        precio: {
          ...(minPrecio !== undefined && { gte: minPrecio }),
          ...(maxPrecio !== undefined && { lte: maxPrecio }),
        },
      }),
    };

    return await prisma.producto.findMany({
      where,
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
