package com.example.restaurant.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.restaurant.model.OrderProducts;

public interface OrderProductsRepository extends JpaRepository<OrderProducts, Integer> {

}
