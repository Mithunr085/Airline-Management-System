package com.example.airlinemanagementsystem.service;

import java.util.List;
import com.example.airlinemanagementsystem.entity.Passenger;
import com.example.airlinemanagementsystem.exceptionhandling.FlightNotFoundException;
import com.example.airlinemanagementsystem.exceptionhandling.PassengerNotFoundException;

public interface PassengerService {

	public List<Passenger> findAll();
	public Passenger findById(int passengerId) throws PassengerNotFoundException;
	public void deleteById(int passengerId) throws PassengerNotFoundException;
	public Passenger save(Passenger passenger);
	// view passenger by bookingTicket Id
}
