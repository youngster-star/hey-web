"use client";

import { useEffect, useState } from "react";
import { api, PageResult } from "@/lib/api";

interface Diary {
  id: number;
  title: string;
  mood: string;
  weather: string;
  encrypted: boolean;
  diaryDate: string;
  createTime: string;
}

const MOOD_MAP: Record<string, string> = { HAPPY: "😊 开心", SAD: "😢 悲伤", NEUTRAL: "😐 平静", EXCITED: "🤩 兴奋", ANGRY: "😡 生气" };
const WEATHER_MAP: Record<string, string> = { SUNNY: "☀️ 晴", CLOUDY: "⛅ 多云", RAINY: "🌧️ 雨", SNOWY: "❄️ 雪", WINDY: "💨 风" };

export default function AdminDiaryPage() {
  const [data, setData] = useState<PageResult<Diary> | null>(null);
  const [loading, setLoading] = useState(true);

  const load = async (page = 1) => {
    setLoading(true);
    const result = await api.get<PageResult<Diary>>(`/admin/diary?page=${page}&pageSize=10`);
    setData(result);
    setLoading(false);
  };

  const handleDelete = async (id: number) => {
    if (!confirm("确定删除此日记？")) return;
    await api.del(`/admin/diary/${id}`);
    load();
  };

  useEffect(() => { load(); }, []);

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">日记管理</h1>
        <button className="rounded-lg bg-primary px-4 py-2 text-sm text-primary-foreground">新建日记</button>
      </div>
      {loading ? <p className="text-muted-foreground">加载中...</p> : (
        <div className="rounded-xl border border-border overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-muted">
              <tr>
                <th className="px-4 py-3 text-left font-medium">标题</th>
                <th className="px-4 py-3 text-left font-medium">日期</th>
                <th className="px-4 py-3 text-left font-medium">心情</th>
                <th className="px-4 py-3 text-left font-medium">天气</th>
                <th className="px-4 py-3 text-left font-medium">加密</th>
                <th className="px-4 py-3 text-left font-medium">创建时间</th>
                <th className="px-4 py-3 text-left font-medium">操作</th>
              </tr>
            </thead>
            <tbody>
              {data?.records?.map((d) => (
                <tr key={d.id} className="border-t border-border">
                  <td className="px-4 py-3 font-medium">{d.title}</td>
                  <td className="px-4 py-3">{d.diaryDate}</td>
                  <td className="px-4 py-3">{MOOD_MAP[d.mood] ?? d.mood ?? "-"}</td>
                  <td className="px-4 py-3">{WEATHER_MAP[d.weather] ?? d.weather ?? "-"}</td>
                  <td className="px-4 py-3">{d.encrypted ? "🔒" : "🌐"}</td>
                  <td className="px-4 py-3 text-muted-foreground">{d.createTime?.slice(0, 10)}</td>
                  <td className="px-4 py-3">
                    <button onClick={() => handleDelete(d.id)} className="text-red-500 text-xs">删除</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
