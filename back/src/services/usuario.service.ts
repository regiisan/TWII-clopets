import type { Usuario } from "../models/usuario.model.js";
import type { UsuarioRepository } from "../repository/usuario.repository.js";

export class UsuarioService {

  constructor(private usuarioRepository: UsuarioRepository) { }

  async obtenerUsuarios() {
    return await this.usuarioRepository.findAllUsuarios();
  }

  async obtenerUsuario(id: number) {
    return await this.usuarioRepository.findUsuarioById(id);
  }

  async crearUsuario(usuario: { nombre: string; apellido: string; email: string; contrase_a: string; direccion?: string }) {
    const { nombre, apellido, email, contrase_a, direccion } = usuario;

    if (!nombre || typeof nombre !== 'string') {
      throw new Error('El nombre es obligatorio y debe ser un string');
    }

    if (!apellido || typeof apellido !== 'string') {
      throw new Error('El apellido es obligatorio y debe ser un string');
    }

    if (!email || typeof email !== 'string') {
      throw new Error('El email es obligatorio y debe ser un string');
    }

    if (!contrase_a || typeof contrase_a !== 'string' || contrase_a.length < 6) {
      throw new Error('La contraseña es obligatoria y debe tener al menos 6 caracteres');
    }

    const existingUser = await this.usuarioRepository.findUsuarioByEmail(email);
    if (existingUser) {
      throw new Error('El email ya está registrado');
    }

    return await this.usuarioRepository.createUsuario({
      nombre,
      apellido,
      email,
      contrase_a,
      ...(direccion && { direccion })
    });
  }

  async loginUsuario(email: string, contrase_a: string) {
    if (!email || !contrase_a) {
      throw new Error('Email y contraseña son requeridos');
    }

    const usuario = await this.usuarioRepository.findUsuarioByEmail(email);
    
    if (!usuario) {
      throw new Error('Credenciales inválidas');
    }

    if (usuario.contrase_a !== contrase_a) {
      throw new Error('Credenciales inválidas');
    }

    const { contrase_a: _, ...usuarioSinPassword } = usuario;
    return usuarioSinPassword;
  }

  async actualizarUsuario(id: number, data: { nombre?: string; apellido?: string; email?: string; contrase_a?: string; direccion?: string }) {
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
