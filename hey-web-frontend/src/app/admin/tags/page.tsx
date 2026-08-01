"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api";

interface Tag {
  id: number;
  name: string;
  slug: string;
  createTime: string;
}

export default function AdminTagsPage() {
  const [list, setList] = useState<Tag[]>([]);
  const [loading, setLoading] = useState(true);
  const [newName, setNewName] = useState("");
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editName, setEditName] = useState("");

  const load = async () => {
    setLoading(true);
    try {
      const result = await api.get<Tag[]>("/public/tags");
      setList(result);
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async () => {
    if (!newName.trim()) return;
    await api.post("/admin/tags", { name: newName.trim() });
    setNewName("");
    load();
  };

  const handleUpdate = async (id: number) => {
    await api.put(`/admin/tags/${id}`, { name: editName.trim() });
    setEditingId(null);
    load();
  };

  const handleDelete = async (id: number) => {
    if (!confirm("确定删除此标签？")) return;
    await api.del(`/admin/tags/${id}`);
    load();
  };

  useEffect(() => { load(); }, []);

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">标签管理</h1>
      </div>

      {/* Add form */}
      <div className="flex gap-2 mb-6">
        <input
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          placeholder="标签名称"
          className="rounded-lg border border-border bg-background px-3 py-2 text-sm w-48"
          onKeyDown={(e) => e.key === "Enter" && handleCreate()}
        />
        <button onClick={handleCreate} className="rounded-lg bg-primary px-4 py-2 text-sm text-primary-foreground">
          添加
        </button>
      </div>

      {loading ? <p className="text-muted-foreground">加载中...</p> : (
        <div className="rounded-xl border border-border overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-muted">
              <tr>
                <th className="px-4 py-3 text-left font-medium">名称</th>
                <th className="px-4 py-3 text-left font-medium">Slug</th>
                <th className="px-4 py-3 text-left font-medium">创建时间</th>
                <th className="px-4 py-3 text-left font-medium">操作</th>
              </tr>
            </thead>
            <tbody>
              {list.map((t) => (
                <tr key={t.id} className="border-t border-border">
                  <td className="px-4 py-3 font-medium">
                    {editingId === t.id ? (
                      <input
                        value={editName}
                        onChange={(e) => setEditName(e.target.value)}
                        className="rounded border border-border bg-background px-2 py-1 text-sm w-32"
                        onKeyDown={(e) => e.key === "Enter" && handleUpdate(t.id)}
                      />
                    ) : t.name}
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">{t.slug ?? "-"}</td>
                  <td className="px-4 py-3 text-muted-foreground">{t.createTime?.slice(0, 10)}</td>
                  <td className="px-4 py-3 space-x-2">
                    {editingId === t.id ? (
                      <>
                        <button onClick={() => handleUpdate(t.id)} className="text-primary text-xs">保存</button>
                        <button onClick={() => setEditingId(null)} className="text-muted-foreground text-xs">取消</button>
                      </>
                    ) : (
                      <>
                        <button onClick={() => { setEditingId(t.id); setEditName(t.name); }} className="text-primary text-xs">编辑</button>
                        <button onClick={() => handleDelete(t.id)} className="text-red-500 text-xs">删除</button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
              {list.length === 0 && (
                <tr><td colSpan={4} className="px-4 py-8 text-center text-muted-foreground">暂无标签</td></tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
