import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service';
import { User } from '../user/user.module';

@Component({
  selector: 'app-signup',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignupComponent {
  user: User = new User();
  errorMessage: string = '';

  constructor(private userService: UserService, private router: Router) { }

  registerUser() {
    if (!this.user.emailId || !this.user.password) {
      this.errorMessage = 'Email and Password are required.';
      return;
    }
    this.user.role = 'client';
    this.userService.registerUser(this.user).subscribe(
      response => {
        console.log('User registered successfully', response);
        this.router.navigate(['/login']);
      },
      error => {
        console.error('Error registering user', error);
        this.errorMessage = 'Error registering user';
      }
    );
  }
  passwordFieldType: string = 'password';
  togglePasswordVisibility() {
    this.passwordFieldType = this.passwordFieldType === 'password' ? 'text' : 'password';
  }
}
