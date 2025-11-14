import { Routes } from '@angular/router';
import { ListProductosComponent } from './pages/list-productos/list-productos.component';
import { DetailProductosComponent } from './pages/detail-productos/detail-productos.component';

export const productoRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: ListProductosComponent,
      },
      {
        path: 'list-productos',
        component: ListProductosComponent,
      },
      {
        path: 'detail-producto/:id',
        component: DetailProductosComponent,
      },
    ],
  },
];
