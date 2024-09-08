package com.example.restaurant.controller;

import java.sql.Timestamp;
import java.time.LocalDate;
import java.util.List;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.restaurant.model.ProductReviews;
import com.example.restaurant.repository.ProductReviewsRepository;

import jakarta.servlet.http.HttpServletRequest;

@RestController
@CrossOrigin
public class ProductReviewsController {
	@Autowired
	private ProductReviewsRepository productReviewsRepository;
	
	@PostMapping("/api/productReviews")
	public List<ProductReviews> getProductReviewsData() {
		return productReviewsRepository.findByDeletedIsNull();
	}
	
	@PostMapping("/api/productReview/{id}")
	public ProductReviews getReviewData(@PathVariable Integer id) {
		ProductReviews review = productReviewsRepository.findById(id).get();
		return review;
	}
	
	@PostMapping("/api/productReview/create")
	public ProductReviews createReview(HttpServletRequest request) {
		ProductReviews newReview = new ProductReviews();
		newReview.setDate(LocalDate.parse(request.getParameter("date")));
		newReview.setProduct_id(Integer.parseInt(request.getParameter("product_id")));
		newReview.setCustomer_id(Integer.parseInt(request.getParameter("customer_id")));
		newReview.setStars(Float.parseFloat("stars"));
		newReview.setReviews(request.getParameter("review"));
		
		productReviewsRepository.save(newReview);
		return newReview;
	}
	
	@PutMapping("/api/productReview/update/{id}")
	public ProductReviews updateReview(@PathVariable Integer id, HttpServletRequest request) {
		ProductReviews review = productReviewsRepository.findById(id).get();
		review.setId(id);
		review.setDate(LocalDate.parse(request.getParameter("date")));
		review.setProduct_id(Integer.parseInt(request.getParameter("product_id")));
		review.setCustomer_id(Integer.parseInt(request.getParameter("customer_id")));
		review.setStars(Float.parseFloat("stars"));
		review.setReviews(request.getParameter("review"));
		return productReviewsRepository.save(review);
	}
	
	
	@DeleteMapping("/api/productReview/delete/{id}")
	public String deleteReview(@PathVariable Integer id) {
		ProductReviews review = productReviewsRepository.findById(id).get();
		review.setDeleted_at(new Timestamp(System.currentTimeMillis()));
		productReviewsRepository.save(review);
		return "Successfully Deleted.";
	}
}
