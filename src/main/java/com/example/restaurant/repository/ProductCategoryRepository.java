package com.example.restaurant.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.example.restaurant.model.ProductCategory;

public interface ProductCategoryRepository extends JpaRepository<ProductCategory, Integer> {
	@Query(value = "SELECT *"+
			" FROM product_category "+
			"WHERE deleted_at IS NULL", nativeQuery = true)
	public List<ProductCategory> findByDeletedIsNull();
}
