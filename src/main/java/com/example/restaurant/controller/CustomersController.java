package com.example.restaurant.controller;

import java.sql.Timestamp;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.restaurant.model.Customers;
import com.example.restaurant.repository.CustomersRepository;

import jakarta.servlet.http.HttpServletRequest;

@RestController
@CrossOrigin
public class CustomersController {
	@Autowired
	private CustomersRepository customersRepository;
	
	@PostMapping("/api/customers")
	public List<Customers> getCustomersData() {
		return customersRepository.findByDeletedIsNull();
	}
	
	@PostMapping("/api/customer/login")
	public List<Customers> customersLogin(HttpServletRequest request) {
		return customersRepository.findByUsernamePassword(request.getParameter("uname"), request.getParameter("pwd"));
	}
	
	@PostMapping("/api/customer/{id}")
	public Customers getCustomerData(@PathVariable Integer id) {
		Customers customer = customersRepository.findById(id).get();
		return customer;
	}
	
	@PostMapping("/api/customer/create-customer")
	public Customers createCustomer(HttpServletRequest request) {
		Customers newCustomer = new Customers();
		newCustomer.setFirst_name(request.getParameter("first_name"));
		newCustomer.setLast_name(request.getParameter("last_name"));
		newCustomer.setPhone_no(request.getParameter("phone_no"));
		newCustomer.setAddress(request.getParameter("address"));
		newCustomer.setEmail(request.getParameter("email"));
		newCustomer.setUser_name(request.getParameter("user_name"));
		newCustomer.setPassword(request.getParameter("password"));
		
		customersRepository.save(newCustomer);
		return newCustomer;
	}
	
	@PutMapping("/api/customer/update-customer/{id}")
	public Customers updateCustomer(@PathVariable Integer id, HttpServletRequest request) {
		Customers customer = customersRepository.findById(id).get();
		customer.setId(id);
		customer.setFirst_name(request.getParameter("first_name"));
		customer.setLast_name(request.getParameter("last_name"));
		customer.setPhone_no(request.getParameter("phone_no"));
		customer.setAddress(request.getParameter("address"));
		customer.setEmail(request.getParameter("email"));
		customer.setUser_name(request.getParameter("user_name"));
		return customersRepository.save(customer);
	}
	
	
	
	@DeleteMapping("/api/customer/delete-customer/{id}")
	public String deleteCustomer(@PathVariable Integer id) {
		Customers customer = customersRepository.findById(id).get();
		customer.setDeleted_at(new Timestamp(System.currentTimeMillis()));
		customersRepository.save(customer);
		return "Successfully Deleted.";
	}
}
