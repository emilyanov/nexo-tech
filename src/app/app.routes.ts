import type { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  {
    path: 'catalogo',
    loadComponent: () => import('./pages/catalogo/catalogo.page').then((m) => m.CatalogoPage),
  },
  {
    path: 'produto/:id',
    loadComponent: () => import('./pages/detalhes/detalhes.page').then((m) => m.DetalhesPage),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'carrinho',
    loadComponent: () => import('./pages/carrinho/carrinho.page').then((m) => m.CarrinhoPage),
  },
  {
    path: 'carrinho',
    loadComponent: () => import('./pages/carrinho/carrinho.page').then((m) => m.CarrinhoPage),
  },
  {
    path: 'finalizacao',
    loadComponent: () => import('./pages/finalizacao/finalizacao.page').then((m) => m.FinalizacaoPage),
  },
  {
    path: 'finalizacao',
    loadComponent: () => import('./pages/finalizacao/finalizacao.page').then((m) => m.FinalizacaoPage),
  },
  {
    path: 'confirmacao',
    loadComponent: () => import('./pages/confirmacao/confirmacao.page').then((m) => m.ConfirmacaoPage),
  },
  {
    path: 'confirmacao',
    loadComponent: () =>
      import('./pages/confirmacao/confirmacao.page').then(
        (m) => m.ConfirmacaoPage
      ),
  },  
];
