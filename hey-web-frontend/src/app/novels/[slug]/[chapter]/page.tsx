"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { api } from "@/lib/api";
import { Breadcrumb } from "@/components/common/breadcrumb";
import { ChevronLeft, ChevronRight, List } from "lucide-react";
import ReactMarkdown from "react-markdown";

interface NovelInfo {
  id: number;
  title: string;
  slug: string;
}

interface Chapter {
  id: number;
  title: string;
  content: string;
  chapterNum: number;
  wordCount: number;
  clickCount: number;
  createTime: string;
}

export default function ChapterPage() {
  const params = useParams();
  const slug = params.slug as string;
  const chapterNum = Number(params.chapter as string);

  const [chapter, setChapter] = useState<Chapter | null>(null);
  const [novelInfo, setNovelInfo] = useState<NovelInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [readProgress, setReadProgress] = useState(0);

  useEffect(() => {
    // 先通过 slug 获取小说 ID，再获取章节
    api.get<NovelInfo>(`/public/novels/${slug}`)
      .then((novel) => {
        setNovelInfo(novel);
        return api.get<Chapter>(`/public/novels/${novel.id}/chapters/${chapterNum}`);
      })
      .then(setChapter)
      .finally(() => setLoading(false));
  }, [slug, chapterNum]);

  // 阅读进度保存/恢复
  useEffect(() => {
    const key = `novel-${slug}-ch${chapterNum}`;
    const saved = localStorage.getItem(`novel-pos-${slug}`);
    if (saved) {
      const { chapter: savedCh, progress } = JSON.parse(saved);
      if (savedCh === chapterNum) {
        setReadProgress(progress);
        setTimeout(() => window.scrollTo({ top: progress, behavior: "auto" }), 100);
      }
    }
    const onScroll = () => {
      const p = window.scrollY;
      const total = document.documentElement.scrollHeight - window.innerHeight;
      if (total > 0) {
        const pct = Math.round((p / total) * 100);
        localStorage.setItem(`novel-pos-${slug}`, JSON.stringify({ chapter: chapterNum, progress: p }));
        setReadProgress(pct);
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [slug, chapterNum]);

  if (loading) return <main className="flex-1 max-w-2xl mx-auto w-full px-4 py-12"><p className="text-muted-foreground">加载中...</p></main>;
  if (!chapter) return <main className="flex-1 max-w-2xl mx-auto w-full px-4 py-12 text-center"><p className="text-muted-foreground mb-4">章节不存在</p><Link href={`/novels/${slug}`} className="text-primary text-sm">← 返回目录</Link></main>;

  return (
    <div className="flex flex-col flex-1">
      {/* Progress bar */}
      <div className="fixed top-0 left-0 h-0.5 bg-primary z-50 transition-all" style={{ width: `${readProgress}%` }} />

      <main className="flex-1 max-w-2xl mx-auto w-full px-4 py-12">
        <Breadcrumb items={[
          { label: "小说", href: "/novels" },
          { label: slug, href: `/novels/${slug}` },
          { label: `第${chapter.chapterNum}章` },
        ]} />

        <article className="mt-8">
          <h1 className="text-2xl font-bold mb-4">
            {chapter.chapterNum === 0 ? "序章" : `第${chapter.chapterNum}章`} {chapter.title}
          </h1>
          <p className="text-sm text-muted-foreground mb-8">
            {chapter.wordCount > 0 && <>{chapter.wordCount.toLocaleString()} 字 · </>}
            {chapter.clickCount} 次阅读
          </p>

          <div className="prose dark:prose-invert max-w-none leading-loose text-[16px]">
            <ReactMarkdown>{chapter.content ?? ""}</ReactMarkdown>
          </div>

          {/* Chapter navigation */}
          <div className="flex items-center justify-between mt-12 pt-8 border-t border-border">
            <Link
              href={chapter.chapterNum > 0 ? `/novels/${slug}/${chapter.chapterNum - 1}` : `/novels/${slug}`}
              className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <ChevronLeft className="size-4" />
              {chapter.chapterNum > 0 ? "上一章" : "返回目录"}
            </Link>

            <Link href={`/novels/${slug}`} className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors">
              <List className="size-4" /> 目录
            </Link>

            <button
              onClick={async () => {
                if (!novelInfo) return;
                try {
                  const next = await api.get<Chapter>(`/public/novels/${novelInfo.id}/chapters/${chapter.chapterNum + 1}`);
                  if (next) window.location.href = `/novels/${slug}/${chapter.chapterNum + 1}`;
                } catch {
                  // 没有下一章
                }
              }}
              className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              下一章 <ChevronRight className="size-4" />
            </button>
          </div>
        </article>
      </main>
    </div>
  );
}
