"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api";

interface Audio {
  id: number;
  title: string;
  artist: string;
  album: string;
  duration: string;
  visible: boolean;
  clickCount: number;
  createTime: string;
}

export default function AdminAudioPage() {
  const [list, setList] = useState<Audio[]>([]);
  const [loading, setLoading] = useState(true);

  const [showCreate, setShowCreate] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newArtist, setNewArtist] = useState("");
  const [newAlbum, setNewAlbum] = useState("");
  const [newUrl, setNewUrl] = useState("");
  const [newDuration, setNewDuration] = useState("");
  const [saving, setSaving] = useState(false);

  const load = async () => {
    setLoading(true);
    const result = await api.get<Audio[]>("/admin/audio");
    setList(result);
    setLoading(false);
  };

  const handleCreate = async () => {
    if (!newTitle.trim() || !newUrl.trim()) return;
    setSaving(true);
    await api.post("/admin/audio", { title: newTitle, artist: newArtist, album: newAlbum, url: newUrl, duration: newDuration });
    setNewTitle(""); setNewArtist(""); setNewAlbum(""); setNewUrl(""); setNewDuration(""); setShowCreate(false);
    setSaving(false);
    load();
  };

  const handleToggleVisible = async (a: Audio) => {
    await api.put(`/admin/audio/${a.id}`, { ...a, visible: !a.visible });
    load();
  };

  const handleDelete = async (id: number) => {
    if (!confirm("确定删除此音乐？")) return;
    await api.del(`/admin/audio/${id}`);
    load();
  };

  useEffect(() => { load(); }, []);

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">音乐管理</h1>
        <button onClick={() => setShowCreate(!showCreate)} className="rounded-lg bg-primary px-4 py-2 text-sm text-primary-foreground">
          {showCreate ? "取消" : "添加音乐"}
        </button>
      </div>

      {showCreate && (
        <div className="mb-6 rounded-xl border border-border p-4 space-y-3 bg-muted/30">
          <div className="grid grid-cols-2 gap-3">
            <input value={newTitle} onChange={e => setNewTitle(e.target.value)} placeholder="歌曲名 *" className="rounded-lg border border-border bg-background px-3 py-2 text-sm" />
            <input value={newUrl} onChange={e => setNewUrl(e.target.value)} placeholder="音频URL *" className="rounded-lg border border-border bg-background px-3 py-2 text-sm" />
          </div>
          <div className="grid grid-cols-3 gap-3">
            <input value={newArtist} onChange={e => setNewArtist(e.target.value)} placeholder="歌手" className="rounded-lg border border-border bg-background px-3 py-2 text-sm" />
            <input value={newAlbum} onChange={e => setNewAlbum(e.target.value)} placeholder="专辑" className="rounded-lg border border-border bg-background px-3 py-2 text-sm" />
            <input value={newDuration} onChange={e => setNewDuration(e.target.value)} placeholder="时长（如 03:45）" className="rounded-lg border border-border bg-background px-3 py-2 text-sm" />
          </div>
          <button onClick={handleCreate} disabled={saving || !newTitle.trim() || !newUrl.trim()} className="rounded-lg bg-primary px-4 py-2 text-sm text-primary-foreground disabled:opacity-50">
            {saving ? "保存中..." : "添加音乐"}
          </button>
        </div>
      )}

      {loading ? <p className="text-muted-foreground">加载中...</p> : (
        <div className="rounded-xl border border-border overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-muted">
              <tr>
                <th className="px-4 py-3 text-left font-medium">标题</th>
                <th className="px-4 py-3 text-left font-medium">歌手</th>
                <th className="px-4 py-3 text-left font-medium">专辑</th>
                <th className="px-4 py-3 text-left font-medium">时长</th>
                <th className="px-4 py-3 text-left font-medium">可见</th>
                <th className="px-4 py-3 text-left font-medium">操作</th>
              </tr>
            </thead>
            <tbody>
              {list.map((a) => (
                <tr key={a.id} className="border-t border-border">
                  <td className="px-4 py-3 font-medium">{a.title}</td>
                  <td className="px-4 py-3">{a.artist ?? "-"}</td>
                  <td className="px-4 py-3">{a.album ?? "-"}</td>
                  <td className="px-4 py-3">{a.duration ?? "-"}</td>
                  <td className="px-4 py-3">
                    <button onClick={() => handleToggleVisible(a)} className="text-sm">{a.visible ? "✅" : "❌"}</button>
                  </td>
                  <td className="px-4 py-3">
                    <button onClick={() => handleDelete(a.id)} className="text-red-500 text-xs">删除</button>
                  </td>
                </tr>
              ))}
              {list.length === 0 && <tr><td colSpan={6} className="px-4 py-8 text-center text-muted-foreground">暂无音乐</td></tr>}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
