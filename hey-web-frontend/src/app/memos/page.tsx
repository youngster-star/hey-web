"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { api } from "@/lib/api";
import { Breadcrumb } from "@/components/common/breadcrumb";
interface Memo { id: number; title: string; content: string; completed: boolean; }

export default function MemosPage() {
  const [memos, setMemos] = useState<Memo[]>([]);

  useEffect(() => {
    api.get<Memo[]>("/public/memos").then(setMemos).catch(() => {});
  }, []);

  return (
    <div className="flex flex-col flex-1">
      <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-sm">
        <div className="max-w-2xl mx-auto flex items-center justify-between px-4 h-14">
          <Link href="/" className="font-bold text-lg">何以晴</Link>
          <Link href="/about" className="text-sm text-muted-foreground hover:text-foreground">关于</Link>
        </div>
      </header>
      <main className="flex-1 max-w-2xl mx-auto w-full px-4 py-12">
        <Breadcrumb items={[{ label: "备忘录" }]} />
        <h1 className="text-3xl font-bold mb-8">备忘录</h1>
        <div className="space-y-3">
          {memos.map((m) => (
            <div key={m.id} className={`p-4 rounded-xl border border-border ${m.completed ? 'opacity-50' : ''}`}>
              <div className="flex items-center gap-3">
                <span className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${m.completed ? 'bg-primary border-primary' : 'border-muted-foreground'}`}>
                  {m.completed && <span className="text-white text-xs">✓</span>}
                </span>
                <div>
                  <h3 className={`font-medium ${m.completed ? 'line-through' : ''}`}>{m.title}</h3>
                  {m.content && <p className="text-sm text-muted-foreground mt-1">{m.content}</p>}
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
