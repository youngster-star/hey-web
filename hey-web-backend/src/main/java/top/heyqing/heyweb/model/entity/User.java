package top.heyqing.heyweb.model.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

/**
 * 用户（站长）
 */
@Getter
@Setter
@Entity
@Table(name = "t_user")
public class User extends BaseEntity {

    @Column(nullable = false, unique = true, length = 50)
    private String username;

    @Column(nullable = false)
    private String password;

    @Column(length = 50)
    private String nickname;

    @Column(length = 200)
    private String avatar;

    @Column(length = 100)
    private String email;

    /** 是否启用 */
    @Column(nullable = false)
    private Boolean enabled = true;
}
