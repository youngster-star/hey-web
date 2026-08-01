"use client";

import { useEffect, useState } from "react";
import { api, PageResult } from "@/lib/api";

interface Video {
  id: number;
  title: string;
  slug: string;
  url: string;
  source: string;
  duration: string;
  visible: boolean;
  clickCount: number;
  likeCount: number;
  createTime: string;
}

const SOURCE_MAP: Record<string, string> = { EMBED: "嵌入", BILIBILI: "哔哩哔哩", YOUTUBE: "YouTube", SELF: "自托管" };

export default function AdminVideosPage() {
  const [data, setData] = useState<PageResult<Video> | null>(null);
  const [loading, setLoading] = useState(true);

  const load = async (page = 1) => {
    setLoading(true);
    const result = await api.get<PageResult<Video>>(`/admin/videos?page=${page}&pageSize=10`);
    setData(result);
    setLoading(false);
  };

  const handleDelete = async (id: number) => {
    if (!confirm("确定删除此视频？")) return;
    await api.del(`/admin/videos/${id}`);
    load();
  };

  useEffect(() => { load(); }, []);

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">视频管理</h1>
        <button className="rounded-lg bg-primary px-4 py-2 text-sm text-primary-foreground">添加视频</button>
      </div>
      {loading ? <p className="text-muted-foreground">加载中...</p> : (
        <div className="rounded-xl border border-border overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-muted">
              <tr>
                <th className="px-4 py-3 text-left font-medium">标题</th>
                <th className="px-4 py-3 text-left font-medium">来源</th>
                <th className="px-4 py-3 text-left font-medium">时长</th>
                <th className="px-4 py-3 text-left font-medium">可见</th>
                <th className="px-4 py-3 text-left font-medium">点击量</th>
                <th className="px-4 py-3 text-left font-medium">点赞数</th>
                <th className="px-4 py-3 text-left font-medium">创建时间</th>
                <th className="px-4 py-3 text-left font-medium">操作</th>
              </tr>
            </thead>
            <tbody>
              {data?.records?.map((v) => (
                <tr key={v.id} className="border-t border-border">
                  <td className="px-4 py-3 font-medium">{v.title}</td>
                  <td className="px-4 py-3">{SOURCE_MAP[v.source] ?? v.source}</td>
                  <td className="px-4 py-3">{v.duration ?? "-"}</td>
                  <td className="px-4 py-3">{v.visible ? "✅" : "❌"}</td>
                  <td className="px-4 py-3">{v.clickCount}</td>
                  <td className="px-4 py-3">{v.likeCount}</td>
                  <td className="px-4 py-3 text-muted-foreground">{v.createTime?.slice(0, 10)}</td>
                  <td className="px-4 py-3">
                    <button onClick={() => handleDelete(v.id)} className="text-red-500 text-xs">删除</button>
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
