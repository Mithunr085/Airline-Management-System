package com.example.airlinemanagementsystem.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.airlinemanagementsystem.entity.Passenger;

public interface PassengerRepository extends JpaRepository<Passenger, Integer> {
    
}