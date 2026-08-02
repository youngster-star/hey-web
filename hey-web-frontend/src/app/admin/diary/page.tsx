"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api";

interface Diary {
  id: number;
  title: string;
  mood: string;
  weather: string;
  encrypted: boolean;
  diaryDate: string;
}

const MOODS = [
  { value: "HAPPY", label: "😊 开心" },
  { value: "EXCITED", label: "🤩 兴奋" },
  { value: "GRATEFUL", label: "🙏 感恩" },
  { value: "LOVED", label: "🥰 被爱" },
  { value: "HOPEFUL", label: "🌟 期待" },
  { value: "PROUD", label: "🦁 自豪" },
  { value: "CONTENT", label: "☺️ 满足" },
  { value: "PEACEFUL", label: "🧘 平和" },
  { value: "RELIEF", label: "😌 释然" },
  { value: "CURIOUS", label: "🤔 好奇" },
  { value: "DETERMINED", label: "💪 坚定" },
  { value: "PLAYFUL", label: "😜 调皮" },
  { value: "AWED", label: "😲 惊叹" },
  { value: "CREATIVE", label: "🎨 灵感" },
  { value: "NEUTRAL", label: "😐 平静" },
  { value: "NOSTALGIC", label: "🥺 怀旧" },
  { value: "MELANCHOLY", label: "🍂 惆怅" },
  { value: "LONELY", label: "🫥 孤独" },
  { value: "RESTLESS", label: "🫨 不安" },
  { value: "ANXIOUS", label: "😰 焦虑" },
  { value: "OVERWHELMED", label: "😩 崩溃" },
  { value: "TIRED", label: "😴 疲惫" },
  { value: "BORED", label: "🥱 无聊" },
  { value: "CONFUSED", label: "😵 困惑" },
  { value: "GUILTY", label: "😞 内疚" },
  { value: "JEALOUS", label: "😒 嫉妒" },
  { value: "INSECURE", label: "🫣 不安" },
  { value: "SAD", label: "😢 悲伤" },
  { value: "ANGRY", label: "😡 生气" },
  { value: "FRUSTRATED", label: "😤 烦躁" },
];
const WEATHERS = [
  { value: "SUNNY", label: "☀️ 晴" },
  { value: "CLEAR", label: "🌙 晴朗夜空" },
  { value: "PARTLY_CLOUDY", label: "🌤️ 少云" },
  { value: "CLOUDY", label: "⛅ 多云" },
  { value: "OVERCAST", label: "☁️ 阴天" },
  { value: "RAINY", label: "🌧️ 雨" },
  { value: "DRIZZLE", label: "🌦️ 小雨" },
  { value: "SHOWER", label: "🌧️ 阵雨" },
  { value: "HEAVY_RAIN", label: "🌊 大雨" },
  { value: "THUNDERSTORM", label: "⚡ 雷雨" },
  { value: "LIGHTNING", label: "🌩️ 闪电" },
  { value: "STORMY", label: "⛈️ 暴风雨" },
  { value: "TYPHOON", label: "🌀 台风" },
  { value: "SNOWY", label: "❄️ 雪" },
  { value: "LIGHT_SNOW", label: "🌨️ 小雪" },
  { value: "BLIZZARD", label: "❄️ 暴风雪" },
  { value: "SLEET", label: "🌨️ 雨夹雪" },
  { value: "HAIL", label: "🧊 冰雹" },
  { value: "WINDY", label: "💨 大风" },
  { value: "BREEZY", label: "🍃 微风" },
  { value: "FOGGY", label: "🌫️ 雾" },
  { value: "HAZY", label: "🌁 霾" },
  { value: "SANDSTORM", label: "🏜️ 沙尘暴" },
  { value: "HOT", label: "🥵 酷热" },
  { value: "WARM", label: "🌡️ 温暖" },
  { value: "COLD", label: "🥶 寒冷" },
  { value: "FREEZING", label: "🧊 冰冻" },
  { value: "MILD", label: "🌸 温和" },
  { value: "HUMID", label: "💧 潮湿" },
  { value: "RAINBOW", label: "🌈 彩虹" },
];

