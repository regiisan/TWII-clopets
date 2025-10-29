import { Routes } from '@angular/router';

export const routes: Routes = [
        {
        path: 'productos',
        loadChildren: () => import('./modules/productos/productos.routes').then(c => c.productoRoutes)
    },
    {
        path: '**',
        redirectTo: 'episode'
    },
];
