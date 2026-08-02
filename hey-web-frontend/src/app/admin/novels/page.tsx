"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api";

interface Novel {
  id: number;
  title: string;
  author: string;
  summary: string;
  visible: boolean;
  clickCount: number;
  likeCount: number;
  createTime: string;
}

export default function AdminNovelsPage() {
  const [list, setList] = useState<Novel[]>([]);
  const [loading, setLoading] = useState(true);

  const [showCreate, setShowCreate] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newAuthor, setNewAuthor] = useState("");
  const [newSummary, setNewSummary] = useState("");
  const [saving, setSaving] = useState(false);

  const load = async () => {
    setLoading(true);
    const result = await api.get<Novel[]>("/admin/novels");
    setList(result);
    setLoading(false);
  };

  const handleCreate = async () => {
    if (!newTitle.trim()) return;
    setSaving(true);
    await api.post("/admin/novels", { title: newTitle, author: newAuthor, summary: newSummary });
    setNewTitle(""); setNewAuthor(""); setNewSummary(""); setShowCreate(false);
    setSaving(false);
    load();
  };

  const handleToggleVisible = async (n: Novel) => {
    await api.put(`/admin/novels/${n.id}`, { ...n, visible: !n.visible });
    load();
  };

  const handleDelete = async (id: number) => {
    if (!confirm("确定删除此小说？")) return;
    await api.del(`/admin/novels/${id}`);
    load();
  };

  useEffect(() => { load(); }, []);

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">小说管理</h1>
        <button onClick={() => setShowCreate(!showCreate)} className="rounded-lg bg-primary px-4 py-2 text-sm text-primary-foreground">
          {showCreate ? "取消" : "添加小说"}
        </button>
      </div>

      {showCreate && (
        <div className="mb-6 rounded-xl border border-border p-4 space-y-3 bg-muted/30">
          <div className="grid grid-cols-2 gap-3">
            <input value={newTitle} onChange={e => setNewTitle(e.target.value)} placeholder="小说标题 *" className="rounded-lg border border-border bg-background px-3 py-2 text-sm" />
            <input value={newAuthor} onChange={e => setNewAuthor(e.target.value)} placeholder="作者" className="rounded-lg border border-border bg-background px-3 py-2 text-sm" />
          </div>
          <textarea value={newSummary} onChange={e => setNewSummary(e.target.value)} placeholder="简介..." rows={3} className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm" />
          <button onClick={handleCreate} disabled={saving || !newTitle.trim()} className="rounded-lg bg-primary px-4 py-2 text-sm text-primary-foreground disabled:opacity-50">
            {saving ? "创建中..." : "创建小说"}
          </button>
        </div>
      )}

      {loading ? <p className="text-muted-foreground">加载中...</p> : (
        <div className="rounded-xl border border-border overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-muted">
              <tr>
                <th className="px-4 py-3 text-left font-medium">标题</th>
                <th className="px-4 py-3 text-left font-medium">作者</th>
                <th className="px-4 py-3 text-left font-medium">可见</th>
                <th className="px-4 py-3 text-left font-medium">阅读量</th>
                <th className="px-4 py-3 text-left font-medium">点赞</th>
                <th className="px-4 py-3 text-left font-medium">操作</th>
              </tr>
            </thead>
            <tbody>
              {list.map((n) => (
                <tr key={n.id} className="border-t border-border">
                  <td className="px-4 py-3 font-medium">{n.title}</td>
                  <td className="px-4 py-3">{n.author ?? "-"}</td>
                  <td className="px-4 py-3">
                    <button onClick={() => handleToggleVisible(n)} className="text-sm">{n.visible ? "✅" : "❌"}</button>
                  </td>
                  <td className="px-4 py-3">{n.clickCount}</td>
                  <td className="px-4 py-3">{n.likeCount}</td>
                  <td className="px-4 py-3">
                    <button onClick={() => handleDelete(n.id)} className="text-red-500 text-xs">删除</button>
                  </td>
                </tr>
              ))}
              {list.length === 0 && <tr><td colSpan={6} className="px-4 py-8 text-center text-muted-foreground">暂无小说</td></tr>}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
