"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { api } from "@/lib/api";
import { Breadcrumb } from "@/components/common/breadcrumb";
interface Diary { id: number; title: string; content: string; mood: string; weather: string; diaryDate: string; createTime: string; }

const moodMap: Record<string, string> = {
  HAPPY: '😊 开心', EXCITED: '🤩 兴奋', GRATEFUL: '🙏 感恩', LOVED: '🥰 被爱', HOPEFUL: '🌟 期待',
  PROUD: '🦁 自豪', CONTENT: '☺️ 满足', PEACEFUL: '🧘 平和', RELIEF: '😌 释然', CURIOUS: '🤔 好奇',
  DETERMINED: '💪 坚定', PLAYFUL: '😜 调皮', AWED: '😲 惊叹', CREATIVE: '🎨 灵感',
  NEUTRAL: '😐 平静', NOSTALGIC: '🥺 怀旧', MELANCHOLY: '🍂 惆怅', LONELY: '🫥 孤独',
  RESTLESS: '🫨 不安', ANXIOUS: '😰 焦虑', OVERWHELMED: '😩 崩溃', TIRED: '😴 疲惫',
  BORED: '🥱 无聊', CONFUSED: '😵 困惑', GUILTY: '😞 内疚', JEALOUS: '😒 嫉妒',
  INSECURE: '🫣 不安', SAD: '😢 悲伤', ANGRY: '😡 生气', FRUSTRATED: '😤 烦躁',
};
const weatherMap: Record<string, string> = {
  SUNNY: '☀️ 晴', CLEAR: '🌙 晴朗夜空', PARTLY_CLOUDY: '🌤️ 少云', CLOUDY: '⛅ 多云',
  OVERCAST: '☁️ 阴天', RAINY: '🌧️ 雨', DRIZZLE: '🌦️ 小雨', SHOWER: '🌧️ 阵雨',
  HEAVY_RAIN: '🌊 大雨', THUNDERSTORM: '⚡ 雷雨', LIGHTNING: '🌩️ 闪电',
  STORMY: '⛈️ 暴风雨', TYPHOON: '🌀 台风', SNOWY: '❄️ 雪', LIGHT_SNOW: '🌨️ 小雪',
  BLIZZARD: '❄️ 暴风雪', SLEET: '🌨️ 雨夹雪', HAIL: '🧊 冰雹', WINDY: '💨 大风',
  BREEZY: '🍃 微风', FOGGY: '🌫️ 雾', HAZY: '🌁 霾', SANDSTORM: '🏜️ 沙尘暴',
  HOT: '🥵 酷热', WARM: '🌡️ 温暖', COLD: '🥶 寒冷', FREEZING: '🧊 冰冻',
  MILD: '🌸 温和', HUMID: '💧 潮湿', RAINBOW: '🌈 彩虹',
};

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
        <Breadcrumb items={[{ label: "日记" }]} />
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
                {d.mood && <span>{moodMap[d.mood] || d.mood}</span>}
                {d.weather && <span>{weatherMap[d.weather] || d.weather}</span>}
              </div>
            </article>
          ))}
        </div>
      </main>
    </div>
  );
}
