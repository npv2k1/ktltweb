package com.app.my_app.model;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;


@Getter
@Setter
public class OrderItemDTO {
    private Long id;

    private Integer quantity;

    @Size(max = 255)
    private String name;

    @Size(max = 255)
    private Long price;

    private Long order;

}