export default function AdminDiaryPage() {
  const [list, setList] = useState<Diary[]>([]);
  const [loading, setLoading] = useState(true);

  // Create form
  const [showCreate, setShowCreate] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newContent, setNewContent] = useState("");
  const [newMood, setNewMood] = useState("NEUTRAL");
  const [newWeather, setNewWeather] = useState("SUNNY");
  const [newEncrypted, setNewEncrypted] = useState(false);
  const [newDate, setNewDate] = useState(new Date().toISOString().slice(0, 10));
  const [saving, setSaving] = useState(false);

  const load = async () => {
    setLoading(true);
    const result = await api.get<Diary[]>("/admin/diary");
    setList(result);
    setLoading(false);
  };

  const handleCreate = async () => {
    if (!newTitle.trim()) return;
    setSaving(true);
    await api.post("/admin/diary", { title: newTitle, content: newContent, mood: newMood, weather: newWeather, encrypted: newEncrypted, diaryDate: newDate });
    setNewTitle(""); setNewContent(""); setNewEncrypted(false);
    setShowCreate(false);
    setSaving(false);
    load();
  };

  const handleToggleEncrypted = async (d: Diary) => {
    await api.put(`/admin/diary/${d.id}`, { ...d, encrypted: !d.encrypted });
    load();
  };

  const handleDelete = async (id: number) => {
    if (!confirm("确定删除此日记？")) return;
    await api.del(`/admin/diary/${id}`);
    load();
  };

  useEffect(() => { load(); }, []);

  const MOOD_MAP = Object.fromEntries(MOODS.map(m => [m.value, m.label]));
  const WEATHER_MAP = Object.fromEntries(WEATHERS.map(w => [w.value, w.label]));

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">日记管理</h1>
        <button onClick={() => setShowCreate(!showCreate)} className="rounded-lg bg-primary px-4 py-2 text-sm text-primary-foreground">
          {showCreate ? "取消" : "新建日记"}
        </button>
      </div>

      {showCreate && (
        <div className="mb-6 rounded-xl border border-border p-4 space-y-3 bg-muted/30">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <input value={newTitle} onChange={e => setNewTitle(e.target.value)} placeholder="标题 *" className="rounded-lg border border-border bg-background px-3 py-2 text-sm" />
            <input type="date" value={newDate} onChange={e => setNewDate(e.target.value)} className="rounded-lg border border-border bg-background px-3 py-2 text-sm" />
            <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={newEncrypted} onChange={e => setNewEncrypted(e.target.checked)} /> 私密</label>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <select value={newMood} onChange={e => setNewMood(e.target.value)} className="rounded-lg border border-border bg-background px-3 py-2 text-sm">
              {MOODS.map(m => <option key={m.value} value={m.value}>{m.label}</option>)}
            </select>
            <select value={newWeather} onChange={e => setNewWeather(e.target.value)} className="rounded-lg border border-border bg-background px-3 py-2 text-sm">
              {WEATHERS.map(w => <option key={w.value} value={w.value}>{w.label}</option>)}
            </select>
          </div>
          <textarea value={newContent} onChange={e => setNewContent(e.target.value)} placeholder="日记内容..." rows={4} className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm" />
          <button onClick={handleCreate} disabled={saving || !newTitle.trim()} className="rounded-lg bg-primary px-4 py-2 text-sm text-primary-foreground disabled:opacity-50">
            {saving ? "保存中..." : "保存日记"}
          </button>
        </div>
      )}

      {loading ? <p className="text-muted-foreground">加载中...</p> : (
        <div className="rounded-xl border border-border overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-muted">
              <tr>
                <th className="px-4 py-3 text-left font-medium">标题</th>
                <th className="px-4 py-3 text-left font-medium">日期</th>
                <th className="px-4 py-3 text-left font-medium">心情</th>
                <th className="px-4 py-3 text-left font-medium">天气</th>
                <th className="px-4 py-3 text-left font-medium">私密</th>
                <th className="px-4 py-3 text-left font-medium">操作</th>
              </tr>
            </thead>
            <tbody>
              {list.map((d) => (
                <tr key={d.id} className="border-t border-border">
                  <td className="px-4 py-3 font-medium">{d.title}</td>
                  <td className="px-4 py-3">{d.diaryDate}</td>
                  <td className="px-4 py-3">{MOOD_MAP[d.mood] ?? d.mood ?? "-"}</td>
                  <td className="px-4 py-3">{WEATHER_MAP[d.weather] ?? d.weather ?? "-"}</td>
                  <td className="px-4 py-3">
                    <button onClick={() => handleToggleEncrypted(d)} className="text-sm">
                      {d.encrypted ? "🔒 私密" : "🌐 公开"}
                    </button>
                  </td>
                  <td className="px-4 py-3">
                    <button onClick={() => handleDelete(d.id)} className="text-red-500 text-xs">删除</button>
                  </td>
                </tr>
              ))}
              {list.length === 0 && <tr><td colSpan={6} className="px-4 py-8 text-center text-muted-foreground">暂无日记</td></tr>}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
