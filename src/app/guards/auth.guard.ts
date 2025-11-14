import { inject } from '@angular/core';
import { Router } from '@angular/router';

export const authGuard = () => {
  const router = inject(Router);

  // Verifica se o usuário está logado no localStorage
  const usuarioLogado = localStorage.getItem('usuario_logado');

  if (usuarioLogado) {
    return true;
  }

  router.navigate(['/login']);
  return false;
};