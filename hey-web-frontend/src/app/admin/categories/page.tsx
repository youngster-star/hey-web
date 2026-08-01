"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api";

interface Category {
  id: number;
  name: string;
  slug: string;
  description: string;
  sortOrder: number;
  createTime: string;
}

export default function AdminCategoriesPage() {
  const [list, setList] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [newName, setNewName] = useState("");
  const [newSlug, setNewSlug] = useState("");
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editName, setEditName] = useState("");

  const load = async () => {
    setLoading(true);
    try {
      const result = await api.get<Category[]>("/public/categories");
      setList(result);
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async () => {
    if (!newName.trim()) return;
    await api.post("/admin/categories", { name: newName.trim(), slug: newSlug.trim() || undefined });
    setNewName("");
    setNewSlug("");
    load();
  };

  const handleUpdate = async (id: number) => {
    await api.put(`/admin/categories/${id}`, { name: editName.trim() });
    setEditingId(null);
    load();
  };

  const handleDelete = async (id: number) => {
    if (!confirm("确定删除此分类？")) return;
    await api.del(`/admin/categories/${id}`);
    load();
  };

  useEffect(() => { load(); }, []);

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">分类管理</h1>
      </div>

      {/* Add form */}
      <div className="flex gap-2 mb-6">
        <input
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          placeholder="分类名称"
          className="rounded-lg border border-border bg-background px-3 py-2 text-sm w-40"
        />
        <input
          value={newSlug}
          onChange={(e) => setNewSlug(e.target.value)}
          placeholder="Slug（可选）"
          className="rounded-lg border border-border bg-background px-3 py-2 text-sm w-40"
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
                <th className="px-4 py-3 text-left font-medium">描述</th>
                <th className="px-4 py-3 text-left font-medium">排序</th>
                <th className="px-4 py-3 text-left font-medium">创建时间</th>
                <th className="px-4 py-3 text-left font-medium">操作</th>
              </tr>
            </thead>
            <tbody>
              {list.map((c) => (
                <tr key={c.id} className="border-t border-border">
                  <td className="px-4 py-3 font-medium">
                    {editingId === c.id ? (
                      <input
                        value={editName}
                        onChange={(e) => setEditName(e.target.value)}
                        className="rounded border border-border bg-background px-2 py-1 text-sm w-32"
                      />
                    ) : c.name}
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">{c.slug}</td>
                  <td className="px-4 py-3 text-muted-foreground max-w-[200px] truncate">{c.description ?? "-"}</td>
                  <td className="px-4 py-3">{c.sortOrder}</td>
                  <td className="px-4 py-3 text-muted-foreground">{c.createTime?.slice(0, 10)}</td>
                  <td className="px-4 py-3 space-x-2">
                    {editingId === c.id ? (
                      <>
                        <button onClick={() => handleUpdate(c.id)} className="text-primary text-xs">保存</button>
                        <button onClick={() => setEditingId(null)} className="text-muted-foreground text-xs">取消</button>
                      </>
                    ) : (
                      <>
                        <button onClick={() => { setEditingId(c.id); setEditName(c.name); }} className="text-primary text-xs">编辑</button>
                        <button onClick={() => handleDelete(c.id)} className="text-red-500 text-xs">删除</button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
              {list.length === 0 && (
                <tr><td colSpan={6} className="px-4 py-8 text-center text-muted-foreground">暂无分类</td></tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
