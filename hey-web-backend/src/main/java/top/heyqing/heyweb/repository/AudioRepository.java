package top.heyqing.heyweb.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import top.heyqing.heyweb.model.entity.Audio;

import java.util.Optional;

public interface AudioRepository extends JpaRepository<Audio, Long> {
    Optional<Audio> findBySlug(String slug);
}
