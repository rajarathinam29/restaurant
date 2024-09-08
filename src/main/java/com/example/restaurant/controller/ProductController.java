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
import com.example.restaurant.model.Products;
import com.example.restaurant.repository.ProductCategoryRepository;
import com.example.restaurant.repository.ProductsRepository;

import jakarta.servlet.http.HttpServletRequest;

@RestController
@CrossOrigin
public class ProductController {
	@Autowired
	private ProductsRepository productsRepository;
	@Autowired
	private ProductCategoryRepository productCategoryRepository;
	
	@PostMapping("/api/products")
	public List<Products> getProductsData() {
		List<Products> products = productsRepository.findByDeletedIsNull();
		products.forEach(product->{
			ProductCategory category = productCategoryRepository.findById(product.getCategory_id()).get();
			product.setCategory_name(category.getCategory_name());
		});
		return products;
	}
	
	@PostMapping("/api/product/{id}")
	public Products getProductData(@PathVariable Integer id) {
		Products product = productsRepository.findById(id).get();
		return product;
	}
	
	@PostMapping("/api/product/create")
	public Products createProduct(HttpServletRequest request) {
		Products newProduct = new Products();
		newProduct.setCategory_id(Integer.parseInt(request.getParameter("category_id")));
		newProduct.setProduct_name(request.getParameter("product_name"));
		newProduct.setCost_price(Float.parseFloat(request.getParameter("cost_price")));
		newProduct.setSale_price(Float.parseFloat(request.getParameter("sale_price")));
		
		productsRepository.save(newProduct);
		return newProduct;
	}
	
	@PutMapping("/api/product/update/{id}")
	public Products updateProduct(@PathVariable Integer id, HttpServletRequest request) {
		Products product = productsRepository.findById(id).get();
		product.setId(id);
		product.setCategory_id(Integer.parseInt(request.getParameter("category_id")));
		product.setProduct_name(request.getParameter("product_name"));
		product.setCost_price(Float.parseFloat(request.getParameter("cost_price")));
		product.setSale_price(Float.parseFloat(request.getParameter("sale_price")));
		return productsRepository.save(product);
	}
	
	
	@DeleteMapping("/api/product/delete/{id}")
	public String deleteProduct(@PathVariable Integer id) {
		Products product = productsRepository.findById(id).get();
		product.setDeleted_at(new Timestamp(System.currentTimeMillis()));
		productsRepository.save(product);
		return "Successfully Deleted.";
	}
}
