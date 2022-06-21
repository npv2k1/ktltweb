package com.app.my_app.repos;

import com.app.my_app.domain.User;
import com.app.my_app.service.UserService;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;


public interface UserRepository extends JpaRepository<User, Long> {
    User findByEmail(String email);
    User findByUsername (String username);
    Optional<User> findOneByUsername(String username);

}
