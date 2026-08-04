"use client";

import Link from "next/link";
import { useTheme } from "next-themes";
import { AnimatedThemeToggler } from "@/components/ui/animated-theme-toggler";

interface SiteHeaderProps {
  activeNav?: string;
}

const NAV_ITEMS = [
  { label: "文章", href: "/articles" },
  { label: "视频", href: "/videos" },
  { label: "相册", href: "/gallery" },
  { label: "音频", href: "/audio" },
  { label: "小说", href: "/novels" },
  { label: "说说", href: "/moments" },
  { label: "关于", href: "/about" },
];

export function SiteHeader({ activeNav }: SiteHeaderProps) {
  const { theme, setTheme, resolvedTheme } = useTheme();

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-sm">
      <div className="max-w-6xl mx-auto flex items-center justify-between px-4 h-14">
        <div className="flex items-center gap-6">
          <Link href="/" className="font-bold text-lg shrink-0">
            何以晴
          </Link>
          <nav className="hidden md:flex items-center gap-1">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`px-2 py-1 text-sm rounded-md transition-colors ${
                  activeNav === item.label
                    ? "font-medium text-foreground bg-accent"
                    : "text-muted-foreground hover:text-foreground hover:bg-accent/50"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
        <div className="flex items-center gap-2">
          <AnimatedThemeToggler
            theme={resolvedTheme as "light" | "dark"}
            onThemeChange={(t) => setTheme(t)}
          />
        </div>
      </div>
    </header>
  );
}
