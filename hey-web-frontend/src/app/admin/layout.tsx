"use client";

import { useEffect, useState, useMemo } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";

const navItems = [
  { href: "/admin/dashboard", label: "仪表盘" },
  { href: "/admin/articles", label: "文章管理" },
  { href: "/admin/videos", label: "视频管理" },
  { href: "/admin/gallery", label: "相册管理" },
  { href: "/admin/audio", label: "音乐管理" },
  { href: "/admin/novels", label: "小说管理" },
  { href: "/admin/diary", label: "日记管理" },
  { href: "/admin/memos", label: "备忘录" },
  { href: "/admin/moments", label: "说说管理" },
  { href: "/admin/friends", label: "友链管理" },
  { href: "/admin/categories", label: "分类管理" },
  { href: "/admin/tags", label: "标签管理" },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // 登录页不需要检查
    if (pathname === "/admin/login") return;
    const token = localStorage.getItem("accessToken");
    if (!token) {
      router.push("/admin/login");
    }
  }, [pathname, router]);

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    router.push("/admin/login");
  };

  // 自动生成面包屑（必须在所有条件 return 之前调用）
  const labelMap: Record<string, string> = {
    admin: "管理后台",
    dashboard: "仪表盘",
    articles: "文章管理",
    new: "新建",
    videos: "视频管理",
    gallery: "相册管理",
    audio: "音乐管理",
    novels: "小说管理",
    diary: "日记管理",
    memos: "备忘录",
    moments: "说说管理",
    friends: "友链管理",
    categories: "分类管理",
    tags: "标签管理",
    statistics: "访问统计",
  };
  const breadcrumbs = useMemo(() => {
    const segments = pathname.split("/").filter(Boolean);
    const crumbs: { label: string; href?: string }[] = [];
    let accumulated = "";
    for (const seg of segments) {
      accumulated += "/" + seg;
      const label = labelMap[seg] ?? seg;
      if (seg === "admin") {
        crumbs.push({ label, href: "/admin/dashboard" });
      } else if (seg === segments[segments.length - 1]) {
        crumbs.push({ label });
      } else {
        crumbs.push({ label, href: accumulated });
      }
    }
    return crumbs;
  }, [pathname]);

  // 登录页不显示侧边栏
  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  // 避免 hydration 闪烁
  if (!mounted) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-muted-foreground">加载中...</p>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-56 border-r border-border bg-card p-4 space-y-6 shrink-0">
        <div>
          <Link href="/admin/dashboard" className="text-lg font-bold">
            何以晴
          </Link>
          <p className="text-xs text-muted-foreground">管理后台</p>
        </div>
        <nav className="space-y-0.5">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`block rounded-md px-3 py-2 text-sm transition-colors ${
                pathname === item.href || (item.href !== "/admin/dashboard" && pathname.startsWith(item.href))
                  ? "bg-accent font-medium"
                  : "text-muted-foreground hover:bg-accent"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <button
          onClick={handleLogout}
          className="text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          退出登录
        </button>
      </aside>

      {/* Main */}
      <main className="flex-1 p-8 min-w-0">
        {/* Breadcrumb */}
        <nav aria-label="面包屑" className="mb-6">
          <ol className="flex items-center gap-1.5 text-sm text-muted-foreground flex-wrap">
            <li>
              <Link href="/" className="hover:text-foreground transition-colors inline-flex items-center gap-1">
                <Home className="size-3.5" />
              </Link>
            </li>
            {breadcrumbs.map((crumb, i) => (
              <li key={i} className="flex items-center gap-1.5">
                <ChevronRight className="size-3.5 shrink-0" />
                {crumb.href ? (
                  <Link href={crumb.href} className="hover:text-foreground transition-colors truncate max-w-[200px]">
                    {crumb.label}
                  </Link>
                ) : (
                  <span className="text-foreground font-medium truncate max-w-[200px]">{crumb.label}</span>
                )}
              </li>
            ))}
          </ol>
        </nav>
        {children}
      </main>
    </div>
  );
}
