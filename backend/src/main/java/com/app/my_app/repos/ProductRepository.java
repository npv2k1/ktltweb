package com.app.my_app.repos;

import com.app.my_app.domain.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;


public interface ProductRepository extends JpaRepository<Product, Long> {

    List<Product> findAllByCategory_Id(Long id);


    @Query("select p from Product p where p.name like concat('%', ?1, '%')")
    List<Product> findByNameIsContaining(String name);
}
