package top.heyqing.heyweb.model.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class LoginResult {
    private String accessToken;
    private String refreshToken;
    private String nickname;
    private String avatar;
}
