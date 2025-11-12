# Clopets - Backend API

API REST para tienda de productos para mascotas.

## Instalación

```bash
npm install
npx prisma generate
```

## Configuración

Crear archivo `.env`:
```
DATABASE_URL="postgresql://usuario:password@localhost:5432/clopets"
```

## Ejecutar

```bash
# Desarrollo
npm run dev

# Producción
npm run build
npm start
```

## Endpoints

### Productos
- `GET /api/producto` - Listar productos (con filtros opcionales)
- `GET /api/producto/:id` - Obtener un producto

### Usuarios
- `POST /api/usuario/registro` - Registrar usuario
- `POST /api/usuario/login` - Iniciar sesión
- `GET /api/usuario` - Listar usuarios
- `GET /api/usuario/:id` - Obtener un usuario

### Carrito
- `GET /api/carrito?id_usuario=X` - Obtener carrito
- `POST /api/carrito` - Agregar producto al carrito
- `PUT /api/carrito/:id` - Actualizar cantidad
- `DELETE /api/carrito/:id?id_usuario=X` - Eliminar producto
- `DELETE /api/carrito?id_usuario=X` - Vaciar carrito

### Pedidos
- `GET /api/pedido?id_usuario=X` - Listar pedidos
- `GET /api/pedido/:id?id_usuario=X` - Obtener pedido
- `POST /api/pedido` - Crear pedido desde carrito
