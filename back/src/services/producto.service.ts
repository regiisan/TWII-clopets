import type { ProductoRepository } from "../repository/producto.repository.js";
import type { ProductoFilter } from "../models/productoFilter.model.js";

export class ProductoService {

  constructor(private productoRepository: ProductoRepository) {}

  async obtenerProductos(q: ProductoFilter = {}) {
    const page = q.page ?? 1;
    const pageSize = q.pageSize ?? 12;
    const skip = (page - 1) * pageSize;
    const take = pageSize;

    const orderBy =
      q.sort === 'price_asc'  ? { precio: 'asc'  as const } :
      q.sort === 'price_desc' ? { precio: 'desc' as const } :
                                { id_producto: 'desc' as const };

    const where: any = { AND: [] as any[] };

    if (q.q) {
      where.AND.push({
        OR: [
          { nombre:      { contains: q.q, mode: 'insensitive' } },
          { descripcion: { contains: q.q, mode: 'insensitive' } },
        ]
      });
    }

    if (q.clasificacion?.length) {
      const mapped = q.clasificacion.map(c => c === 'pañuelo' ? 'pa_uelo' : c);
      where.AND.push({ clasificacion: { in: mapped as any } });
    }

    if (q.animal?.length) {
      where.AND.push({ animal: { in: q.animal as any } });
    }

    if (q.minPrecio != null || q.maxPrecio != null) {
      where.AND.push({
        precio: {
          gte: q.minPrecio != null ? q.minPrecio : undefined,
          lte: q.maxPrecio != null ? q.maxPrecio : undefined,
        }
      });
    }

    const [items, total] = await Promise.all([
      this.productoRepository.findMany({ where, orderBy, skip, take }),
      this.productoRepository.count({ where }),
    ]);

    return { items, total, page, pageSize };
  }

  async obtenerProductoPorId(id: number) {
    return this.productoRepository.findProductoById(id);
  }

  async obtenerFacetas() {
    return this.productoRepository.facetas();
  }
}
