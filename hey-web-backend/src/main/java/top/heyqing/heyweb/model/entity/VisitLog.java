package top.heyqing.heyweb.model.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "t_visit_log")
public class VisitLog {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 45)
    private String ip;

    @Column(length = 100)
    private String ipLocation;

    @Column(name = "user_agent", columnDefinition = "TEXT")
    private String userAgent;

    @Column(length = 50)
    private String browser;

    @Column(length = 50)
    private String os;

    @Column(length = 20)
    private String deviceType;

    @Column(length = 500)
    private String referer;

    @Column(nullable = false, length = 500)
    private String targetUrl;

    @Column(length = 64)
    private String sessionId;

    @Column(nullable = false)
    private java.time.LocalDateTime createTime;
}
