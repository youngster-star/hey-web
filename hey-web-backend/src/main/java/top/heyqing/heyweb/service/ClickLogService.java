package top.heyqing.heyweb.service;

import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import top.heyqing.heyweb.model.entity.ClickLog;
import top.heyqing.heyweb.repository.ClickLogRepository;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class ClickLogService {

    private final ClickLogRepository clickLogRepository;

    @Transactional
    public void record(String targetType, Long targetId, HttpServletRequest request) {
        String ip = getClientIp(request);
        ClickLog log = new ClickLog();
        log.setTargetType(targetType);
        log.setTargetId(targetId);
        log.setIp(ip);
        log.setCreateTime(LocalDateTime.now());
        clickLogRepository.save(log);
    }

    public long count(String targetType, Long targetId) {
        return clickLogRepository.countByTargetTypeAndTargetId(targetType, targetId);
    }

    private String getClientIp(HttpServletRequest request) {
        String ip = request.getHeader("X-Forwarded-For");
        if (ip == null || "unknown".equalsIgnoreCase(ip)) {
            ip = request.getHeader("X-Real-IP");
        }
        if (ip == null || "unknown".equalsIgnoreCase(ip)) {
            ip = request.getRemoteAddr();
        }
        return ip != null && ip.contains(",") ? ip.split(",")[0].trim() : ip;
    }
}
