"use client"

import { useState, useMemo } from "react"
import type { PostMeta } from "@/lib/posts"
import { PostCard } from "./post-card"
import { Search, X } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

interface BlogListProps {
  posts: PostMeta[]
  allTags: string[]
}

export function BlogList({ posts, allTags }: BlogListProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedTag, setSelectedTag] = useState<string | null>(null)

  const filteredPosts = useMemo(() => {
    return posts.filter((post) => {
      const matchesSearch =
        searchQuery === "" ||
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.tags.some((tag) =>
          tag.toLowerCase().includes(searchQuery.toLowerCase())
        )

      const matchesTag = !selectedTag || post.tags.includes(selectedTag)

      return matchesSearch && matchesTag
    })
  }, [posts, searchQuery, selectedTag])

  return (
    <div>
      {/* Search and Filter */}
      <div className="mb-8 space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="포스트 검색..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Tags Filter */}
        <div className="flex flex-wrap gap-2">
          <Button
            variant={selectedTag === null ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedTag(null)}
            className="text-xs"
          >
            전체
          </Button>
          {allTags.map((tag) => (
            <Button
              key={tag}
              variant={selectedTag === tag ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedTag(selectedTag === tag ? null : tag)}
              className="text-xs"
            >
              {tag}
            </Button>
          ))}
        </div>

        {/* Active Filters */}
        {(searchQuery || selectedTag) && (
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span>{filteredPosts.length}개의 포스트</span>
            {(searchQuery || selectedTag) && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  setSearchQuery("")
                  setSelectedTag(null)
                }}
                className="h-auto p-1"
              >
                <X className="w-3 h-3 mr-1" />
                필터 초기화
              </Button>
            )}
          </div>
        )}
      </div>

      {/* Posts Grid */}
      {filteredPosts.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2">
          {filteredPosts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12 text-muted-foreground">
          <p>검색 결과가 없습니다.</p>
        </div>
      )}
    </div>
  )
}
