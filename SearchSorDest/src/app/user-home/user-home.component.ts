import { AfterViewInit, Component } from '@angular/core';
import { AirlineService } from '../airline.service';
declare var bootstrap: any;

@Component({
  selector: 'app-user-home',
  templateUrl: './user-home.component.html',
  styleUrl: './user-home.component.css'
})
export class UserHomeComponent implements AfterViewInit {
  ngAfterViewInit() {
    const myCarousel = document.querySelector('#carouselExampleCaptions');
    new bootstrap.Carousel(myCarousel, {
      interval: 3000,
      wrap: true
    });
  }

  constructor(private airlineService: AirlineService) { }

}
