"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { api, type PageResult } from "@/lib/api";
import { Breadcrumb } from "@/components/common/breadcrumb";
import { LikeButton } from "@/components/common/like-button";
import { SiteHeader } from "@/components/layout/site-header";
import {
  CutoutCard,
  CutoutCardContent,
  CutoutCardFooter,
  CutoutCardImage,
  CutoutCardMedia,
  CutoutCardOverlay,
  CutoutCardInsetLabel,
  CutoutCorner,
  cutoutCardSurfaceShadowClassName,
  useCutoutContentStaggerVariants,
} from "@/components/ui/cutout-card";
import { motion } from "motion/react";
import { Eye } from "lucide-react";

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

function ArticleCard({ article }: { article: Article }) {
  const stagger = useCutoutContentStaggerVariants();

  return (
    <CutoutCard className={cutoutCardSurfaceShadowClassName}>
      <CutoutCardMedia className="h-48">
        {article.coverImage ? (
          <>
            <CutoutCardImage
              src={article.coverImage}
              alt={article.title}
              fill
              className="object-cover"
            />
            <CutoutCardOverlay />
          </>
        ) : (
          <div className="h-full w-full bg-muted flex items-center justify-center">
            <span className="text-muted-foreground text-sm">暂无封面</span>
          </div>
        )}
        {article.category && (
          <CutoutCardInsetLabel className="bottom-0 left-0 rounded-tr-[20px] bg-card px-5 py-3">
            <span className="font-semibold text-[11px] text-muted-foreground uppercase tracking-widest">
              {article.category.name}
            </span>
            <CutoutCorner className="absolute -right-[31px] -bottom-px rotate-90 text-card" />
            <CutoutCorner className="absolute -top-[31px] -left-px rotate-90 text-card" />
          </CutoutCardInsetLabel>
        )}
      </CutoutCardMedia>

      <CutoutCardContent>
        <motion.div variants={stagger} className="space-y-2">
          <Link href={`/articles/${article.slug}`}>
            <h2 className="text-xl font-semibold hover:text-primary transition-colors line-clamp-2">
              {article.title}
            </h2>
          </Link>
          {article.summary && (
            <p className="text-muted-foreground line-clamp-2 text-sm">{article.summary}</p>
          )}
        </motion.div>
      </CutoutCardContent>

      <CutoutCardFooter>
        <motion.div variants={stagger} className="flex items-center justify-between w-full text-xs text-muted-foreground">
          <time>{new Date(article.createTime).toLocaleDateString("zh-CN")}</time>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1"><Eye className="size-3" />{article.clickCount}</span>
            <LikeButton targetType="article" targetId={article.id} />
          </div>
        </motion.div>
      </CutoutCardFooter>
    </CutoutCard>
  );
}

export default function ArticlesPage() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);

  useEffect(() => { load(); }, [page]);

  const load = async () => {
    try {
      const data = await api.get<PageResult<Article>>(`/public/articles?page=${page}&pageSize=10`);
      setArticles(data.records);
      setTotal(data.total);
    } catch { /* handle error */ }
  };

  return (
    <div className="flex flex-col flex-1">
      <SiteHeader activeNav="文章" />
      <main className="flex-1 max-w-4xl mx-auto w-full px-4 py-12">
        <Breadcrumb items={[{ label: "文章" }]} />
        <h1 className="text-3xl font-bold mb-8">文章</h1>

        {articles.length === 0 ? (
          <p className="text-muted-foreground text-center py-20">还没有文章</p>
        ) : (
          <div className="space-y-8">
            {articles.map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))}

            {total > 10 && (
              <div className="flex justify-center gap-4 pt-8">
                <button onClick={() => setPage(Math.max(1, page - 1))} disabled={page === 1}
                  className="px-4 py-2 text-sm border border-border rounded-md disabled:opacity-50 hover:bg-accent transition-colors">
                  上一页
                </button>
                <span className="px-4 py-2 text-sm text-muted-foreground">
                  第 {page} 页 / 共 {Math.ceil(total / 10)} 页
                </span>
                <button onClick={() => setPage(page + 1)} disabled={page * 10 >= total}
                  className="px-4 py-2 text-sm border border-border rounded-md disabled:opacity-50 hover:bg-accent transition-colors">
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
