"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { api } from "@/lib/api";

interface Article {
  id: number;
  title: string;
  slug: string;
  summary: string;
  content: string;
  status: string;
  visible: boolean;
  pinned: boolean;
  categoryId: number | null;
  createTime: string;
}

export default function EditArticlePage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  const [article, setArticle] = useState<Article | null>(null);
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [status, setStatus] = useState("DRAFT");
  const [visible, setVisible] = useState(true);
  const [pinned, setPinned] = useState(false);
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get<Article>(`/admin/articles/${id}`).then((a) => {
      setArticle(a);
      setTitle(a.title);
      setSlug(a.slug);
      setSummary(a.summary ?? "");
      setContent(a.content ?? "");
      setStatus(a.status);
      setVisible(a.visible);
      setPinned(a.pinned);
    }).finally(() => setLoading(false));
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title) return;
    setSaving(true);
    try {
      await api.put(`/admin/articles/${id}`, { title, slug, summary, content, status, visible, pinned });
      router.push("/admin/articles");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <p className="text-muted-foreground">加载中...</p>;
  if (!article) return <p className="text-muted-foreground">文章不存在</p>;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">编辑文章</h1>
      <form onSubmit={handleSubmit} className="max-w-2xl space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">标题 *</label>
          <input value={title} onChange={(e) => setTitle(e.target.value)} className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm" required />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Slug</label>
          <input value={slug} onChange={(e) => setSlug(e.target.value)} className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">摘要</label>
          <textarea value={summary} onChange={(e) => setSummary(e.target.value)} rows={3} className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">正文</label>
          <textarea value={content} onChange={(e) => setContent(e.target.value)} rows={16} className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm font-mono" />
        </div>
        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">状态</label>
            <select value={status} onChange={(e) => setStatus(e.target.value)} className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm">
              <option value="DRAFT">草稿</option>
              <option value="PUBLISHED">已发布</option>
            </select>
          </div>
          <div className="flex items-end gap-2 pb-2">
            <label className="flex items-center gap-2 text-sm">
              <input type="checkbox" checked={visible} onChange={(e) => setVisible(e.target.checked)} className="rounded" />
              可见
            </label>
          </div>
          <div className="flex items-end gap-2 pb-2">
            <label className="flex items-center gap-2 text-sm">
              <input type="checkbox" checked={pinned} onChange={(e) => setPinned(e.target.checked)} className="rounded" />
              置顶
            </label>
          </div>
        </div>
        <div className="flex gap-3 pt-2">
          <button type="submit" disabled={saving} className="rounded-lg bg-primary px-4 py-2 text-sm text-primary-foreground">
            {saving ? "保存中..." : "保存修改"}
          </button>
          <button type="button" onClick={() => router.back()} className="rounded-lg border border-border px-4 py-2 text-sm">
            取消
          </button>
        </div>
      </form>
    </div>
  );
}
