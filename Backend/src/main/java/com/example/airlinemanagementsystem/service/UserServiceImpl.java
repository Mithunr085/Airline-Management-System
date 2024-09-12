package com.example.airlinemanagementsystem.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


import com.example.airlinemanagementsystem.entity.User;
import com.example.airlinemanagementsystem.exceptionhandling.FlightNotFoundException;
import com.example.airlinemanagementsystem.exceptionhandling.UserNotFoundException;
import com.example.airlinemanagementsystem.repository.UserRepository;


@Service
public class UserServiceImpl implements UserService{


	@Autowired
	private UserRepository userRepository;
	
	public UserServiceImpl(UserRepository userRepository) {
		super();
		this.userRepository = userRepository;
	}

	@Override
	public User saveUser(User user) {
		// TODO Auto-generated method stub
		return userRepository.save(user);
	}

	@Override
	public User loginUser(User user) throws UserNotFoundException {
		// TODO Auto-generated method stub
		Optional<User> result = userRepository.findByEmailIdAndPassword(user.getEmailId(), user.getPassword());
		if(result.isPresent()) {
			user=result.get();
		} else {
			throw new UserNotFoundException("Invlaid EmailId and Password");
		}
		return user;
	}


	

	@Override
	public List<User> getAllUser() {
		// TODO Auto-generated method stub
		return userRepository.findAll();
	}

	@Override
	public User getUserByEmail(User user) throws UserNotFoundException {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public void deleteUser(int userId) throws UserNotFoundException {
		// TODO Auto-generated method stub
		if (userRepository.existsById(userId)) {
			userRepository.deleteById(userId);
		} else {
			throw new UserNotFoundException("User with Id " + userId + " Not Found");
		}
		
	}

	

	@Override
	public User getUserById(int userId) throws UserNotFoundException {
		// TODO Auto-generated method stub
		Optional<User> result = userRepository.findById(userId);
		User user;
		if (result.isPresent()) {
			user = result.get();
		} else {
			throw new FlightNotFoundException("User with Id " + userId + " Not Found");
		}

		return user;
		//return null;
	}


	

}
