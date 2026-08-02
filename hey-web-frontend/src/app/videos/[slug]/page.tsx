"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { api } from "@/lib/api";
import { Breadcrumb } from "@/components/common/breadcrumb";
import { Eye, Clock, ArrowLeft } from "lucide-react";
import { LikeButton } from "@/components/common/like-button";

interface Video {
  id: number;
  title: string;
  slug: string;
  summary: string;
  coverImage: string;
  url: string;
  source: string;
  duration: string;
  clickCount: number;
  likeCount: number;
  category: { id: number; name: string } | null;
  createTime: string;
}

const SOURCE_MAP: Record<string, string> = { BILIBILI: "哔哩哔哩", YOUTUBE: "YouTube", SELF: "自托管", EMBED: "嵌入" };

export default function VideoDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  const [video, setVideo] = useState<Video | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get<Video>(`/public/videos/${slug}`)
      .then(setVideo)
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) return <main className="flex-1 max-w-4xl mx-auto w-full px-4 py-12"><p className="text-muted-foreground">加载中...</p></main>;
  if (!video) return <main className="flex-1 max-w-4xl mx-auto w-full px-4 py-12 text-center"><p className="text-muted-foreground mb-4">视频不存在或已隐藏</p><Link href="/videos" className="text-primary text-sm">← 返回视频列表</Link></main>;

  return (
    <div className="flex flex-col flex-1">
      <main className="flex-1 max-w-4xl mx-auto w-full px-4 py-12">
        <Breadcrumb items={[{ label: "视频", href: "/videos" }, { label: video.title }]} />

        <h1 className="text-2xl md:text-3xl font-bold mb-4">{video.title}</h1>
        <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-6">
          <span className="flex items-center gap-1"><Eye className="size-3.5" /> {video.clickCount} 播放</span>
          <LikeButton targetType="video" targetId={video.id} />
          {video.duration && <span className="flex items-center gap-1"><Clock className="size-3.5" /> {video.duration}</span>}
          <span>{SOURCE_MAP[video.source] ?? video.source}</span>
        </div>

        {/* Video player */}
        <div className="rounded-xl overflow-hidden bg-black mb-6 aspect-video flex items-center justify-center">
          {video.source === "BILIBILI" ? (
            <iframe src={video.url} className="w-full h-full" allowFullScreen title={video.title} />
          ) : video.source === "YOUTUBE" ? (
            <iframe src={video.url} className="w-full h-full" allowFullScreen title={video.title} />
          ) : video.source === "SELF" ? (
            <video src={video.url} controls className="w-full h-full" />
          ) : (
            <iframe src={video.url} className="w-full h-full" allowFullScreen title={video.title} />
          )}
        </div>

        {video.summary && <p className="text-muted-foreground mb-8">{video.summary}</p>}

        <Link href="/videos" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors">
          <ArrowLeft className="size-4" /> 返回视频列表
        </Link>
      </main>
    </div>
  );
}
