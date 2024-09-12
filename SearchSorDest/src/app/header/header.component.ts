
import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  url: string = '';

  constructor(private router: Router) {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      this.url = event.urlAfterRedirects;
    });
  }


  isOnHomePage(): boolean {
    return this.router.url === '/'; // Returns true if the current route is the homepage
  }

  navigateTo(path: string) {
    this.router.navigate([path]);
  }

  isSelected(path: string): boolean {
    return this.url === path;
  }
}

