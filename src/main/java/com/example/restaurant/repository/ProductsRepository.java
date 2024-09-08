package com.example.restaurant.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.example.restaurant.model.Products;

public interface ProductsRepository extends JpaRepository<Products, Integer> {
	@Query(value = "SELECT *"+
			" FROM products "+
			"WHERE deleted_at IS NULL", nativeQuery = true)
	public List<Products> findByDeletedIsNull();
}
