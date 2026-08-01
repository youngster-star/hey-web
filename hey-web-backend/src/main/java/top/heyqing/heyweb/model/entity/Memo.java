package top.heyqing.heyweb.model.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "t_memo")
public class Memo extends BaseEntity {

    @Column(nullable = false, length = 200)
    private String title;

    @Column(columnDefinition = "TEXT")
    private String content;

    @Column(nullable = false)
    private Boolean completed = false;

    @Column(nullable = false)
    private Boolean encrypted = false;

    @Column(nullable = false)
    private Integer sortOrder = 0;
}
