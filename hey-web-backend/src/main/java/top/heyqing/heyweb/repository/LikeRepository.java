package top.heyqing.heyweb.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import top.heyqing.heyweb.model.entity.Like;

import java.util.Optional;

public interface LikeRepository extends JpaRepository<Like, Long> {
    Optional<Like> findByTargetTypeAndTargetIdAndIp(String targetType, Long targetId, String ip);
    long countByTargetTypeAndTargetId(String targetType, Long targetId);
}
