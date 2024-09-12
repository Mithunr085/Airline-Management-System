import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service';
import { take } from 'rxjs';
import { AuthServiceService } from '../auth-service.service';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  errormessagep: string = '';
  emailId: string = '';
  password: string = '';
  errormessage: string = '';

  constructor(private userService: UserService, private authService: AuthServiceService, private route: Router) { }

  loginUser() {
    if (this.emailId === "" || this.emailId === undefined) {
      this.errormessage = "Email addresss is blank";
      return;
    }

    const re = /\S+@\S+\.\S+/;
    if (!re.test(this.emailId)) {
      this.errormessage = "Email addresss not valid";
      return;
    }
    this.errormessage = "";

    if (this.password === "" || this.password === undefined) {
      this.errormessagep = "Password is blank";
      return;
    }
    this.errormessagep = '';
    const body: any = {
      "emailId": this.emailId,
      "password": this.password
    }
    this.userService.loginUser(body).pipe(take(1)).subscribe((res: any) => {
      // console.log("*******",res);
      if (res && res?.userId) {
        alert("Login sucessful");
        if (res?.role) {
          this.authService.storeUserRole(res?.role);
        }
        this.authService.storeUserAuthorization(res?.userId);
        let userName = '';
        if (res?.firstName) {
          userName += res?.firstName;
        }
        if (res?.lastName) {
          userName += ' ' + res?.lastName;
        }
        this.authService.storeUserName(userName);
        console.log('>>>>>>', res?.role);
        if (res?.role === 'admin') {
          this.route.navigate(['/admin-home']);
        } else {
          this.route.navigate(['/user-home']);
        }
      }
    }, err => {
      alert("Customer email/password is invalid");
      console.log("Error ", err);
      console.log(">>> ", err);
      if (err?.error && err?.error.startsWith("Customer  not found with")) {
        alert("Customer email/password is invalid");
      }
      else {
        alert("Something going wrong in login! pls try again");
      }
    }
    )
  }

  passwordFieldType: string = 'password';

  togglePasswordVisibility(): void {
    this.passwordFieldType = this.passwordFieldType === 'password' ? 'text' : 'password';
  }

}
/*
this.userService.loginUser(this.user).subscribe(
      response => {
        console.log('User logged in successfully', response);
        alert('User logged in successfully');
        this.router.navigate(['/user-home']);
      },
      error => {
        console.error('Error logging in user', error);
        this.errorMessage = 'Invalid email or password';
      }
    );
*/