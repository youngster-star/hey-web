package top.heyqing.heyweb.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import top.heyqing.heyweb.model.dto.ApiResponse;
import top.heyqing.heyweb.model.entity.Novel;
import top.heyqing.heyweb.model.entity.NovelChapter;
import top.heyqing.heyweb.service.NovelService;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class NovelController {

    private final NovelService novelService;

    // ===== 前台 =====
    @GetMapping("/api/v1/public/novels")
    public ApiResponse<List<Novel>> getPublicNovels() {
        return ApiResponse.success(novelService.getPublicNovels());
    }

    @GetMapping("/api/v1/public/novels/{slug}")
    public ApiResponse<Novel> getPublicNovel(@PathVariable String slug) {
        Novel novel = novelService.getPublicNovel(slug);
        novelService.incrementClick(novel.getId());
        return ApiResponse.success(novel);
    }

    @GetMapping("/api/v1/public/novels/{novelId}/chapters")
    public ApiResponse<List<NovelChapter>> getChapters(@PathVariable Long novelId) {
        return ApiResponse.success(novelService.getChapters(novelId));
    }

    @GetMapping("/api/v1/public/novels/{novelId}/chapters/{chapterNum}")
    public ApiResponse<NovelChapter> getChapter(@PathVariable Long novelId, @PathVariable Integer chapterNum) {
        NovelChapter chapter = novelService.getChapter(novelId, chapterNum);
        novelService.incrementChapterClick(chapter.getId());
        return ApiResponse.success(chapter);
    }

    // ===== 后台 =====
    @GetMapping("/api/v1/admin/novels")
    public ApiResponse<List<Novel>> getAll() {
        return ApiResponse.success(novelService.getAll());
    }

    @PostMapping("/api/v1/admin/novels")
    public ApiResponse<Novel> create(@RequestBody Novel novel) {
        return ApiResponse.success(novelService.create(novel));
    }

    @PutMapping("/api/v1/admin/novels/{id}")
    public ApiResponse<Novel> update(@PathVariable Long id, @RequestBody Novel novel) {
        return ApiResponse.success(novelService.update(id, novel));
    }

    @DeleteMapping("/api/v1/admin/novels/{id}")
    public ApiResponse<Void> delete(@PathVariable Long id) {
        novelService.delete(id);
        return ApiResponse.success();
    }

    @PostMapping("/api/v1/admin/novels/{novelId}/chapters")
    public ApiResponse<NovelChapter> createChapter(@PathVariable Long novelId, @RequestBody NovelChapter chapter) {
        return ApiResponse.success(novelService.createChapter(novelId, chapter));
    }

    @PutMapping("/api/v1/admin/novels/{novelId}/chapters/{chapterId}")
    public ApiResponse<NovelChapter> updateChapter(@PathVariable Long novelId, @PathVariable Long chapterId,
                                                    @RequestBody NovelChapter chapter) {
        return ApiResponse.success(novelService.updateChapter(novelId, chapterId, chapter));
    }

    @DeleteMapping("/api/v1/admin/novels/chapters/{chapterId}")
    public ApiResponse<Void> deleteChapter(@PathVariable Long chapterId) {
        novelService.deleteChapter(chapterId);
        return ApiResponse.success();
    }
}
