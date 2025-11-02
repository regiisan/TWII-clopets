// src/app/app.routes.ts
import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'productos', pathMatch: 'full' },     // 👈 default
  {
    path: 'productos',
    loadChildren: () =>
      import('./modules/productos/productos.routes').then(m => m.productoRoutes)
  },
  { path: '**', redirectTo: 'productos' }                        // 👈 no 'episode'
];
