"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"
import { Heart, Share2, ArrowLeft, Clock, MessageCircle, Send, Bookmark } from "lucide-react"
import Link from "next/link"
import { useParams } from "next/navigation"
import { ThemeToggle } from "@/components/theme-toggle"
import { ShareModal } from "@/components/share-modal"
import { useAuth } from "@/contexts/auth-context"

interface BlogPost {
  id: string
  title: string
  excerpt: string
  content: string
  author: {
    name: string
    avatar: string
    bio?: string
  }
  category: string
  tags: string[]
  likes: number
  createdAt: string
  readTime: number
  trending: boolean
}

interface Comment {
  id: string
  author: {
    name: string
    avatar: string
  }
  content: string
  createdAt: string
  likes: number
}

// Mock data - in real app this would come from API/database
const mockBlog: BlogPost = {
  id: "1",
  title: "The Future of Web Development: AI-Powered Coding",
  excerpt: "Exploring how artificial intelligence is revolutionizing the way we write code and build applications.",
  content: `# The Future of Web Development: AI-Powered Coding

The landscape of web development is undergoing a revolutionary transformation. As we stand at the intersection of artificial intelligence and software engineering, we're witnessing unprecedented changes in how we approach coding, design, and problem-solving.

## The Rise of AI-Assisted Development

Artificial Intelligence has moved beyond being a buzzword to becoming an integral part of the development workflow. Tools like GitHub Copilot, ChatGPT, and specialized coding assistants are not just helping developers write code faster—they're fundamentally changing how we think about programming.

### Key Benefits of AI in Development

**1. Enhanced Productivity**
AI-powered tools can generate boilerplate code, suggest optimizations, and even write entire functions based on natural language descriptions. This allows developers to focus on higher-level architecture and creative problem-solving.

**2. Improved Code Quality**
Modern AI tools can identify potential bugs, security vulnerabilities, and performance issues before they make it to production. They serve as an additional layer of code review that never gets tired or overlooks details.

**3. Learning and Skill Development**
For new developers, AI assistants act as mentors, explaining complex concepts and providing real-time guidance. They democratize access to expert-level knowledge and best practices.

## The Human Element Remains Crucial

While AI is transforming development, the human element remains irreplaceable. Creativity, empathy, and understanding of user needs are uniquely human traits that no AI can replicate. The future lies not in AI replacing developers, but in AI augmenting human capabilities.

### What This Means for Developers

- **Embrace continuous learning**: Stay updated with AI tools and techniques
- **Focus on problem-solving**: Let AI handle routine tasks while you tackle complex challenges
- **Develop soft skills**: Communication, teamwork, and user empathy become even more valuable

## Looking Ahead

The future of web development is bright and full of possibilities. As AI continues to evolve, we can expect even more sophisticated tools that will make development more accessible, efficient, and enjoyable.

The key is to view AI as a powerful ally in our development journey, not a threat to our profession. By embracing these tools and focusing on what makes us uniquely human, we can build better software and create more meaningful digital experiences.

*What are your thoughts on AI in development? Share your experiences in the comments below.*`,
  author: {
    name: "Sarah Chen",
    avatar: "/woman-developer.png",
    bio: "Full-stack developer and AI enthusiast. Building the future of web development one line of code at a time.",
  },
  category: "Technology",
  tags: ["AI", "Web Development", "Future Tech", "Programming"],
  likes: 234,
  createdAt: "2024-01-15",
  readTime: 8,
  trending: true,
}

const mockComments: Comment[] = [
  {
    id: "1",
    author: { name: "Alex Johnson", avatar: "/placeholder.svg?key=alex" },
    content:
      "Great article! I've been using AI tools in my workflow for the past year and the productivity gains are incredible. The key is finding the right balance between AI assistance and human creativity.",
    createdAt: "2024-01-16",
    likes: 12,
  },
  {
    id: "2",
    author: { name: "Maria Rodriguez", avatar: "/placeholder.svg?key=maria" },
    content:
      "I appreciate your perspective on AI being an ally rather than a threat. As someone new to development, AI tools have been invaluable for learning and understanding complex concepts.",
    createdAt: "2024-01-16",
    likes: 8,
  },
  {
    id: "3",
    author: { name: "David Kim", avatar: "/placeholder.svg?key=david" },
    content:
      "The point about soft skills becoming more important is spot on. While AI can write code, it can't understand user needs or communicate with stakeholders effectively.",
    createdAt: "2024-01-17",
    likes: 15,
  },
]

