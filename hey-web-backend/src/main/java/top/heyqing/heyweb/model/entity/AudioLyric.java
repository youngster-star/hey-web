package top.heyqing.heyweb.model.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "t_audio_lyric")
public class AudioLyric extends BaseEntity {

    @Column(length = 200)
    private String title;

    @Column(length = 100)
    private String artist;

    @Column(nullable = false, columnDefinition = "MEDIUMTEXT")
    private String content;
}
