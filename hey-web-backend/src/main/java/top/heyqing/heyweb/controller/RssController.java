package top.heyqing.heyweb.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import top.heyqing.heyweb.model.entity.Article;
import top.heyqing.heyweb.repository.ArticleRepository;

import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequiredArgsConstructor
public class RssController {

    private final ArticleRepository articleRepository;

    @GetMapping(value = "/api/v1/public/rss", produces = "application/xml;charset=UTF-8")
    public String rss() {
        List<Article> articles = articleRepository.findByStatusAndVisibleTrueOrderByPinnedDescSortOrderAscCreateTimeDesc(Article.ArticleStatus.PUBLISHED);
        String items = articles.stream().map(a -> {
            String pubDate = a.getCreateTime() != null
                    ? a.getCreateTime().format(DateTimeFormatter.RFC_1123_DATE_TIME)
                    : "";
            return """
                    <item>
                      <title>%s</title>
                      <link>https://heyqing.top/articles/%s</link>
                      <description>%s</description>
                      <pubDate>%s</pubDate>
                      <guid>https://heyqing.top/articles/%s</guid>
                    </item>""".formatted(
                    escapeXml(a.getTitle()), escapeXml(a.getSlug()),
                    escapeXml(a.getSummary() != null ? a.getSummary() : ""),
                    pubDate, escapeXml(a.getSlug()));
        }).collect(Collectors.joining("\n"));

        return """
                <?xml version="1.0" encoding="UTF-8"?>
                <rss version="2.0">
                <channel>
                  <title>何以晴 - Heyqing</title>
                  <link>https://heyqing.top</link>
                  <description>记录生活与思考的个人网站</description>
                  <language>zh-CN</language>
                  %s
                </channel>
                </rss>""".formatted(items);
    }

    private String escapeXml(String s) {
        if (s == null) return "";
        return s.replace("&", "&amp;").replace("<", "&lt;").replace(">", "&gt;")
                .replace("\"", "&quot;").replace("'", "&apos;");
    }
}
