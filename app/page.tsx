import Link from "next/link"
import { getAllPosts } from "@/lib/posts"
import { PostCard } from "@/components/post-card"
import { BlogHeader } from "@/components/blog-header"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function HomePage() {
  const posts = getAllPosts()
  const recentPosts = posts.slice(0, 3)

  return (
    <div className="min-h-screen bg-background">
      <BlogHeader />
      <main>
        {/* Hero Section */}
        <section className="max-w-4xl mx-auto px-4 py-16 md:py-24">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4 text-balance">
            안녕하세요,{" "}
            <span className="text-muted-foreground">개인 블로그입니다.</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl leading-relaxed">
            개발, 여행, 일상에 대한 이야기를 기록하고 공유합니다. 
            새로운 경험과 배움을 글로 남기고 있습니다.
          </p>
        </section>

        {/* Recent Posts Section */}
        <section className="max-w-4xl mx-auto px-4 pb-16">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-foreground">최근 포스트</h2>
            <Button variant="ghost" asChild>
              <Link href="/blog" className="flex items-center gap-1">
                전체 보기
                <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
          </div>

          {recentPosts.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {recentPosts.map((post) => (
                <PostCard key={post.slug} post={post} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 text-muted-foreground border border-dashed border-border rounded-lg">
              <p>아직 포스트가 없습니다.</p>
            </div>
          )}
        </section>
      </main>
    </div>
  )
}
