package com.app.my_app.repos;

import com.app.my_app.domain.OrderStatus;
import org.springframework.data.jpa.repository.JpaRepository;


public interface OrderStatusRepository extends JpaRepository<OrderStatus, Long> {
}
