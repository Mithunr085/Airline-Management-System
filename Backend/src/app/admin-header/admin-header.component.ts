import { Component } from '@angular/core';
import { AuthServiceService } from '../auth-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-header',
  templateUrl: './admin-header.component.html',
  styleUrl: './admin-header.component.css'
})
export class AdminHeaderComponent {
  url: string = '';
  menuOpen: boolean = false;
  userName: string = '';
  constructor(private authService: AuthServiceService, private router: Router) {
    if (this.authService.getUserName() !== null) {
      this.userName = this.authService.getUserName();
      this.userName = this.userName.toUpperCase();
      console.log("*******", this.userName);
    }
  }
  routerToLink(link: string) {

    this.url = link;
    this.menuOpen = false; // Close menu after selecting an option
    if (link === '/home') {
      this.authService.userLogout();
      return;
    }
    this.router.navigate([link]);

  }

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }
}
