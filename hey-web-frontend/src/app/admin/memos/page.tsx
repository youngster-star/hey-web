"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api";

interface Memo {
  id: number;
  title: string;
  completed: boolean;
  encrypted: boolean;
  sortOrder: number;
}

export default function AdminMemosPage() {
  const [list, setList] = useState<Memo[]>([]);
  const [loading, setLoading] = useState(true);

  const [showCreate, setShowCreate] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newContent, setNewContent] = useState("");
  const [newEncrypted, setNewEncrypted] = useState(false);
  const [saving, setSaving] = useState(false);

  const load = async () => {
    setLoading(true);
    const result = await api.get<Memo[]>("/admin/memos");
    setList(result);
    setLoading(false);
  };

  const handleCreate = async () => {
    if (!newTitle.trim()) return;
    setSaving(true);
    await api.post("/admin/memos", { title: newTitle, content: newContent, encrypted: newEncrypted });
    setNewTitle(""); setNewContent(""); setNewEncrypted(false); setShowCreate(false);
    setSaving(false);
    load();
  };

  const handleToggleCompleted = async (m: Memo) => {
    await api.put(`/admin/memos/${m.id}`, { ...m, completed: !m.completed });
    load();
  };

  const handleToggleEncrypted = async (m: Memo) => {
    await api.put(`/admin/memos/${m.id}`, { ...m, encrypted: !m.encrypted });
    load();
  };

  const handleDelete = async (id: number) => {
    if (!confirm("确定删除此备忘录？")) return;
    await api.del(`/admin/memos/${id}`);
    load();
  };

  useEffect(() => { load(); }, []);

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">备忘录</h1>
        <button onClick={() => setShowCreate(!showCreate)} className="rounded-lg bg-primary px-4 py-2 text-sm text-primary-foreground">
          {showCreate ? "取消" : "新建备忘"}
        </button>
      </div>

      {showCreate && (
        <div className="mb-6 rounded-xl border border-border p-4 space-y-3 bg-muted/30">
          <div className="flex gap-3">
            <input value={newTitle} onChange={e => setNewTitle(e.target.value)} placeholder="标题 *" className="flex-1 rounded-lg border border-border bg-background px-3 py-2 text-sm" />
            <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={newEncrypted} onChange={e => setNewEncrypted(e.target.checked)} /> 私密</label>
          </div>
          <textarea value={newContent} onChange={e => setNewContent(e.target.value)} placeholder="备忘内容..." rows={3} className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm" />
          <button onClick={handleCreate} disabled={saving || !newTitle.trim()} className="rounded-lg bg-primary px-4 py-2 text-sm text-primary-foreground disabled:opacity-50">
            {saving ? "保存中..." : "保存备忘"}
          </button>
        </div>
      )}

      {loading ? <p className="text-muted-foreground">加载中...</p> : (
        <div className="rounded-xl border border-border overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-muted">
              <tr>
                <th className="px-4 py-3 text-left font-medium">标题</th>
                <th className="px-4 py-3 text-left font-medium">状态</th>
                <th className="px-4 py-3 text-left font-medium">私密</th>
                <th className="px-4 py-3 text-left font-medium">排序</th>
                <th className="px-4 py-3 text-left font-medium">操作</th>
              </tr>
            </thead>
            <tbody>
              {list.map((m) => (
                <tr key={m.id} className="border-t border-border">
                  <td className="px-4 py-3 font-medium">{m.title}</td>
                  <td className="px-4 py-3">
                    <button onClick={() => handleToggleCompleted(m)} className="text-sm">
                      {m.completed ? "✅ 已完成" : "⬜ 未完成"}
                    </button>
                  </td>
                  <td className="px-4 py-3">
                    <button onClick={() => handleToggleEncrypted(m)} className="text-sm">
                      {m.encrypted ? "🔒 私密" : "🌐 公开"}
                    </button>
                  </td>
                  <td className="px-4 py-3">{m.sortOrder}</td>
                  <td className="px-4 py-3">
                    <button onClick={() => handleDelete(m.id)} className="text-red-500 text-xs">删除</button>
                  </td>
                </tr>
              ))}
              {list.length === 0 && <tr><td colSpan={5} className="px-4 py-8 text-center text-muted-foreground">暂无备忘</td></tr>}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
