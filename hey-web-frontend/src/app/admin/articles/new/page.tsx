"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { api } from "@/lib/api";

export default function NewArticlePage() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [slug, setSlug] = useState("");
  const [status, setStatus] = useState("DRAFT");
  const [saving, setSaving] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title) return;
    setSaving(true);
    try {
      const body: Record<string, unknown> = { title, summary, content, status };
      if (slug) body.slug = slug;
      await api.post("/admin/articles", body);
      router.push("/admin/articles");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">新建文章</h1>
      <form onSubmit={handleSubmit} className="max-w-2xl space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">标题 *</label>
          <input value={title} onChange={(e) => setTitle(e.target.value)} className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm" required />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Slug（留空自动生成）</label>
          <input value={slug} onChange={(e) => setSlug(e.target.value)} className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">摘要</label>
          <textarea value={summary} onChange={(e) => setSummary(e.target.value)} rows={3} className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">正文</label>
          <textarea value={content} onChange={(e) => setContent(e.target.value)} rows={12} className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm font-mono" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">状态</label>
          <select value={status} onChange={(e) => setStatus(e.target.value)} className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm">
            <option value="DRAFT">草稿</option>
            <option value="PUBLISHED">已发布</option>
          </select>
        </div>
        <div className="flex gap-3 pt-2">
          <button type="submit" disabled={saving} className="rounded-lg bg-primary px-4 py-2 text-sm text-primary-foreground">
            {saving ? "保存中..." : "保存"}
          </button>
          <button type="button" onClick={() => router.back()} className="rounded-lg border border-border px-4 py-2 text-sm">
            取消
          </button>
        </div>
      </form>
    </div>
  );
}
