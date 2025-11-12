import { prisma } from "../prisma.js";

export class CarritoRepository {

  async findCarritoActivoByUsuario(id_usuario: number) {
    return await prisma.carrito.findFirst({
      where: {
        id_usuario,
        estado: "activo"
      },
      include: {
        carrito_producto: {
          include: {
            producto_talle: {
              include: {
                producto: true
              }
            }
          }
        }
      }
    });
  }

  async createCarrito(id_usuario: number) {
    return await prisma.carrito.create({
      data: {
        id_usuario,
        estado: "activo"
      }
    });
  }

  async addProductoToCarrito(id_carrito: number, id_producto: number, talle: string, cantidad: number, precio: number) {
    const existing = await prisma.carrito_producto.findFirst({
      where: {
        id_carrito,
        id_producto,
        talle: talle as any
      }
    });

    if (existing) {
      return await prisma.carrito_producto.update({
        where: { id_detalle: existing.id_detalle },
        data: {
          cantidad: (existing.cantidad || 0) + cantidad
        }
      });
    } else {
      return await prisma.carrito_producto.create({
        data: {
          id_carrito,
          id_producto,
          talle: talle as any,
          cantidad,
          precio
        }
      });
    }
  }

  async updateCarritoProducto(id_detalle: number, cantidad: number) {
    return await prisma.carrito_producto.update({
      where: { id_detalle },
      data: { cantidad }
    });
  }

  async deleteCarritoProducto(id_detalle: number) {
    return await prisma.carrito_producto.delete({
      where: { id_detalle }
    });
  }

  async clearCarrito(id_carrito: number) {
    await prisma.carrito_producto.deleteMany({
      where: { id_carrito }
    });
  }
}
