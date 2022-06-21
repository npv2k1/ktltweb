package com.app.my_app.model;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;


/**
 * Đó là DTO đại diện cho một danh mục
 */
@Getter
@Setter
public class CategoryDTO {

    private Long id;

    @Size(max = 255)
    private String name;

    @Size(max = 255)
    private String description;

    private Long categoryParent;

}
