package com.example.airlinemanagementsystem.service;


import java.util.List;

import org.springframework.data.jpa.repository.Query;

import com.example.airlinemanagementsystem.entity.Flight;
import com.example.airlinemanagementsystem.exceptionhandling.FlightNotFoundException;

public interface FlightService {

	public Flight findById(int flightId) throws FlightNotFoundException;
	public void deleteById(int flightId) throws FlightNotFoundException;
	public Flight save(Flight flight);
	// view by source and destination
	public List<Flight> findByDestination(String destination);
	public List<Flight> findBySource(String source);
	
	public List<Flight> findAll();
	
}
