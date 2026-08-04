"use client";

import { useEffect, useState, useMemo } from "react";
import Link from "next/link";
import { api } from "@/lib/api";
import { SiteHeader } from "@/components/layout/site-header";
import { BlurFade } from "@/components/ui/blur-fade";
import { Marquee } from "@/components/ui/marquee";
import { OrbitingCircles } from "@/components/ui/orbiting-circles";
import { VideoText } from "@/components/ui/video-text";
import { ShaderLensBlur } from "@/components/ui/shader-lens-blur";
import { LoadingCarousel } from "@/components/ui/loading-carousel";
import ThreeDPhotoCarousel from "@/components/ui/three-d-carousel";
import { BentoCard, BentoGrid } from "@/components/ui/bento-grid";
import {
  FileText, Image, Video, Music, BookOpen, Sparkles,
  ArrowRight, Pencil, CheckCircle2, BookMarked,
  BellIcon, CalendarIcon, GlobeIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface Stats {
  articleCount: number;
  categoryCount: number;
  tagCount: number;
}

interface MomentItem { id: number; content: string; createTime: string; }
interface MemoItem { id: number; title: string; content: string; createTime: string; }
interface DiaryItem { id: number; title: string; mood: string; diaryDate: string; }

// --- SVG Icons for OrbitingCircles (matching UI.md examples) ---
const TechIcons = {
  react: () => (
    <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor" className="text-cyan-400">
      <path d="M12 13.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3Z"/><path fillRule="evenodd" d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0Zm0 21.6a9.6 9.6 0 1 1 0-19.2 9.6 9.6 0 0 1 0 19.2Z" clipRule="evenodd"/>
    </svg>
  ),
  ts: () => (
    <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor" className="text-blue-500">
      <path d="M3 3h18v18H3V3Zm10.714 10.325v1.616h2.61v5.641h1.96v-5.641h2.61v-1.616h-7.18Zm-2.938 5.455c0 .822.43 1.261 1.107 1.261.563 0 .92-.28 1.196-.732l1.14.741c-.403.707-1.131 1.24-2.383 1.24-1.586 0-2.69-.943-2.69-2.51v-5.042H7.52v-1.379c.97-.335 1.614-1.016 1.853-1.988h1.403v1.988h2.61v1.379h-2.61v3.042Z"/>
    </svg>
  ),
  nextjs: () => (
    <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor" className="text-foreground dark:text-white">
      <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0Zm4.314 19.069L9.56 12.933v4.877H7.886V6.164h1.674v4.201l6.302-4.201h2.152l-5.088 3.358 5.482 7.547h-2.094Z"/>
    </svg>
  ),
  tailwind: () => (
    <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor" className="text-teal-400">
      <path d="M12 5C9.5 5 7.917 6.25 7.25 8.75c.95-1.25 2.058-1.719 3.325-1.406.723.179 1.24.703 1.812 1.281.932.943 2.01 2.034 4.363 2.034 2.5 0 4.083-1.25 4.75-3.75-.95 1.25-2.058 1.719-3.325 1.406-.723-.179-1.24-.703-1.812-1.281C15.431 6.891 14.353 5.8 12 5.8c-2.5 0-4.083 1.25-4.75 3.75.95-1.25 2.058-1.719 3.325-1.406.723.179 1.24.703 1.812 1.281.932.943 2.01 2.034 4.363 2.034 2.5 0 4.083-1.25 4.75-3.75-.95 1.25-2.058 1.719-3.325 1.406-.723-.179-1.24-.703-1.812-1.281C15.431 8.691 14.353 7.6 12 7.6c-2.5 0-4.083 1.25-4.75 3.75Z"/>
    </svg>
  ),
  java: () => (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor" className="text-orange-500">
      <path d="M8.5 16.5s1.2.7 2.7.9c1.5.2 3.7.1 5.4-.7 0 0 .6.4 1.4.7-5 2.1-11.3-.2-9.5-1.9M7 14s1.3.8 3.4 1c2.1.2 4.7-.2 6.9-1.3 0 0 .6.6 1.6.9-6 1.8-13.9.4-11.9-.6M11.5 10c1.3 1.5-.3 2.8-.3 2.8s3.3-1.7 1.8-3.8c-1.4-2-2.6-3 3.5-6.4 0 0-9.6 2.4-5 7.4M17.5 19s.8.7-1 1.2c-3.5.9-14.6 1.1-17.7 0-1.1-.4 1-.9 1.7-1 3.8-.4 6-.4 10.3-.4 4.4 0 6.5.1 6.7.2Z"/>
    </svg>
  ),
  git: () => (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor" className="text-red-500">
      <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12Z"/>
    </svg>
  ),
  docker: () => (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor" className="text-blue-400">
      <path d="M4.983 8.078h-.002c-.024.007-.049.015-.074.024v.001h.076v-.025Zm.077-.001a.005.005 0 0 0-.001.001h.001v-.001ZM4.93 9.693H3.086v1.168H4.93V9.693Zm1.326-1.109H5.06v1.173h1.196V8.584Zm.729.546H5.789v1.173h1.196V9.13Zm1.328-.546H7.117v1.173h1.196V8.584Zm.73.546H7.847v1.173h1.196V9.13Zm.835-1.107H8.68v1.168h1.198V8.023ZM21 9.923h-1.303v1.168H21V9.923Zm-3.349 3.801-.004.002c-.024.006-.049.013-.074.02h.066v-.025l.012.003ZM14.1 8.365h1.28v1.168H14.1V8.365Zm1.28-.364h-1.28v-.454h1.28v.454Zm.996.91h1.28v1.168h-1.28V8.911Zm1.28-.364h-1.28v-.454h1.28v.454Zm-9.451 4.143H.64v-1.707c0-1.216.908-2.253 2.12-2.375.36-.036.642-.064.984-.064h.707v.56h.707c3.087 0 5.598 2.51 5.598 5.598v.707h-.56v.707c0 1.287-1.06 2.347-2.347 2.347H5.502v-.56H4.795c-1.287 0-2.347-1.06-2.347-2.347v-.707h.56v-.707c0-1.216.908-2.253 2.12-2.375.008 0 .013-.002.02-.002v.001ZM8.053 13.17h-.56v-.707c0-1.287-1.06-2.347-2.347-2.347H4.44v.56H3.733c-.49 0-.95.15-1.332.432Z"/>
    </svg>
  ),
  db: () => (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor" className="text-green-400">
      <path d="M12 2C7.03 2 3 4.239 3 7v10c0 2.761 4.03 5 9 5s9-2.239 9-5V7c0-2.761-4.03-5-9-5Zm0 2c3.866 0 7 1.79 7 3s-3.134 3-7 3-7-1.79-7-3 3.134-3 7-3Zm7 13c0 1.21-3.134 3-7 3s-7-1.79-7-3v-2c0 1.21 3.134 3 7 3s7-1.79 7-3v2Zm0-4c0 1.21-3.134 3-7 3s-7-1.79-7-3v-2c0 1.21 3.134 3 7 3s7-1.79 7-3v2Z"/>
    </svg>
  ),
};

// --- Marquee Card ---
function MarqueeCard({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <figure className={cn(
      "relative h-full w-fit cursor-pointer overflow-hidden rounded-xl border p-4 sm:w-48",
      "border-gray-950/[.1] bg-gray-950/[.01] hover:bg-gray-950/[.05]",
      "dark:border-gray-50/[.1] dark:bg-gray-50/[.10] dark:hover:bg-gray-50/[.15]",
      className
    )}>
      {children}
    </figure>
  );
}

// --- BentoGrid features ---
const features = [
  {
    Icon: FileText,
    name: "文章",
    description: "技术探索与生活思考，用文字记录成长。",
    href: "/articles",
    cta: "浏览文章",
    background: <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-transparent to-cyan-500/10" />,
    className: "lg:row-start-1 lg:row-end-3 lg:col-start-1 lg:col-end-3",
  },
  {
    Icon: Image,
    name: "相册",
    description: "用镜头记录世界，定格美好瞬间。",
    href: "/gallery",
    cta: "查看相册",
    background: <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-transparent to-fuchsia-500/10" />,
    className: "lg:col-start-3 lg:col-end-4 lg:row-start-1 lg:row-end-2",
  },
  {
    Icon: Video,
    name: "视频",
    description: "Vlog 与技术分享。",
    href: "/videos",
    cta: "观看视频",
    background: <div className="absolute inset-0 bg-gradient-to-br from-red-500/10 via-transparent to-pink-500/10" />,
    className: "lg:col-start-4 lg:col-end-5 lg:row-start-1 lg:row-end-2",
  },
  {
    Icon: Music,
    name: "音乐",
    description: "旋律与心情共鸣。",
    href: "/audio",
    cta: "聆听音乐",
    background: <div className="absolute inset-0 bg-gradient-to-br from-amber-500/10 via-transparent to-orange-500/10" />,
    className: "lg:col-start-3 lg:col-end-4 lg:row-start-2 lg:row-end-3",
  },
  {
    Icon: BookOpen,
    name: "小说",
    description: "用文字构建世界。",
    href: "/novels",
    cta: "阅读小说",
    background: <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 via-transparent to-teal-500/10" />,
    className: "lg:col-start-4 lg:col-end-5 lg:row-start-2 lg:row-end-3",
  },
];

export default function Home() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [feedItems, setFeedItems] = useState<React.ReactNode[]>([]);

  useEffect(() => {
    api.get<Stats>("/admin/dashboard/overview").then(setStats).catch(() => setStats({ articleCount: 6, categoryCount: 4, tagCount: 8 }));

    Promise.all([
      api.get<MomentItem[]>("/public/moments?page=1&pageSize=6").catch(() => [] as MomentItem[]),
      api.get<MemoItem[]>("/public/memos?page=1&pageSize=6").catch(() => [] as MemoItem[]),
      api.get<DiaryItem[]>("/public/diary?page=1&pageSize=6").catch(() => [] as DiaryItem[]),
    ]).then(([moments, memos, diaries]) => {
      const items: React.ReactNode[] = [];
      (Array.isArray(moments) ? moments : []).forEach((m) =>
        items.push(
          <MarqueeCard key={`moment-${m.id}`}>
            <div className="flex items-center gap-2 mb-2 text-rose-600 dark:text-rose-400">
              <Pencil className="size-3.5" /><span className="text-xs font-medium">说说</span>
            </div>
            <blockquote className="text-xs text-muted-foreground line-clamp-2">{m.content}</blockquote>
          </MarqueeCard>
        )
      );
      (Array.isArray(memos) ? memos : []).forEach((m) =>
        items.push(
          <MarqueeCard key={`memo-${m.id}`}>
            <div className="flex items-center gap-2 mb-2 text-amber-600 dark:text-amber-400">
              <CheckCircle2 className="size-3.5" /><span className="text-xs font-medium">备忘</span>
            </div>
            <blockquote className="text-xs font-medium line-clamp-1">{m.title}</blockquote>
          </MarqueeCard>
        )
      );
      (Array.isArray(diaries) ? diaries : []).forEach((d) =>
        items.push(
          <MarqueeCard key={`diary-${d.id}`}>
            <div className="flex items-center gap-2 mb-2 text-blue-600 dark:text-blue-400">
              <BookMarked className="size-3.5" /><span className="text-xs font-medium">日记</span>
            </div>
            <blockquote className="text-xs font-medium line-clamp-1">{d.title}</blockquote>
            <span className="text-[10px] text-muted-foreground">{d.diaryDate}</span>
          </MarqueeCard>
        )
      );
      setFeedItems(items);
    });
  }, []);

  const marqueeRows = useMemo(() => {
    if (feedItems.length === 0) return { firstRow: [], secondRow: [], thirdRow: [], fourthRow: [] };
    const half = Math.ceil(feedItems.length / 2);
    const quarter = Math.ceil(feedItems.length / 4);
    return {
      firstRow: feedItems.slice(0, quarter),
      secondRow: feedItems.slice(quarter, half),
      thirdRow: feedItems.slice(half, half + quarter),
      fourthRow: feedItems.slice(half + quarter),
    };
  }, [feedItems]);

  return (
    <div className="flex flex-col flex-1">
      <SiteHeader />

      {/* ── Hero with OrbitingCircles ── */}
      <section className="relative flex flex-col items-center justify-center min-h-[90vh] px-6 text-center overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,_var(--color-primary)_8%,_transparent_60%)] opacity-[0.08] dark:opacity-[0.15]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_40%_30%_at_80%_80%,_var(--color-primary)_5%,_transparent_50%)] opacity-[0.06] dark:opacity-[0.1]" />
          <div className="absolute inset-0 opacity-[0.15] dark:opacity-[0.25]"
            style={{ backgroundImage: "radial-gradient(circle, var(--color-foreground) 0.5px, transparent 0.5px)", backgroundSize: "28px 28px" }} />
        </div>

        {/* Orbiting Circles */}
        <div className="relative flex h-[500px] w-full flex-col items-center justify-center overflow-hidden mb-2">
          <span className="text-5xl z-10">🌸</span>
          <OrbitingCircles iconSize={40}>
            <TechIcons.react />
            <TechIcons.ts />
            <TechIcons.nextjs />
            <TechIcons.tailwind />
          </OrbitingCircles>
          <OrbitingCircles iconSize={30} radius={100} reverse speed={2}>
            <TechIcons.java />
            <TechIcons.git />
            <TechIcons.docker />
            <TechIcons.db />
          </OrbitingCircles>
        </div>

        <BlurFade delay={0.2} duration={0.5}>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-6">
            <span className="bg-gradient-to-r from-foreground via-foreground/80 to-foreground bg-clip-text text-transparent">何以晴</span>
          </h1>
        </BlurFade>

        <BlurFade delay={0.35} duration={0.5}>
          <p className="text-lg md:text-xl text-muted-foreground max-w-xl mx-auto leading-relaxed mb-4">
            记录生活与思考的个人空间
          </p>
        </BlurFade>

        <BlurFade delay={0.45} duration={0.5}>
          <p className="text-sm text-muted-foreground/70 max-w-md mx-auto leading-relaxed mb-8">
            代码 · 影像 · 旋律 · 文字 —— 用每一种方式，记录这个世界的温度
          </p>
        </BlurFade>

        <BlurFade delay={0.6} duration={0.5}>
          <Link href="/about" className="inline-flex h-11 items-center justify-center rounded-full border border-border px-7 text-sm font-medium transition-all hover:bg-accent hover:scale-105 active:scale-95">
            关于我
          </Link>
        </BlurFade>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-5 h-8 rounded-full border-2 border-muted-foreground/30 flex items-start justify-center p-1">
            <div className="w-1 h-1.5 rounded-full bg-muted-foreground/40" />
          </div>
        </div>
      </section>

      {/* ── Scroll #1: VideoText ── */}
      <section className="max-w-6xl mx-auto w-full px-6 py-12 text-center">
        <BlurFade delay={0.1} duration={0.6}>
          <div className="relative h-[200px] w-full overflow-hidden rounded-2xl">
            <VideoText src="https://cdn.magicui.design/ocean-small.webm">
              WELCOME
            </VideoText>
          </div>
          <p className="text-sm text-muted-foreground/60 mt-4">欢迎来到何以晴的个人空间</p>
        </BlurFade>
      </section>

      {/* ── Scroll #2: ShaderLensBlur ── */}
      <section className="max-w-6xl mx-auto w-full px-6 py-12">
        <BlurFade delay={0.1} duration={0.6}>
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold">光影探索</h2>
            <p className="text-sm text-muted-foreground mt-2">移动鼠标，感受光影变化</p>
          </div>
          <div className="grid grid-cols-1 gap-8">
            <ShaderLensBlur />
          </div>
        </BlurFade>
      </section>

      {/* ── Scroll #3: LoadingCarousel — 热门文章 ── */}
      <section className="max-w-6xl mx-auto w-full px-6 py-12">
        <BlurFade delay={0.1} duration={0.6}>
          <div className="text-center mb-8">
            <p className="text-sm font-medium text-muted-foreground tracking-wider uppercase">Hot</p>
            <h2 className="text-3xl font-bold mt-2">热门推荐</h2>
          </div>
          <div className="w-full">
            <LoadingCarousel
              aspectRatio="wide"
              backgroundTips
              backgroundGradient
              showProgress
              autoplayInterval={5000}
            />
          </div>
        </BlurFade>
      </section>

      {/* ── Scroll #4: ThreeDPhotoCarousel ── */}
      <section className="max-w-6xl mx-auto w-full px-6 py-12">
        <BlurFade delay={0.1} duration={0.6}>
          <div className="text-center mb-8">
            <p className="text-sm font-medium text-muted-foreground tracking-wider uppercase">Gallery</p>
            <h2 className="text-3xl font-bold mt-2">照片展示</h2>
          </div>
          <div className="w-full max-w-4xl mx-auto">
            <div className="min-h-[500px] flex flex-col justify-center border border-dashed rounded-lg space-y-4">
              <div className="p-2">
                <ThreeDPhotoCarousel />
              </div>
            </div>
          </div>
        </BlurFade>
      </section>

      {/* ── EXPLORE: BentoGrid ── */}
      <section className="max-w-6xl mx-auto w-full px-6 py-12">
        <BlurFade delay={0.1} duration={0.6}>
          <div className="text-center mb-10">
            <p className="text-sm font-medium text-muted-foreground tracking-wider uppercase">Explore</p>
            <h2 className="text-3xl font-bold mt-2">探索内容</h2>
          </div>
          <BentoGrid className="lg:grid-rows-3">
            {features.map((feature) => (
              <BentoCard key={feature.name} {...feature} />
            ))}
          </BentoGrid>
        </BlurFade>
      </section>

      {/* ── LATEST: Marquee ── */}
      {feedItems.length > 0 && (
        <section className="border-y border-border bg-muted/30 overflow-hidden">
          <div className="max-w-6xl mx-auto w-full px-6 py-12">
            <BlurFade delay={0.1} duration={0.6}>
              <div className="text-center mb-8">
                <p className="text-sm font-medium text-muted-foreground tracking-wider uppercase">Latest</p>
                <h2 className="text-3xl font-bold mt-2">最近动态</h2>
              </div>
            </BlurFade>
            <div className="relative flex h-96 w-full flex-row items-center justify-center gap-4 overflow-hidden [perspective:300px]">
              <div className="flex flex-row items-center gap-4"
                style={{ transform: "translateX(-100px) translateY(0px) translateZ(-100px) rotateX(20deg) rotateY(-10deg) rotateZ(20deg)" }}>
                <Marquee pauseOnHover vertical className="[--duration:20s]">{marqueeRows.firstRow}</Marquee>
                <Marquee reverse pauseOnHover className="[--duration:20s]" vertical>{marqueeRows.secondRow}</Marquee>
                <Marquee reverse pauseOnHover className="[--duration:20s]" vertical>{marqueeRows.thirdRow}</Marquee>
                <Marquee pauseOnHover className="[--duration:20s]" vertical>{marqueeRows.fourthRow}</Marquee>
              </div>
              <div className="from-background pointer-events-none absolute inset-x-0 top-0 h-1/4 bg-gradient-to-b" />
              <div className="from-background pointer-events-none absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t" />
              <div className="from-background pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r" />
              <div className="from-background pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l" />
            </div>
          </div>
        </section>
      )}

      {/* ── STATS ── */}
      <section className="max-w-6xl mx-auto w-full px-6 py-24">
        <BlurFade delay={0.1} duration={0.5}>
          <div className="text-center mb-12">
            <p className="text-sm font-medium text-muted-foreground tracking-wider uppercase">Stats</p>
            <h2 className="text-3xl font-bold mt-2">站点统计</h2>
          </div>
        </BlurFade>
        <div className="grid grid-cols-3 gap-6 max-w-lg mx-auto mb-16">
          {[
            { value: stats?.articleCount ?? "-", label: "篇文章" },
            { value: stats?.categoryCount ?? "-", label: "个分类" },
            { value: stats?.tagCount ?? "-", label: "个标签" },
          ].map((s, i) => (
            <BlurFade key={s.label} delay={0.15 + i * 0.1} duration={0.4}>
              <div className="text-center p-6 rounded-2xl border border-border bg-card">
                <div className="text-3xl font-bold text-primary mb-1">{s.value}</div>
                <div className="text-sm text-muted-foreground">{s.label}</div>
              </div>
            </BlurFade>
          ))}
        </div>
        <BlurFade delay={0.4} duration={0.5}>
          <div className="flex flex-wrap items-center justify-center gap-3">
            {["/friends", "/memos", "/diary", "/archive"].map((href) => (
              <Link key={href} href={href} className="inline-flex items-center gap-1.5 rounded-full border border-border px-5 py-2 text-sm text-muted-foreground hover:text-foreground hover:border-foreground/30 hover:bg-accent transition-all">
                {{"/friends":"友情链接","/memos":"备忘录","/diary":"日记","/archive":"归档"}[href]}
                <ArrowRight className="size-3" />
              </Link>
            ))}
          </div>
        </BlurFade>
      </section>

      <footer className="border-t border-border py-8 text-center">
        <p className="text-xs text-muted-foreground">© 2026 何以晴 · 记录生活与思考</p>
      </footer>
    </div>
  );
}
