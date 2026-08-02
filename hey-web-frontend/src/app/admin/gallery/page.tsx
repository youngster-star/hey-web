"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api";

interface ImageGroup {
  id: number;
  title: string;
  slug: string;
  description: string;
  visible: boolean;
  clickCount: number;
  likeCount: number;
  createTime: string;
}

export default function AdminGalleryPage() {
  const [list, setList] = useState<ImageGroup[]>([]);
  const [loading, setLoading] = useState(true);

  const [showCreate, setShowCreate] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newDesc, setNewDesc] = useState("");
  const [saving, setSaving] = useState(false);

  const load = async () => {
    setLoading(true);
    const result = await api.get<ImageGroup[]>("/admin/gallery");
    setList(result);
    setLoading(false);
  };

  const handleCreate = async () => {
    if (!newTitle.trim()) return;
    setSaving(true);
    await api.post("/admin/gallery", { title: newTitle, description: newDesc });
    setNewTitle(""); setNewDesc(""); setShowCreate(false);
    setSaving(false);
    load();
  };

  const handleToggleVisible = async (g: ImageGroup) => {
    await api.put(`/admin/gallery/${g.id}`, { ...g, visible: !g.visible });
    load();
  };

  const handleDelete = async (id: number) => {
    if (!confirm("确定删除此图集？")) return;
    await api.del(`/admin/gallery/${id}`);
    load();
  };

  useEffect(() => { load(); }, []);

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">相册管理</h1>
        <button onClick={() => setShowCreate(!showCreate)} className="rounded-lg bg-primary px-4 py-2 text-sm text-primary-foreground">
          {showCreate ? "取消" : "新建图集"}
        </button>
      </div>

      {showCreate && (
        <div className="mb-6 rounded-xl border border-border p-4 space-y-3 bg-muted/30">
          <input value={newTitle} onChange={e => setNewTitle(e.target.value)} placeholder="图集标题 *" className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm" />
          <input value={newDesc} onChange={e => setNewDesc(e.target.value)} placeholder="描述（可选）" className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm" />
          <button onClick={handleCreate} disabled={saving || !newTitle.trim()} className="rounded-lg bg-primary px-4 py-2 text-sm text-primary-foreground disabled:opacity-50">
            {saving ? "创建中..." : "创建图集"}
          </button>
        </div>
      )}

      {loading ? <p className="text-muted-foreground">加载中...</p> : (
        <div className="rounded-xl border border-border overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-muted">
              <tr>
                <th className="px-4 py-3 text-left font-medium">标题</th>
                <th className="px-4 py-3 text-left font-medium">可见</th>
                <th className="px-4 py-3 text-left font-medium">浏览</th>
                <th className="px-4 py-3 text-left font-medium">点赞</th>
                <th className="px-4 py-3 text-left font-medium">创建时间</th>
                <th className="px-4 py-3 text-left font-medium">操作</th>
              </tr>
            </thead>
            <tbody>
              {list.map((g) => (
                <tr key={g.id} className="border-t border-border">
                  <td className="px-4 py-3 font-medium">{g.title}</td>
                  <td className="px-4 py-3">
                    <button onClick={() => handleToggleVisible(g)} className="text-sm">{g.visible ? "✅" : "❌"}</button>
                  </td>
                  <td className="px-4 py-3">{g.clickCount}</td>
                  <td className="px-4 py-3">{g.likeCount}</td>
                  <td className="px-4 py-3 text-muted-foreground">{g.createTime?.slice(0, 10)}</td>
                  <td className="px-4 py-3">
                    <button onClick={() => handleDelete(g.id)} className="text-red-500 text-xs">删除</button>
                  </td>
                </tr>
              ))}
              {list.length === 0 && <tr><td colSpan={6} className="px-4 py-8 text-center text-muted-foreground">暂无图集</td></tr>}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
