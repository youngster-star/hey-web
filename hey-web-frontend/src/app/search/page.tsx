"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { api, type PageResult } from "@/lib/api";

interface Article { id: number; title: string; slug: string; summary: string; clickCount: number; createTime: string; }

function SearchContent() {
  const searchParams = useSearchParams();
  const q = searchParams.get("q") || "";
  const [articles, setArticles] = useState<Article[]>([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    if (!q) return;
    api.get<PageResult<Article>>(`/public/search?keyword=${encodeURIComponent(q)}`).then(d => {
      setArticles(d.records); setTotal(d.total);
    }).catch(() => {});
  }, [q]);

  return (
    <div className="flex flex-col flex-1">
      <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto flex items-center justify-between px-4 h-14">
          <Link href="/" className="font-bold text-lg">何以晴</Link>
        </div>
      </header>
      <main className="flex-1 max-w-4xl mx-auto w-full px-4 py-12">
        <h1 className="text-2xl font-bold mb-2">搜索结果</h1>
        <p className="text-muted-foreground mb-8">「{q}」找到 {total} 篇文章</p>
        <div className="space-y-6">
          {articles.map(a => (
            <Link key={a.id} href={`/articles/${a.slug}`} className="block group">
              <h2 className="text-lg font-semibold group-hover:text-primary">{a.title}</h2>
              {a.summary && <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{a.summary}</p>}
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}

export default function SearchPage() {
  return <Suspense><SearchContent /></Suspense>;
}
