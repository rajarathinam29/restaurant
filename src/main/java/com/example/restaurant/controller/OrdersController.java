package com.example.restaurant.controller;

import java.sql.Timestamp;
import java.time.LocalDate;
import java.util.Arrays;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.restaurant.model.Products;
import com.example.restaurant.model.OrderProducts;
import com.example.restaurant.model.Orders;
import com.example.restaurant.repository.OrderProductsRepository;
import com.example.restaurant.repository.OrdersRepository;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import jakarta.servlet.http.HttpServletRequest;

@RestController
@CrossOrigin
public class OrdersController {
	@Autowired
	private OrdersRepository ordersRepository;
	@Autowired
	private OrderProductsRepository orderProductsRepository;
	
	@PostMapping("/api/orders")
	public List<Orders> getOrdersData() {
		return ordersRepository.findByDeletedIsNull();
	}
	
	@PostMapping("/api/order/{id}")
	public Orders getOrderData(@PathVariable Integer id) {
		Orders order = ordersRepository.findById(id).get();
		return order;
	}
	
	@PostMapping("/api/order/create")
	public Orders createOrder(HttpServletRequest request) {
		Integer payment_status = 0;
		Integer status = 0;
		Long orderCount = ordersRepository.count();
		if(request.getParameter("payment_status") != null) {
			payment_status = Integer.parseInt(request.getParameter("payment_status"));
		}
		Orders newOrder = new Orders();
		newOrder.setOrder_date(LocalDate.parse(request.getParameter("orderDate")));
		newOrder.setOrder_ref_id(Long.toString(orderCount+1));
		newOrder.setOrder_type(Integer.parseInt(request.getParameter("orderType")));
		newOrder.setCustomer_id(Integer.parseInt(request.getParameter("customerId")));
		newOrder.setPayment_status(payment_status);
		newOrder.setStatus(status);
		newOrder.setNet_total(Float.parseFloat(request.getParameter("netTotal")));
		newOrder.setDiscount(Float.parseFloat(request.getParameter("discount")));
		newOrder.setAdditional_charges(Float.parseFloat(request.getParameter("additionalCharge")));
		
		ordersRepository.save(newOrder);
		ObjectMapper mapper = new ObjectMapper();
		List<Products> orderProducts;
		try {
			orderProducts = mapper.readValue(request.getParameter("orders"), new TypeReference<List<Products>>(){});
			orderProducts.forEach(product->{
//				System.out.println(product.getProduct_name());
				OrderProducts orderProduct = new OrderProducts();
				orderProduct.setOrder_id(newOrder.getId());
				orderProduct.setProduct_id(product.getId());
				orderProduct.setQty(Float.parseFloat(product.getQty()));
				orderProduct.setCost_price(product.getCost_price());
				orderProduct.setSale_price(product.getSale_price());
				orderProductsRepository.save(orderProduct);
			});
		} catch (JsonMappingException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (JsonProcessingException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
//		char[] products = request.getParameter("orders").toCharArray();
		
		
		return newOrder;
	}
	
	@PutMapping("/api/order/update/{id}")
	public Orders updateOrder(@PathVariable Integer id, HttpServletRequest request) {
		Orders order = ordersRepository.findById(id).get();
		order.setId(id);
		order.setOrder_date(LocalDate.parse(request.getParameter("orderDate")));
//		order.setOrder_ref_id(request.getParameter("orderId"));
		order.setOrder_type(Integer.parseInt(request.getParameter("orderType")));
		order.setCustomer_id(Integer.parseInt(request.getParameter("customerId")));
		order.setPayment_status(Integer.parseInt(request.getParameter("payment_status")));
		order.setStatus(Integer.parseInt(request.getParameter("status")));
		order.setNet_total(Float.parseFloat(request.getParameter("netTotal")));
		order.setDiscount(Float.parseFloat(request.getParameter("discount")));
		order.setAdditional_charges(Float.parseFloat(request.getParameter("additionalCharge")));
		return ordersRepository.save(order);
	}
	
	
	@DeleteMapping("/api/order/delete/{id}")
	public String deleteOrder(@PathVariable Integer id) {
		Orders order = ordersRepository.findById(id).get();
		order.setDeleted_at(new Timestamp(System.currentTimeMillis()));
		ordersRepository.save(order);
		return "Successfully Deleted.";
	}

}
