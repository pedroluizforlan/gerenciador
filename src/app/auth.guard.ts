import {CanActivateFn, Router} from '@angular/router';
import {inject} from "@angular/core";

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const token = localStorage.getItem('token'); // Verifica se existe um token armazenado

  if (token) {
    // Se o token existe, o acesso é permitido
    return true;
  } else {
    // Se não, redireciona para a página de login
    router.navigate(['/login']);
    return false;
  }
};
