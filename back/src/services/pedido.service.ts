import type { PedidoRepository } from "../repository/pedido.repository.js";
import type { CarritoRepository } from "../repository/carrito.repository.js";

export class PedidoService {

  constructor(
    private pedidoRepository: PedidoRepository,
    private carritoRepository: CarritoRepository
  ) { }

  async obtenerPedidos(id_usuario: number) {
    return await this.pedidoRepository.findPedidosByUsuario(id_usuario);
  }

  async obtenerPedido(id_pedido: number, id_usuario: number) {
    const pedido = await this.pedidoRepository.findPedidoById(id_pedido);
    
    if (!pedido) {
      throw new Error('Pedido no encontrado');
    }

    if (pedido.id_usuario !== id_usuario) {
      throw new Error('No tienes permiso para ver este pedido');
    }

    return pedido;
  }

  async crearPedido(id_usuario: number, direccion_envio: string) {
    const carrito = await this.carritoRepository.findCarritoActivoByUsuario(id_usuario);
    
    if (!carrito || carrito.carrito_producto.length === 0) {
      throw new Error('El carrito está vacío');
    }

    let total = 0;
    const items = carrito.carrito_producto.map((item: any) => {
      const subtotal = Number(item.precio) * item.cantidad;
      total += subtotal;

      return {
        id_producto: item.id_producto,
        talle: item.talle,
        cantidad: item.cantidad,
        precio: item.precio
      };
    });

    const pedido = await this.pedidoRepository.createPedido(
      id_usuario,
      total,
      direccion_envio,
      items
    );

    await this.carritoRepository.clearCarrito(carrito.id_carrito);

    return pedido;
  }
}
