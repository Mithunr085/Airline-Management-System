package com.example.airlinemanagementsystem.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.airlinemanagementsystem.entity.User;

public interface UserRepository extends JpaRepository<User, Integer> {
	Optional<User> findByEmailIdAndPassword(String emailId,String password);
	Optional<User> findByEmailId(String emailId);

}
