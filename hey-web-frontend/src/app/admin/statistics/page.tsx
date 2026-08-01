"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { api } from "@/lib/api";
import ReactECharts from "echarts-for-react";
import { ArrowLeft } from "lucide-react";

interface StatData {
  daily: { date: string; pv: number; uv: number }[];
  totalPv: number; totalUv: number;
  region: { name: string; value: number }[];
  browser: { name: string; value: number }[];
  os: { name: string; value: number }[];
  topPages: { url: string; count: number }[];
}

export default function StatisticsPage() {
  const router = useRouter();
  const [stats, setStats] = useState<StatData | null>(null);
  const [days, setDays] = useState(30);

  useEffect(() => {
    if (!localStorage.getItem("accessToken")) { router.push("/admin/login"); return; }
    api.get<StatData>(`/admin/statistics?days=${days}`).then(setStats).catch(() => {});
  }, [days]);

  if (!stats) return <div className="flex items-center justify-center min-h-screen"><p className="text-muted-foreground">加载中...</p></div>;

  return (
    <div className="flex min-h-screen">
      <aside className="w-64 border-r border-border bg-card p-6 space-y-6">
        <Link href="/admin/dashboard" className="text-xl font-bold block">何以晴</Link>
        <nav className="space-y-1">
          <NavLink href="/admin/dashboard">仪表盘</NavLink>
          <NavLink href="/admin/articles">文章管理</NavLink>
          <NavLink href="/admin/statistics" active>访问统计</NavLink>
        </nav>
        <button onClick={() => { localStorage.clear(); router.push("/admin/login"); }}
          className="text-sm text-muted-foreground hover:text-foreground">退出登录</button>
      </aside>

      <main className="flex-1 p-8 space-y-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/admin/dashboard"><ArrowLeft className="w-5 h-5" /></Link>
            <h1 className="text-2xl font-bold">访问统计</h1>
          </div>
          <select value={days} onChange={e => setDays(Number(e.target.value))}
            className="border rounded-md px-3 py-1.5 text-sm">
            <option value={7}>最近7天</option>
            <option value={30}>最近30天</option>
            <option value={90}>最近90天</option>
          </select>
        </div>

        {/* Summary */}
        <div className="grid grid-cols-2 gap-4">
          <div className="rounded-xl border p-4"><p className="text-sm text-muted-foreground">总 PV</p><p className="text-3xl font-bold">{stats.totalPv}</p></div>
          <div className="rounded-xl border p-4"><p className="text-sm text-muted-foreground">总 UV</p><p className="text-3xl font-bold">{stats.totalUv}</p></div>
        </div>

        {/* PV/UV Trend */}
        <div className="rounded-xl border p-4">
          <h2 className="font-semibold mb-4">访问趋势 (PV/UV)</h2>
          <ReactECharts style={{ height: 300 }} option={{
            tooltip: { trigger: "axis" },
            legend: { data: ["PV", "UV"] },
            xAxis: { type: "category", data: stats.daily.map(d => d.date) },
            yAxis: { type: "value" },
            series: [
              { name: "PV", type: "line", data: stats.daily.map(d => d.pv), smooth: true },
              { name: "UV", type: "line", data: stats.daily.map(d => d.uv), smooth: true },
            ],
          }} />
        </div>

        {/* Region Distribution */}
        <div className="rounded-xl border p-4">
          <h2 className="font-semibold mb-4">地区分布</h2>
          <ReactECharts style={{ height: 300 }} option={{
            tooltip: { trigger: "item" },
            series: [{
              type: "pie", roseType: "radius",
              data: stats.region,
              radius: ["20%", "70%"],
              label: { show: true, formatter: "{b}\n{d}%" },
            }],
          }} />
        </div>

        {/* Browser & OS */}
        <div className="grid grid-cols-2 gap-6">
          <div className="rounded-xl border p-4">
            <h2 className="font-semibold mb-4">浏览器</h2>
            <ReactECharts style={{ height: 250 }} option={{
              tooltip: { trigger: "item" },
              series: [{ type: "pie", radius: "60%", data: stats.browser }],
            }} />
          </div>
          <div className="rounded-xl border p-4">
            <h2 className="font-semibold mb-4">操作系统</h2>
            <ReactECharts style={{ height: 250 }} option={{
              tooltip: { trigger: "item" },
              series: [{ type: "pie", radius: "60%", data: stats.os }],
            }} />
          </div>
        </div>

        {/* Top Pages */}
        <div className="rounded-xl border p-4">
          <h2 className="font-semibold mb-4">热门页面 Top10</h2>
          <table className="w-full text-sm">
            <thead><tr className="border-b text-left"><th className="py-2 text-muted-foreground">页面</th><th className="py-2 text-right text-muted-foreground">访问量</th></tr></thead>
            <tbody>
              {stats.topPages.map((p, i) => (
                <tr key={i} className="border-b last:border-0">
                  <td className="py-2 truncate max-w-md">{p.url}</td>
                  <td className="py-2 text-right font-medium">{p.count}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}

function NavLink({ href, active, children }: { href: string; active?: boolean; children: React.ReactNode }) {
  return <Link href={href} className={`block rounded-md px-3 py-2 text-sm ${active ? 'bg-accent font-medium' : 'text-muted-foreground hover:bg-accent'}`}>{children}</Link>;
}
