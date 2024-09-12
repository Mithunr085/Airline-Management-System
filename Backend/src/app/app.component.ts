import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'SearchSorDest';

  constructor(private router: Router) { }

  shouldShowHeader(): boolean {
    const currentRoute = this.router.url;
    // Display header only on routes other than home ("/")
    return currentRoute !== '/' && (currentRoute === '/login' || currentRoute === '/signup' || currentRoute === '/about-us' || currentRoute === '/contact-us' || currentRoute === '/home' || currentRoute === '/changepassword' || currentRoute === '/forgotpassword');
  }
  shouldShowUserHeader(): boolean {
    const currentRoute = this.router.url;
    // Display header only on routes other than home ("/")
    //  && (currentRoute === '/login' || currentRoute === '/signup' || currentRoute === '/about-us' || currentRoute === '/contact-us' || currentRoute === '/home')
    return currentRoute === '/user-home' || currentRoute === '/book' || currentRoute === '/view-ticket' || currentRoute === '/payment';
  }
  shouldShowAdminHeader(): boolean {
    const currentRoute = this.router.url;
    // Display header only on routes other than home ("/")
    //  && (currentRoute === '/login' || currentRoute === '/signup' || currentRoute === '/about-us' || currentRoute === '/contact-us' || currentRoute === '/home')
    return currentRoute !== '/admin-header' && (currentRoute === '/view-flights' || currentRoute === '/add-flight' || currentRoute === '/update-flight' || currentRoute === '/admin-home' || currentRoute === '/view-bookings');
  }
}
