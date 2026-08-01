"use client";

import { useEffect, useState } from "react";
import { api, PageResult } from "@/lib/api";

interface FriendLink {
  id: number;
  name: string;
  url: string;
  description: string;
  visible: boolean;
  sortOrder: number;
  createTime: string;
}

export default function AdminFriendsPage() {
  const [data, setData] = useState<PageResult<FriendLink> | null>(null);
  const [loading, setLoading] = useState(true);

  const load = async (page = 1) => {
    setLoading(true);
    const result = await api.get<PageResult<FriendLink>>(`/admin/friend-links?page=${page}&pageSize=10`);
    setData(result);
    setLoading(false);
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
        <button className="rounded-lg bg-primary px-4 py-2 text-sm text-primary-foreground">添加友链</button>
      </div>
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
                <th className="px-4 py-3 text-left font-medium">添加时间</th>
                <th className="px-4 py-3 text-left font-medium">操作</th>
              </tr>
            </thead>
            <tbody>
              {data?.records?.map((f) => (
                <tr key={f.id} className="border-t border-border">
                  <td className="px-4 py-3 font-medium">{f.name}</td>
                  <td className="px-4 py-3 text-muted-foreground max-w-[200px] truncate">{f.url}</td>
                  <td className="px-4 py-3 text-muted-foreground max-w-[150px] truncate">{f.description ?? "-"}</td>
                  <td className="px-4 py-3">{f.visible ? "✅" : "❌"}</td>
                  <td className="px-4 py-3">{f.sortOrder}</td>
                  <td className="px-4 py-3 text-muted-foreground">{f.createTime?.slice(0, 10)}</td>
                  <td className="px-4 py-3">
                    <button onClick={() => handleDelete(f.id)} className="text-red-500 text-xs">删除</button>
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
