"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api";

interface Moment {
  id: number;
  content: string;
  visible: boolean;
  clickCount: number;
  likeCount: number;
  createTime: string;
}

export default function AdminMomentsPage() {
  const [list, setList] = useState<Moment[]>([]);
  const [loading, setLoading] = useState(true);

  const [showCreate, setShowCreate] = useState(false);
  const [newContent, setNewContent] = useState("");
  const [newVisible, setNewVisible] = useState(true);
  const [saving, setSaving] = useState(false);

  const load = async () => {
    setLoading(true);
    const result = await api.get<Moment[]>("/admin/moments");
    setList(result);
    setLoading(false);
  };

  const handleCreate = async () => {
    if (!newContent.trim()) return;
    setSaving(true);
    await api.post("/admin/moments", { content: newContent, visible: newVisible });
    setNewContent(""); setNewVisible(true); setShowCreate(false);
    setSaving(false);
    load();
  };

  const handleToggleVisible = async (m: Moment) => {
    await api.put(`/admin/moments/${m.id}`, { ...m, visible: !m.visible });
    load();
  };

  const handleDelete = async (id: number) => {
    if (!confirm("确定删除此说说？")) return;
    await api.del(`/admin/moments/${id}`);
    load();
  };

  useEffect(() => { load(); }, []);

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">说说管理</h1>
        <button onClick={() => setShowCreate(!showCreate)} className="rounded-lg bg-primary px-4 py-2 text-sm text-primary-foreground">
          {showCreate ? "取消" : "新建说说"}
        </button>
      </div>

      {showCreate && (
        <div className="mb-6 rounded-xl border border-border p-4 space-y-3 bg-muted/30">
          <textarea value={newContent} onChange={e => setNewContent(e.target.value)} placeholder="说点什么..." rows={3} className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm" />
          <div className="flex items-center gap-4">
            <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={newVisible} onChange={e => setNewVisible(e.target.checked)} /> 公开可见</label>
            <button onClick={handleCreate} disabled={saving || !newContent.trim()} className="rounded-lg bg-primary px-4 py-2 text-sm text-primary-foreground disabled:opacity-50">
              {saving ? "发布中..." : "发布说说"}
            </button>
          </div>
        </div>
      )}

      {loading ? <p className="text-muted-foreground">加载中...</p> : (
        <div className="rounded-xl border border-border overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-muted">
              <tr>
                <th className="px-4 py-3 text-left font-medium w-[40%]">内容</th>
                <th className="px-4 py-3 text-left font-medium">可见</th>
                <th className="px-4 py-3 text-left font-medium">浏览</th>
                <th className="px-4 py-3 text-left font-medium">点赞</th>
                <th className="px-4 py-3 text-left font-medium">发布时间</th>
                <th className="px-4 py-3 text-left font-medium">操作</th>
              </tr>
            </thead>
            <tbody>
              {list.map((m) => (
                <tr key={m.id} className="border-t border-border">
                  <td className="px-4 py-3 max-w-[300px] truncate">{m.content}</td>
                  <td className="px-4 py-3">
                    <button onClick={() => handleToggleVisible(m)} className="text-sm">
                      {m.visible ? "✅ 可见" : "❌ 隐藏"}
                    </button>
                  </td>
                  <td className="px-4 py-3">{m.clickCount}</td>
                  <td className="px-4 py-3">{m.likeCount}</td>
                  <td className="px-4 py-3 text-muted-foreground">{m.createTime?.slice(0, 10)}</td>
                  <td className="px-4 py-3">
                    <button onClick={() => handleDelete(m.id)} className="text-red-500 text-xs">删除</button>
                  </td>
                </tr>
              ))}
              {list.length === 0 && <tr><td colSpan={6} className="px-4 py-8 text-center text-muted-foreground">暂无说说</td></tr>}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
