import { type ProductoRepository } from "../repository/producto.repository.js";
import {type ProductoFilter } from "../models/productoFilter.model.js";

export class ProductoService {
    
  constructor(private productoRepository: ProductoRepository) {}

  async obtenerProductos(filters?: ProductoFilter) {
    return await this.productoRepository.findAllProductos(filters);
  }

  async obtenerProductoPorId(id: number) {
    return await this.productoRepository.findProductoById(id);
  }
}
