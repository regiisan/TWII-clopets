import { Router } from "express";
import { UsuarioController } from "../../controllers/usuario.controller.js";

const usuarioRouter = Router();
const usuarioController = new UsuarioController();

usuarioRouter.post('/registro', usuarioController.registro.bind(usuarioController));
usuarioRouter.post('/login', usuarioController.login.bind(usuarioController));
usuarioRouter.get('/', usuarioController.getUsuarios.bind(usuarioController));
usuarioRouter.get('/:id', usuarioController.getUsuario.bind(usuarioController));
usuarioRouter.patch('/:id/direccion', usuarioController.updateDireccion.bind(usuarioController));
export default usuarioRouter;
