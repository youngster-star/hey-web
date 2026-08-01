package top.heyqing.heyweb.model.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
@Entity
@Table(name = "t_diary")
public class Diary extends BaseEntity {

    @Column(nullable = false, length = 200)
    private String title;

    @Column(columnDefinition = "MEDIUMTEXT")
    private String content;

    @Column(length = 30)
    private String mood;

    @Column(length = 30)
    private String weather;

    @Column(nullable = false)
    private Boolean encrypted = false;

    @Column(name = "diary_date", nullable = false)
    private LocalDate diaryDate;
}
