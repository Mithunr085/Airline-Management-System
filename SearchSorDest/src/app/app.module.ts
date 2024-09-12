import { BrowserModule } from '@angular/platform-browser';
import { NgModule, NgModuleRef } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component'; // Adjusted path
import { AirlineService } from './airline.service';
import { AppRoutingModule } from './app-routing.module';
import { FlightNumberComponent } from './flight-number/flight-number.component'; // Import the AppRoutingModule
import { UserHomeComponent } from './user-home/user-home.component';
import { HomeUserComponent } from './home-user/home-user.component';
import { FooterComponent } from './footer/footer.component';
import { UserService } from './user.service';
import { HeaderComponent } from './header/header.component';
import { SignupComponent } from './sign-up/sign-up.component';
import { LoginComponent } from './login/login.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { UserHeaderComponent } from './user-header/user-header.component';
import { BookingComponent } from './booking/booking.component';
import { AdminHeaderComponent } from './admin-header/admin-header.component';
import { FlightDetailsComponent } from './flight-details/flight-details.component';
import { FlightListComponent } from './flight-list/flight-list.component';
import { FlightService } from './flight.service';
import { AddFlightComponentComponent } from './add-flight-component/add-flight-component.component';
import { JwtInterceptorService } from './interceptors/jwt-interceptor.service';
import { AuthServiceService } from './auth-service.service';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { ViewBookingsComponent } from './view-bookings/view-bookings.component';
import { TicketViewComponent } from './ticket-view/ticket-view.component';
import { PaymentComponent } from './payment/payment.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    FlightNumberComponent,
    UserHomeComponent,
    HomeUserComponent,
    FooterComponent,
    HeaderComponent,
    SignupComponent,
    LoginComponent,
    ChangePasswordComponent,
    ForgotPasswordComponent,
    UserHeaderComponent,
    BookingComponent,
    AdminHeaderComponent,
    AddFlightComponentComponent,
    FlightDetailsComponent,
    FlightListComponent,
    AdminHomeComponent,
    ViewBookingsComponent,
    TicketViewComponent,
    PaymentComponent,



    // Add other components here
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule // Include the AppRoutingModule

  ],
  providers: [
    AirlineService,
    UserService,
    FlightService,
    AuthServiceService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptorService,
      multi: true
    }  // Register the interceptor




  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
