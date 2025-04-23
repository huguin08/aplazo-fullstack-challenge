import { Component, OnInit } from '@angular/core';
import {
  Router,
  ActivatedRoute,
  NavigationEnd,
  RouterOutlet,
  RouterLink,
  RouterLinkActive,
  RouterModule
} from '@angular/router';
import { filter, map, mergeMap } from 'rxjs/operators';
import { AuthService } from './services/auth.service';
import { CommonModule } from '@angular/common';


import { UiButtonModule } from '../../projects/shared-ui/src/lib/ui-button/ui-button.module';

@Component({
  standalone: true,
  selector: 'apz-root',
  imports: [CommonModule,RouterOutlet, RouterModule,UiButtonModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  pageTitle = 'Aplazo';


links = [
  { path: '/apz/home',     title: 'Inicio',   iconClass: 'fas fa-home'    },
  { path: '/apz/historial', title: 'Historial', iconClass: 'fas fa-history' }
];

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      map(() => this.activatedRoute),
      map(route => {
        while (route.firstChild) route = route.firstChild;
        return route;
      }),
      mergeMap(route => route.data)
    ).subscribe(data => {
      this.pageTitle = data['title'] || 'Aplazo';
    });
  }

  goHome() {
    this.router.navigate(['/apz/home']);
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/auth/register']);
  }
}