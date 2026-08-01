"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { api } from "@/lib/api";

interface Video {
  id: number; title: string; slug: string; summary: string;
  coverImage: string; source: string; duration: string;
  clickCount: number; likeCount: number; createTime: string;
}

export default function VideosPage() {
  const [videos, setVideos] = useState<Video[]>([]);

  useEffect(() => {
    api.get<Video[]>("/public/videos").then(setVideos).catch(() => {});
  }, []);

  return (
    <div className="flex flex-col flex-1">
      <Header />
      <main className="flex-1 max-w-6xl mx-auto w-full px-4 py-12">
        <h1 className="text-3xl font-bold mb-8">视频</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {videos.map((v) => (
            <Link key={v.id} href={`/videos/${v.slug}`} className="group">
              <div className="rounded-xl border border-border overflow-hidden transition-shadow hover:shadow-lg">
                <div className="aspect-video bg-accent relative">
                  {v.coverImage && <img src={v.coverImage} alt={v.title} className="w-full h-full object-cover" />}
                  {v.duration && <span className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-0.5 rounded">{v.duration}</span>}
                </div>
                <div className="p-4">
                  <h3 className="font-semibold group-hover:text-primary transition-colors">{v.title}</h3>
                  {v.summary && <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{v.summary}</p>}
                  <div className="flex items-center gap-3 mt-2 text-xs text-muted-foreground">
                    <span>{v.clickCount} 次播放</span>
                    <span>{v.source}</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}

function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-sm">
      <div className="max-w-6xl mx-auto flex items-center justify-between px-4 h-14">
        <Link href="/" className="font-bold text-lg">何以晴</Link>
        <nav className="flex items-center gap-6 text-sm">
          <Link href="/articles" className="text-muted-foreground hover:text-foreground">文章</Link>
          <Link href="/videos" className="font-medium">视频</Link>
          <Link href="/gallery" className="text-muted-foreground hover:text-foreground">相册</Link>
          <Link href="/audio" className="text-muted-foreground hover:text-foreground">音乐</Link>
          <Link href="/about" className="text-muted-foreground hover:text-foreground">关于</Link>
        </nav>
      </div>
    </header>
  );
}
