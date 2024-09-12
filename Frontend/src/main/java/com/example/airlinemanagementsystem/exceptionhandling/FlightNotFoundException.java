package com.example.airlinemanagementsystem.exceptionhandling;

public class FlightNotFoundException extends RuntimeException {

	public FlightNotFoundException() {
		super();
		// TODO Auto-generated constructor stub
	}

	public FlightNotFoundException(String message, Throwable cause, boolean enableSuppression,
			boolean writableStackTrace) {
		super(message, cause, enableSuppression, writableStackTrace);
		// TODO Auto-generated constructor stub
	}

	public FlightNotFoundException(String message, Throwable cause) {
		super(message, cause);
		// TODO Auto-generated constructor stub
	}

	public FlightNotFoundException(String message) {
		super(message);
		// TODO Auto-generated constructor stub
	}

	public FlightNotFoundException(Throwable cause) {
		super(cause);
		// TODO Auto-generated constructor stub
	}

}
