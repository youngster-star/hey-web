package top.heyqing.heyweb.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import top.heyqing.heyweb.model.entity.Novel;

import java.util.Optional;

public interface NovelRepository extends JpaRepository<Novel, Long> {
    Optional<Novel> findBySlug(String slug);
}
