"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { api } from "@/lib/api";

interface FriendLink { id: number; name: string; url: string; description: string; logo: string; }

export default function FriendsPage() {
  const [links, setLinks] = useState<FriendLink[]>([]);

  useEffect(() => {
    api.get<FriendLink[]>("/public/friend-links").then(setLinks).catch(() => {});
  }, []);

  return (
    <div className="flex flex-col flex-1">
      <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-sm">
        <div className="max-w-3xl mx-auto flex items-center justify-between px-4 h-14">
          <Link href="/" className="font-bold text-lg">何以晴</Link>
          <Link href="/about" className="text-sm text-muted-foreground hover:text-foreground">关于</Link>
        </div>
      </header>
      <main className="flex-1 max-w-3xl mx-auto w-full px-4 py-12">
        <h1 className="text-3xl font-bold mb-8">友情链接</h1>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {links.map((l) => (
            <a key={l.id} href={l.url} target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-3 p-4 rounded-xl border border-border transition-colors hover:bg-accent">
              {l.logo && <img src={l.logo} alt={l.name} className="w-10 h-10 rounded-full object-cover" />}
              <div>
                <p className="font-medium text-sm">{l.name}</p>
                {l.description && <p className="text-xs text-muted-foreground line-clamp-1">{l.description}</p>}
              </div>
            </a>
          ))}
        </div>
      </main>
    </div>
  );
}
