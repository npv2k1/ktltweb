package com.app.my_app.rest;

import com.app.my_app.config.jwt.JwtTokenUtil;
import com.app.my_app.domain.User;
import com.app.my_app.model.JwtRequest;
import com.app.my_app.model.JwtResponse;
import com.app.my_app.model.UserDTO;
import com.app.my_app.service.AuthService;
import com.app.my_app.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import javax.transaction.Transactional;
import javax.validation.Valid;


//API xử lý phần xác thực
@RestController
@RequestMapping("/api/auth")
@Transactional
public class AuthResource {
    // Injecting the services into the controller.
    @Autowired
    private UserService userService;
    @Autowired
    private AuthService authService;
    @Autowired
    private AuthenticationManager authenticationManager;
    @Autowired
    private JwtTokenUtil jwtTokenUtil;




    /**
     * The function takes in a UserDTO object, validates the password length, and then registers the user
     *
     * @param userDto The userDto object is the object that is passed in the request body.
     */
    @PostMapping("/register")
    @ResponseStatus(HttpStatus.CREATED)
    public void registerAccount(@Valid @RequestBody UserDTO userDto) {

        if (isPasswordLengthInvalid(userDto.getPassword())) {
            return;
        }
        User user = userService.registerUser(userDto);
        System.out.println(userDto);
    }



    /**
     * hàm lấy username and password, authenticates(Xác thực) user, and returns a token
     *
     * @param authenticationRequest This is the object that contains the username and password that the user entered.
     * @return A JWT token
     */
    @RequestMapping(value = "/login", method = RequestMethod.POST)
    public ResponseEntity<?> createAuthenticationToken(@RequestBody JwtRequest authenticationRequest) throws Exception {

        authenticate(authenticationRequest.getUsername(), authenticationRequest.getPassword());

        final UserDetails userDetails = userService
                .loadUserByUsername(authenticationRequest.getUsername());

        final String token = jwtTokenUtil.generateToken(userDetails);

        return ResponseEntity.ok(new JwtResponse(token));
    }


    /**
     * Lấy username và password, nếu username và password được xác thực, nó trả về JWT token
     *
     * @param username The username of the user
     * @param password The password of the user.
     */
    private void authenticate(String username, String password) throws Exception {
        try {
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(username, password));
        } catch (DisabledException e) {
            throw new Exception("USER_DISABLED", e);
        } catch (BadCredentialsException e) {
            throw new Exception("INVALID_CREDENTIALS", e);
        }
    }

    private static boolean isPasswordLengthInvalid(String password) {
        return password.length() < 4;
    }

}
