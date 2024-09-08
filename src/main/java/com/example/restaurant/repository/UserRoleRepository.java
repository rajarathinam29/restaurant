package com.example.restaurant.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.restaurant.model.UserRole;

public interface UserRoleRepository extends JpaRepository<UserRole, Integer> {

}
