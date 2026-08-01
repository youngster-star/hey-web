"use client";

import { useEffect, useState } from "react";
import { api, PageResult } from "@/lib/api";

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
  const [data, setData] = useState<PageResult<Novel> | null>(null);
  const [loading, setLoading] = useState(true);

  const load = async (page = 1) => {
    setLoading(true);
    const result = await api.get<PageResult<Novel>>(`/admin/novels?page=${page}&pageSize=10`);
    setData(result);
    setLoading(false);
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
        <button className="rounded-lg bg-primary px-4 py-2 text-sm text-primary-foreground">添加小说</button>
      </div>
      {loading ? <p className="text-muted-foreground">加载中...</p> : (
        <div className="rounded-xl border border-border overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-muted">
              <tr>
                <th className="px-4 py-3 text-left font-medium">标题</th>
                <th className="px-4 py-3 text-left font-medium">作者</th>
                <th className="px-4 py-3 text-left font-medium">可见</th>
                <th className="px-4 py-3 text-left font-medium">点击量</th>
                <th className="px-4 py-3 text-left font-medium">点赞数</th>
                <th className="px-4 py-3 text-left font-medium">创建时间</th>
                <th className="px-4 py-3 text-left font-medium">操作</th>
              </tr>
            </thead>
            <tbody>
              {data?.records?.map((n) => (
                <tr key={n.id} className="border-t border-border">
                  <td className="px-4 py-3 font-medium">{n.title}</td>
                  <td className="px-4 py-3">{n.author ?? "-"}</td>
                  <td className="px-4 py-3">{n.visible ? "✅" : "❌"}</td>
                  <td className="px-4 py-3">{n.clickCount}</td>
                  <td className="px-4 py-3">{n.likeCount}</td>
                  <td className="px-4 py-3 text-muted-foreground">{n.createTime?.slice(0, 10)}</td>
                  <td className="px-4 py-3">
                    <button onClick={() => handleDelete(n.id)} className="text-red-500 text-xs">删除</button>
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
