import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { AplazoButtonComponent } from '@apz/shared-ui/button';
import { AplazoDashboardComponents } from '@apz/shared-ui/dashboard';
import { AplazoSidenavLinkComponent } from '@apz/shared-ui/sidenav';
import { ROUTE_CONFIG } from '../config/routes.config';

@Component({
  standalone: true,
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  imports: [
    AplazoDashboardComponents,
    AplazoButtonComponent,
    AplazoSidenavLinkComponent,
    RouterOutlet,
    RouterLink,
  ],
})
export class LayoutComponent {
  readonly appRoutes = ROUTE_CONFIG;

  private router = inject(Router);

  // ✅ Detectar si está autenticado
  get isLoggedIn(): boolean {
    return !!localStorage.getItem('authToken');
  }

  // ✅ Redirigir al dar clic en el logo
  clickLogo(): void {
    this.router.navigate(['/apz/home']);
  }

  // ✅ Logout y redirección
  logout(): void {
    localStorage.removeItem('authToken');
    localStorage.removeItem('customerId');
    this.router.navigate(['/apz/register']);
  }

  
}
