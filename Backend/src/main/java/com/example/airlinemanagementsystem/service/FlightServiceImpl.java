package com.example.airlinemanagementsystem.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.airlinemanagementsystem.entity.Flight;
import com.example.airlinemanagementsystem.exceptionhandling.FlightNotFoundException;
import com.example.airlinemanagementsystem.repository.FlightRepository;

@Service
public class FlightServiceImpl implements FlightService {

	@Autowired
	private FlightRepository flightRepository;

	public FlightServiceImpl(FlightRepository flightRepository) {
		super();
		this.flightRepository = flightRepository;
	}

	@Override
	public Flight save(Flight flight) {
		return flightRepository.save(flight);
	}

	@Override
	public Flight findById(int flightId) throws FlightNotFoundException {
		Optional<Flight> result = flightRepository.findById(flightId);
		Flight flight;
		if (result.isPresent()) {
			flight = result.get();
		} else {
			throw new FlightNotFoundException("Flight with Id " + flightId + " Not Found");
		}

		return flight;
	}

	@Override
	public void deleteById(int flightId) throws FlightNotFoundException {
		if (flightRepository.existsById(flightId)) {
			flightRepository.deleteById(flightId);
		} else {
			throw new FlightNotFoundException("Flight with Id " + flightId + " Not Found");
		}

	}

	@Override
	public List<Flight> findByDestination(String destination) {
		
		return flightRepository.findByDestination(destination);
	}

	@Override
	public List<Flight> findBySource(String source) {
		
		return flightRepository.findBySource(source);
	}

	@Override
	public List<Flight> findAll() {
		// TODO Auto-generated method stub
		return flightRepository.findAll();
	}

}
