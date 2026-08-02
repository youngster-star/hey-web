"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { api } from "@/lib/api";
import { Breadcrumb } from "@/components/common/breadcrumb";
import { LikeButton } from "@/components/common/like-button";
interface Novel {
  id: number; title: string; slug: string; summary: string;
  coverImage: string; author: string; clickCount: number; createTime: string;
}

export default function NovelsPage() {
  const [novels, setNovels] = useState<Novel[]>([]);

  useEffect(() => {
    api.get<Novel[]>("/public/novels").then(setNovels).catch(() => {});
  }, []);

  return (
    <div className="flex flex-col flex-1">
      <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto flex items-center justify-between px-4 h-14">
          <Link href="/" className="font-bold text-lg">何以晴</Link>
          <nav className="flex items-center gap-6 text-sm">
            <Link href="/articles" className="text-muted-foreground hover:text-foreground">文章</Link>
            <Link href="/novels" className="font-medium">小说</Link>
            <Link href="/about" className="text-muted-foreground hover:text-foreground">关于</Link>
          </nav>
        </div>
      </header>
      <main className="flex-1 max-w-4xl mx-auto w-full px-4 py-12">
        <Breadcrumb items={[{ label: "小说" }]} />
        <h1 className="text-3xl font-bold mb-8">小说</h1>
        <div className="grid gap-6">
          {novels.map((n) => (
            <Link key={n.id} href={`/novels/${n.slug}`} className="group flex gap-6 p-4 rounded-xl border border-border transition-shadow hover:shadow-lg">
              {n.coverImage && <img src={n.coverImage} alt={n.title} className="w-24 h-32 rounded-lg object-cover" />}
              <div className="flex-1">
                <h3 className="text-xl font-semibold group-hover:text-primary transition-colors">{n.title}</h3>
                {n.author && <p className="text-sm text-muted-foreground mt-1">{n.author}</p>}
                {n.summary && <p className="text-sm text-muted-foreground mt-2 line-clamp-2">{n.summary}</p>}
                <div className="flex items-center gap-3 mt-2 text-xs text-muted-foreground">
                  <span>{n.clickCount} 次阅读</span>
                  <LikeButton targetType="novel" targetId={n.id} />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}
