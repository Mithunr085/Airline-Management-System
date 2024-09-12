import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthServiceService } from '../auth-service.service';

@Component({
  selector: 'app-user-header',
  templateUrl: './user-header.component.html',
  styleUrl: './user-header.component.css'
})
export class UserHeaderComponent {
  url: string = '';
  userName: string = 'User';
  menuOpen: boolean = false;

  constructor(private router: Router, private authService: AuthServiceService) {
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
/*
if (link === '/user/logout') {
      this.bservice.userLogout();
      return;
    }
    this.router.navigate([link]);
  }
*/