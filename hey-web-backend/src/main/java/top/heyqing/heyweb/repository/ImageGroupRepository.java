package top.heyqing.heyweb.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import top.heyqing.heyweb.model.entity.ImageGroup;

import java.util.Optional;

public interface ImageGroupRepository extends JpaRepository<ImageGroup, Long> {
    Optional<ImageGroup> findBySlug(String slug);
}
