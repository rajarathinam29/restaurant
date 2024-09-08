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

import com.example.restaurant.model.ProductCategory;
import com.example.restaurant.repository.ProductCategoryRepository;

import jakarta.servlet.http.HttpServletRequest;

@RestController
@CrossOrigin
public class ProductCategoryController {
	@Autowired
	private ProductCategoryRepository productCategoryRepository;
	
	@PostMapping("/api/productCategories")
	public List<ProductCategory> getProductCategoryData() {
		return productCategoryRepository.findByDeletedIsNull();
	}
	
	@PostMapping("/api/productCategory/{id}")
	public ProductCategory getProductCategoryData(@PathVariable Integer id) {
		ProductCategory productCategory = productCategoryRepository.findById(id).get();
		return productCategory;
	}
	
	@PostMapping("/api/productCategory/create")
	public ProductCategory createProductCategory(HttpServletRequest request) {
		ProductCategory newCategory = new ProductCategory();
		newCategory.setCategory_name(request.getParameter("category_name"));
		newCategory.setDescription(request.getParameter("description"));
		
		productCategoryRepository.save(newCategory);
		return newCategory;
	}
	
	@PutMapping("/api/productCategory/update/{id}")
	public ProductCategory updateProductCategory(@PathVariable Integer id, HttpServletRequest request) {
		ProductCategory category = productCategoryRepository.findById(id).get();
		category.setId(id);
		category.setCategory_name(request.getParameter("category_name"));
		category.setDescription(request.getParameter("description"));
		return productCategoryRepository.save(category);
	}
	
	
	@DeleteMapping("/api/productCategory/delete/{id}")
	public String deleteProductCategory(@PathVariable Integer id) {
		ProductCategory category = productCategoryRepository.findById(id).get();
		category.setDeleted_at(new Timestamp(System.currentTimeMillis()));
		productCategoryRepository.save(category);
		return "Successfully Deleted.";
	}

}
