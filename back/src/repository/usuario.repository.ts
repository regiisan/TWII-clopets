import { prisma } from "../prisma.js";

export class UsuarioRepository {

  async findAllUsuarios() {
    return await prisma.usuario.findMany();
  }

  async findUsuarioById(id: number) {
    return await prisma.usuario.findUnique({
      where: { id_usuario: id }
    });
  }

  async findUsuarioByEmail(email: string) {
    return await prisma.usuario.findUnique({
      where: { email }
    });
  }

  async createUsuario(data: { nombre: string; apellido: string; email: string; contrase_a: string; direccion?: string }) {
    return await prisma.usuario.create({
      data
    });
  }

  async updateUsuario(id: number, data: { nombre?: string; apellido?: string; email?: string; contrase_a?: string; direccion?: string }) {
    return await prisma.usuario.update({
      where: { id_usuario: id },
      data
    });
  }

  async deleteUsuario(id: number) {
    return await prisma.usuario.delete({
      where: { id_usuario: id }
    });
  }
}
