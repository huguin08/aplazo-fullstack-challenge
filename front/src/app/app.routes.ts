import { Routes } from '@angular/router';
import { ROUTE_CONFIG } from './config/routes.config';
import { LayoutComponent } from './layout/layout.component';
import { HistorialComponent } from './pages/historial/historial.component';
import { HomeComponent } from './pages/home/home.component';
import { RegisterComponent } from './pages/register/register.component';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: ROUTE_CONFIG.register,
  },
  {
    path: ROUTE_CONFIG.register,
    component: RegisterComponent,
  },
  {
    path: ROUTE_CONFIG.app,
    component: LayoutComponent,
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
          import('./pages/loan-form/loan-form.component').then(m => m.LoanFormComponent), // ← este lo crearemos
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
