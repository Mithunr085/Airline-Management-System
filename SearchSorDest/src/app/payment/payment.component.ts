import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AirlineService } from '../airline.service';
import { AuthServiceService } from '../auth-service.service';

declare var Razorpay: any; // Declare Razorpay for use in the component

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {
  bookings: any[] = []; // Array to hold booking details


  constructor(
    private airlineService: AirlineService,
    private authService: AuthServiceService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadBookings();
  }

  // Fetch all bookings on component load
  loadBookings(): void {
    const userId = this.authService.getUserAuthorization();

    if (userId) {
      this.airlineService.getBookingsByUserId(userId).subscribe(
        (response: any) => {
          console.log('User Bookings data:', response);
          // Filter out paid bookings
          this.bookings = response.filter((booking: any) => booking.status !== 'Delivered');
        },
        (error) => {
          console.error('Error fetching bookings:', error);
          alert('Failed to load bookings. Please try again later.');
        }
      );
    } else {
      console.error('User ID not found. Please log in again.');
      this.authService.userLogout(); // Redirect to login if userId is missing
    }
  }

  // Method to initiate the payment process
  makePayment(booking: any): void {
    // Assuming booking.price is the flight price and already includes the correct amount.
    const amount = booking.price; // Convert to paise (for Razorpay)

    this.airlineService.addPaymentOfOrder(amount).subscribe(
      (response: any) => {
        console.log('Order created:', response);

        // Initialize Razorpay payment options
        const options = {
          key: 'rzp_test_g4dPtSsipznM25', // Replace with your Razorpay key ID
          amount: response.amount,
          currency: response.currency,
          name: 'Airline Booking Payment',
          description: 'Payment for Booking ID ' + booking.bookingId,
          order_id: response.id, // Razorpay order ID
          handler: (paymentResponse: any) => {
            console.log('Payment successful:', paymentResponse);

            // Call the backend to verify payment and update the booking status
            const userId = this.authService.getUserAuthorization();
            this.airlineService.addPayment(paymentResponse, booking.bookingId, userId)
              .subscribe(
                (verificationResponse: any) => {
                  console.log('Payment verification successful:', verificationResponse);
                  alert('Payment successful!');
                  this.loadBookings(); // Reload bookings to reflect updated status
                  //alert('Payment successful!');
                  window.location.reload();

                },
                (verificationError: any) => {
                  console.error('Payment verification failed:', verificationError);
                  alert('Payment failed. Please try again.');
                }
              );
          },
          prefill: {
            name: 'Mithun',
            email: 'mithun@gmail.com', // Assuming getUserEmail() exists
            contact: '6363700975'
          },
          theme: {
            color: '#3399cc'
          }
        };

        // Open Razorpay payment interface
        const rzp = new Razorpay(options);
        rzp.open();
      },
      (error) => {
        console.error('Error creating Razorpay order:', error);
        alert('Failed to initiate payment. Please try again later.');
      }
    );
  }


  // Cancel a specific booking
  cancelBooking(bookingId: number): void {
    this.airlineService.deleteBooking(bookingId).subscribe(
      () => {
        alert('Booking canceled successfully.');
        this.loadBookings(); // Refresh bookings after cancellation
      },
      (error) => {
        console.error('Error canceling booking:', error);
        alert('Failed to cancel booking.');
      }
    );
  }
}
