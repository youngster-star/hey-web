package top.heyqing.heyweb.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import top.heyqing.heyweb.model.dto.ApiResponse;
import top.heyqing.heyweb.model.dto.PageResult;
import top.heyqing.heyweb.model.entity.Article;
import top.heyqing.heyweb.service.ArticleService;

@RestController
@RequiredArgsConstructor
public class SearchController {

    private final ArticleService articleService;

    @GetMapping("/api/v1/public/search")
    public ApiResponse<PageResult<Article>> search(
            @RequestParam String keyword,
            @RequestParam(defaultValue = "1") int page,
            @RequestParam(defaultValue = "10") int pageSize) {
        return ApiResponse.success(articleService.getPublicArticles(page, pageSize, null, null, keyword));
    }
}
