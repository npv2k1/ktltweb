package com.app.my_app.model;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;


@Getter
@Setter
public class OrderDTO {

    private Long id;

    private Long total;

    @Size(max = 255)
    private String address;

    private String phone;

    private Long status;

    private Long users;

}
