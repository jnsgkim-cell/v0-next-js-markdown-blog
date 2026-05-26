import Link from "next/link"
import Image from "next/image"
import type { PostMeta } from "@/lib/posts"

interface PostCardProps {
  post: PostMeta
}

export function PostCard({ post }: PostCardProps) {
  return (
    <Link href={`/blog/${post.slug}`} className="group block">
      <article className="bg-card border border-border rounded-lg overflow-hidden hover:shadow-md transition-shadow">
        {post.coverImage && (
          <div className="relative h-48 w-full overflow-hidden">
            <Image
              src={post.coverImage}
              alt={post.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </div>
        )}
        <div className="p-5">
          <div className="flex flex-wrap gap-2 mb-3">
            {post.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="text-xs px-2 py-1 bg-secondary text-secondary-foreground rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
          <h2 className="text-lg font-semibold text-card-foreground mb-2 group-hover:text-primary transition-colors line-clamp-2">
            {post.title}
          </h2>
          <p className="text-muted-foreground text-sm mb-3 line-clamp-2">
            {post.description}
          </p>
          <time className="text-xs text-muted-foreground">
            {new Date(post.date).toLocaleDateString("ko-KR", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </time>
        </div>
      </article>
    </Link>
  )
}

export function PostCardCompact({ post }: PostCardProps) {
  return (
    <Link href={`/blog/${post.slug}`} className="group block">
      <article className="flex gap-4 p-4 bg-card border border-border rounded-lg hover:shadow-md transition-shadow">
        {post.coverImage && (
          <div className="relative w-24 h-24 flex-shrink-0 rounded-md overflow-hidden">
            <Image
              src={post.coverImage}
              alt={post.title}
              fill
              className="object-cover"
            />
          </div>
        )}
        <div className="flex-1 min-w-0">
          <h3 className="font-medium text-card-foreground group-hover:text-primary transition-colors line-clamp-1 mb-1">
            {post.title}
          </h3>
          <p className="text-sm text-muted-foreground line-clamp-2">
            {post.description}
          </p>
        </div>
      </article>
    </Link>
  )
}
