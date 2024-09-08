package com.example.restaurant.model;

import java.sql.Timestamp;
import java.time.LocalDate;
import java.util.List;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.persistence.Transient;

@Table(name = "orders")
@Entity
public class Orders {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;
	private LocalDate order_date;
	private String order_ref_id;
	private Integer customer_id;
	private Integer order_type;
	private Integer payment_status;
	private Integer status;
	private Float net_total;
	private Float discount;
	private Float additional_charges;
	private Timestamp created_at;
	private Timestamp updated_at;
	private Timestamp deleted_at;
	@Transient
	private List<OrderProducts> orderProducts;
	public Integer getId() {
		return id;
	}
	public void setId(Integer id) {
		this.id = id;
	}
	public LocalDate getOrder_date() {
		return order_date;
	}
	public void setOrder_date(LocalDate order_date) {
		this.order_date = order_date;
	}
	public String getOrder_ref_id() {
		return order_ref_id;
	}
	public void setOrder_ref_id(String order_ref_id) {
		this.order_ref_id = order_ref_id;
	}
	public Integer getCustomer_id() {
		return customer_id;
	}
	public void setCustomer_id(Integer customer_id) {
		this.customer_id = customer_id;
	}
	public Integer getOrder_type() {
		return order_type;
	}
	public void setOrder_type(Integer order_type) {
		this.order_type = order_type;
	}
	public Integer getPayment_status() {
		return payment_status;
	}
	public void setPayment_status(Integer payment_status) {
		this.payment_status = payment_status;
	}
	public Integer getStatus() {
		return status;
	}
	public void setStatus(Integer status) {
		this.status = status;
	}
	public Float getNet_total() {
		return net_total;
	}
	public void setNet_total(Float net_total) {
		this.net_total = net_total;
	}
	public Float getDiscount() {
		return discount;
	}
	public void setDiscount(Float discount) {
		this.discount = discount;
	}
	public Float getAdditional_charges() {
		return additional_charges;
	}
	public void setAdditional_charges(Float additional_charges) {
		this.additional_charges = additional_charges;
	}
	public Timestamp getCreated_at() {
		return created_at;
	}
	public void setCreated_at(Timestamp created_at) {
		this.created_at = created_at;
	}
	public Timestamp getUpdated_at() {
		return updated_at;
	}
	public void setUpdated_at(Timestamp updated_at) {
		this.updated_at = updated_at;
	}
	public Timestamp getDeleted_at() {
		return deleted_at;
	}
	public void setDeleted_at(Timestamp deleted_at) {
		this.deleted_at = deleted_at;
	}
	public List<OrderProducts> getOrderProducts() {
		return orderProducts;
	}
	public void setOrderProducts(List<OrderProducts> orderProducts) {
		this.orderProducts = orderProducts;
	}
	
}
