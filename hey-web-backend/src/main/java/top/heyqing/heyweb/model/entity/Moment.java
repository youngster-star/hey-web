package top.heyqing.heyweb.model.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "t_moment")
public class Moment extends BaseEntity {

    @Column(nullable = false, columnDefinition = "TEXT")
    private String content;

    @Column(length = 2000)
    private String images;

    @Column(nullable = false)
    private Boolean visible = true;

    @Column(nullable = false)
    private Long clickCount = 0L;

    @Column(nullable = false)
    private Long likeCount = 0L;
}
