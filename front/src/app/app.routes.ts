import { Routes } from '@angular/router';
import { ROUTE_CONFIG } from './config/routes.config';
import { LayoutComponent } from './layout/layout.component';
import { HistorialComponent } from './pages/historial/historial.component';
import { HomeComponent } from './pages/home/home.component';
import { RegisterComponent } from './pages/register/register.component';
import { authGuard, guestGuard } from './guards/auth.guard'; // 👈 importa los guards

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: ROUTE_CONFIG.register,
  },
  {
    path: ROUTE_CONFIG.register,
    component: RegisterComponent,
    canActivate: [guestGuard],
  },
  {
    path: 'auth/login',
    loadComponent: () =>
      import('./pages/login/login.component').then(m => m.LoginComponent),
    canActivate: [guestGuard], // opcional: evita que usuarios logueados entren
  },
  {
    path: ROUTE_CONFIG.app,
    component: LayoutComponent,
    canActivate: [authGuard],
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: ROUTE_CONFIG.home,
      },
      {
        path: ROUTE_CONFIG.home,
        component: HomeComponent,
      },
      {
        path: 'loans',
        loadComponent: () =>
          import('./pages/loan-form/loan-form.component').then(m => m.LoanFormComponent),
      },
      {
        path: 'loan/:loanId',
        loadComponent: () =>
          import('./pages/loan-detail/loan-detail.component').then(m => m.LoanDetailComponent),
      },
      {
        path: ROUTE_CONFIG.historial,
        component: HistorialComponent,
      },
    ],
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: ROUTE_CONFIG.register,
  },
];
