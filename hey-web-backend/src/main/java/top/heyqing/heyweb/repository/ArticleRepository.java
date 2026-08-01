package top.heyqing.heyweb.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import top.heyqing.heyweb.model.entity.Article;

import java.util.List;
import java.util.Optional;

public interface ArticleRepository extends JpaRepository<Article, Long>, JpaSpecificationExecutor<Article> {

    Optional<Article> findBySlug(String slug);

    List<Article> findByStatusOrderByCreateTimeDesc(Article.ArticleStatus status);

    List<Article> findByStatusAndVisibleTrueOrderByPinnedDescSortOrderAscCreateTimeDesc(Article.ArticleStatus status);

    List<Article> findByCategoryIdAndStatusAndVisibleTrue(Long categoryId, Article.ArticleStatus status);

    List<Article> findByStatusAndVisibleTrue(Article.ArticleStatus status);

    long countByStatus(Article.ArticleStatus status);
}
