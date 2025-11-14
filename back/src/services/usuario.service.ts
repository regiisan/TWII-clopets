import bcrypt from 'bcrypt';
import type { UsuarioRepository } from "../repository/usuario.repository.js";

export class UsuarioService {
  constructor(private usuarioRepository: UsuarioRepository) {}

  async obtenerUsuarios() {
    return this.usuarioRepository.findAllUsuarios();
  }

  async obtenerUsuario(id: number) {
    return this.usuarioRepository.findUsuarioById(id);
  }

  async crearUsuario(usuario: { nombre: string; apellido: string; email: string; contrase_a: string; direccion?: string }) {
    const { nombre, apellido, email, contrase_a, direccion } = usuario;

    if (!nombre || !apellido || !email || !contrase_a) {
      throw new Error('Todos los campos son obligatorios');
    }

    const existingUser = await this.usuarioRepository.findUsuarioByEmail(email);
    if (existingUser) {
      throw new Error('El email ya está registrado');
    }

    
    const hashedPassword = await bcrypt.hash(contrase_a, 10);

    return await this.usuarioRepository.createUsuario({
      nombre,
      apellido,
      email: email.trim().toLowerCase(),
      contrase_a: hashedPassword,
      ...(direccion && { direccion })
    });
  }

  async loginUsuario(email: string, contrase_a: string) {
    if (!email || !contrase_a) {
      throw new Error('Email y contraseña son requeridos');
    }

    const usuario = await this.usuarioRepository.findUsuarioByEmail(email.trim().toLowerCase());
    if (!usuario) {
      throw new Error('Credenciales inválidas');
    }

    const match = await bcrypt.compare(contrase_a, usuario.contrase_a);
    if (!match) {
      throw new Error('Credenciales inválidas');
    }

    const { contrase_a: _, ...usuarioSinPassword } = usuario;
    return usuarioSinPassword;
  }

  async actualizarUsuario(id: number, data: { nombre?: string; apellido?: string; email?: string; contrase_a?: string; direccion?: string }) {
    if (data.contrase_a) {
      data.contrase_a = await bcrypt.hash(data.contrase_a, 10);
    }
    return await this.usuarioRepository.updateUsuario(id, data);
  }

  async eliminarUsuario(id: number) {
    try {
      return await this.usuarioRepository.deleteUsuario(id);
    } catch (error: any) {
      if (error.code === 'P2025') {
        throw new Error('UsuarioNoExiste');
      }
      throw error;
    }
  }
}
