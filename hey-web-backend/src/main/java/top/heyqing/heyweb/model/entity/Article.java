package top.heyqing.heyweb.model.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.HashSet;
import java.util.Set;

/**
 * 文章
 */
@Getter
@Setter
@Entity
@Table(name = "t_article")
public class Article extends BaseEntity {

    @Column(nullable = false, length = 200)
    private String title;

    @Column(nullable = false, unique = true, length = 200)
    private String slug;

    @Column(columnDefinition = "TEXT")
    private String summary;

    @Column(columnDefinition = "MEDIUMTEXT")
    private String content;

    @Column(length = 500)
    private String coverImage;

    /** 状态: DRAFT / PUBLISHED */
    @Column(nullable = false, length = 20)
    @Enumerated(EnumType.STRING)
    private ArticleStatus status = ArticleStatus.DRAFT;

    /** 是否展示 */
    @Column(nullable = false)
    private Boolean visible = true;

    /** 自定义排序（值越小越靠前） */
    @Column(nullable = false)
    private Integer sortOrder = 0;

    /** 是否置顶 */
    @Column(nullable = false)
    private Boolean pinned = false;

    /** 点击量 */
    @Column(nullable = false)
    private Long clickCount = 0L;

    /** 点赞数 */
    @Column(nullable = false)
    private Long likeCount = 0L;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "category_id")
    private Category category;

    @ManyToMany
    @JoinTable(
            name = "t_article_tag",
            joinColumns = @JoinColumn(name = "article_id"),
            inverseJoinColumns = @JoinColumn(name = "tag_id")
    )
    private Set<Tag> tags = new HashSet<>();

    public enum ArticleStatus {
        DRAFT, PUBLISHED
    }
}
