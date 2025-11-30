// Configuração das rotas do app
// Redireciona a rota raiz para a página de verificação
import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'verificador',
    pathMatch: 'full',
  },
  {
    // Página principal do app: verificador de misturas
    path: 'verificador',
    loadComponent: () => import('./pages/product-search/product-search.page').then(m => m.ProductSearchPage)
  }
];
