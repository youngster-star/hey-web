"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { api } from "@/lib/api";
import { Breadcrumb } from "@/components/common/breadcrumb";
import { Eye, ArrowLeft } from "lucide-react";
import { LikeButton } from "@/components/common/like-button";

interface ImageGroup {
  id: number;
  title: string;
  slug: string;
  description: string;
  coverImage: string;
  clickCount: number;
  likeCount: number;
  createTime: string;
}

interface Image {
  id: number;
  url: string;
  thumbnailUrl: string;
  altText: string;
}

export default function GalleryDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  const [group, setGroup] = useState<ImageGroup | null>(null);
  const [images, setImages] = useState<Image[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<Image | null>(null);

  useEffect(() => {
    api.get<ImageGroup>(`/public/gallery/${slug}`)
      .then((g) => {
        setGroup(g);
        return api.get<Image[]>(`/public/gallery/${g.id}/images`);
      })
      .then(setImages)
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) return <main className="flex-1 max-w-6xl mx-auto w-full px-4 py-12"><p className="text-muted-foreground">加载中...</p></main>;
  if (!group) return <main className="flex-1 max-w-6xl mx-auto w-full px-4 py-12 text-center"><p className="text-muted-foreground mb-4">图集不存在或已隐藏</p><Link href="/gallery" className="text-primary text-sm">← 返回相册</Link></main>;

  return (
    <div className="flex flex-col flex-1">
      <main className="flex-1 max-w-6xl mx-auto w-full px-4 py-12">
        <Breadcrumb items={[{ label: "相册", href: "/gallery" }, { label: group.title }]} />

        <h1 className="text-2xl md:text-3xl font-bold mb-2">{group.title}</h1>
        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-6">
          <span className="flex items-center gap-1"><Eye className="size-3.5" /> {group.clickCount} 浏览</span>
          <LikeButton targetType="image-group" targetId={group.id} />
          <span>{images.length} 张图片</span>
        </div>
        {group.description && <p className="text-muted-foreground mb-8">{group.description}</p>}

        {/* Image grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {images.map((img) => (
            <button
              key={img.id}
              onClick={() => setSelected(img)}
              className="aspect-square rounded-lg overflow-hidden bg-muted hover:opacity-90 transition-opacity"
            >
              <img
                src={img.thumbnailUrl || img.url}
                alt={img.altText ?? group.title}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </button>
          ))}
        </div>
        {images.length === 0 && <p className="text-muted-foreground text-center py-12">暂无图片</p>}

        {/* Lightbox */}
        {selected && (
          <div
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
            onClick={() => setSelected(null)}
          >
            <button className="absolute top-4 right-4 text-white text-sm px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20">
              关闭 ✕
            </button>
            <img
              src={selected.url}
              alt={selected.altText ?? group.title}
              className="max-w-full max-h-[90vh] object-contain rounded-lg"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        )}

        <div className="mt-8">
          <Link href="/gallery" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="size-4" /> 返回相册列表
          </Link>
        </div>
      </main>
    </div>
  );
}
