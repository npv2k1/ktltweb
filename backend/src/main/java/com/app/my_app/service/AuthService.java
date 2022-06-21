package com.app.my_app.service;

import com.app.my_app.model.UserDetailsImpl;
import com.app.my_app.domain.User;
import com.app.my_app.repos.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

@Service
public class AuthService {
    @Autowired
    private UserRepository userRepository;

    /**
     * Lấy id của người dùng hiện tại từ security context
     *
     * @return The current user's id.
     */
    public Long getCurrentUserId() {
        UserDetailsImpl u = (UserDetailsImpl) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        return u.getUserId();
    }


    /**
     * Lấy ID của người dùng hiện tại, sau đó tìm người dùng có ID đó và nếu bạn không thể tìm thấy, hãy ném 404.
     *
     * @return The current user's id.
     */
    public User getCurrentUser() {
        return userRepository.findById(getCurrentUserId()).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
    }

}