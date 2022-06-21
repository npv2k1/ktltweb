package com.app.my_app.service;

import com.app.my_app.domain.User;
import com.app.my_app.model.UserDTO;
import com.app.my_app.model.UserDetailsImpl;
import com.app.my_app.repos.UserRepository;

import java.util.List;
import java.util.Locale;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;


@Service
public class UserService  implements UserDetailsService {

    private static final PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
    private final UserRepository userRepository;

    @Autowired
    private ModelMapper modelMapper;



    public UserService(final UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public List<UserDTO> findAll() {
        return userRepository.findAll().stream().map(user -> mapToDTO(user, new UserDTO())).collect(Collectors.toList());
    }

    public User get(final Long id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
    }

    public Long create(final UserDTO userDTO) {
        final User user = new User();
        mapToEntity(userDTO, user);
        return userRepository.save(user).getId();
    }

    public void update(final Long id, final UserDTO userDTO) {
        final User user = userRepository.findById(id).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
//        mapToEntity(userDTO, user);

        user.setAddress(userDTO.getAddress());
        user.setPhone(userDTO.getPhone());

        userRepository.save(user);
    }

    public User registerUser(UserDTO userDto) {
//        userRepository
//                .findOneByUsername(userDto.getUsername().toLowerCase())
//                .ifPresent(existingUser -> {
//
//                    return null;
//                });

        User user = new User();
        user.setUsername(userDto.getUsername().toLowerCase());
        user.setEmail(userDto.getEmail().toLowerCase(Locale.ROOT));
        user.setFirstname(userDto.getFirstname());
        user.setLastname(userDto.getLastname());
        String encryptedPassword = passwordEncoder.encode(userDto.getPassword());
        user.setPassword(encryptedPassword);
        System.out.println(user);
        userRepository.save(user);
        return user;
    }

    public void delete(final Long id) {
        userRepository.deleteById(id);
    }

    private UserDTO mapToDTO(final User user, UserDTO userDTO) {
        userDTO = modelMapper.map(user, UserDTO.class);

        return userDTO;
    }

    private User mapToEntity(final UserDTO userDTO, User user) {
        user = modelMapper.map(userDTO, User.class);
        return user;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userRepository.findByUsername(username);
        if (user == null) {
            throw new UsernameNotFoundException(username);
        }
        return new UserDetailsImpl(user);
    }



}
