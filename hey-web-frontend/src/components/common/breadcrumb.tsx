"use client";

import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";
import { Fragment } from "react";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export function Breadcrumb({ items }: { items: BreadcrumbItem[] }) {
  return (
    <nav aria-label="面包屑" className="mb-6">
      <ol className="flex items-center gap-1.5 text-sm text-muted-foreground">
        <li>
          <Link href="/" className="hover:text-foreground transition-colors inline-flex items-center gap-1">
            <Home className="size-3.5" />
          </Link>
        </li>
        {items.map((item, i) => (
          <Fragment key={i}>
            <ChevronRight className="size-3.5 shrink-0" />
            <li>
              {item.href ? (
                <Link href={item.href} className="hover:text-foreground transition-colors">
                  {item.label}
                </Link>
              ) : (
                <span className="text-foreground font-medium">{item.label}</span>
              )}
            </li>
          </Fragment>
        ))}
      </ol>
    </nav>
  );
}

/** 预设：管理后台面包屑映射 */
export function adminBreadcrumb(pageLabel: string): BreadcrumbItem[] {
  return [
    { label: "管理后台", href: "/admin/dashboard" },
    { label: pageLabel },
  ];
}
