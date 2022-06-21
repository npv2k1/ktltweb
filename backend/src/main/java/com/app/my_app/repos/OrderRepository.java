package com.app.my_app.repos;

import com.app.my_app.domain.Order;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;


public interface OrderRepository extends JpaRepository<Order, Long> {
    List<Order>  findAllByUsersId(Long userId);
}
