"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Search, X } from "lucide-react";

export function SearchButton() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const router = useRouter();

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setOpen(true);
      }
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  const search = useCallback(() => {
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query.trim())}`);
      setOpen(false);
      setQuery("");
    }
  }, [query, router]);

  return (
    <>
      <button onClick={() => setOpen(true)}
        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground border rounded-md px-3 py-1.5">
        <Search className="w-4 h-4" />
        <span className="hidden md:inline">搜索</span>
        <kbd className="hidden md:inline text-xs border rounded px-1.5 py-0.5 ml-2">Ctrl+K</kbd>
      </button>

      {open && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-start justify-center pt-[15vh]" onClick={() => setOpen(false)}>
          <div className="bg-card border rounded-xl shadow-2xl w-full max-w-lg p-4" onClick={e => e.stopPropagation()}>
            <div className="flex items-center gap-3">
              <Search className="w-5 h-5 text-muted-foreground" />
              <input autoFocus value={query} onChange={e => setQuery(e.target.value)}
                onKeyDown={e => e.key === "Enter" && search()}
                placeholder="搜索文章..."
                className="flex-1 bg-transparent outline-none text-lg" />
              <button onClick={() => setOpen(false)}><X className="w-5 h-5" /></button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
