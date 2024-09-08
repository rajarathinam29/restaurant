package com.example.restaurant.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.example.restaurant.model.Orders;

public interface OrdersRepository extends JpaRepository<Orders, Integer> {
	@Query(value = "SELECT *"+
			" FROM orders "+
			"WHERE deleted_at IS NULL", nativeQuery = true)
	public List<Orders> findByDeletedIsNull();
}
