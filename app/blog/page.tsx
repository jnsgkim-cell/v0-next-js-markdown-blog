import { getAllPosts, getAllTags } from "@/lib/posts"
import { BlogList } from "@/components/blog-list"
import { BlogHeader } from "@/components/blog-header"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Blog | My Blog",
  description: "개발, 여행, 라이프스타일에 대한 글을 공유합니다.",
}

export default function BlogPage() {
  const posts = getAllPosts()
  const allTags = getAllTags()

  return (
    <div className="min-h-screen bg-background">
      <BlogHeader />
      <main className="max-w-4xl mx-auto px-4 py-12">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">블로그</h1>
          <p className="text-muted-foreground">
            총 {posts.length}개의 포스트가 있습니다.
          </p>
        </div>
        <BlogList posts={posts} allTags={allTags} />
      </main>
    </div>
  )
}
