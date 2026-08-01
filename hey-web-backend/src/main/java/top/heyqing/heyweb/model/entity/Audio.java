package top.heyqing.heyweb.model.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "t_audio")
public class Audio extends BaseEntity {

    @Column(nullable = false, length = 200)
    private String title;

    @Column(nullable = false, unique = true, length = 200)
    private String slug;

    @Column(length = 100)
    private String artist;

    @Column(length = 200)
    private String album;

    @Column(length = 500)
    private String coverImage;

    @Column(nullable = false, length = 500)
    private String url;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "lyric_id")
    private AudioLyric lyric;

    @Column(length = 20)
    private String duration;

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
