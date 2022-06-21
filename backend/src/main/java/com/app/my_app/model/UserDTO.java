package com.app.my_app.model;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

// data to object
@Getter
@Setter
public class UserDTO {

    private Long id;


    @Size(max = 255)
    private String username;


    @Size(max = 255)
    private String email;


    @Size(max = 255)
    private String password;

    @Size(max = 255)
    private String firstname;

    @Size(max = 255)
    private String lastname;

    @Size(max = 255)
    private String address;

    @Size(max = 255)
    private String phone;

}
