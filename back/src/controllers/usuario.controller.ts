import { type Request, type Response } from "express";
import { UsuarioService } from "../services/usuario.service.js";
import { UsuarioRepository } from "../repository/usuario.repository.js";

const usuarioRepository = new UsuarioRepository();
const usuarioService = new UsuarioService(usuarioRepository);

export class UsuarioController {

  constructor() { }

  public registro = async (req: Request, res: Response) => {
    try {
      const usuario = await usuarioService.crearUsuario(req.body);
      res.status(201).json({ id_usuario: usuario.id_usuario });
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  public login = async (req: Request, res: Response) => {
    try {
      const { email, contrase_a } = req.body;
      const usuario = await usuarioService.loginUsuario(email, contrase_a);
      res.status(200).json(usuario);
    } catch (error: any) {
      res.status(401).json({ message: error.message });
    }
  }

  public getUsuarios = async (req: Request, res: Response) => {
    try {
      const usuarios = await usuarioService.obtenerUsuarios();
      res.status(200).json(usuarios);
    } catch (error) {
      res.status(500).json({ message: "Error al obtener usuarios", error });
    }
  }

  public getUsuario = async (req: Request, res: Response) => {
    try {
      const id = Number(req.params.id);

      if (isNaN(id)) {
        return res.status(400).json("ID inválido");
      }

      const usuario = await usuarioService.obtenerUsuario(id);

      if (!usuario) {
        return res.status(404).json({ message: 'Usuario no encontrado' });
      }

      res.status(200).json(usuario);
    } catch (error) {
      res.status(500).json({ message: "No se pudo obtener el usuario", error });
    }
  }

  public updateDireccion = async (req, res) => {
    try {
      const id = Number(req.params.id);
      const { direccion } = req.body;

      if (!direccion) {
        return res.status(400).json({ error: 'La dirección es requerida' });
      }

      const usuarioActualizado = await usuarioService.actualizarUsuario(id, { direccion });
      res.json(usuarioActualizado);
    } catch (error) {
      res.status(500).json({ message: "No se pudo actualizar la dirección", error});
    }
  }
}
