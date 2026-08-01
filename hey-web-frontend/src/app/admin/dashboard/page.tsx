"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { api } from "@/lib/api";

interface DashboardOverview {
  articleCount: number;
  publishedCount: number;
  draftCount: number;
  categoryCount: number;
  tagCount: number;
}

export default function DashboardPage() {
  const router = useRouter();
  const [overview, setOverview] = useState<DashboardOverview | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      router.push("/admin/login");
      return;
    }
    loadOverview();
  }, []);

  const loadOverview = async () => {
    try {
      const data = await api.get<DashboardOverview>("/admin/dashboard/overview");
      setOverview(data);
    } catch {
      // handle error
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    router.push("/admin/login");
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-muted-foreground">加载中...</p>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-64 border-r border-border bg-card p-6 space-y-6">
        <div>
          <Link href="/admin/dashboard" className="text-xl font-bold">
            何以晴
          </Link>
          <p className="text-xs text-muted-foreground">管理后台</p>
        </div>
        <nav className="space-y-2">
          <Link
            href="/admin/dashboard"
            className="block rounded-md bg-accent px-3 py-2 text-sm font-medium"
          >
            仪表盘
          </Link>
          <Link
            href="/admin/articles"
            className="block rounded-md px-3 py-2 text-sm text-muted-foreground hover:bg-accent"
          >
            文章管理
          </Link>
          <Link
            href="/admin/categories"
            className="block rounded-md px-3 py-2 text-sm text-muted-foreground hover:bg-accent"
          >
            分类管理
          </Link>
          <Link
            href="/admin/tags"
            className="block rounded-md px-3 py-2 text-sm text-muted-foreground hover:bg-accent"
          >
            标签管理
          </Link>
        </nav>
        <button
          onClick={handleLogout}
          className="text-sm text-muted-foreground hover:text-foreground"
        >
          退出登录
        </button>
      </aside>

      {/* Main */}
      <main className="flex-1 p-8">
        <h1 className="text-2xl font-bold mb-8">仪表盘</h1>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <StatCard label="文章总数" value={overview?.articleCount ?? 0} />
          <StatCard label="已发布" value={overview?.publishedCount ?? 0} />
          <StatCard label="草稿" value={overview?.draftCount ?? 0} />
          <StatCard label="分类数" value={overview?.categoryCount ?? 0} />
        </div>

        <div className="mt-8 grid gap-4">
          <QuickLink
            href="/admin/articles/new"
            title="写文章"
            desc="创建一篇新文章"
          />
          <QuickLink
            href="/admin/articles"
            title="管理文章"
            desc="编辑或删除已有文章"
          />
          <QuickLink
            href="/admin/categories"
            title="管理分类"
            desc="组织文章分类结构"
          />
          <QuickLink
            href="/admin/tags"
            title="管理标签"
            desc="管理文章标签"
          />
        </div>
      </main>
    </div>
  );
}

function StatCard({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-xl border border-border bg-card p-4">
      <p className="text-sm text-muted-foreground">{label}</p>
      <p className="text-3xl font-bold mt-1">{value}</p>
    </div>
  );
}

function QuickLink({
  href,
  title,
  desc,
}: {
  href: string;
  title: string;
  desc: string;
}) {
  return (
    <Link
      href={href}
      className="block rounded-lg border border-border p-4 transition-colors hover:bg-accent"
    >
      <h3 className="font-medium">{title}</h3>
      <p className="text-sm text-muted-foreground mt-1">{desc}</p>
    </Link>
  );
}
