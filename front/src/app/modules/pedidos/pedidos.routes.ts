// src/app/modules/pedidos/pedidos.routes.ts
import { Routes } from '@angular/router';
import { ListPedidosComponent } from './pages/list-pedidos/list-pedidos.component';
import { CheckoutPedidoComponent } from './pages/checkout-pedido/checkout-pedido.component';

export const pedidosRoutes: Routes = [
  // /pedidos  → checkout
  {
    path: '',
    component: CheckoutPedidoComponent,
  },

  // /pedidos/checkout  → también checkout (por si ya lo usaste en el botón)
  {
    path: 'checkout',
    component: CheckoutPedidoComponent,
  },

  // /pedidos/historial → historial de pedidos
  {
    path: 'historial',
    component: ListPedidosComponent,
  },
];
