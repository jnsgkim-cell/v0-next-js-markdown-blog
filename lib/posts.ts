import fs from "fs"
import path from "path"
import matter from "gray-matter"

const postsDirectory = path.join(process.cwd(), "content/posts")

export interface Post {
  slug: string
  title: string
  description: string
  date: string
  tags: string[]
  coverImage: string
  relatedPosts: string[]
  content: string
  excerpt: string
}

export interface PostMeta {
  slug: string
  title: string
  description: string
  date: string
  tags: string[]
  coverImage: string
  relatedPosts: string[]
  excerpt: string
}

function getExcerpt(content: string, length: number = 150): string {
  const plainText = content
    .replace(/#{1,6}\s/g, "")
    .replace(/\*\*|__/g, "")
    .replace(/\*|_/g, "")
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/```[\s\S]*?```/g, "")
    .replace(/`([^`]+)`/g, "$1")
    .replace(/\n/g, " ")
    .trim()

  if (plainText.length <= length) return plainText
  return plainText.substring(0, length).trim() + "..."
}

export function getAllPosts(): PostMeta[] {
  if (!fs.existsSync(postsDirectory)) {
    return []
  }

  const fileNames = fs.readdirSync(postsDirectory)
  const allPosts = fileNames
    .filter((fileName) => fileName.endsWith(".md"))
    .map((fileName) => {
      const slug = fileName.replace(/\.md$/, "")
      const fullPath = path.join(postsDirectory, fileName)
      const fileContents = fs.readFileSync(fullPath, "utf8")
      const { data, content } = matter(fileContents)

      return {
        slug,
        title: data.title || "",
        description: data.description || "",
        date: data.date || "",
        tags: data.tags || [],
        coverImage: data.coverImage || "",
        relatedPosts: data.relatedPosts || [],
        excerpt: getExcerpt(content),
      }
    })

  return allPosts.sort((a, b) => (new Date(b.date) > new Date(a.date) ? 1 : -1))
}

export function getPostBySlug(slug: string): Post | null {
  const fullPath = path.join(postsDirectory, `${slug}.md`)

  if (!fs.existsSync(fullPath)) {
    return null
  }

  const fileContents = fs.readFileSync(fullPath, "utf8")
  const { data, content } = matter(fileContents)

  return {
    slug,
    title: data.title || "",
    description: data.description || "",
    date: data.date || "",
    tags: data.tags || [],
    coverImage: data.coverImage || "",
    relatedPosts: data.relatedPosts || [],
    content,
    excerpt: getExcerpt(content),
  }
}

export function getRelatedPosts(slugs: string[]): PostMeta[] {
  return slugs
    .map((slug) => {
      const post = getPostBySlug(slug)
      if (!post) return null
      return {
        slug: post.slug,
        title: post.title,
        description: post.description,
        date: post.date,
        tags: post.tags,
        coverImage: post.coverImage,
        relatedPosts: post.relatedPosts,
        excerpt: post.excerpt,
      }
    })
    .filter((post): post is PostMeta => post !== null)
}

export function getAllTags(): string[] {
  const posts = getAllPosts()
  const tagSet = new Set<string>()
  posts.forEach((post) => {
    post.tags.forEach((tag) => tagSet.add(tag))
  })
  return Array.from(tagSet).sort()
}

export function getAdjacentPosts(
  slug: string
): { prev: PostMeta | null; next: PostMeta | null } {
  const posts = getAllPosts()
  const currentIndex = posts.findIndex((post) => post.slug === slug)

  return {
    prev: currentIndex < posts.length - 1 ? posts[currentIndex + 1] : null,
    next: currentIndex > 0 ? posts[currentIndex - 1] : null,
  }
}
