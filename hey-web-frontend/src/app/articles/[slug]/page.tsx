"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { api } from "@/lib/api";
import { Breadcrumb } from "@/components/common/breadcrumb";
import { Calendar, Eye, ArrowLeft } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { LikeButton } from "@/components/common/like-button";

interface Article {
  id: number;
  title: string;
  slug: string;
  summary: string;
  content: string;
  coverImage: string;
  status: string;
  clickCount: number;
  likeCount: number;
  category: { id: number; name: string } | null;
  tags: { id: number; name: string; slug: string }[];
  createTime: string;
  updateTime: string;
}

export default function ArticleDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get<Article>(`/public/articles/${slug}`)
      .then(setArticle)
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) {
    return (
      <div className="flex flex-col flex-1">
        <main className="flex-1 max-w-3xl mx-auto w-full px-4 py-12">
          <p className="text-muted-foreground">加载中...</p>
        </main>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="flex flex-col flex-1">
        <main className="flex-1 max-w-3xl mx-auto w-full px-4 py-12 text-center">
          <p className="text-muted-foreground mb-4">文章不存在或已隐藏</p>
          <Link href="/articles" className="text-primary text-sm">← 返回文章列表</Link>
        </main>
      </div>
    );
  }

  return (
    <div className="flex flex-col flex-1">
      <main className="flex-1 max-w-3xl mx-auto w-full px-4 py-12">
        <Breadcrumb items={[
          { label: "文章", href: "/articles" },
          { label: article.title },
        ]} />

        <article>
          {/* Header */}
          <header className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">{article.title}</h1>
            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-1">
                <Calendar className="size-3.5" />
                {article.createTime?.slice(0, 10)}
              </span>
              {article.category && (
                <Link href={`/articles?categoryId=${article.category.id}`} className="text-primary">
                  {article.category.name}
                </Link>
              )}
              <span className="flex items-center gap-1"><Eye className="size-3.5" /> {article.clickCount} 阅读</span>
              <LikeButton targetType="article" targetId={article.id} />
            </div>
            {article.tags?.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-4">
                {article.tags.map((t) => (
                  <span key={t.id} className="rounded-full bg-muted px-3 py-1 text-xs">{t.name}</span>
                ))}
              </div>
            )}
          </header>

          {/* Cover */}
          {article.coverImage && (
            <img src={article.coverImage} alt={article.title} className="w-full rounded-xl mb-8 object-cover max-h-96" />
          )}

          {/* Content */}
          <div className="prose dark:prose-invert max-w-none prose-headings:scroll-mt-20 prose-pre:rounded-xl prose-code:rounded prose-img:rounded-xl">
            {article.content ? (
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {article.content}
              </ReactMarkdown>
            ) : (
              <p className="text-muted-foreground">{article.summary ?? "暂无正文"}</p>
            )}
          </div>
        </article>

        {/* Footer nav */}
        <div className="mt-12 pt-8 border-t border-border">
          <Link href="/articles" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="size-4" /> 返回文章列表
          </Link>
        </div>
      </main>
    </div>
  );
}
