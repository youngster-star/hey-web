package top.heyqing.heyweb.model.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "t_novel")
public class Novel extends BaseEntity {

    @Column(nullable = false, length = 200)
    private String title;

    @Column(nullable = false, unique = true, length = 200)
    private String slug;

    @Column(columnDefinition = "TEXT")
    private String summary;

    @Column(length = 500)
    private String coverImage;

    @Column(length = 100)
    private String author;

    @Column(nullable = false)
    private Boolean visible = true;

    @Column(nullable = false)
    private Integer sortOrder = 0;

    @Column(nullable = false)
    private Long clickCount = 0L;

    @Column(nullable = false)
    private Long likeCount = 0L;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "category_id")
    private Category category;
}
