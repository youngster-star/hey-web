"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { api } from "@/lib/api";
import { Breadcrumb } from "@/components/common/breadcrumb";
import { SiteHeader } from "@/components/layout/site-header";
import { Lens } from "@/components/ui/lens";
import { PixelImage } from "@/components/ui/pixel-image";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

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
      <SiteHeader activeNav="相册" />
      <main className="flex-1 max-w-6xl mx-auto w-full px-4 py-12">
        <Breadcrumb items={[{ label: "相册" }]} />
        <h1 className="text-3xl font-bold mb-8">相册</h1>
        <div className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
          {groups.map((g) => (
            <Link key={g.id} href={`/gallery/${g.slug}`} className="block break-inside-avoid group">
              <Card className="relative border-border shadow-none overflow-hidden">
                <CardHeader className="p-0">
                  {g.coverImage && (
                    <Lens zoomFactor={2} lensSize={150} isStatic={false} ariaLabel="Zoom Area">
                      <PixelImage
                        src={g.coverImage}
                        grid="6x4"
                        grayscaleAnimation
                        pixelFadeInDuration={800}
                        maxAnimationDelay={600}
                      />
                    </Lens>
                  )}
                </CardHeader>
                <CardContent className="p-3">
                  <CardTitle className="text-base group-hover:text-primary transition-colors">{g.title}</CardTitle>
                  {g.description && (
                    <CardDescription className="text-xs mt-1 line-clamp-1">{g.description}</CardDescription>
                  )}
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}