export default function BlogPage() {
  const params = useParams()
  const { user, isAuthenticated } = useAuth()
  const [blog, setBlog] = useState<BlogPost>(mockBlog)
  const [comments, setComments] = useState<Comment[]>(mockComments)
  const [newComment, setNewComment] = useState("")
  const [isLiked, setIsLiked] = useState(false)
  const [isBookmarked, setIsBookmarked] = useState(false)
  const [showShareModal, setShowShareModal] = useState(false)
  const [likedComments, setLikedComments] = useState<Set<string>>(new Set())

  useEffect(() => {
    if (isAuthenticated && user) {
      const likedBlogs = JSON.parse(localStorage.getItem(`likedBlogs_${user.id}`) || "[]")
      setIsLiked(likedBlogs.includes(blog.id))

      const bookmarkedBlogs = JSON.parse(localStorage.getItem(`bookmarkedBlogs_${user.id}`) || "[]")
      setIsBookmarked(bookmarkedBlogs.includes(blog.id))
    }
  }, [isAuthenticated, user, blog.id])

  const handleLike = () => {
    if (!isAuthenticated) {
      // Redirect to login or show login modal
      return
    }

    const newLikedState = !isLiked
    setIsLiked(newLikedState)
    setBlog((prev) => ({
      ...prev,
      likes: newLikedState ? prev.likes + 1 : prev.likes - 1,
    }))

    if (user) {
      const likedBlogs = JSON.parse(localStorage.getItem(`likedBlogs_${user.id}`) || "[]")
      if (newLikedState) {
        likedBlogs.push(blog.id)
      } else {
        const index = likedBlogs.indexOf(blog.id)
        if (index > -1) likedBlogs.splice(index, 1)
      }
      localStorage.setItem(`likedBlogs_${user.id}`, JSON.stringify(likedBlogs))
    }
  }

  const handleShare = () => {
    setShowShareModal(true)
  }

  const handleBookmark = () => {
    if (!isAuthenticated) {
      return
    }

    const newBookmarkedState = !isBookmarked
    setIsBookmarked(newBookmarkedState)

    if (user) {
      const bookmarkedBlogs = JSON.parse(localStorage.getItem(`bookmarkedBlogs_${user.id}`) || "[]")
      if (newBookmarkedState) {
        bookmarkedBlogs.push(blog.id)
      } else {
        const index = bookmarkedBlogs.indexOf(blog.id)
        if (index > -1) bookmarkedBlogs.splice(index, 1)
      }
      localStorage.setItem(`bookmarkedBlogs_${user.id}`, JSON.stringify(bookmarkedBlogs))
    }
  }

  const handleCommentSubmit = () => {
    if (!newComment.trim() || !isAuthenticated || !user) return

    const comment: Comment = {
      id: Date.now().toString(),
      author: { name: user.name, avatar: user.avatar },
      content: newComment,
      createdAt: new Date().toISOString(),
      likes: 0,
    }

    setComments((prev) => [comment, ...prev])
    setNewComment("")
  }

  const handleCommentLike = (commentId: string) => {
    if (!isAuthenticated) return

    const isCommentLiked = likedComments.has(commentId)
    const newLikedComments = new Set(likedComments)

    if (isCommentLiked) {
      newLikedComments.delete(commentId)
    } else {
      newLikedComments.add(commentId)
    }

    setLikedComments(newLikedComments)
    setComments((prev) =>
      prev.map((comment) =>
        comment.id === commentId
          ? { ...comment, likes: isCommentLiked ? comment.likes - 1 : comment.likes + 1 }
          : comment,
      ),
    )
  }

  const renderMarkdown = (content: string) => {
    // Simple markdown rendering - in real app you'd use a proper markdown parser
    return content.split("\n").map((line, index) => {
      if (line.startsWith("# ")) {
        return (
          <h1 key={index} className="text-3xl font-bold mt-8 mb-4 first:mt-0">
            {line.slice(2)}
          </h1>
        )
      }
      if (line.startsWith("## ")) {
        return (
          <h2 key={index} className="text-2xl font-semibold mt-6 mb-3">
            {line.slice(3)}
          </h2>
        )
      }
      if (line.startsWith("### ")) {
        return (
          <h3 key={index} className="text-xl font-semibold mt-4 mb-2">
            {line.slice(4)}
          </h3>
        )
      }
      if (line.startsWith("**") && line.endsWith("**")) {
        return (
          <p key={index} className="font-semibold mt-4 mb-2">
            {line.slice(2, -2)}
          </p>
        )
      }
      if (line.startsWith("*") && line.endsWith("*") && !line.startsWith("**")) {
        return (
          <p key={index} className="italic mt-2 mb-2">
            {line.slice(1, -1)}
          </p>
        )
      }
      if (line.trim() === "") {
        return <br key={index} />
      }
      return (
        <p key={index} className="mb-4 leading-relaxed text-pretty">
          {line}
        </p>
      )
    })
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon" asChild>
                <Link href="/">
                  <ArrowLeft className="h-4 w-4" />
                </Link>
              </Button>
              <h1 className="text-xl font-semibold">BlogPortal</h1>
            </div>
            <div className="flex items-center gap-2">
              <ThemeToggle />
              <Button asChild>
                <Link href="/write">Write Blog</Link>
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Blog Header */}
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <Badge>{blog.category}</Badge>
              {blog.tags.map((tag) => (
                <Badge key={tag} variant="outline">
                  #{tag}
                </Badge>
              ))}
              {blog.trending && (
                <Badge variant="outline" className="text-xs">
                  Trending
                </Badge>
              )}
            </div>

            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-balance">{blog.title}</h1>
            <p className="text-xl text-muted-foreground mb-6 text-pretty">{blog.excerpt}</p>

            {/* Author and Meta Info */}
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div className="flex items-center gap-3">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={blog.author.avatar || "/placeholder.svg"} alt={blog.author.name} />
                  <AvatarFallback>{blog.author.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-semibold">{blog.author.name}</p>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span>
                      {new Date(blog.createdAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {blog.readTime} min read
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleLike}
                  className={isLiked ? "text-red-500 border-red-200 bg-red-50 dark:bg-red-900/20" : ""}
                  disabled={!isAuthenticated}
                >
                  <Heart className={`h-4 w-4 mr-2 ${isLiked ? "fill-current" : ""}`} />
                  {blog.likes}
                </Button>
                <Button variant="outline" size="sm" onClick={handleShare}>
                  <Share2 className="h-4 w-4 mr-2" />
                  Share
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleBookmark}
                  className={isBookmarked ? "text-blue-500 border-blue-200 bg-blue-50 dark:bg-blue-900/20" : ""}
                  disabled={!isAuthenticated}
                >
                  <Bookmark className={`h-4 w-4 ${isBookmarked ? "fill-current" : ""}`} />
                </Button>
              </div>
            </div>
          </div>

          <Separator className="mb-8" />

          {/* Blog Content */}
          <article className="prose prose-gray dark:prose-invert max-w-none mb-12">
            <div className="text-foreground">{renderMarkdown(blog.content)}</div>
          </article>

          <Separator className="mb-8" />

          {/* Author Bio */}
          <Card className="mb-8">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <Avatar className="h-16 w-16">
                  <AvatarImage src={blog.author.avatar || "/placeholder.svg"} alt={blog.author.name} />
                  <AvatarFallback>{blog.author.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold mb-2">About {blog.author.name}</h3>
                  <p className="text-muted-foreground text-pretty">
                    {blog.author.bio ||
                      "Passionate writer and thought leader sharing insights on technology and innovation."}
                  </p>
                  <Button variant="outline" size="sm" className="mt-3 bg-transparent">
                    Follow
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Comments Section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageCircle className="h-5 w-5" />
                Comments ({comments.length})
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Add Comment */}
              {isAuthenticated ? (
                <div className="space-y-3">
                  <Textarea
                    placeholder="Share your thoughts on this blog post..."
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    rows={3}
                  />
                  <div className="flex justify-end">
                    <Button onClick={handleCommentSubmit} disabled={!newComment.trim()}>
                      <Send className="h-4 w-4 mr-2" />
                      Post Comment
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="text-center py-4">
                  <p className="text-muted-foreground mb-4">Sign in to join the conversation</p>
                  <Button asChild>
                    <Link href="/auth/login">Sign In</Link>
                  </Button>
                </div>
              )}

              <Separator />

              {/* Comments List */}
              <div className="space-y-6">
                {comments.map((comment) => (
                  <div key={comment.id} className="space-y-3">
                    <div className="flex items-start gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={comment.author.avatar || "/placeholder.svg"} alt={comment.author.name} />
                        <AvatarFallback>{comment.author.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1 space-y-2">
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-sm">{comment.author.name}</span>
                          <span className="text-xs text-muted-foreground">
                            {new Date(comment.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                        <p className="text-sm text-pretty leading-relaxed">{comment.content}</p>
                        <div className="flex items-center gap-4">
                          <button
                            onClick={() => handleCommentLike(comment.id)}
                            className={`flex items-center gap-1 text-xs transition-colors ${
                              likedComments.has(comment.id)
                                ? "text-red-500"
                                : "text-muted-foreground hover:text-red-500"
                            }`}
                            disabled={!isAuthenticated}
                          >
                            <Heart className={`h-3 w-3 ${likedComments.has(comment.id) ? "fill-current" : ""}`} />
                            {comment.likes}
                          </button>
                          <button className="text-xs text-muted-foreground hover:text-foreground transition-colors">
                            Reply
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      {/* Share Modal */}
      <ShareModal isOpen={showShareModal} onClose={() => setShowShareModal(false)} blog={blog} />
    </div>
  )
}
