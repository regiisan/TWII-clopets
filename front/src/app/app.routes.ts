// src/app/app.routes.ts
import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'productos', pathMatch: 'full' },

  {
    path: 'productos',
    loadChildren: () =>
      import('./modules/productos/productos.routes').then(m => m.productoRoutes)
  },

  {
    path: 'auth',
    loadChildren: () =>
      import('./modules/auth/auth.routes').then(m => m.authRoutes)
  },

  { path: '**', redirectTo: 'productos' } 
];
