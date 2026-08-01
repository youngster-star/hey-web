package top.heyqing.heyweb.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import top.heyqing.heyweb.model.entity.VisitLog;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

public interface VisitLogRepository extends JpaRepository<VisitLog, Long> {

    long countByCreateTimeAfter(LocalDateTime time);

    @Query(value = "SELECT DATE(create_time) as date, COUNT(*) as pv, COUNT(DISTINCT ip) as uv " +
            "FROM t_visit_log WHERE create_time >= ?1 GROUP BY DATE(create_time) ORDER BY date", nativeQuery = true)
    List<Object[]> dailyStats(LocalDateTime since);

    @Query(value = "SELECT ip_location, COUNT(*) as cnt FROM t_visit_log " +
            "WHERE ip_location IS NOT NULL AND create_time >= ?1 " +
            "GROUP BY ip_location ORDER BY cnt DESC LIMIT 20", nativeQuery = true)
    List<Object[]> regionStats(LocalDateTime since);

    @Query(value = "SELECT browser, COUNT(*) as cnt FROM t_visit_log " +
            "WHERE browser IS NOT NULL AND create_time >= ?1 " +
            "GROUP BY browser ORDER BY cnt DESC", nativeQuery = true)
    List<Object[]> browserStats(LocalDateTime since);

    @Query(value = "SELECT os, COUNT(*) as cnt FROM t_visit_log " +
            "WHERE os IS NOT NULL AND create_time >= ?1 " +
            "GROUP BY os ORDER BY cnt DESC", nativeQuery = true)
    List<Object[]> osStats(LocalDateTime since);

    @Query(value = "SELECT target_url, COUNT(*) as cnt FROM t_visit_log " +
            "WHERE create_time >= ?1 GROUP BY target_url ORDER BY cnt DESC LIMIT 10", nativeQuery = true)
    List<Object[]> topPages(LocalDateTime since);
}
