package top.heyqing.heyweb.controller;

import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import top.heyqing.heyweb.model.dto.ApiResponse;
import top.heyqing.heyweb.service.ClickLogService;
import top.heyqing.heyweb.service.LikeService;

import java.util.Map;

@RestController
@RequiredArgsConstructor
public class LikeController {

    private final LikeService likeService;
    private final ClickLogService clickLogService;

    @GetMapping("/api/v1/public/like")
    public ApiResponse<Map<String, Object>> getLikeInfo(
            @RequestParam String targetType, @RequestParam Long targetId,
            HttpServletRequest request) {
        long count = likeService.count(targetType, targetId);
        boolean liked = likeService.hasLiked(targetType, targetId, getIp(request));
        return ApiResponse.success(Map.of("count", count, "liked", liked));
    }

    @PostMapping("/api/v1/public/like")
    public ApiResponse<Map<String, Object>> toggleLike(
            @RequestParam String targetType, @RequestParam Long targetId,
            HttpServletRequest request) {
        boolean liked = likeService.toggle(targetType, targetId, getIp(request));
        long count = likeService.count(targetType, targetId);
        return ApiResponse.success(Map.of("liked", liked, "count", count));
    }

    @PostMapping("/api/v1/public/click")
    public ApiResponse<Void> recordClick(
            @RequestParam String targetType, @RequestParam Long targetId,
            HttpServletRequest request) {
        clickLogService.record(targetType, targetId, request);
        return ApiResponse.success();
    }

    private String getIp(HttpServletRequest request) {
        String ip = request.getHeader("X-Forwarded-For");
        if (ip == null || "unknown".equalsIgnoreCase(ip)) ip = request.getRemoteAddr();
        return ip != null && ip.contains(",") ? ip.split(",")[0].trim() : ip;
    }
}
