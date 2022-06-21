package com.app.my_app.domain;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;



@Entity
@Getter
@Setter
public class Category {

    @Id
    @Column(nullable = false, updatable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String name;

    @Column(name = "\"description\"")
    private String description;

    @ManyToOne
    @JoinColumn(name = "category_parent_id")
    private Category categoryParent;

    public void compare(Category category)
    {
        if (category.getCategoryParent()!= null) this.categoryParent= category.getCategoryParent();
        if (category.getName() != null ) this.name = category.getName();
        if (category.getDescription() != null) this.description = category.getDescription();
    }

}
