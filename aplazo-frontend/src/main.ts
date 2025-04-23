import { bootstrapApplication } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';
import {
  provideRouter,
  withEnabledBlockingInitialNavigation,
  Routes
} from '@angular/router';
import { AppComponent } from './app/app.component';

import { RegisterComponent } from './app/pages/register/register.component';
import { HomeComponent }     from './app/pages/home/home.component';
import { HistoryComponent }  from './app/pages/history/history.component';
import { AuthGuard }         from './app/guards/auth.guard';
import { NoAuthGuard }       from './app/guards/no-auth.guard';

const routes: Routes = [
  { path: '', redirectTo: 'auth/register', pathMatch: 'full' },
  {
    path: 'auth/register',
    component: RegisterComponent,
    canActivate: [NoAuthGuard],
    data: { title: 'Registro' }
  },
  {
    path: 'apz/home',
    component: HomeComponent,
    canActivate: [AuthGuard],
    data: { title: 'Inicio' }
  },
  {
    path: 'apz/historial',
    component: HistoryComponent,
    canActivate: [AuthGuard],
    data: { title: 'Historial' }
  },
  { path: '**', redirectTo: '' }
];

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(),
    provideRouter(routes, withEnabledBlockingInitialNavigation())
  ]
}).catch(err => console.error(err));