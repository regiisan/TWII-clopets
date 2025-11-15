// src/app/modules/pedidos/pedidos.routes.ts
import { Routes } from '@angular/router';
import { ListPedidosComponent } from './pages/list-pedidos/list-pedidos.component';
import { CheckoutPedidoComponent } from './pages/checkout-pedido/checkout-pedido.component';

export const pedidosRoutes: Routes = [
  {
    path: '',
    component: CheckoutPedidoComponent,
  },

  {
    path: 'checkout',
    component: CheckoutPedidoComponent,
  },
  {
    path: 'historial',
    component: ListPedidosComponent,
  },
];
