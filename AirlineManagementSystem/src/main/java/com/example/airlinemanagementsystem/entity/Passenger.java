package com.example.airlinemanagementsystem.entity;



import jakarta.persistence.*;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;


@Entity
@Table(name = "passenger_table")
public class Passenger {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int passengerId;

    @NotBlank(message = "Passenger name is required")
    private String name;

    @NotBlank(message = "Passenger gender is required")
    private String gender;

    @NotNull(message = "Passenger age is required")
    @Min(value = 5, message = "Age must be 5 and above")
    private int age;

//    @JsonManagedReference
//    @OneToOne(mappedBy = "passenger")
//    private BookingTicket bookingTicket;

    @NotEmpty(message = "Phone number must not be empty")
    @Size(min = 10, max = 10, message = "Phone number must be 10 digits")
    private String phoneNumber;


    public Passenger() {
        super();
    }

    public Passenger(int passengerId, @NotBlank(message = "Passenger name is required") String name,
                     @NotBlank(message = "Passenger gender is required") String gender,
                     @NotNull(message = "Passenger age is required") @Min(value = 5, message = "Age must be 5 and above") int age,
                    // BookingTicket bookingTicket,
                     @NotEmpty(message = "Phone number must not be empty")     @Size(min = 10, max = 10, message = "Phone number must be 10 digits") String phoneNumber) {
        super();
        this.passengerId = passengerId;
        this.name = name;
        this.gender = gender;
        this.age = age;
       // this.bookingTicket = bookingTicket;
        this.phoneNumber = phoneNumber;
    }

    public int getPassengerId() {
        return passengerId;
    }

    public void setPassengerId(int passengerId) {
        this.passengerId = passengerId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getGender() {
        return gender;
    }

    public void setGender(String gender) {
        this.gender = gender;
    }

    public int getAge() {
        return age;
    }

    public void setAge(int age) {
        this.age = age;
    }

//    public BookingTicket getBookingTicket() {
//        return bookingTicket;
//    }
//
//    public void setBookingTicket(BookingTicket bookingTicket) {
//        this.bookingTicket = bookingTicket;
//    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }
}
