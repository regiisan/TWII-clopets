// src/app/app.routes.ts
import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },

  {
    path: 'home',
    loadChildren: () =>
      import('./modules/home/home-module').then(m => m.HomeModule)
  },

  {
    path: 'productos',
    loadChildren: () =>
      import('./modules/productos/productos.routes').then(m => m.productoRoutes)
  },

    {
    path: 'pedidos',
    loadChildren: () =>
      import('./modules/pedidos/pedidos.routes').then(m => m.pedidosRoutes)
  },


  {
    path: 'auth',
    loadChildren: () =>
      import('./modules/auth/auth.routes').then(m => m.authRoutes)
  },

  { path: '**', redirectTo: 'productos' } 
];
