import type { CarritoRepository } from "../repository/carrito.repository.js";
import { ProductoRepository } from "../repository/producto.repository.js";

export class CarritoService {

  constructor(
    private carritoRepository: CarritoRepository,
    private productoRepository: ProductoRepository
  ) { }

  async obtenerCarrito(id_usuario: number) {
    let carrito = await this.carritoRepository.findCarritoActivoByUsuario(id_usuario);
    
    if (!carrito) {
      const nuevoCarrito = await this.carritoRepository.createCarrito(id_usuario);
      carrito = await this.carritoRepository.findCarritoActivoByUsuario(id_usuario);
    }

    return carrito;
  }

  async agregarProducto(id_usuario: number, id_producto: number, talle: string, cantidad: number) {
    let carrito = await this.carritoRepository.findCarritoActivoByUsuario(id_usuario);
    
    if (!carrito) {
      await this.carritoRepository.createCarrito(id_usuario);
      carrito = await this.carritoRepository.findCarritoActivoByUsuario(id_usuario);
    }

    if (!carrito) {
      throw new Error('Error al crear el carrito');
    }

    const producto = await this.productoRepository.findProductoById(id_producto);
    
    if (!producto) {
      throw new Error('Producto no encontrado');
    }

    const productoTalle = producto.producto_talle.find((pt: any) => pt.talle === talle);
    
    if (!productoTalle) {
      throw new Error('Talle no disponible');
    }

    if ((productoTalle.stock || 0) < cantidad) {
      throw new Error('Stock insuficiente');
    }

    return await this.carritoRepository.addProductoToCarrito(
      carrito.id_carrito,
      id_producto,
      talle,
      cantidad,
      Number(producto.precio)
    );
  }

  async actualizarCantidad(id_usuario: number, id_detalle: number, cantidad: number) {
    const carrito = await this.carritoRepository.findCarritoActivoByUsuario(id_usuario);
    
    if (!carrito) {
      throw new Error('Carrito no encontrado');
    }

    const item = carrito.carrito_producto.find((cp: any) => cp.id_detalle === id_detalle);
    
    if (!item) {
      throw new Error('Producto no encontrado en el carrito');
    }

    return await this.carritoRepository.updateCarritoProducto(id_detalle, cantidad);
  }

  async eliminarProducto(id_usuario: number, id_detalle: number) {
    const carrito = await this.carritoRepository.findCarritoActivoByUsuario(id_usuario);
    
    if (!carrito) {
      throw new Error('Carrito no encontrado');
    }

    const item = carrito.carrito_producto.find((cp: any) => cp.id_detalle === id_detalle);
    
    if (!item) {
      throw new Error('Producto no encontrado en el carrito');
    }

    return await this.carritoRepository.deleteCarritoProducto(id_detalle);
  }

  async vaciarCarrito(id_usuario: number) {
    const carrito = await this.carritoRepository.findCarritoActivoByUsuario(id_usuario);
    
    if (!carrito) {
      throw new Error('Carrito no encontrado');
    }

    await this.carritoRepository.clearCarrito(carrito.id_carrito);
  }
}
