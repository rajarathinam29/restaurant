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

import com.example.restaurant.repository.UserRoleRepository;
import com.example.restaurant.repository.UsersRepository;
import com.example.restaurant.model.UserRole;
import com.example.restaurant.model.Users;

import jakarta.servlet.http.HttpServletRequest;

@RestController
@CrossOrigin
public class UserController {
	@Autowired
	private UsersRepository usersRepository;
	@Autowired
	private UserRoleRepository userRoleRepository;
	
	@PostMapping("/api/users")
	public List<Users> getUsersData() {
		List<Users> users = usersRepository.findByDeletedIsNull();
		users.forEach(user ->{
			UserRole userRole = userRoleRepository.findById(user.getUser_role()).get();
			user.setRole_name(userRole.getRole_name());
		});
		return users;
//		return usersRepository.findAll();
	}
	
	@PostMapping("/api/login")
	public List<Users> userLogin(HttpServletRequest request) {
		return usersRepository.findByUsernamePassword(request.getParameter("uname"), request.getParameter("pwd"));
	}
	
	@PostMapping("/api/user/{id}")
	public Users getUserData(@PathVariable Integer id) {
		Users user = usersRepository.findById(id).get();
		return user;
	}
	
	@PostMapping("/api/user/create")
	public Users createUser(HttpServletRequest request) {
		System.out.println(request.getParameter("user_name"));
		Users newUser = new Users();
		newUser.setFirst_name(request.getParameter("first_name"));
		newUser.setLast_name(request.getParameter("last_name"));
		newUser.setPhone_no(request.getParameter("phone_no"));
		newUser.setAddress(request.getParameter("address"));
		newUser.setEmail(request.getParameter("email"));
		newUser.setUser_name(request.getParameter("user_name"));
		newUser.setPassword(request.getParameter("password"));
		newUser.setUser_role(Integer.parseInt(request.getParameter("role")));
		
		usersRepository.save(newUser);
		return newUser;
	}
	
	@PutMapping("/api/user/update/{id}")
	public Users updateUser(@PathVariable Integer id, HttpServletRequest request) {
		Users user = usersRepository.findById(id).get();
		user.setId(id);
		user.setFirst_name(request.getParameter("first_name"));
		user.setLast_name(request.getParameter("last_name"));
		user.setPhone_no(request.getParameter("phone_no"));
		user.setAddress(request.getParameter("address"));
		user.setEmail(request.getParameter("email"));
		user.setUser_name(request.getParameter("user_name"));
		user.setUser_role(Integer.parseInt(request.getParameter("role")));
		return usersRepository.save(user);
	}
	
	
	
	@DeleteMapping("/api/user/delete/{id}")
	public String deleteUser(@PathVariable Integer id) {
		Users user = usersRepository.findById(id).get();
		user.setDeleted_at(new Timestamp(System.currentTimeMillis()));
		usersRepository.save(user);
		return "Successfully Deleted.";
	}
}
