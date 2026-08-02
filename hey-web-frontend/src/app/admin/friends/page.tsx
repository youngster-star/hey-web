"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api";

interface FriendLink {
  id: number;
  name: string;
  url: string;
  description: string;
  visible: boolean;
  sortOrder: number;
}

export default function AdminFriendsPage() {
  const [list, setList] = useState<FriendLink[]>([]);
  const [loading, setLoading] = useState(true);

  const [showCreate, setShowCreate] = useState(false);
  const [newName, setNewName] = useState("");
  const [newUrl, setNewUrl] = useState("https://");
  const [newDesc, setNewDesc] = useState("");
  const [saving, setSaving] = useState(false);

  const load = async () => {
    setLoading(true);
    const result = await api.get<FriendLink[]>("/admin/friend-links");
    setList(result);
    setLoading(false);
  };

  const handleCreate = async () => {
    if (!newName.trim() || !newUrl.trim()) return;
    setSaving(true);
    await api.post("/admin/friend-links", { name: newName, url: newUrl, description: newDesc });
    setNewName(""); setNewUrl("https://"); setNewDesc(""); setShowCreate(false);
    setSaving(false);
    load();
  };

  const handleToggleVisible = async (f: FriendLink) => {
    await api.put(`/admin/friend-links/${f.id}`, { ...f, visible: !f.visible });
    load();
  };

  const handleDelete = async (id: number) => {
    if (!confirm("确定删除此友链？")) return;
    await api.del(`/admin/friend-links/${id}`);
    load();
  };

  useEffect(() => { load(); }, []);

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">友链管理</h1>
        <button onClick={() => setShowCreate(!showCreate)} className="rounded-lg bg-primary px-4 py-2 text-sm text-primary-foreground">
          {showCreate ? "取消" : "添加友链"}
        </button>
      </div>

      {showCreate && (
        <div className="mb-6 rounded-xl border border-border p-4 space-y-3 bg-muted/30">
          <div className="grid grid-cols-2 gap-3">
            <input value={newName} onChange={e => setNewName(e.target.value)} placeholder="站点名称 *" className="rounded-lg border border-border bg-background px-3 py-2 text-sm" />
            <input value={newUrl} onChange={e => setNewUrl(e.target.value)} placeholder="URL *" className="rounded-lg border border-border bg-background px-3 py-2 text-sm" />
          </div>
          <input value={newDesc} onChange={e => setNewDesc(e.target.value)} placeholder="描述（可选）" className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm" />
          <button onClick={handleCreate} disabled={saving || !newName.trim() || !newUrl.trim()} className="rounded-lg bg-primary px-4 py-2 text-sm text-primary-foreground disabled:opacity-50">
            {saving ? "保存中..." : "添加友链"}
          </button>
        </div>
      )}

      {loading ? <p className="text-muted-foreground">加载中...</p> : (
        <div className="rounded-xl border border-border overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-muted">
              <tr>
                <th className="px-4 py-3 text-left font-medium">名称</th>
                <th className="px-4 py-3 text-left font-medium">URL</th>
                <th className="px-4 py-3 text-left font-medium">描述</th>
                <th className="px-4 py-3 text-left font-medium">可见</th>
                <th className="px-4 py-3 text-left font-medium">排序</th>
                <th className="px-4 py-3 text-left font-medium">操作</th>
              </tr>
            </thead>
            <tbody>
              {list.map((f) => (
                <tr key={f.id} className="border-t border-border">
                  <td className="px-4 py-3 font-medium">{f.name}</td>
                  <td className="px-4 py-3 text-muted-foreground max-w-[200px] truncate">{f.url}</td>
                  <td className="px-4 py-3 text-muted-foreground max-w-[150px] truncate">{f.description ?? "-"}</td>
                  <td className="px-4 py-3">
                    <button onClick={() => handleToggleVisible(f)} className="text-sm">
                      {f.visible ? "✅" : "❌"}
                    </button>
                  </td>
                  <td className="px-4 py-3">{f.sortOrder}</td>
                  <td className="px-4 py-3">
                    <button onClick={() => handleDelete(f.id)} className="text-red-500 text-xs">删除</button>
                  </td>
                </tr>
              ))}
              {list.length === 0 && <tr><td colSpan={6} className="px-4 py-8 text-center text-muted-foreground">暂无友链</td></tr>}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
