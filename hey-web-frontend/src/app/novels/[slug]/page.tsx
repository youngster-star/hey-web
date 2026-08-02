"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { api } from "@/lib/api";
import { Breadcrumb } from "@/components/common/breadcrumb";
import { Eye, BookOpen, ArrowLeft, Clock } from "lucide-react";
import { LikeButton } from "@/components/common/like-button";

interface Novel {
  id: number;
  title: string;
  slug: string;
  summary: string;
  coverImage: string;
  author: string;
  clickCount: number;
  likeCount: number;
  category: { id: number; name: string } | null;
  createTime: string;
}

interface Chapter {
  id: number;
  title: string;
  chapterNum: number;
  wordCount: number;
  clickCount: number;
  createTime: string;
}

export default function NovelDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  const [novel, setNovel] = useState<Novel | null>(null);
  const [chapters, setChapters] = useState<Chapter[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get<Novel>(`/public/novels/${slug}`)
      .then((n) => {
        setNovel(n);
        return api.get<Chapter[]>(`/public/novels/${n.id}/chapters`);
      })
      .then(setChapters)
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) return <main className="flex-1 max-w-3xl mx-auto w-full px-4 py-12"><p className="text-muted-foreground">加载中...</p></main>;
  if (!novel) return <main className="flex-1 max-w-3xl mx-auto w-full px-4 py-12 text-center"><p className="text-muted-foreground mb-4">小说不存在或已隐藏</p><Link href="/novels" className="text-primary text-sm">← 返回小说列表</Link></main>;

  return (
    <div className="flex flex-col flex-1">
      <main className="flex-1 max-w-3xl mx-auto w-full px-4 py-12">
        <Breadcrumb items={[{ label: "小说", href: "/novels" }, { label: novel.title }]} />

        <div className="flex gap-6 mb-8">
          {novel.coverImage && (
            <img src={novel.coverImage} alt={novel.title} className="w-32 h-44 rounded-lg object-cover shrink-0" />
          )}
          <div>
            <h1 className="text-2xl md:text-3xl font-bold mb-2">{novel.title}</h1>
            {novel.author && <p className="text-muted-foreground mb-2">作者：{novel.author}</p>}
            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-1"><Eye className="size-3.5" /> {novel.clickCount} 阅读</span>
              <LikeButton targetType="novel" targetId={novel.id} />
              <span className="flex items-center gap-1"><BookOpen className="size-3.5" /> {chapters.length} 章</span>
            </div>
          </div>
        </div>

        {novel.summary && <p className="text-muted-foreground mb-8 leading-relaxed">{novel.summary}</p>}

        {/* Chapters list */}
        <h2 className="text-lg font-semibold mb-4">目录</h2>
        <div className="rounded-xl border border-border divide-y divide-border">
          {chapters.map((ch) => (
            <Link
              key={ch.id}
              href={`/novels/${novel.slug}/${ch.chapterNum}`}
              className="flex items-center justify-between px-4 py-3 hover:bg-accent transition-colors"
            >
              <span className="font-medium text-sm">
                {ch.chapterNum === 0 ? "序章" : `第${ch.chapterNum}章`} · {ch.title}
              </span>
              <span className="flex items-center gap-3 text-xs text-muted-foreground">
                {ch.wordCount > 0 && <span className="flex items-center gap-1"><Clock className="size-3" /> {ch.wordCount.toLocaleString()} 字</span>}
                {ch.clickCount > 0 && <span>{ch.clickCount} 阅读</span>}
              </span>
            </Link>
          ))}
        </div>
        {chapters.length === 0 && <p className="text-muted-foreground text-center py-8">暂无章节</p>}

        <div className="mt-8">
          <Link href="/novels" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="size-4" /> 返回小说列表
          </Link>
        </div>
      </main>
    </div>
  );
}
