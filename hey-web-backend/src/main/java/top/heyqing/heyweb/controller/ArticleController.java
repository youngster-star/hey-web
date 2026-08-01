package top.heyqing.heyweb.controller;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import top.heyqing.heyweb.model.dto.ApiResponse;
import top.heyqing.heyweb.model.dto.PageResult;
import top.heyqing.heyweb.model.entity.Article;
import top.heyqing.heyweb.service.ArticleService;

import java.util.Set;

@RestController
@RequiredArgsConstructor
public class ArticleController {

    private final ArticleService articleService;

    // ==================== 前台 ====================

    @GetMapping("/api/v1/public/articles")
    public ApiResponse<PageResult<Article>> getPublicArticles(
            @RequestParam(defaultValue = "1") int page,
            @RequestParam(defaultValue = "10") int pageSize,
            @RequestParam(required = false) Long categoryId,
            @RequestParam(required = false) Long tagId,
            @RequestParam(required = false) String keyword) {
        return ApiResponse.success(articleService.getPublicArticles(page, pageSize, categoryId, tagId, keyword));
    }

    @GetMapping("/api/v1/public/articles/{slug}")
    public ApiResponse<Article> getPublicArticle(@PathVariable String slug) {
        Article article = articleService.getPublicArticle(slug);
        // 异步增加点击量
        articleService.incrementClickCount(article.getId());
        return ApiResponse.success(article);
    }

    // ==================== 后台 ====================

    @GetMapping("/api/v1/admin/articles")
    public ApiResponse<PageResult<Article>> getAdminArticles(
            @RequestParam(defaultValue = "1") int page,
            @RequestParam(defaultValue = "10") int pageSize,
            @RequestParam(required = false) Article.ArticleStatus status) {
        return ApiResponse.success(articleService.getAdminArticles(page, pageSize, status));
    }

    @GetMapping("/api/v1/admin/articles/{id}")
    public ApiResponse<Article> getArticle(@PathVariable Long id) {
        return ApiResponse.success(articleService.getArticle(id));
    }

    @PostMapping("/api/v1/admin/articles")
    public ApiResponse<Article> createArticle(@Valid @RequestBody Article article,
                                               @RequestParam(required = false) Long categoryId,
                                               @RequestParam(required = false) Set<Long> tagIds) {
        return ApiResponse.success(articleService.createArticle(article, categoryId, tagIds));
    }

    @PutMapping("/api/v1/admin/articles/{id}")
    public ApiResponse<Article> updateArticle(@PathVariable Long id,
                                               @Valid @RequestBody Article article,
                                               @RequestParam(required = false) Long categoryId,
                                               @RequestParam(required = false) Set<Long> tagIds) {
        return ApiResponse.success(articleService.updateArticle(id, article, categoryId, tagIds));
    }

    @DeleteMapping("/api/v1/admin/articles/{id}")
    public ApiResponse<Void> deleteArticle(@PathVariable Long id) {
        articleService.deleteArticle(id);
        return ApiResponse.success();
    }
}
