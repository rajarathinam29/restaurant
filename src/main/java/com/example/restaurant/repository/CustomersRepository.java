package com.example.restaurant.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.example.restaurant.model.Customers;

public interface CustomersRepository extends JpaRepository<Customers, Integer> {
	@Query(value = "SELECT *"+
			" FROM customers "+
			"WHERE deleted_at IS NULL", nativeQuery = true)
	public List<Customers> findByDeletedIsNull();
	
	@Query(value = "SELECT * FROM customers WHERE user_name=? AND password=? AND deleted_at IS NULL", nativeQuery = true)
	public List<Customers> findByUsernamePassword(String userName, String password);
}
