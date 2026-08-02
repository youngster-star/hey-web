import Link from "next/link";
import { Breadcrumb } from "@/components/common/breadcrumb";

export default function AboutPage() {
  return (
    <div className="flex flex-col flex-1">
      <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto flex items-center justify-between px-4 h-14">
          <Link href="/" className="font-bold text-lg">
            何以晴
          </Link>
          <nav className="flex items-center gap-6 text-sm">
            <Link href="/articles" className="text-muted-foreground hover:text-foreground">
              文章
            </Link>
            <Link href="/about" className="font-medium">
              关于
            </Link>
          </nav>
        </div>
      </header>

      <main className="flex-1 max-w-2xl mx-auto w-full px-4 py-16">
        <Breadcrumb items={[{ label: "关于" }]} />
        <h1 className="text-3xl font-bold mb-8">关于我</h1>
        <div className="prose dark:prose-invert space-y-4">
          <p className="text-muted-foreground">
            你好，我是何以晴。这里是我的个人网站，记录我的思考、创作与日常。
          </p>
          <p className="text-muted-foreground">
            通过这个网站，我希望分享有价值的内容，同时也作为自己成长的见证。
          </p>
        </div>

        {/* Admin entrance */}
        <div className="mt-16 pt-8 border-t border-border">
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
