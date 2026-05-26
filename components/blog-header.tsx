import Link from "next/link"

export function BlogHeader() {
  return (
    <header className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
      <div className="max-w-4xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="font-bold text-xl text-foreground">
          My Blog
        </Link>
        <nav className="flex items-center gap-6">
          <Link
            href="/blog"
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            글 목록
          </Link>
        </nav>
      </div>
    </header>
  )
}
