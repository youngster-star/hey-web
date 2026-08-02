"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { api } from "@/lib/api";
import { Breadcrumb } from "@/components/common/breadcrumb";
interface ImageGroup {
  id: number; title: string; slug: string; description: string;
  coverImage: string; clickCount: number; likeCount: number; createTime: string;
}

export default function GalleryPage() {
  const [groups, setGroups] = useState<ImageGroup[]>([]);

  useEffect(() => {
    api.get<ImageGroup[]>("/public/gallery").then(setGroups).catch(() => {});
  }, []);

  return (
    <div className="flex flex-col flex-1">
      <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto flex items-center justify-between px-4 h-14">
          <Link href="/" className="font-bold text-lg">何以晴</Link>
          <nav className="flex items-center gap-6 text-sm">
            <Link href="/articles" className="text-muted-foreground hover:text-foreground">文章</Link>
            <Link href="/videos" className="text-muted-foreground hover:text-foreground">视频</Link>
            <Link href="/gallery" className="font-medium">相册</Link>
            <Link href="/audio" className="text-muted-foreground hover:text-foreground">音乐</Link>
            <Link href="/about" className="text-muted-foreground hover:text-foreground">关于</Link>
          </nav>
        </div>
      </header>
      <main className="flex-1 max-w-6xl mx-auto w-full px-4 py-12">
        <Breadcrumb items={[{ label: "相册" }]} />
        <h1 className="text-3xl font-bold mb-8">相册</h1>
        <div className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
          {groups.map((g) => (
            <Link key={g.id} href={`/gallery/${g.slug}`} className="block break-inside-avoid group">
              <div className="rounded-xl overflow-hidden border border-border transition-shadow hover:shadow-lg">
                {g.coverImage && <img src={g.coverImage} alt={g.title} className="w-full object-cover" />}
                <div className="p-3">
                  <h3 className="font-medium group-hover:text-primary transition-colors">{g.title}</h3>
                  {g.description && <p className="text-xs text-muted-foreground mt-1 line-clamp-1">{g.description}</p>}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}
