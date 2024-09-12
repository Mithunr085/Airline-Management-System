package com.example.airlinemanagementsystem.service;

import java.util.List;

import com.example.airlinemanagementsystem.entity.User;
import com.example.airlinemanagementsystem.exceptionhandling.UserNotFoundException;

public interface UserService {

	User saveUser(User user);
    User loginUser(User user) throws UserNotFoundException;
	//User updateUser(User user, int userId);
	User getUserById(int userId)  throws UserNotFoundException;
	List<User> getAllUser();
	User getUserByEmail(User user) throws UserNotFoundException;
	void deleteUser(int userId)  throws UserNotFoundException;
}
