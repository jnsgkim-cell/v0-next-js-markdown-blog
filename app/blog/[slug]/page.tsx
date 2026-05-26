import { notFound } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import type { Metadata } from "next"
import {
  getAllPosts,
  getPostBySlug,
  getRelatedPosts,
  getAdjacentPosts,
} from "@/lib/posts"
import { MarkdownRenderer } from "@/components/markdown-renderer"
import { PostCardCompact } from "@/components/post-card"
import { BlogHeader } from "@/components/blog-header"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface PostPageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const posts = getAllPosts()
  return posts.map((post) => ({
    slug: post.slug,
  }))
}

export async function generateMetadata({
  params,
}: PostPageProps): Promise<Metadata> {
  const { slug } = await params
  const post = getPostBySlug(slug)

  if (!post) {
    return {
      title: "Post Not Found",
    }
  }

  return {
    title: `${post.title} | My Blog`,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      images: post.coverImage ? [post.coverImage] : [],
    },
  }
}

export default async function PostPage({ params }: PostPageProps) {
  const { slug } = await params
  const post = getPostBySlug(slug)

  if (!post) {
    notFound()
  }

  const relatedPosts = getRelatedPosts(post.relatedPosts)
  const { prev, next } = getAdjacentPosts(slug)

  return (
    <div className="min-h-screen bg-background">
      <BlogHeader />
      <main className="max-w-3xl mx-auto px-4 py-12">
        {/* Back Link */}
        <Link
          href="/blog"
          className="inline-flex items-center text-muted-foreground hover:text-foreground mb-8 transition-colors"
        >
          <ChevronLeft className="w-4 h-4 mr-1" />
          목록으로 돌아가기
        </Link>

        {/* Post Header */}
        <header className="mb-8">
          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-4">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs px-2 py-1 bg-secondary text-secondary-foreground rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>

          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4 text-pretty">
            {post.title}
          </h1>

          <p className="text-lg text-muted-foreground mb-4">{post.description}</p>

          <time className="text-sm text-muted-foreground">
            {new Date(post.date).toLocaleDateString("ko-KR", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </time>
        </header>

        {/* Cover Image */}
        {post.coverImage && (
          <div className="relative w-full h-64 md:h-96 mb-10 rounded-xl overflow-hidden">
            <Image
              src={post.coverImage}
              alt={post.title}
              fill
              className="object-cover"
              priority
            />
          </div>
        )}

        {/* Content */}
        <div className="mb-16">
          <MarkdownRenderer content={post.content} />
        </div>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <section className="mb-12">
            <h2 className="text-xl font-semibold text-foreground mb-4">
              연관 포스팅
            </h2>
            <div className="grid gap-4">
              {relatedPosts.map((relatedPost) => (
                <PostCardCompact key={relatedPost.slug} post={relatedPost} />
              ))}
            </div>
          </section>
        )}

        {/* Previous/Next Navigation */}
        <nav className="border-t border-border pt-8">
          <div className="flex justify-between gap-4">
            {prev ? (
              <Link
                href={`/blog/${prev.slug}`}
                className="flex-1 group p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors"
              >
                <div className="flex items-center text-sm text-muted-foreground mb-1">
                  <ChevronLeft className="w-4 h-4 mr-1" />
                  이전 글
                </div>
                <p className="font-medium text-foreground group-hover:text-primary transition-colors line-clamp-1">
                  {prev.title}
                </p>
              </Link>
            ) : (
              <div className="flex-1" />
            )}
            {next ? (
              <Link
                href={`/blog/${next.slug}`}
                className="flex-1 group p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors text-right"
              >
                <div className="flex items-center justify-end text-sm text-muted-foreground mb-1">
                  다음 글
                  <ChevronRight className="w-4 h-4 ml-1" />
                </div>
                <p className="font-medium text-foreground group-hover:text-primary transition-colors line-clamp-1">
                  {next.title}
                </p>
              </Link>
            ) : (
              <div className="flex-1" />
            )}
          </div>
        </nav>
      </main>
    </div>
  )
}
