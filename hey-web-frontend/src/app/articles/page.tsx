"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { api, type PageResult } from "@/lib/api";

interface Article {
  id: number;
  title: string;
  slug: string;
  summary: string;
  coverImage: string;
  clickCount: number;
  likeCount: number;
  category: { id: number; name: string } | null;
  createTime: string;
}

export default function ArticlesPage() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);

  useEffect(() => {
    loadArticles();
  }, [page]);

  const loadArticles = async () => {
    try {
      const data = await api.get<PageResult<Article>>(
        `/public/articles?page=${page}&pageSize=10`
      );
      setArticles(data.records);
      setTotal(data.total);
    } catch {
      // handle error
    }
  };

  return (
    <div className="flex flex-col flex-1">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto flex items-center justify-between px-4 h-14">
          <Link href="/" className="font-bold text-lg">
            何以晴
          </Link>
          <nav className="flex items-center gap-6 text-sm">
            <Link href="/articles" className="font-medium">
              文章
            </Link>
            <Link href="/about" className="text-muted-foreground hover:text-foreground">
              关于
            </Link>
          </nav>
        </div>
      </header>

      {/* Article List */}
      <main className="flex-1 max-w-4xl mx-auto w-full px-4 py-12">
        <h1 className="text-3xl font-bold mb-8">文章</h1>

        {articles.length === 0 ? (
          <p className="text-muted-foreground text-center py-20">
            还没有文章
          </p>
        ) : (
          <div className="space-y-8">
            {articles.map((article) => (
              <article key={article.id} className="group">
                <Link href={`/articles/${article.slug}`}>
                  <div className="flex gap-6">
                    {article.coverImage && (
                      <img
                        src={article.coverImage}
                        alt={article.title}
                        className="w-40 h-24 rounded-lg object-cover"
                      />
                    )}
                    <div className="flex-1">
                      <h2 className="text-xl font-semibold group-hover:text-primary transition-colors">
                        {article.title}
                      </h2>
                      {article.summary && (
                        <p className="mt-2 text-muted-foreground line-clamp-2">
                          {article.summary}
                        </p>
                      )}
                      <div className="mt-3 flex items-center gap-4 text-sm text-muted-foreground">
                        {article.category && (
                          <span>{article.category.name}</span>
                        )}
                        <time>
                          {new Date(article.createTime).toLocaleDateString(
                            "zh-CN"
                          )}
                        </time>
                        <span>{article.clickCount} 次阅读</span>
                      </div>
                    </div>
                  </div>
                </Link>
              </article>
            ))}

            {/* Pagination */}
            {total > 10 && (
              <div className="flex justify-center gap-4 pt-8">
                <button
                  onClick={() => setPage(Math.max(1, page - 1))}
                  disabled={page === 1}
                  className="px-4 py-2 text-sm border rounded-md disabled:opacity-50"
                >
                  上一页
                </button>
                <span className="px-4 py-2 text-sm text-muted-foreground">
                  第 {page} 页 / 共 {Math.ceil(total / 10)} 页
                </span>
                <button
                  onClick={() => setPage(page + 1)}
                  disabled={page * 10 >= total}
                  className="px-4 py-2 text-sm border rounded-md disabled:opacity-50"
                >
                  下一页
                </button>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
