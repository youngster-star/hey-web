"use client";

import { useState, useEffect, useCallback } from "react";
import { api } from "@/lib/api";
import { Heart } from "lucide-react";

interface LikeButtonProps {
  targetType: string;
  targetId: number;
}

export function LikeButton({ targetType, targetId }: LikeButtonProps) {
  const [liked, setLiked] = useState(false);
  const [count, setCount] = useState(0);

  useEffect(() => {
    api.get<{ count: number; liked: boolean }>(
      `/public/like?targetType=${targetType}&targetId=${targetId}`
    ).then(data => {
      setCount(data.count);
      setLiked(data.liked);
    }).catch(() => {});
  }, [targetType, targetId]);

  const toggle = useCallback(async () => {
    try {
      const data = await api.post<{ liked: boolean; count: number }>(
        `/public/like?targetType=${targetType}&targetId=${targetId}`
      );
      setLiked(data.liked);
      setCount(data.count);
    } catch {}
  }, [targetType, targetId]);

  return (
    <button onClick={toggle} className="inline-flex items-center gap-1.5 text-sm transition-colors hover:text-red-500">
      <Heart className={`w-4 h-4 transition-colors ${liked ? 'fill-red-500 text-red-500' : ''}`} />
      <span>{count}</span>
    </button>
  );
}
