package top.heyqing.heyweb.model.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "t_image")
public class Image extends BaseEntity {

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "group_id", nullable = false)
    private ImageGroup group;

    @Column(nullable = false, length = 500)
    private String url;

    @Column(length = 500)
    private String thumbnailUrl;

    @Column(length = 200)
    private String altText;

    @Column(nullable = false)
    private Integer sortOrder = 0;
}
