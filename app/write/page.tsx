"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { ArrowLeft, Save, Eye, Send, ImageIcon, Bold, Italic, List, Link2, Quote } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ThemeToggle } from "@/components/theme-toggle"

const categories = ["Technology", "Lifestyle", "Design", "Health", "Business", "Travel", "Food", "Sports"]

interface BlogPost {
  title: string
  excerpt: string
  content: string
  category: string
  tags: string[]
  isDraft: boolean
  featuredImage?: string
}

export default function WritePage() {
  const router = useRouter()
  const [blogPost, setBlogPost] = useState<BlogPost>({
    title: "",
    excerpt: "",
    content: "",
    category: "",
    tags: [],
    isDraft: true,
    featuredImage: "",
  })
  const [tagInput, setTagInput] = useState("")
  const [isPreview, setIsPreview] = useState(false)
  const [isSaving, setIsSaving] = useState(false)

  const handleInputChange = (field: keyof BlogPost, value: string | boolean) => {
    setBlogPost((prev) => ({ ...prev, [field]: value }))
  }

  const addTag = () => {
    if (tagInput.trim() && !blogPost.tags.includes(tagInput.trim())) {
      setBlogPost((prev) => ({
        ...prev,
        tags: [...prev.tags, tagInput.trim()],
      }))
      setTagInput("")
    }
  }

  const removeTag = (tagToRemove: string) => {
    setBlogPost((prev) => ({
      ...prev,
      tags: prev.tags.filter((tag) => tag !== tagToRemove),
    }))
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault()
      addTag()
    }
  }

  const insertFormatting = (format: string) => {
    const textarea = document.getElementById("content") as HTMLTextAreaElement
    if (!textarea) return

    const start = textarea.selectionStart
    const end = textarea.selectionEnd
    const selectedText = textarea.value.substring(start, end)

    let formattedText = ""
    switch (format) {
      case "bold":
        formattedText = `**${selectedText || "bold text"}**`
        break
      case "italic":
        formattedText = `*${selectedText || "italic text"}*`
        break
      case "list":
        formattedText = `\n- ${selectedText || "list item"}\n`
        break
      case "link":
        formattedText = `[${selectedText || "link text"}](url)`
        break
      case "quote":
        formattedText = `\n> ${selectedText || "quote text"}\n`
        break
      default:
        return
    }

    const newContent = textarea.value.substring(0, start) + formattedText + textarea.value.substring(end)

    setBlogPost((prev) => ({ ...prev, content: newContent }))

    // Set cursor position after formatting
    setTimeout(() => {
      textarea.focus()
      textarea.setSelectionRange(start + formattedText.length, start + formattedText.length)
    }, 0)
  }

  const saveDraft = async () => {
    setIsSaving(true)
    // Simulate saving to localStorage or API
    const drafts = JSON.parse(localStorage.getItem("blogDrafts") || "[]")
    const draftWithId = { ...blogPost, id: Date.now().toString(), updatedAt: new Date().toISOString() }
    drafts.push(draftWithId)
    localStorage.setItem("blogDrafts", JSON.stringify(drafts))

    setTimeout(() => {
      setIsSaving(false)
      // You could add a toast notification here
    }, 1000)
  }

  const publishBlog = async () => {
    if (!blogPost.title || !blogPost.content || !blogPost.category) {
      alert("Please fill in all required fields")
      return
    }

    setIsSaving(true)
    // Simulate publishing
    const publishedBlog = {
      ...blogPost,
      id: Date.now().toString(),
      isDraft: false,
      publishedAt: new Date().toISOString(),
      author: { name: "Current User", avatar: "/placeholder.svg" }, // This would come from auth
      likes: 0,
      readTime: Math.ceil(blogPost.content.split(" ").length / 200), // Rough estimate
    }

    // Save to localStorage (in real app, this would be an API call)
    const publishedBlogs = JSON.parse(localStorage.getItem("publishedBlogs") || "[]")
    publishedBlogs.unshift(publishedBlog)
    localStorage.setItem("publishedBlogs", JSON.stringify(publishedBlogs))

    setTimeout(() => {
      setIsSaving(false)
      router.push(`/blog/${publishedBlog.id}`)
    }, 1000)
  }

  const renderPreview = () => {
    return (
      <div className="prose prose-gray dark:prose-invert max-w-none">
        <h1 className="text-3xl font-bold mb-4">{blogPost.title || "Your Blog Title"}</h1>
        {blogPost.excerpt && <p className="text-lg text-muted-foreground mb-6 italic">{blogPost.excerpt}</p>}
        <div className="flex items-center gap-2 mb-6">
          {blogPost.category && <Badge>{blogPost.category}</Badge>}
          {blogPost.tags.map((tag) => (
            <Badge key={tag} variant="outline">
              #{tag}
            </Badge>
          ))}
        </div>
        <div className="whitespace-pre-wrap leading-relaxed">
          {blogPost.content || "Start writing your blog content..."}
        </div>
      </div>
    )
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
              <h1 className="text-xl font-semibold">Write Blog</h1>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={() => setIsPreview(!isPreview)}>
                <Eye className="h-4 w-4 mr-2" />
                {isPreview ? "Edit" : "Preview"}
              </Button>
              <Button variant="outline" size="sm" onClick={saveDraft} disabled={isSaving}>
                <Save className="h-4 w-4 mr-2" />
                {isSaving ? "Saving..." : "Save Draft"}
              </Button>
              <Button size="sm" onClick={publishBlog} disabled={isSaving}>
                <Send className="h-4 w-4 mr-2" />
                Publish
              </Button>
              <ThemeToggle />
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {isPreview ? (
            <Card>
              <CardContent className="p-8">{renderPreview()}</CardContent>
            </Card>
          ) : (
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Main Editor */}
              <div className="lg:col-span-2 space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Write Your Blog</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Title */}
                    <div className="space-y-2">
                      <Label htmlFor="title">Title *</Label>
                      <Input
                        id="title"
                        placeholder="Enter your blog title..."
                        value={blogPost.title}
                        onChange={(e) => handleInputChange("title", e.target.value)}
                        className="text-lg"
                      />
                    </div>

                    {/* Excerpt */}
                    <div className="space-y-2">
                      <Label htmlFor="excerpt">Excerpt</Label>
                      <Textarea
                        id="excerpt"
                        placeholder="Write a brief description of your blog..."
                        value={blogPost.excerpt}
                        onChange={(e) => handleInputChange("excerpt", e.target.value)}
                        rows={3}
                      />
                    </div>

                    {/* Formatting Toolbar */}
                    <div className="flex items-center gap-2 p-2 border rounded-md bg-muted/50">
                      <Button variant="ghost" size="sm" onClick={() => insertFormatting("bold")} title="Bold">
                        <Bold className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => insertFormatting("italic")} title="Italic">
                        <Italic className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => insertFormatting("list")} title="List">
                        <List className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => insertFormatting("link")} title="Link">
                        <Link2 className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => insertFormatting("quote")} title="Quote">
                        <Quote className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => console.log("Insert Image")} title="Image">
                        <ImageIcon className="h-4 w-4" />
                      </Button>
                    </div>

                    {/* Content */}
                    <div className="space-y-2">
                      <Label htmlFor="content">Content *</Label>
                      <Textarea
                        id="content"
                        placeholder="Start writing your blog content here... Use markdown formatting like **bold**, *italic*, and > quotes."
                        value={blogPost.content}
                        onChange={(e) => handleInputChange("content", e.target.value)}
                        rows={20}
                        className="font-mono text-sm leading-relaxed"
                      />
                      <p className="text-xs text-muted-foreground">
                        Supports markdown formatting. Word count:{" "}
                        {blogPost.content.split(" ").filter((word) => word.length > 0).length}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Publishing Options */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Publishing</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="draft-toggle">Save as Draft</Label>
                      <Switch
                        id="draft-toggle"
                        checked={blogPost.isDraft}
                        onCheckedChange={(checked) => handleInputChange("isDraft", checked)}
                      />
                    </div>
                    <Separator />
                    <div className="space-y-2">
                      <Label>Category *</Label>
                      <Select value={blogPost.category} onValueChange={(value) => handleInputChange("category", value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a category" />
                        </SelectTrigger>
                        <SelectContent>
                          {categories.map((category) => (
                            <SelectItem key={category} value={category}>
                              {category}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </CardContent>
                </Card>

                {/* Tags */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Tags</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex gap-2">
                      <Input
                        placeholder="Add a tag..."
                        value={tagInput}
                        onChange={(e) => setTagInput(e.target.value)}
                        onKeyPress={handleKeyPress}
                      />
                      <Button onClick={addTag} size="sm">
                        Add
                      </Button>
                    </div>
                    {blogPost.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {blogPost.tags.map((tag) => (
                          <Badge
                            key={tag}
                            variant="secondary"
                            className="cursor-pointer"
                            onClick={() => removeTag(tag)}
                          >
                            #{tag} ×
                          </Badge>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Writing Tips */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Writing Tips</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3 text-sm text-muted-foreground">
                    <p>• Use a compelling title that grabs attention</p>
                    <p>• Write a clear excerpt to summarize your post</p>
                    <p>• Break up long paragraphs for better readability</p>
                    <p>• Use markdown for formatting: **bold**, *italic*</p>
                    <p>• Add relevant tags to help readers find your content</p>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
