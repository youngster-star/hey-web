package top.heyqing.heyweb.service;

import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import top.heyqing.heyweb.exception.BusinessException;
import top.heyqing.heyweb.model.dto.LoginResult;
import top.heyqing.heyweb.model.entity.User;
import top.heyqing.heyweb.repository.UserRepository;
import top.heyqing.heyweb.security.JwtUtil;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;

    public LoginResult login(String username, String password) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> BusinessException.unauthorized("用户名或密码错误"));

        if (!user.getEnabled()) {
            throw BusinessException.unauthorized("账号已被禁用");
        }

        if (!passwordEncoder.matches(password, user.getPassword())) {
            throw BusinessException.unauthorized("用户名或密码错误");
        }

        String accessToken = jwtUtil.generateAccessToken(user.getId(), user.getUsername());
        String refreshToken = jwtUtil.generateRefreshToken(user.getId());

        return LoginResult.builder()
                .accessToken(accessToken)
                .refreshToken(refreshToken)
                .nickname(user.getNickname())
                .avatar(user.getAvatar())
                .build();
    }

    public LoginResult refreshToken(String refreshToken) {
        if (!jwtUtil.validateToken(refreshToken)) {
            throw BusinessException.unauthorized("Token 已过期，请重新登录");
        }

        Long userId = jwtUtil.getUserId(refreshToken);
        User user = userRepository.findById(userId)
                .orElseThrow(() -> BusinessException.unauthorized("用户不存在"));

        String newAccessToken = jwtUtil.generateAccessToken(user.getId(), user.getUsername());
        String newRefreshToken = jwtUtil.generateRefreshToken(user.getId());

        return LoginResult.builder()
                .accessToken(newAccessToken)
                .refreshToken(newRefreshToken)
                .nickname(user.getNickname())
                .avatar(user.getAvatar())
                .build();
    }
}
