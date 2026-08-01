package top.heyqing.heyweb.service;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;
import top.heyqing.heyweb.exception.BusinessException;
import top.heyqing.heyweb.model.dto.PageResult;
import top.heyqing.heyweb.model.entity.Article;
import top.heyqing.heyweb.model.entity.Category;
import top.heyqing.heyweb.model.entity.Tag;
import top.heyqing.heyweb.repository.ArticleRepository;
import top.heyqing.heyweb.repository.CategoryRepository;
import top.heyqing.heyweb.repository.TagRepository;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Service
@RequiredArgsConstructor
public class ArticleService {

    private final ArticleRepository articleRepository;
    private final CategoryRepository categoryRepository;
    private final TagRepository tagRepository;

    // ==================== 前台 ====================

    public PageResult<Article> getPublicArticles(int page, int pageSize, Long categoryId, Long tagId, String keyword) {
        Specification<Article> spec = buildPublicSpec(categoryId, tagId, keyword);
        Pageable pageable = PageRequest.of(page - 1, pageSize, Sort.by(Sort.Direction.DESC, "pinned", "sortOrder", "createTime"));
        Page<Article> result = articleRepository.findAll(spec, pageable);
        return PageResult.of(result, result.getContent());
    }

    public Article getPublicArticle(String slug) {
        Article article = articleRepository.findBySlug(slug)
                .orElseThrow(() -> BusinessException.notFound("文章不存在"));
        if (!article.getVisible() || article.getStatus() != Article.ArticleStatus.PUBLISHED) {
            throw BusinessException.notFound("文章不存在");
        }
        return article;
    }

    public void incrementClickCount(Long articleId) {
        articleRepository.findById(articleId).ifPresent(article -> {
            article.setClickCount(article.getClickCount() + 1);
            articleRepository.save(article);
        });
    }

    // ==================== 后台 ====================

    public PageResult<Article> getAdminArticles(int page, int pageSize, Article.ArticleStatus status) {
        Specification<Article> spec = (root, query, cb) -> {
            if (status != null) {
                return cb.equal(root.get("status"), status);
            }
            return null;
        };
        Pageable pageable = PageRequest.of(page - 1, pageSize, Sort.by(Sort.Direction.DESC, "createTime"));
        Page<Article> result = articleRepository.findAll(spec, pageable);
        return PageResult.of(result, result.getContent());
    }

    public Article getArticle(Long id) {
        return articleRepository.findById(id)
                .orElseThrow(() -> BusinessException.notFound("文章不存在"));
    }

    @Transactional
    public Article createArticle(Article article, Long categoryId, Set<Long> tagIds) {
        setCategoryAndTags(article, categoryId, tagIds);
        return articleRepository.save(article);
    }

    @Transactional
    public Article updateArticle(Long id, Article updated, Long categoryId, Set<Long> tagIds) {
        Article article = getArticle(id);
        article.setTitle(updated.getTitle());
        article.setSlug(updated.getSlug());
        article.setSummary(updated.getSummary());
        article.setContent(updated.getContent());
        article.setCoverImage(updated.getCoverImage());
        article.setStatus(updated.getStatus());
        article.setVisible(updated.getVisible());
        article.setSortOrder(updated.getSortOrder());
        article.setPinned(updated.getPinned());
        setCategoryAndTags(article, categoryId, tagIds);
        return articleRepository.save(article);
    }

    @Transactional
    public void deleteArticle(Long id) {
        Article article = getArticle(id);
        articleRepository.delete(article);
    }

    private void setCategoryAndTags(Article article, Long categoryId, Set<Long> tagIds) {
        if (categoryId != null) {
            Category category = categoryRepository.findById(categoryId)
                    .orElseThrow(() -> BusinessException.badRequest("分类不存在"));
            article.setCategory(category);
        } else {
            article.setCategory(null);
        }
        if (tagIds != null && !tagIds.isEmpty()) {
            List<Tag> tags = tagRepository.findAllById(tagIds);
            article.setTags(new HashSet<>(tags));
        }
    }

    private Specification<Article> buildPublicSpec(Long categoryId, Long tagId, String keyword) {
        Specification<Article> spec = Specification.where(null);
        spec = spec.and((root, query, cb) -> cb.equal(root.get("status"), Article.ArticleStatus.PUBLISHED));
        spec = spec.and((root, query, cb) -> cb.isTrue(root.get("visible")));

        if (categoryId != null) {
            spec = spec.and((root, query, cb) -> cb.equal(root.get("category").get("id"), categoryId));
        }
        if (tagId != null) {
            spec = spec.and((root, query, cb) -> cb.isMember(tagId, root.get("tags")));
        }
        if (StringUtils.hasText(keyword)) {
            String pattern = "%" + keyword + "%";
            spec = spec.and((root, query, cb) ->
                    cb.or(
                            cb.like(root.get("title"), pattern),
                            cb.like(root.get("summary"), pattern)
                    ));
        }
        return spec;
    }
}
