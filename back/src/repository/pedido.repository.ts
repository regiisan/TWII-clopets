import { prisma } from "../prisma.js";

export class PedidoRepository {

  async findPedidosByUsuario(id_usuario: number) {
    return await prisma.pedido.findMany({
      where: { id_usuario },
      include: {
        pedido_producto: {
          include: {
            producto: true
          }
        }
      },
      orderBy: {
        fecha: "desc"
      }
    });
  }

  async findPedidoById(id_pedido: number) {
    return await prisma.pedido.findUnique({
      where: { id_pedido },
      include: {
        pedido_producto: {
          include: {
            producto: true
          }
        }
      }
    });
  }

  async createPedido(id_usuario: number, total: number, direccion_envio: string, items: Array<{ id_producto: number; talle: string; cantidad: number; precio: number }>) {
    return await prisma.pedido.create({
      data: {
        id_usuario,
        total,
        direccion_envio,
        estado: "pendiente",
        pedido_producto: {
          create: items.map(item => ({
            id_producto: item.id_producto,
            talle: item.talle as any,
            cantidad: item.cantidad,
            precio: item.precio
          }))
        }
      },
      include: {
        pedido_producto: {
          include: {
            producto: true
          }
        }
      }
    });
  }
}
