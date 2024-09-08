package com.example.restaurant.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.example.restaurant.model.ProductReviews;

public interface ProductReviewsRepository extends JpaRepository<ProductReviews, Integer> {
	@Query(value = "SELECT *"+
			" FROM product_reviews "+
			"WHERE deleted_at IS NULL", nativeQuery = true)
	public List<ProductReviews> findByDeletedIsNull();
}
