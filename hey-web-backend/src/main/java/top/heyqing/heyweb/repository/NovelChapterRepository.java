package top.heyqing.heyweb.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import top.heyqing.heyweb.model.entity.NovelChapter;

import java.util.List;

public interface NovelChapterRepository extends JpaRepository<NovelChapter, Long> {
    List<NovelChapter> findByNovelIdOrderByChapterNumAsc(Long novelId);
    NovelChapter findByNovelIdAndChapterNum(Long novelId, Integer chapterNum);
    long countByNovelId(Long novelId);
}
