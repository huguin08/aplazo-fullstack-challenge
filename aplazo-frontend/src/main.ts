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

const routes: Routes = [
  { path: '', redirectTo: 'auth/register', pathMatch: 'full' },
  {
    path: 'auth/register',
    component: RegisterComponent,
    data: { title: 'Registro' }
  },
  {
    path: 'apz/home',
    component: HomeComponent,
    data: { title: 'Inicio' }
  },
  {
    path: 'apz/historial',
    component: HistoryComponent,
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