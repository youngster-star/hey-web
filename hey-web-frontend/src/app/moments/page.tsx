"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { api } from "@/lib/api";
import { Breadcrumb } from "@/components/common/breadcrumb";
import { LikeButton } from "@/components/common/like-button";
interface Moment {
  id: number; content: string; images: string;
  clickCount: number; likeCount: number; createTime: string;
}

export default function MomentsPage() {
  const [moments, setMoments] = useState<Moment[]>([]);

  useEffect(() => {
    api.get<Moment[]>("/public/moments").then(setMoments).catch(() => {});
  }, []);

  return (
    <div className="flex flex-col flex-1">
      <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-sm">
        <div className="max-w-2xl mx-auto flex items-center justify-between px-4 h-14">
          <Link href="/" className="font-bold text-lg">何以晴</Link>
          <nav className="flex items-center gap-6 text-sm">
            <Link href="/articles" className="text-muted-foreground hover:text-foreground">文章</Link>
            <Link href="/moments" className="font-medium">说说</Link>
            <Link href="/about" className="text-muted-foreground hover:text-foreground">关于</Link>
          </nav>
        </div>
      </header>
      <main className="flex-1 max-w-2xl mx-auto w-full px-4 py-12">
        <Breadcrumb items={[{ label: "说说" }]} />
        <h1 className="text-3xl font-bold mb-8">说说</h1>
        <div className="space-y-6">
          {moments.map((m) => {
            const imgList: string[] = m.images ? JSON.parse(m.images) : [];
            return (
              <article key={m.id} className="p-4 rounded-xl border border-border">
                <p className="whitespace-pre-wrap">{m.content}</p>
                {imgList.length > 0 && (
                  <div className="grid grid-cols-3 gap-2 mt-3">
                    {imgList.map((img, i) => (
                      <img key={i} src={img} alt="" className="rounded-lg object-cover aspect-square" />
                    ))}
                  </div>
                )}
                <div className="flex items-center gap-3 mt-3 text-xs text-muted-foreground">
                  <time>{new Date(m.createTime).toLocaleDateString("zh-CN")}</time>
                  <LikeButton targetType="moment" targetId={m.id} />
                </div>
              </article>
            );
          })}
        </div>
      </main>
    </div>
  );
}
