"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { api, PageResult } from "@/lib/api";

interface Article {
  id: number;
  title: string;
  slug: string;
  summary: string;
  status: string;
  visible: boolean;
  pinned: boolean;
  clickCount: number;
  likeCount: number;
  createTime: string;
  updateTime: string;
}

const STATUS_MAP: Record<string, string> = { DRAFT: "草稿", PUBLISHED: "已发布" };

export default function AdminArticlesPage() {
  const [data, setData] = useState<PageResult<Article> | null>(null);
  const [loading, setLoading] = useState(true);

  const load = async (page = 1) => {
    setLoading(true);
    try {
      const result = await api.get<PageResult<Article>>(`/admin/articles?page=${page}&pageSize=10`);
      setData(result);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("确定删除这篇文章？")) return;
    await api.del(`/admin/articles/${id}`);
    load();
  };

  const handleToggleVisible = async (a: Article) => {
    await api.put(`/admin/articles/${a.id}`, { title: a.title, slug: a.slug, status: a.status, visible: !a.visible, pinned: a.pinned });
    load();
  };

  const handleTogglePinned = async (a: Article) => {
    await api.put(`/admin/articles/${a.id}`, { title: a.title, slug: a.slug, status: a.status, visible: a.visible, pinned: !a.pinned });
    load();
  };

  useEffect(() => { load(); }, []);

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">文章管理</h1>
        <Link href="/admin/articles/new" className="rounded-lg bg-primary px-4 py-2 text-sm text-primary-foreground">
          新建文章
        </Link>
      </div>

      {loading ? (
        <p className="text-muted-foreground">加载中...</p>
      ) : (
        <div className="rounded-xl border border-border overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-muted">
              <tr>
                <th className="px-4 py-3 text-left font-medium">标题</th>
                <th className="px-4 py-3 text-left font-medium">状态</th>
                <th className="px-4 py-3 text-left font-medium">可见</th>
                <th className="px-4 py-3 text-left font-medium">置顶</th>
                <th className="px-4 py-3 text-left font-medium">点击量</th>
                <th className="px-4 py-3 text-left font-medium">点赞数</th>
                <th className="px-4 py-3 text-left font-medium">更新时间</th>
                <th className="px-4 py-3 text-left font-medium">操作</th>
              </tr>
            </thead>
            <tbody>
              {data?.records?.map((a) => (
                <tr key={a.id} className="border-t border-border">
                  <td className="px-4 py-3 font-medium">{a.title}</td>
                  <td className="px-4 py-3">{STATUS_MAP[a.status] ?? a.status}</td>
                  <td className="px-4 py-3">
                    <button onClick={() => handleToggleVisible(a)} className="text-sm">{a.visible ? "✅" : "❌"}</button>
                  </td>
                  <td className="px-4 py-3">
                    <button onClick={() => handleTogglePinned(a)} className="text-sm">{a.pinned ? "📌" : "-"}</button>
                  </td>
                  <td className="px-4 py-3">{a.clickCount}</td>
                  <td className="px-4 py-3">{a.likeCount}</td>
                  <td className="px-4 py-3 text-muted-foreground">{a.updateTime?.slice(0, 10)}</td>
                  <td className="px-4 py-3 space-x-2">
                    <Link href={`/admin/articles/${a.id}`} className="text-primary text-xs">编辑</Link>
                    <button onClick={() => handleDelete(a.id)} className="text-red-500 text-xs">删除</button>
                  </td>
                </tr>
              ))}
              {(!data?.records || data.records.length === 0) && (
                <tr>
                  <td colSpan={8} className="px-4 py-8 text-center text-muted-foreground">暂无文章</td>
                </tr>
              )}
            </tbody>
          </table>
          {data && data.total > 10 && (
            <div className="flex justify-center gap-2 p-4 border-t border-border">
              {Array.from({ length: Math.ceil(data.total / 10) }, (_, i) => (
                <button key={i} onClick={() => load(i + 1)} className="rounded-md px-3 py-1 text-sm bg-accent">{i + 1}</button>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
