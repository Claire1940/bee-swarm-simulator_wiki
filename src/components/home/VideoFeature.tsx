"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { ExternalLink, Play } from "lucide-react";

interface VideoFeatureProps {
  videoId: string;
  title: string;
}

/**
 * 视频特性区块
 *
 * 自动播放策略（三态）：
 * - activated === null：显示缩略图 + 播放按钮，不加载 iframe（节省带宽、利于 SEO 缩略图）
 * - activated === 'auto'：IntersectionObserver 监测进入视口后自动加载，带 mute=1&loop=1（浏览器策略要求静音才能自动播放）
 * - activated === 'manual'：用户点击播放按钮后加载，不带 mute（用户手势满足音频策略，可带声播放）
 *
 * 无 JS 回退：<noscript> 内嵌 iframe 保证爬虫/无 JS 环境可见。
 */
export function VideoFeature({ videoId, title }: VideoFeatureProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activated, setActivated] = useState<"auto" | "manual" | null>(null);
  const [thumbSrc, setThumbSrc] = useState<string | null>(null);

  const watchUrl = useMemo(
    () => `https://www.youtube.com/watch?v=${videoId}`,
    [videoId],
  );

  // 静音自动循环播放（进入视口触发）
  const autoEmbedUrl = useMemo(
    () =>
      `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&loop=1&playlist=${videoId}&playsinline=1&rel=0`,
    [videoId],
  );

  // 用户点击后的带声播放
  const manualEmbedUrl = useMemo(
    () =>
      `https://www.youtube.com/embed/${videoId}?autoplay=1&playsinline=1&rel=0`,
    [videoId],
  );

  const embedUrl =
    activated === "manual" ? manualEmbedUrl : autoEmbedUrl;

  // 缩略图探测：maxresdefault 优先，失败回退 hqdefault
  useEffect(() => {
    let cancelled = false;
    const maxres = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
    const hq = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
    const probe = new Image();
    probe.onload = () => {
      if (cancelled) return;
      // 某些视频的 maxres 实际是 120x90 占位图，宽度不足则回退
      setThumbSrc(probe.naturalWidth >= 480 ? maxres : hq);
    };
    probe.onerror = () => {
      if (!cancelled) setThumbSrc(hq);
    };
    probe.src = maxres;
    return () => {
      cancelled = true;
    };
  }, [videoId]);

  // IntersectionObserver：进入视口自动播放
  useEffect(() => {
    if (activated !== null) return;
    const node = containerRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActivated("auto");
            observer.disconnect();
            break;
          }
        }
      },
      { threshold: 0.45 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [activated]);

  return (
    <div className="space-y-4">
      <div
        ref={containerRef}
        className="relative w-full overflow-hidden rounded-2xl bg-black/40"
        style={{ paddingBottom: "56.25%" }}
      >
        {activated === null ? (
          <button
            type="button"
            onClick={() => setActivated("manual")}
            aria-label={`Play video: ${title}`}
            className="group absolute inset-0 flex h-full w-full items-center justify-center"
          >
            {thumbSrc && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={thumbSrc}
                alt={title}
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
              />
            )}
            <span
              className="relative z-10 inline-flex h-16 w-16 items-center justify-center rounded-full
                         bg-[hsl(var(--nav-theme))] text-white shadow-lg
                         transition-transform duration-300 group-hover:scale-110"
            >
              <Play className="h-7 w-7 translate-x-0.5" fill="currentColor" />
            </span>
            <span className="absolute inset-0 bg-black/20" />
          </button>
        ) : (
          <iframe
            key={embedUrl}
            className="absolute top-0 left-0 h-full w-full"
            src={embedUrl}
            title={title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          />
        )}

        {/* 无 JS / 爬虫回退 */}
        <noscript>
          <iframe
            className="absolute top-0 left-0 h-full w-full"
            src={`https://www.youtube.com/embed/${videoId}`}
            title={title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          />
        </noscript>
      </div>

      <div className="flex justify-center">
        <a
          href={watchUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-lg border border-border px-4 py-2 text-sm font-medium text-muted-foreground hover:bg-white/10 hover:text-foreground transition-colors"
        >
          Watch on YouTube
          <ExternalLink className="h-4 w-4" />
        </a>
      </div>
    </div>
  );
}
