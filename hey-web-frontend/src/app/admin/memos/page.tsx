"use client";

import { useEffect, useState } from "react";
import { api, PageResult } from "@/lib/api";

interface Memo {
  id: number;
  title: string;
  completed: boolean;
  encrypted: boolean;
  sortOrder: number;
  createTime: string;
}

export default function AdminMemosPage() {
  const [data, setData] = useState<PageResult<Memo> | null>(null);
  const [loading, setLoading] = useState(true);

  const load = async (page = 1) => {
    setLoading(true);
    const result = await api.get<PageResult<Memo>>(`/admin/memos?page=${page}&pageSize=10`);
    setData(result);
    setLoading(false);
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
        <button className="rounded-lg bg-primary px-4 py-2 text-sm text-primary-foreground">新建备忘</button>
      </div>
      {loading ? <p className="text-muted-foreground">加载中...</p> : (
        <div className="rounded-xl border border-border overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-muted">
              <tr>
                <th className="px-4 py-3 text-left font-medium">标题</th>
                <th className="px-4 py-3 text-left font-medium">完成状态</th>
                <th className="px-4 py-3 text-left font-medium">加密</th>
                <th className="px-4 py-3 text-left font-medium">排序</th>
                <th className="px-4 py-3 text-left font-medium">创建时间</th>
                <th className="px-4 py-3 text-left font-medium">操作</th>
              </tr>
            </thead>
            <tbody>
              {data?.records?.map((m) => (
                <tr key={m.id} className="border-t border-border">
                  <td className="px-4 py-3 font-medium">{m.title}</td>
                  <td className="px-4 py-3">{m.completed ? "✅ 已完成" : "⬜ 未完成"}</td>
                  <td className="px-4 py-3">{m.encrypted ? "🔒" : "🌐"}</td>
                  <td className="px-4 py-3">{m.sortOrder}</td>
                  <td className="px-4 py-3 text-muted-foreground">{m.createTime?.slice(0, 10)}</td>
                  <td className="px-4 py-3">
                    <button onClick={() => handleDelete(m.id)} className="text-red-500 text-xs">删除</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
