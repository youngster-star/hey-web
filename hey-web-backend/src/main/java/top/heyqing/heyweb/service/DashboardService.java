package top.heyqing.heyweb.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import top.heyqing.heyweb.model.entity.Article;
import top.heyqing.heyweb.repository.ArticleRepository;
import top.heyqing.heyweb.repository.CategoryRepository;
import top.heyqing.heyweb.repository.TagRepository;

import java.util.HashMap;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class DashboardService {

    private final ArticleRepository articleRepository;
    private final CategoryRepository categoryRepository;
    private final TagRepository tagRepository;

    public Map<String, Object> getOverview() {
        Map<String, Object> overview = new HashMap<>();
        overview.put("articleCount", articleRepository.count());
        overview.put("publishedCount", articleRepository.countByStatus(Article.ArticleStatus.PUBLISHED));
        overview.put("draftCount", articleRepository.countByStatus(Article.ArticleStatus.DRAFT));
        overview.put("categoryCount", categoryRepository.count());
        overview.put("tagCount", tagRepository.count());
        return overview;
    }
}
