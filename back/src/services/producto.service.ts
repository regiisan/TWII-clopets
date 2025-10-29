import { ProductoRepository } from "../repository/producto.repository.js";

export class ProductoService {
    
  constructor(private productoRepository: ProductoRepository) {}

  async obtenerProductos() {
    return await this.productoRepository.findAllProductos();
  }

  async obtenerProductoPorId(id: number) {
    return await this.productoRepository.findProductoById(id);
  }
}
