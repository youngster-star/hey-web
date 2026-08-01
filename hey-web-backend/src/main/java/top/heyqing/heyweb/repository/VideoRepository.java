package top.heyqing.heyweb.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import top.heyqing.heyweb.model.entity.Video;

import java.util.List;
import java.util.Optional;

public interface VideoRepository extends JpaRepository<Video, Long> {
    Optional<Video> findBySlug(String slug);
    List<Video> findByVisibleTrueOrderBySortOrderAscCreateTimeDesc();
}
