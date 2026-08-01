package top.heyqing.heyweb.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import top.heyqing.heyweb.model.entity.Image;

import java.util.List;

public interface ImageRepository extends JpaRepository<Image, Long> {
    List<Image> findByGroupIdOrderBySortOrderAsc(Long groupId);
}
