"use client";

import { useEffect, useState, useMemo } from "react";
import Link from "next/link";
import { api } from "@/lib/api";
import { Breadcrumb } from "@/components/common/breadcrumb";
import { Calendar, FileText } from "lucide-react";

interface Article {
  id: number;
  title: string;
  slug: string;
  createTime: string;
  category: { id: number; name: string } | null;
}

type YearGroup = { year: number; months: MonthGroup[] };
type MonthGroup = { month: number; articles: Article[] };

export default function ArchivePage() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 获取所有文章（大型分页）
    api.get<{ records: Article[]; total: number }>("/public/articles?page=1&pageSize=1000")
      .then((r) => setArticles(r.records))
      .finally(() => setLoading(false));
  }, []);

  const grouped = useMemo(() => {
    const map = new Map<number, Map<number, Article[]>>();
    articles.forEach((a) => {
      const d = new Date(a.createTime);
      const y = d.getFullYear();
      const m = d.getMonth() + 1;
      if (!map.has(y)) map.set(y, new Map());
      const ymap = map.get(y)!;
      if (!ymap.has(m)) ymap.set(m, []);
      ymap.get(m)!.push(a);
    });
    const result: YearGroup[] = [];
    const sortedYears = [...map.keys()].sort((a, b) => b - a);
    for (const y of sortedYears) {
      const ymap = map.get(y)!;
      const months: MonthGroup[] = [];
      const sortedMonths = [...ymap.keys()].sort((a, b) => b - a);
      for (const m of sortedMonths) {
        months.push({ month: m, articles: ymap.get(m)! });
      }
      result.push({ year: y, months });
    }
    return result;
  }, [articles]);

  const totalArticles = articles.length;

  if (loading) {
    return (
      <div className="flex flex-col flex-1">
        <main className="flex-1 max-w-3xl mx-auto w-full px-4 py-12">
          <p className="text-muted-foreground">加载中...</p>
        </main>
      </div>
    );
  }

  return (
    <div className="flex flex-col flex-1">
      <main className="flex-1 max-w-3xl mx-auto w-full px-4 py-12">
        <Breadcrumb items={[{ label: "归档" }]} />

        <div className="flex items-center gap-3 mb-2">
          <Calendar className="size-6 text-muted-foreground" />
          <h1 className="text-3xl font-bold">归档</h1>
        </div>
        <p className="text-sm text-muted-foreground mb-8">
          共 {totalArticles} 篇文章
        </p>

        {grouped.length === 0 ? (
          <p className="text-muted-foreground text-center py-16">还没有文章</p>
        ) : (
          <div className="space-y-10">
            {grouped.map((yg) => (
              <section key={yg.year}>
                <h2 className="text-2xl font-bold mb-4 sticky top-0 bg-background/80 backdrop-blur-sm py-2 z-10">
                  {yg.year}
                </h2>
                {yg.months.map((mg) => (
                  <div key={mg.month} className="mb-6">
                    <h3 className="text-sm font-medium text-muted-foreground mb-3 border-b border-border pb-2">
                      {mg.month}月
                    </h3>
                    <ul className="space-y-2">
                      {mg.articles.map((a) => (
                        <li key={a.id} className="flex items-center justify-between group">
                          <Link
                            href={`/articles/${a.slug}`}
                            className="flex items-center gap-2 flex-1 min-w-0 hover:text-primary transition-colors"
                          >
                            <FileText className="size-3.5 text-muted-foreground shrink-0" />
                            <span className="truncate">{a.title}</span>
                          </Link>
                          <span className="text-xs text-muted-foreground shrink-0 ml-4">
                            {new Date(a.createTime).toLocaleDateString("zh-CN", { month: "2-digit", day: "2-digit" })}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </section>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
