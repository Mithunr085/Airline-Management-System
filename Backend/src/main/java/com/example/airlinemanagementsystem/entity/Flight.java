package com.example.airlinemanagementsystem.entity;



import jakarta.persistence.*;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Positive;

@Entity
@Table(name = "flight_table")
@NamedQueries({
    @NamedQuery(name = "flight.findBySource", query = "select f from Flight f where f.source = :source"),
    @NamedQuery(name = "flight.findByDestination", query = "select f from Flight f where f.destination = :destination"),
    @NamedQuery(name = "flight.findBySourceDestination", query = "select f from Flight f where f.source = :source and f.destination = :destination")
})
public class Flight {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int flightId;

    @Column(name = "flight_number",unique = true)
    @NotBlank(message = "Flight number is mandatory")
    private String flightNumber;

    @NotBlank(message = "Departure time is mandatory")
    private String departureTime;

    @NotBlank(message = "Arrival time is mandatory")
    private String arrivalTime;

    @NotBlank(message = "Source is mandatory")
    private String source;

    @NotBlank(message = "Destination is mandatory")
    private String destination;

    @Min(value = 1, message = "Available seats must be at least 1")
    private int availableSeats;

    @Positive(message = "Price must be a positive number")
    private double price;

//    @JsonManagedReference // to avoid infite loop while insertion
//    @OneToMany(mappedBy = "flight", cascade = CascadeType.ALL, orphanRemoval = true)
//    private List<BookingTicket> bookingTickets;

    public Flight() {
    }

    public Flight(int flightId, @NotBlank(message = "Flight number is mandatory") String flightNumber,
                  @NotBlank(message = "Departure time is mandatory") String departureTime,
                  @NotBlank(message = "Arrival time is mandatory") String arrivalTime,
                  @NotBlank(message = "Source is mandatory") String source,
                  @NotBlank(message = "Destination is mandatory") String destination,
                  @Min(value = 1, message = "Available seats must be at least 1") int availableSeats,
                  @Positive(message = "Price must be a positive number") double price /*, List<BookingTicket> bookingTickets */) {
        this.flightId = flightId;
        this.flightNumber = flightNumber;
        this.departureTime = departureTime;
        this.arrivalTime = arrivalTime;
        this.source = source;
        this.destination = destination;
        this.availableSeats = availableSeats;
        this.price = price;
       // this.bookingTickets = bookingTickets;
    }

    public int getFlightId() {
        return flightId;
    }

    public void setFlightId(int flightId) {
        this.flightId = flightId;
    }

    public String getFlightNumber() {
        return flightNumber;
    }

    public void setFlightNumber(String flightNumber) {
        this.flightNumber = flightNumber;
    }

    public String getDepartureTime() {
        return departureTime;
    }

    public void setDepartureTime(String departureTime) {
        this.departureTime = departureTime;
    }

    public String getArrivalTime() {
        return arrivalTime;
    }

    public void setArrivalTime(String arrivalTime) {
        this.arrivalTime = arrivalTime;
    }

    public String getSource() {
        return source;
    }

    public void setSource(String source) {
        this.source = source;
    }

    public String getDestination() {
        return destination;
    }

    public void setDestination(String destination) {
        this.destination = destination;
    }

    public int getAvailableSeats() {
        return availableSeats;
    }

    public void setAvailableSeats(int availableSeats) {
        this.availableSeats = availableSeats;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

//    public List<BookingTicket> getBookingTickets() {
//        return bookingTickets;
//    }
//
//    public void setBookingTickets(List<BookingTicket> bookingTickets) {
//        this.bookingTickets = bookingTickets;
//    }
}
