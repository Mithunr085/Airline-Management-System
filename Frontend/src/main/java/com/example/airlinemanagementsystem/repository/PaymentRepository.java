package com.example.airlinemanagementsystem.repository;

import com.example.airlinemanagementsystem.entity.Payment;

import java.util.List;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface PaymentRepository extends JpaRepository<Payment, Long> {
	@Query("SELECT p FROM Payment p WHERE p.user.userId = :userId")
	List<Payment> findByUserId(@Param("userId") int userId);

}
