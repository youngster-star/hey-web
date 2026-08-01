import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col flex-1">
      {/* Hero */}
      <section className="relative flex flex-col items-center justify-center min-h-[70vh] px-4 text-center">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/5 via-background to-background" />
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight">
          何以晴
        </h1>
        <p className="mt-4 text-xl text-muted-foreground max-w-lg">
          记录生活与思考的个人网站
        </p>
        <div className="mt-8 flex gap-4">
          <Link
            href="/articles"
            className="inline-flex h-11 items-center justify-center rounded-full bg-foreground px-8 text-sm font-medium text-background transition-colors hover:bg-foreground/90"
          >
            浏览文章
          </Link>
          <Link
            href="/about"
            className="inline-flex h-11 items-center justify-center rounded-full border border-border px-8 text-sm font-medium transition-colors hover:bg-accent"
          >
            关于我
          </Link>
        </div>
      </section>
    </div>
  );
}
