import { Component } from '@angular/core';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent {
  //uid: number = 0;
  email: string = '';
  newPassword: string = '';
  message: string = '';

  constructor(private userService: UserService, private router: Router) { }

  changePassword() {
    this.userService.changePassword(this.email, this.newPassword).subscribe(
      response => {
        this.message = 'Password changed successfully';
        alert(this.message);
        this.router.navigate(['/login']);
      },
      error => {
        console.error('Error changing password', error);
        this.message = 'Error changing password';
      }
    );
  }
}
