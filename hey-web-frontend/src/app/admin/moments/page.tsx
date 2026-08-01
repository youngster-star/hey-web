"use client";

import { useEffect, useState } from "react";
import { api, PageResult } from "@/lib/api";

interface Moment {
  id: number;
  content: string;
  visible: boolean;
  clickCount: number;
  likeCount: number;
  createTime: string;
}

export default function AdminMomentsPage() {
  const [data, setData] = useState<PageResult<Moment> | null>(null);
  const [loading, setLoading] = useState(true);

  const load = async (page = 1) => {
    setLoading(true);
    const result = await api.get<PageResult<Moment>>(`/admin/moments?page=${page}&pageSize=10`);
    setData(result);
    setLoading(false);
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
        <button className="rounded-lg bg-primary px-4 py-2 text-sm text-primary-foreground">新建说说</button>
      </div>
      {loading ? <p className="text-muted-foreground">加载中...</p> : (
        <div className="rounded-xl border border-border overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-muted">
              <tr>
                <th className="px-4 py-3 text-left font-medium">内容</th>
                <th className="px-4 py-3 text-left font-medium">可见</th>
                <th className="px-4 py-3 text-left font-medium">点击量</th>
                <th className="px-4 py-3 text-left font-medium">点赞数</th>
                <th className="px-4 py-3 text-left font-medium">发布时间</th>
                <th className="px-4 py-3 text-left font-medium">操作</th>
              </tr>
            </thead>
            <tbody>
              {data?.records?.map((m) => (
                <tr key={m.id} className="border-t border-border">
                  <td className="px-4 py-3 max-w-[300px] truncate">{m.content}</td>
                  <td className="px-4 py-3">{m.visible ? "✅" : "❌"}</td>
                  <td className="px-4 py-3">{m.clickCount}</td>
                  <td className="px-4 py-3">{m.likeCount}</td>
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
