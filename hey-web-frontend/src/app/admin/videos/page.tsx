"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api";

interface Video {
  id: number;
  title: string;
  slug: string;
  url: string;
  source: string;
  duration: string;
  visible: boolean;
  clickCount: number;
  likeCount: number;
  createTime: string;
}

const SOURCES = [
  { value: "EMBED", label: "嵌入" },
  { value: "BILIBILI", label: "哔哩哔哩" },
  { value: "YOUTUBE", label: "YouTube" },
  { value: "SELF", label: "自托管" },
];

export default function AdminVideosPage() {
  const [list, setList] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);

  const [showCreate, setShowCreate] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newUrl, setNewUrl] = useState("");
  const [newSource, setNewSource] = useState("BILIBILI");
  const [newDuration, setNewDuration] = useState("");
  const [saving, setSaving] = useState(false);

  const load = async () => {
    setLoading(true);
    const result = await api.get<Video[]>("/admin/videos");
    setList(result);
    setLoading(false);
  };

  const handleCreate = async () => {
    if (!newTitle.trim() || !newUrl.trim()) return;
    setSaving(true);
    await api.post("/admin/videos", { title: newTitle, url: newUrl, source: newSource, duration: newDuration });
    setNewTitle(""); setNewUrl(""); setNewDuration(""); setShowCreate(false);
    setSaving(false);
    load();
  };

  const handleToggleVisible = async (v: Video) => {
    await api.put(`/admin/videos/${v.id}`, { ...v, visible: !v.visible });
    load();
  };

  const handleDelete = async (id: number) => {
    if (!confirm("确定删除此视频？")) return;
    await api.del(`/admin/videos/${id}`);
    load();
  };

  useEffect(() => { load(); }, []);

  const SOURCE_MAP = Object.fromEntries(SOURCES.map(s => [s.value, s.label]));

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">视频管理</h1>
        <button onClick={() => setShowCreate(!showCreate)} className="rounded-lg bg-primary px-4 py-2 text-sm text-primary-foreground">
          {showCreate ? "取消" : "添加视频"}
        </button>
      </div>

      {showCreate && (
        <div className="mb-6 rounded-xl border border-border p-4 space-y-3 bg-muted/30">
          <div className="grid grid-cols-2 gap-3">
            <input value={newTitle} onChange={e => setNewTitle(e.target.value)} placeholder="标题 *" className="rounded-lg border border-border bg-background px-3 py-2 text-sm" />
            <input value={newUrl} onChange={e => setNewUrl(e.target.value)} placeholder="视频链接 *" className="rounded-lg border border-border bg-background px-3 py-2 text-sm" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <select value={newSource} onChange={e => setNewSource(e.target.value)} className="rounded-lg border border-border bg-background px-3 py-2 text-sm">
              {SOURCES.map(s => <option key={s.value} value={s.value}>{s.label}</option>)}
            </select>
            <input value={newDuration} onChange={e => setNewDuration(e.target.value)} placeholder="时长（如 12:30）" className="rounded-lg border border-border bg-background px-3 py-2 text-sm" />
          </div>
          <button onClick={handleCreate} disabled={saving || !newTitle.trim() || !newUrl.trim()} className="rounded-lg bg-primary px-4 py-2 text-sm text-primary-foreground disabled:opacity-50">
            {saving ? "保存中..." : "添加视频"}
          </button>
        </div>
      )}

      {loading ? <p className="text-muted-foreground">加载中...</p> : (
        <div className="rounded-xl border border-border overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-muted">
              <tr>
                <th className="px-4 py-3 text-left font-medium">标题</th>
                <th className="px-4 py-3 text-left font-medium">来源</th>
                <th className="px-4 py-3 text-left font-medium">时长</th>
                <th className="px-4 py-3 text-left font-medium">可见</th>
                <th className="px-4 py-3 text-left font-medium">播放量</th>
                <th className="px-4 py-3 text-left font-medium">操作</th>
              </tr>
            </thead>
            <tbody>
              {list.map((v) => (
                <tr key={v.id} className="border-t border-border">
                  <td className="px-4 py-3 font-medium">{v.title}</td>
                  <td className="px-4 py-3">{SOURCE_MAP[v.source] ?? v.source}</td>
                  <td className="px-4 py-3">{v.duration ?? "-"}</td>
                  <td className="px-4 py-3">
                    <button onClick={() => handleToggleVisible(v)} className="text-sm">{v.visible ? "✅" : "❌"}</button>
                  </td>
                  <td className="px-4 py-3">{v.clickCount}</td>
                  <td className="px-4 py-3">
                    <button onClick={() => handleDelete(v.id)} className="text-red-500 text-xs">删除</button>
                  </td>
                </tr>
              ))}
              {list.length === 0 && <tr><td colSpan={6} className="px-4 py-8 text-center text-muted-foreground">暂无视频</td></tr>}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
