"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { api } from "@/lib/api";

interface DashboardOverview {
  articleCount: number;
  publishedCount: number;
  draftCount: number;
  categoryCount: number;
  tagCount: number;
}

const quickLinks = [
  { href: "/admin/articles/new", title: "写文章", desc: "创建一篇新文章" },
  { href: "/admin/articles", title: "管理文章", desc: "编辑或删除已有文章" },
  { href: "/admin/categories", title: "管理分类", desc: "组织文章分类结构" },
  { href: "/admin/tags", title: "管理标签", desc: "管理文章标签" },
  { href: "/admin/videos", title: "视频管理", desc: "管理视频内容" },
  { href: "/admin/gallery", title: "相册管理", desc: "管理图片和图集" },
];

export default function DashboardPage() {
  const [overview, setOverview] = useState<DashboardOverview | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get<DashboardOverview>("/admin/dashboard/overview")
      .then(setOverview)
      .catch(() => setOverview({ articleCount: 0, publishedCount: 0, draftCount: 0, categoryCount: 0, tagCount: 0 }))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <p className="text-muted-foreground">加载中...</p>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-8">仪表盘</h1>

      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
        <StatCard label="文章总数" value={overview?.articleCount ?? 0} />
        <StatCard label="已发布" value={overview?.publishedCount ?? 0} />
        <StatCard label="草稿" value={overview?.draftCount ?? 0} />
        <StatCard label="分类数" value={overview?.categoryCount ?? 0} />
        <StatCard label="标签数" value={overview?.tagCount ?? 0} />
      </div>

      <h2 className="text-lg font-semibold mb-4">快捷入口</h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
        {quickLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="group rounded-xl border border-border p-4 transition-all hover:bg-accent hover:shadow-sm"
          >
            <h3 className="font-medium group-hover:text-primary transition-colors">{link.title}</h3>
            <p className="text-sm text-muted-foreground mt-1">{link.desc}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}

function StatCard({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-xl border border-border bg-card p-4 text-center">
      <p className="text-3xl font-bold">{value}</p>
      <p className="text-sm text-muted-foreground mt-1">{label}</p>
    </div>
  );
}
