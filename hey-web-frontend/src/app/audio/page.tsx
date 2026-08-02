"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { api } from "@/lib/api";
import { Breadcrumb } from "@/components/common/breadcrumb";
interface Audio {
  id: number; title: string; slug: string; artist: string;
  album: string; coverImage: string; duration: string; url: string;
  clickCount: number; likeCount: number;
}

export default function AudioPage() {
  const [audios, setAudios] = useState<Audio[]>([]);
  const [current, setCurrent] = useState<Audio | null>(null);

  useEffect(() => {
    api.get<Audio[]>("/public/audio").then(setAudios).catch(() => {});
  }, []);

  return (
    <div className="flex flex-col flex-1">
      <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto flex items-center justify-between px-4 h-14">
          <Link href="/" className="font-bold text-lg">何以晴</Link>
          <nav className="flex items-center gap-6 text-sm">
            <Link href="/articles" className="text-muted-foreground hover:text-foreground">文章</Link>
            <Link href="/videos" className="text-muted-foreground hover:text-foreground">视频</Link>
            <Link href="/gallery" className="text-muted-foreground hover:text-foreground">相册</Link>
            <Link href="/audio" className="font-medium">音乐</Link>
            <Link href="/about" className="text-muted-foreground hover:text-foreground">关于</Link>
          </nav>
        </div>
      </header>
      <main className="flex-1 max-w-4xl mx-auto w-full px-4 py-12">
        <Breadcrumb items={[{ label: "音乐" }]} />
        <h1 className="text-3xl font-bold mb-8">音乐</h1>
        <div className="space-y-2">
          {audios.map((a) => (
            <div key={a.id}
              onClick={() => setCurrent(a)}
              className={`flex items-center gap-4 p-3 rounded-lg cursor-pointer transition-colors hover:bg-accent ${current?.id === a.id ? 'bg-accent' : ''}`}
            >
              <div className="w-12 h-12 rounded-md bg-accent overflow-hidden flex-shrink-0">
                {a.coverImage && <img src={a.coverImage} alt={a.title} className="w-full h-full object-cover" />}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium truncate">{a.title}</p>
                <p className="text-sm text-muted-foreground truncate">{a.artist}{a.album ? ` · ${a.album}` : ''}</p>
              </div>
              {a.duration && <span className="text-sm text-muted-foreground">{a.duration}</span>}
            </div>
          ))}
        </div>
      </main>
      {/* Mini Player */}
      {current && (
        <div className="fixed bottom-0 left-0 right-0 border-t border-border bg-card/95 backdrop-blur-sm p-4">
          <div className="max-w-4xl mx-auto flex items-center gap-4">
            <div className="w-16 h-16 rounded-lg overflow-hidden">
              {current.coverImage && <img src={current.coverImage} alt={current.title} className="w-full h-full object-cover" />}
            </div>
            <div className="flex-1">
              <p className="font-semibold">{current.title}</p>
              <p className="text-sm text-muted-foreground">{current.artist}</p>
            </div>
            <audio controls autoPlay className="max-w-md">
              <source src={current.url} type="audio/mpeg" />
            </audio>
          </div>
        </div>
      )}
    </div>
  );
}
