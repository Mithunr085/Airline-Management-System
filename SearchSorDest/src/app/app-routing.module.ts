import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { UserHomeComponent } from './user-home/user-home.component';
import { HomeUserComponent } from './home-user/home-user.component';
import { HeaderComponent } from './header/header.component';
import { SignupComponent } from './sign-up/sign-up.component';
import { LoginComponent } from './login/login.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { BookingComponent } from './booking/booking.component';
import { FlightDetailsComponent } from './flight-details/flight-details.component';
import { AdminHeaderComponent } from './admin-header/admin-header.component';
import { AddFlightComponentComponent } from './add-flight-component/add-flight-component.component';
import { FlightListComponent } from './flight-list/flight-list.component';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { ViewBookingsComponent } from './view-bookings/view-bookings.component';
import { TicketViewComponent } from './ticket-view/ticket-view.component';
import { PaymentComponent } from './payment/payment.component';


const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' }, // Redirect to home on empty path
  { path: 'user-home', component: HomeUserComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'login', component: LoginComponent },
  { path: 'forgotpassword', component: ForgotPasswordComponent },
  { path: 'changepassword', component: ChangePasswordComponent },
  { path: 'about-us', component: AboutUsComponent },
  { path: 'contact-us', component: ContactUsComponent },
  { path: 'home', component: HomeComponent },
  { path: 'book', component: BookingComponent },
  { path: 'updateflight/:flightNumber', component: FlightDetailsComponent },
  { path: 'admin-header', component: AdminHeaderComponent },
  { path: 'add-flight', component: AddFlightComponentComponent },
  { path: 'view-flights', component: FlightListComponent },
  { path: 'update-flight', component: FlightDetailsComponent },
  { path: 'admin-home', component: AdminHomeComponent },
  { path: 'view-bookings', component: ViewBookingsComponent },
  { path: 'view-ticket', component: TicketViewComponent },
  { path: 'payment', component: PaymentComponent },



  // Add other routes as needed
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
