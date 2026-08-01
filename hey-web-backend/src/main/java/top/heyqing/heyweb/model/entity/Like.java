package top.heyqing.heyweb.model.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

/**
 * 点赞记录
 */
@Getter
@Setter
@Entity
@Table(name = "t_like", uniqueConstraints = {
        @UniqueConstraint(columnNames = {"target_type", "target_id", "ip"})
})
public class Like extends BaseEntity {

    @Column(name = "target_type", nullable = false, length = 30)
    private String targetType;

    @Column(name = "target_id", nullable = false)
    private Long targetId;

    @Column(nullable = false, length = 45)
    private String ip;
}
