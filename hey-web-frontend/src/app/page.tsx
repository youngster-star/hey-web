"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { api } from "@/lib/api";
import {
  FileText,
  Video,
  Image,
  Music,
  BookOpen,
  Sparkles,
  ArrowRight,
  ExternalLink,
} from "lucide-react";

interface Article {
  id: number;
  title: string;
  slug: string;
  summary: string;
  coverImage: string;
  clickCount: number;
  createTime: string;
}

interface Stats {
  articleCount: number;
  categoryCount: number;
  tagCount: number;
}

const contentTypes = [
  { href: "/articles", icon: FileText, label: "文章", desc: "技术探索与生活思考", color: "from-blue-500/20 to-cyan-500/20 text-blue-600 dark:text-blue-400", borderColor: "border-blue-200 dark:border-blue-800" },
  { href: "/videos", icon: Video, label: "视频", desc: "Vlog 与技术分享", color: "from-red-500/20 to-pink-500/20 text-red-600 dark:text-red-400", borderColor: "border-red-200 dark:border-red-800" },
  { href: "/gallery", icon: Image, label: "相册", desc: "用镜头记录世界", color: "from-purple-500/20 to-fuchsia-500/20 text-purple-600 dark:text-purple-400", borderColor: "border-purple-200 dark:border-purple-800" },
  { href: "/audio", icon: Music, label: "音乐", desc: "旋律与心情共鸣", color: "from-amber-500/20 to-orange-500/20 text-amber-600 dark:text-amber-400", borderColor: "border-amber-200 dark:border-amber-800" },
  { href: "/novels", icon: BookOpen, label: "小说", desc: "用文字构建世界", color: "from-emerald-500/20 to-teal-500/20 text-emerald-600 dark:text-emerald-400", borderColor: "border-emerald-200 dark:border-emerald-800" },
  { href: "/moments", icon: Sparkles, label: "说说", desc: "日常碎碎念", color: "from-rose-500/20 to-pink-500/20 text-rose-600 dark:text-rose-400", borderColor: "border-rose-200 dark:border-rose-800" },
];

