// src/app/app.routes.ts
import { Routes } from '@angular/router';
import { authGuard } from './modules/auth/auth.guard';

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
    canActivate: [authGuard],
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
