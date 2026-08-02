"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { api } from "@/lib/api";
import { Breadcrumb } from "@/components/common/breadcrumb";
import { Eye, Clock, Music, ArrowLeft } from "lucide-react";
import { LikeButton } from "@/components/common/like-button";

interface Audio {
  id: number;
  title: string;
  slug: string;
  artist: string;
  album: string;
  coverImage: string;
  url: string;
  lyricId: number;
  duration: string;
  clickCount: number;
  likeCount: number;
  category: { id: number; name: string } | null;
  createTime: string;
}

interface Lyric {
  id: number;
  title: string;
  artist: string;
  content: string;
}

export default function AudioDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  const [audio, setAudio] = useState<Audio | null>(null);
  const [lyric, setLyric] = useState<Lyric | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get<Audio>(`/public/audio/${slug}`)
      .then((a) => {
        setAudio(a);
        if (a.lyricId) {
          api.get<Lyric>(`/public/audio/lyric/${a.lyricId}`).then(setLyric).catch(() => {});
        }
      })
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) return <main className="flex-1 max-w-2xl mx-auto w-full px-4 py-12"><p className="text-muted-foreground">加载中...</p></main>;
  if (!audio) return <main className="flex-1 max-w-2xl mx-auto w-full px-4 py-12 text-center"><p className="text-muted-foreground mb-4">音乐不存在或已隐藏</p><Link href="/audio" className="text-primary text-sm">← 返回音乐列表</Link></main>;

  return (
    <div className="flex flex-col flex-1">
      <main className="flex-1 max-w-2xl mx-auto w-full px-4 py-12">
        <Breadcrumb items={[{ label: "音乐", href: "/audio" }, { label: audio.title }]} />

        <div className="flex gap-6 mb-8 items-start">
          {/* Album art */}
          <div className="w-48 h-48 rounded-2xl bg-muted overflow-hidden shrink-0 shadow-lg">
            {audio.coverImage ? (
              <img src={audio.coverImage} alt={audio.album ?? audio.title} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <Music className="size-12 text-muted-foreground/40" />
              </div>
            )}
          </div>

          <div className="flex-1 min-w-0">
            <h1 className="text-2xl font-bold mb-1">{audio.title}</h1>
            {audio.artist && <p className="text-muted-foreground mb-1">{audio.artist}</p>}
            {audio.album && <p className="text-sm text-muted-foreground/70 mb-3">专辑：{audio.album}</p>}
            <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
              {audio.duration && <span className="flex items-center gap-1"><Clock className="size-3.5" /> {audio.duration}</span>}
              <span className="flex items-center gap-1"><Eye className="size-3.5" /> {audio.clickCount}</span>
              <LikeButton targetType="audio" targetId={audio.id} />
            </div>

            {/* Audio player */}
            <audio controls src={audio.url} className="mt-4 w-full" />
          </div>
        </div>

        {/* Lyrics */}
        {lyric && (
          <div className="rounded-xl border border-border p-6 bg-muted/30">
            <h2 className="text-sm font-medium mb-4">歌词</h2>
            <div className="space-y-1 text-sm text-muted-foreground leading-relaxed max-h-96 overflow-y-auto">
              {parseLrc(lyric.content).map((line, i) => (
                <p key={i} className="hover:text-foreground transition-colors">{line.text}</p>
              ))}
            </div>
          </div>
        )}

        <div className="mt-8">
          <Link href="/audio" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="size-4" /> 返回音乐列表
          </Link>
        </div>
      </main>
    </div>
  );
}

/** 简单 LRC 解析：提取每行文本 */
function parseLrc(lrc: string): { time: number; text: string }[] {
  return lrc.split("\n")
    .map((line) => {
      const match = line.match(/^\[(\d{2}):(\d{2})(?:[.:](\d{2,3}))?\](.*)/);
      if (match) {
        const min = parseInt(match[1], 10);
        const sec = parseInt(match[2], 10);
        const ms = match[3] ? parseInt(match[3].padEnd(3, "0"), 10) : 0;
        return { time: min * 60 + sec + ms / 1000, text: match[4].trim() || "..." };
      }
      return null;
    })
    .filter(Boolean) as { time: number; text: string }[];
}
