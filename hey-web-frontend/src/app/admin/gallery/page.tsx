"use client";

import { useEffect, useState } from "react";
import { api, PageResult } from "@/lib/api";

interface ImageGroup {
  id: number;
  title: string;
  slug: string;
  description: string;
  visible: boolean;
  clickCount: number;
  likeCount: number;
  imageCount?: number;
  createTime: string;
}

export default function AdminGalleryPage() {
  const [data, setData] = useState<PageResult<ImageGroup> | null>(null);
  const [loading, setLoading] = useState(true);

  const load = async (page = 1) => {
    setLoading(true);
    const result = await api.get<PageResult<ImageGroup>>(`/admin/gallery?page=${page}&pageSize=10`);
    setData(result);
    setLoading(false);
  };

  const handleDelete = async (id: number) => {
    if (!confirm("确定删除此图集？")) return;
    await api.del(`/admin/gallery/${id}`);
    load();
  };

  useEffect(() => { load(); }, []);

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">相册管理</h1>
        <button className="rounded-lg bg-primary px-4 py-2 text-sm text-primary-foreground">新建图集</button>
      </div>
      {loading ? <p className="text-muted-foreground">加载中...</p> : (
        <div className="rounded-xl border border-border overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-muted">
              <tr>
                <th className="px-4 py-3 text-left font-medium">标题</th>
                <th className="px-4 py-3 text-left font-medium">描述</th>
                <th className="px-4 py-3 text-left font-medium">可见</th>
                <th className="px-4 py-3 text-left font-medium">点击量</th>
                <th className="px-4 py-3 text-left font-medium">点赞数</th>
                <th className="px-4 py-3 text-left font-medium">创建时间</th>
                <th className="px-4 py-3 text-left font-medium">操作</th>
              </tr>
            </thead>
            <tbody>
              {data?.records?.map((g) => (
                <tr key={g.id} className="border-t border-border">
                  <td className="px-4 py-3 font-medium">{g.title}</td>
                  <td className="px-4 py-3 text-muted-foreground max-w-[200px] truncate">{g.description ?? "-"}</td>
                  <td className="px-4 py-3">{g.visible ? "✅" : "❌"}</td>
                  <td className="px-4 py-3">{g.clickCount}</td>
                  <td className="px-4 py-3">{g.likeCount}</td>
                  <td className="px-4 py-3 text-muted-foreground">{g.createTime?.slice(0, 10)}</td>
                  <td className="px-4 py-3">
                    <button onClick={() => handleDelete(g.id)} className="text-red-500 text-xs">删除</button>
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
