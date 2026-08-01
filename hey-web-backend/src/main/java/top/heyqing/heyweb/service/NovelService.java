package top.heyqing.heyweb.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import top.heyqing.heyweb.exception.BusinessException;
import top.heyqing.heyweb.model.entity.Novel;
import top.heyqing.heyweb.model.entity.NovelChapter;
import top.heyqing.heyweb.repository.NovelChapterRepository;
import top.heyqing.heyweb.repository.NovelRepository;

import java.util.List;

@Service
@RequiredArgsConstructor
public class NovelService {

    private final NovelRepository novelRepository;
    private final NovelChapterRepository chapterRepository;

    // ===== 小说 =====
    public List<Novel> getPublicNovels() {
        return novelRepository.findAll();
    }

    public Novel getPublicNovel(String slug) {
        return novelRepository.findBySlug(slug)
                .orElseThrow(() -> BusinessException.notFound("小说不存在"));
    }

    public List<Novel> getAll() {
        return novelRepository.findAll();
    }

    public Novel getById(Long id) {
        return novelRepository.findById(id)
                .orElseThrow(() -> BusinessException.notFound("小说不存在"));
    }

    @Transactional
    public Novel create(Novel novel) {
        return novelRepository.save(novel);
    }

    @Transactional
    public Novel update(Long id, Novel updated) {
        Novel novel = getById(id);
        novel.setTitle(updated.getTitle());
        novel.setSlug(updated.getSlug());
        novel.setSummary(updated.getSummary());
        novel.setCoverImage(updated.getCoverImage());
        novel.setAuthor(updated.getAuthor());
        novel.setVisible(updated.getVisible());
        novel.setSortOrder(updated.getSortOrder());
        if (updated.getCategory() != null) novel.setCategory(updated.getCategory());
        return novelRepository.save(novel);
    }

    @Transactional
    public void delete(Long id) {
        novelRepository.deleteById(id);
    }

    @Transactional
    public void incrementClick(Long id) {
        novelRepository.findById(id).ifPresent(n -> {
            n.setClickCount(n.getClickCount() + 1);
            novelRepository.save(n);
        });
    }

    // ===== 章节 =====
    public List<NovelChapter> getChapters(Long novelId) {
        return chapterRepository.findByNovelIdOrderByChapterNumAsc(novelId);
    }

    public NovelChapter getChapter(Long novelId, Integer chapterNum) {
        NovelChapter chapter = chapterRepository.findByNovelIdAndChapterNum(novelId, chapterNum);
        if (chapter == null) throw BusinessException.notFound("章节不存在");
        return chapter;
    }

    @Transactional
    public NovelChapter createChapter(Long novelId, NovelChapter chapter) {
        Novel novel = getById(novelId);
        chapter.setNovel(novel);
        if (chapter.getChapterNum() == null) {
            chapter.setChapterNum((int) chapterRepository.countByNovelId(novelId) + 1);
        }
        return chapterRepository.save(chapter);
    }

    @Transactional
    public NovelChapter updateChapter(Long novelId, Long chapterId, NovelChapter updated) {
        NovelChapter chapter = chapterRepository.findById(chapterId)
                .orElseThrow(() -> BusinessException.notFound("章节不存在"));
        chapter.setTitle(updated.getTitle());
        chapter.setContent(updated.getContent());
        chapter.setChapterNum(updated.getChapterNum());
        chapter.setWordCount(updated.getWordCount());
        return chapterRepository.save(chapter);
    }

    @Transactional
    public void deleteChapter(Long chapterId) {
        chapterRepository.deleteById(chapterId);
    }

    @Transactional
    public void incrementChapterClick(Long chapterId) {
        chapterRepository.findById(chapterId).ifPresent(c -> {
            c.setClickCount(c.getClickCount() + 1);
            chapterRepository.save(c);
        });
    }
}
