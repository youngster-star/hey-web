"use client";

import Link from "next/link";
import { Breadcrumb } from "@/components/common/breadcrumb";
import { SiteHeader } from "@/components/layout/site-header";
import { Terminal, AnimatedSpan, TypingAnimation } from "@/components/ui/terminal";
import { InteractiveHoverButton } from "@/components/ui/interactive-hover-button";
import { IconCloud } from "@/components/ui/icon-cloud";
import { ExternalLink } from "lucide-react";

const REPO_URL = "https://github.com/youngster-star/hey-web";

const techSlugs = [
  "typescript", "javascript", "java", "react", "nextdotjs",
  "html5", "css3", "nodedotjs", "spring", "tailwindcss",
  "prisma", "postgresql", "mysql", "redis", "docker",
  "git", "github", "visualstudiocode", "linux", "figma",
];

export default function AboutPage() {
  const images = techSlugs.map(
    (slug) => `https://cdn.simpleicons.org/${slug}/${slug}`
  );

  return (
    <div className="flex flex-col flex-1">
      <SiteHeader activeNav="关于" />

      <main className="flex-1 max-w-2xl mx-auto w-full px-4 py-16">
        <Breadcrumb items={[{ label: "关于" }]} />

        <h1 className="text-3xl font-bold mb-8 text-center">关于我</h1>
        <div className="prose dark:prose-invert space-y-4">
          <p className="text-muted-foreground">
            你好，我是何以晴。这里是我的个人网站，记录我的思考、创作与日常。
          </p>
          <p className="text-muted-foreground">
            通过这个网站，我希望分享有价值的内容，同时也作为自己成长的见证。
          </p>
        </div>

        {/* Tech Stack — IconCloud */}
        <div className="mt-16 mb-8">
          <h2 className="text-xl font-bold mb-4 text-center">技术栈</h2>
          <div className="relative flex size-full items-center justify-center overflow-hidden h-64">
            <IconCloud images={images} />
          </div>
        </div>

        {/* Terminal — GitHub install instructions */}
        <div className="mt-16 mb-8">
          <h2 className="text-xl font-bold mb-4">在本地运行本项目</h2>
          <Terminal>
            <AnimatedSpan>
              <span className="text-green-500">$</span> git clone {REPO_URL}
            </AnimatedSpan>
            <AnimatedSpan>
              <span className="text-green-500">$</span> cd hey-web
            </AnimatedSpan>
            <AnimatedSpan>
              <span className="text-green-500">$</span> cd hey-web-frontend
            </AnimatedSpan>
            <AnimatedSpan>
              <span className="text-green-500">$</span> npm install
            </AnimatedSpan>
            <TypingAnimation>
              $ npm run dev
            </TypingAnimation>
            <AnimatedSpan className="text-muted-foreground">
              ✨ 前端运行在 http://localhost:3000
            </AnimatedSpan>
            <AnimatedSpan className="text-muted-foreground">
              🔧 后端需要 Java 17+ 和 MySQL，详见 README
            </AnimatedSpan>
          </Terminal>
        </div>

        {/* CTA Button */}
        <div className="flex justify-center mb-16">
          <Link href={REPO_URL} target="_blank" rel="noopener noreferrer">
            <InteractiveHoverButton>
              <ExternalLink className="size-4 mr-1" />
              在 GitHub 上查看
            </InteractiveHoverButton>
          </Link>
        </div>

        {/* Admin entrance */}
        <div className="pt-8 border-t border-border">
          <Link
            href="/admin/dashboard"
            target="_blank"
            className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            ⚙️ 管理后台
          </Link>
        </div>
      </main>
    </div>
  );
}
