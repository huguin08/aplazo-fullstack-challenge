import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd, RouterOutlet } from '@angular/router';
import { filter, map, mergeMap } from 'rxjs/operators';
import { AuthService } from './services/auth.service';

// Ajusta estas rutas según tu librería UI:
import { UiButtonModule } from '../../projects/shared-ui/src/lib/ui-button/ui-button.module';

@Component({
  standalone: true,
  selector: 'apz-root',
  imports: [RouterOutlet, UiButtonModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  pageTitle = 'Aplazo';

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