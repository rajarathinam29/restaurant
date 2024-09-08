package com.example.restaurant.controller;

//import java.sql.Timestamp;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
//import org.springframework.web.bind.annotation.DeleteMapping;
//import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.restaurant.repository.UserRoleRepository;

import jakarta.servlet.http.HttpServletRequest;

import com.example.restaurant.model.UserRole;

@RestController
@CrossOrigin
public class UserRoleController {
	
	@Autowired
	private UserRoleRepository userRoleRepository;
	
	@PostMapping("/api/userRoles")
	public List<UserRole> getUserRoles() {
		return userRoleRepository.findAll();
	}
	
	@PostMapping("/api/userRole/{id}")
	public UserRole getUserRole(@PathVariable Integer id) {
		UserRole userRole = userRoleRepository.findById(id).get();
		return userRole;
	}
	
	@PostMapping("/api/userRole/create")
	public UserRole createUserRole(HttpServletRequest request) {
		UserRole userRole = new UserRole();
		userRole.setRole_name(request.getParameter("role_name"));
		userRoleRepository.save(userRole);
		return userRole;
	}
	
	@PutMapping("/api/userRole/update/{id}")
	public UserRole updateUserRole(@PathVariable Integer id, HttpServletRequest request) {
		UserRole userRole = userRoleRepository.findById(id).get();
		userRole.setId(id);
		userRole.setRole_name(request.getParameter("role_name"));
		return userRoleRepository.save(userRole);
	}
	
	@PutMapping("/api/userRole/setPermission/{id}")
	public UserRole setPermission(@PathVariable Integer id, HttpServletRequest request) {
		UserRole userRole = userRoleRepository.findById(id).get();
		System.out.println(request.getParameter("permission"));
		userRole.setPermission(request.getParameter("permission"));
		return userRoleRepository.save(userRole);
	}
	
//	@DeleteMapping("/api/userRole/delete/{id}")
//	public void deleteUserRole(@PathVariable Long id) {
//		UserRole userRole = userRoleRepository.findById(id).get();
//		userRole.setDeleted_at(new Timestamp(System.currentTimeMillis()));
//		userRoleRepository.save(userRole);
//	}
}
