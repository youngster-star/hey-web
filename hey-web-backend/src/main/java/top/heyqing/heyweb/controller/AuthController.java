package top.heyqing.heyweb.controller;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import top.heyqing.heyweb.model.dto.ApiResponse;
import top.heyqing.heyweb.model.dto.LoginRequest;
import top.heyqing.heyweb.model.dto.LoginResult;
import top.heyqing.heyweb.service.AuthService;

@RestController
@RequestMapping("/api/v1/admin/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    @PostMapping("/login")
    public ApiResponse<LoginResult> login(@Valid @RequestBody LoginRequest request) {
        LoginResult result = authService.login(request.getUsername(), request.getPassword());
        return ApiResponse.success(result);
    }

    @PostMapping("/refresh")
    public ApiResponse<LoginResult> refresh(@RequestParam String refreshToken) {
        LoginResult result = authService.refreshToken(refreshToken);
        return ApiResponse.success(result);
    }
}
