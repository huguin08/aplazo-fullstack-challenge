import { inject } from '@angular/core';
import {
    CanActivateFn,
    Router,
    UrlTree
} from '@angular/router';

export const noAuthGuard: CanActivateFn = (): boolean | UrlTree => {
    const router = inject(Router);
    const isLoggedIn = !!localStorage.getItem('authToken');

    if (isLoggedIn) {
        // Si está logueado, lo mandamos al home
        return router.createUrlTree(['/apz/home']);
    }

    return true; // Permitir acceso si no está autenticado
};
