package com.app.my_app.repos;

import com.app.my_app.domain.CartItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;


public interface CartItemRepository extends JpaRepository<CartItem, Long> {
    List<CartItem> findAllByUserId(Long id);

    void deleteAllByUserId(Long id);

    CartItem findCartItemByProductIdAndUserId(Long productId, Long UserId);
}
