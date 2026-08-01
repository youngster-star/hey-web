"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { api } from "@/lib/api";

interface Diary { id: number; title: string; content: string; mood: string; weather: string; diaryDate: string; createTime: string; }

const moodMap: Record<string, string> = { HAPPY: '😊', SAD: '😢', NEUTRAL: '😐', EXCITED: '🎉' };
const weatherMap: Record<string, string> = { SUNNY: '☀️', CLOUDY: '☁️', RAINY: '🌧️' };

export default function DiaryPage() {
  const [diaries, setDiaries] = useState<Diary[]>([]);

  useEffect(() => {
    api.get<Diary[]>("/public/diary").then(setDiaries).catch(() => {});
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
        <h1 className="text-3xl font-bold mb-8">日记</h1>
        <div className="space-y-4">
          {diaries.map((d) => (
            <article key={d.id} className="p-4 rounded-xl border border-border">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold">{d.title}</h3>
                <time className="text-sm text-muted-foreground">{d.diaryDate}</time>
              </div>
              {d.content && <p className="text-sm text-muted-foreground mt-2 line-clamp-3">{d.content}</p>}
              <div className="flex gap-3 mt-2 text-sm">
                {d.mood && <span>{moodMap[d.mood] || d.mood} {d.mood}</span>}
                {d.weather && <span>{weatherMap[d.weather] || d.weather} {d.weather}</span>}
              </div>
            </article>
          ))}
        </div>
      </main>
    </div>
  );
}
