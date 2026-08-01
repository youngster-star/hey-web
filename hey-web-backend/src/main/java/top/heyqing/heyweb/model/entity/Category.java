package top.heyqing.heyweb.model.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

/**
 * 分类
 */
@Getter
@Setter
@Entity
@Table(name = "t_category")
public class Category extends BaseEntity {

    @Column(nullable = false, unique = true, length = 50)
    private String name;

    @Column(length = 100)
    private String slug;

    @Column(length = 200)
    private String description;

    /** 排序 */
    @Column(nullable = false)
    private Integer sortOrder = 0;
}
