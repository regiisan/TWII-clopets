import { Routes } from '@angular/router';
import { ListPedidosComponent } from './pages/list-pedidos/list-pedidos.component';

export const pedidosRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: ListPedidosComponent,
      },
      {
        path: 'list-pedidos',
        component: ListPedidosComponent,
      }
    ],
  },
];
