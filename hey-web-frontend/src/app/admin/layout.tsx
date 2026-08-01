"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";

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
      <main className="flex-1 p-8 min-w-0">{children}</main>
    </div>
  );
}
