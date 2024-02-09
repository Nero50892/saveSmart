import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('./features/product-overview/product-overview.component').then(m => m.ProductOverviewComponent)
    },
    {
        path: '**',
        redirectTo: ''
    }
];
