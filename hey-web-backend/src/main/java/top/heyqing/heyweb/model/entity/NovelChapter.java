package top.heyqing.heyweb.model.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "t_novel_chapter")
public class NovelChapter extends BaseEntity {

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "novel_id", nullable = false)
    private Novel novel;

    @Column(nullable = false, length = 200)
    private String title;

    @Column(columnDefinition = "MEDIUMTEXT")
    private String content;

    @Column(name = "chapter_num", nullable = false)
    private Integer chapterNum;

    @Column(name = "word_count")
    private Integer wordCount = 0;

    @Column(nullable = false)
    private Long clickCount = 0L;
}
