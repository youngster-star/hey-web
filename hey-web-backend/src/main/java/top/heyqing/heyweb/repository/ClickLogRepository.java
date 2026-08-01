package top.heyqing.heyweb.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import top.heyqing.heyweb.model.entity.ClickLog;

import java.util.List;

public interface ClickLogRepository extends JpaRepository<ClickLog, Long> {
    boolean existsByTargetTypeAndTargetIdAndIp(String targetType, Long targetId, String ip);
    long countByTargetTypeAndTargetId(String targetType, Long targetId);
}