export default function Home() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [stats, setStats] = useState<Stats | null>(null);

  useEffect(() => {
    api.get<{ records: Article[] }>("/public/articles?page=1&pageSize=4").then(r => setArticles(r.records)).catch(() => {});
    api.get<Stats>("/admin/dashboard/overview").then(setStats).catch(() => setStats({ articleCount: 6, categoryCount: 4, tagCount: 8 }));
  }, []);

  return (
    <div className="flex flex-col flex-1">
      {/* Hero */}
      <section className="relative flex flex-col items-center justify-center min-h-[85vh] px-6 text-center overflow-hidden">
        {/* Animated background */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,_var(--color-primary)_8%,_transparent_60%)] opacity-[0.08] dark:opacity-[0.15]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_40%_30%_at_80%_80%,_var(--color-primary)_5%,_transparent_50%)] opacity-[0.06] dark:opacity-[0.1]" />
          {/* Dot grid pattern */}
          <div
            className="absolute inset-0 opacity-[0.15] dark:opacity-[0.25]"
            style={{
              backgroundImage: "radial-gradient(circle, var(--color-foreground) 0.5px, transparent 0.5px)",
              backgroundSize: "28px 28px",
            }}
          />
        </div>

        <div className="relative z-10 max-w-3xl mx-auto">
          {/* Avatar area */}
          <div className="mb-8 inline-flex items-center justify-center w-24 h-24 rounded-full bg-muted border border-border overflow-hidden">
            <span className="text-3xl">🌸</span>
          </div>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-6">
            <span className="bg-gradient-to-r from-foreground via-foreground/80 to-foreground bg-clip-text text-transparent">
              何以晴
            </span>
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground max-w-xl mx-auto leading-relaxed mb-4">
            记录生活与思考的个人空间
          </p>
          <p className="text-sm text-muted-foreground/70 max-w-md mx-auto leading-relaxed mb-10">
            代码 · 影像 · 旋律 · 文字 —— 用每一种方式，记录这个世界的温度
          </p>

          <div className="flex items-center justify-center gap-4 flex-wrap">
            <Link
              href="/articles"
              className="inline-flex h-11 items-center justify-center gap-2 rounded-full bg-foreground px-7 text-sm font-medium text-background transition-all hover:bg-foreground/90 hover:scale-105 active:scale-95"
            >
              浏览文章
              <ArrowRight className="size-4" />
            </Link>
            <Link
              href="/about"
              className="inline-flex h-11 items-center justify-center rounded-full border border-border px-7 text-sm font-medium transition-all hover:bg-accent hover:scale-105 active:scale-95"
            >
              关于我
            </Link>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-5 h-8 rounded-full border-2 border-muted-foreground/30 flex items-start justify-center p-1">
            <div className="w-1 h-1.5 rounded-full bg-muted-foreground/40" />
          </div>
        </div>
      </section>

      {/* Content type cards */}
      <section className="max-w-6xl mx-auto w-full px-6 pb-24">
        <div className="text-center mb-12">
          <p className="text-sm font-medium text-muted-foreground tracking-wider uppercase">Explore</p>
          <h2 className="text-3xl font-bold mt-2">探索内容</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {contentTypes.map((type) => (
            <Link
              key={type.href}
              href={type.href}
              className={`group relative rounded-2xl border ${type.borderColor} p-5 text-center transition-all duration-300 hover:scale-105 hover:shadow-lg hover:-translate-y-1 active:scale-95`}
            >
              <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br ${type.color} mb-3 transition-transform group-hover:rotate-6`}>
                <type.icon className="size-6" />
              </div>
              <h3 className="font-semibold text-sm mb-1">{type.label}</h3>
              <p className="text-xs text-muted-foreground">{type.desc}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Latest articles */}
      {articles.length > 0 && (
        <section className="bg-muted/50 border-y border-border">
          <div className="max-w-6xl mx-auto w-full px-6 py-24">
            <div className="flex items-center justify-between mb-12">
              <div>
                <p className="text-sm font-medium text-muted-foreground tracking-wider uppercase">Latest</p>
                <h2 className="text-3xl font-bold mt-2">最新文章</h2>
              </div>
              <Link
                href="/articles"
                className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                查看全部 <ArrowRight className="size-3.5" />
              </Link>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
              {articles.map((article) => (
                <Link
                  key={article.id}
                  href={`/articles/${article.slug}`}
                  className="group rounded-2xl border border-border bg-card p-5 transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
                >
                  <h3 className="font-semibold line-clamp-2 group-hover:text-primary transition-colors mb-2">
                    {article.title}
                  </h3>
                  <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                    {article.summary ?? "暂无摘要"}
                  </p>
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>{article.createTime?.slice(0, 10)}</span>
                    <span className="flex items-center gap-1">
                      <ExternalLink className="size-3" /> {article.clickCount} 次阅读
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Stats + Quick links */}
      <section className="max-w-6xl mx-auto w-full px-6 py-24">
        <div className="text-center mb-12">
          <p className="text-sm font-medium text-muted-foreground tracking-wider uppercase">Stats</p>
          <h2 className="text-3xl font-bold mt-2">站点统计</h2>
        </div>
        <div className="grid grid-cols-3 gap-6 max-w-lg mx-auto mb-16">
          <div className="text-center p-6 rounded-2xl border border-border bg-card">
            <div className="text-3xl font-bold text-primary mb-1">{stats?.articleCount ?? "-"}</div>
            <div className="text-sm text-muted-foreground">篇文章</div>
          </div>
          <div className="text-center p-6 rounded-2xl border border-border bg-card">
            <div className="text-3xl font-bold text-primary mb-1">{stats?.categoryCount ?? "-"}</div>
            <div className="text-sm text-muted-foreground">个分类</div>
          </div>
          <div className="text-center p-6 rounded-2xl border border-border bg-card">
            <div className="text-3xl font-bold text-primary mb-1">{stats?.tagCount ?? "-"}</div>
            <div className="text-sm text-muted-foreground">个标签</div>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3">
          {[
            { href: "/friends", label: "友情链接" },
            { href: "/memos", label: "备忘录" },
            { href: "/diary", label: "日记" },
            { href: "/archive", label: "归档" },
          ].map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="inline-flex items-center gap-1.5 rounded-full border border-border px-5 py-2 text-sm text-muted-foreground hover:text-foreground hover:border-foreground/30 hover:bg-accent transition-all"
            >
              {link.label}
              <ArrowRight className="size-3" />
            </Link>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8 text-center">
        <p className="text-xs text-muted-foreground">
          © 2026 何以晴 · 记录生活与思考
        </p>
      </footer>
    </div>
  );
}
