import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = () => {
    const token = localStorage.getItem('authToken');
    const router = inject(Router);

    if (token) {
        return true;
    }

    router.navigate(['/apz/register']);
    return false;
};

export const guestGuard: CanActivateFn = () => {
    const token = localStorage.getItem('authToken');
    return !token;
};
