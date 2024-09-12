import { Component } from '@angular/core';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent {
  email: string = '';
  message: string = '';

  constructor(private userService: UserService, private router: Router) { }

  sendResetLink() {
    this.userService.forgotPassword(this.email).subscribe(
      response => {
        this.message = 'Password reset link sent to ' + this.email;
        alert('Password reset link sent to ' + this.email);
        this.router.navigate(['/changepassword']);

      },
      error => {
        console.error('Error sending password reset link', error);
        this.message = 'Error sending password reset link';
      }
    );
  }
}
