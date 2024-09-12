import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from '../auth-service.service';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrl: './admin-home.component.css'
})
export class AdminHomeComponent implements OnInit {
  userName: string = '';
  constructor(
    private bservice: AuthServiceService
  ) {
    if (this.bservice.getUserName() !== null) {
      this.userName = this.bservice.getUserName();
      this.userName = this.userName.toUpperCase();
      console.log("*******", this.userName);
    }
    this.bservice.isAdminLoginPresent();
  }

  ngOnInit(): void {
  }
}
