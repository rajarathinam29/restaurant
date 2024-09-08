package com.example.restaurant.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.example.restaurant.model.Users;

public interface UsersRepository extends JpaRepository<Users, Integer> {
	@Query(value = "SELECT *"+
			" FROM users "+
			"WHERE deleted_at IS NULL", nativeQuery = true)
	public List<Users> findByDeletedIsNull();
	
	@Query(value = "SELECT * FROM users WHERE user_name=? AND password=? AND deleted_at IS NULL", nativeQuery = true)
	public List<Users> findByUsernamePassword(String userName, String password);
}
