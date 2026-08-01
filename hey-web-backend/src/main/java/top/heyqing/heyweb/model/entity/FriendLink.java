package top.heyqing.heyweb.model.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "t_friend_link")
public class FriendLink extends BaseEntity {

    @Column(nullable = false, length = 100)
    private String name;

    @Column(nullable = false, length = 500)
    private String url;

    @Column(length = 200)
    private String description;

    @Column(length = 500)
    private String logo;

    @Column(nullable = false)
    private Boolean visible = true;

    @Column(nullable = false)
    private Integer sortOrder = 0;
}
