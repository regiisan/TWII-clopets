import { prisma } from "../prisma.js";

export class ProductoRepository {
  findMany(args: { where?: any; orderBy?: any; skip?: number; take?: number }) {
    return prisma.producto.findMany({
      where: args.where,
      orderBy: args.orderBy,
      skip: args.skip,
      take: args.take,
      include: { producto_talle: true },
    });
  }

  count(args: { where?: any }) {
    return prisma.producto.count({ where: args.where });
  }

  findProductoById(id: number) {
    return prisma.producto.findUnique({
      where: { id_producto: id },
      include: { producto_talle: true },
    });
  }

  async facetas() {
    const [animals, clasifs, agg] = await Promise.all([
      prisma.producto.findMany({ select: { animal: true }, distinct: ['animal'] }),
      prisma.producto.findMany({ select: { clasificacion: true }, distinct: ['clasificacion'] }),
      prisma.producto.aggregate({ _min: { precio: true }, _max: { precio: true } }),
    ]);

    return {
      animals: animals.map(a => a.animal).filter(Boolean),
      clasificaciones: clasifs.map(c => c.clasificacion === 'panuelo' ? 'pañuelo' : c.clasificacion).filter(Boolean),
      price: { min: Number(agg._min.precio ?? 0), max: Number(agg._max.precio ?? 0) }
    };
  }
}
