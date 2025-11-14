import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'verificador',
    pathMatch: 'full',
  },
  {
    path: 'verificador',
    loadComponent: () => import('./pages/product-search/product-search.page').then(m => m.ProductSearchPage)
  }
];
