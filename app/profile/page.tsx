"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, Edit, Save, X, Heart, Eye, Calendar, MapPin, LinkIcon, Bookmark, Settings } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ThemeToggle } from "@/components/theme-toggle"
import { useAuth } from "@/contexts/auth-context"

interface UserBlog {
  id: string
  title: string
  excerpt: string
  category: string
  likes: number
  views: number
  createdAt: string
  status: "published" | "draft"
}

interface UserStats {
  totalBlogs: number
  totalLikes: number
  totalViews: number
  followers: number
  following: number
}

// Mock data
const mockUserBlogs: UserBlog[] = [
  {
    id: "1",
    title: "Getting Started with React Hooks",
    excerpt: "A comprehensive guide to understanding and using React Hooks in your applications.",
    category: "Technology",
    likes: 45,
    views: 234,
    createdAt: "2024-01-10",
    status: "published",
  },
  {
    id: "2",
    title: "The Art of Minimalist Design",
    excerpt: "Exploring the principles of minimalist design and how to apply them effectively.",
    category: "Design",
    likes: 32,
    views: 189,
    createdAt: "2024-01-08",
    status: "published",
  },
  {
    id: "3",
    title: "Building Scalable Web Applications",
    excerpt: "Best practices for creating web applications that can grow with your business.",
    category: "Technology",
    likes: 0,
    views: 0,
    createdAt: "2024-01-15",
    status: "draft",
  },
]

const mockStats: UserStats = {
  totalBlogs: 2,
  totalLikes: 77,
  totalViews: 423,
  followers: 156,
  following: 89,
}

export default function ProfilePage() {
  const router = useRouter()
  const { user, isAuthenticated, updateUser } = useAuth()
  const [isEditing, setIsEditing] = useState(false)
  const [userBlogs, setUserBlogs] = useState<UserBlog[]>(mockUserBlogs)
  const [stats, setStats] = useState<UserStats>(mockStats)
  const [editForm, setEditForm] = useState({
    name: user?.name || "",
    bio: user?.bio || "",
    location: "",
    website: "",
    twitter: "",
  })

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/auth/login")
      return
    }

    if (user) {
      setEditForm({
        name: user.name,
        bio: user.bio || "",
        location: "",
        website: "",
        twitter: "",
      })
    }
  }, [isAuthenticated, user, router])

  const handleSaveProfile = () => {
    if (user) {
      updateUser({
        name: editForm.name,
        bio: editForm.bio,
      })
    }
    setIsEditing(false)
  }

  const handleCancelEdit = () => {
    if (user) {
      setEditForm({
        name: user.name,
        bio: user.bio || "",
        location: "",
        website: "",
        twitter: "",
      })
    }
    setIsEditing(false)
  }

  const publishedBlogs = userBlogs.filter((blog) => blog.status === "published")
  const draftBlogs = userBlogs.filter((blog) => blog.status === "draft")

  if (!isAuthenticated || !user) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Please sign in to view your profile</h1>
          <Button asChild>
            <Link href="/auth/login">Sign In</Link>
          </Button>
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
              <h1 className="text-xl font-semibold">Profile</h1>
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
          {/* Profile Header */}
          <Card className="mb-8">
            <CardContent className="p-8">
              <div className="flex flex-col md:flex-row gap-6">
                <div className="flex flex-col items-center md:items-start">
                  <Avatar className="h-32 w-32 mb-4">
                    <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                    <AvatarFallback className="text-2xl">{user.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <Button variant="outline" size="sm">
                    <Settings className="h-4 w-4 mr-2" />
                    Change Photo
                  </Button>
                </div>

                <div className="flex-1">
                  {isEditing ? (
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Name</Label>
                        <Input
                          id="name"
                          value={editForm.name}
                          onChange={(e) => setEditForm((prev) => ({ ...prev, name: e.target.value }))}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="bio">Bio</Label>
                        <Textarea
                          id="bio"
                          placeholder="Tell us about yourself..."
                          value={editForm.bio}
                          onChange={(e) => setEditForm((prev) => ({ ...prev, bio: e.target.value }))}
                          rows={3}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="location">Location</Label>
                        <Input
                          id="location"
                          placeholder="Where are you based?"
                          value={editForm.location}
                          onChange={(e) => setEditForm((prev) => ({ ...prev, location: e.target.value }))}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="website">Website</Label>
                        <Input
                          id="website"
                          placeholder="https://yourwebsite.com"
                          value={editForm.website}
                          onChange={(e) => setEditForm((prev) => ({ ...prev, website: e.target.value }))}
                        />
                      </div>
                      <div className="flex gap-2">
                        <Button onClick={handleSaveProfile}>
                          <Save className="h-4 w-4 mr-2" />
                          Save Changes
                        </Button>
                        <Button variant="outline" onClick={handleCancelEdit}>
                          <X className="h-4 w-4 mr-2" />
                          Cancel
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div className="flex items-start justify-between">
                        <div>
                          <h1 className="text-3xl font-bold mb-2">{user.name}</h1>
                          <p className="text-muted-foreground mb-4">
                            {user.bio || "Passionate writer sharing thoughts and insights."}
                          </p>
                        </div>
                        <Button variant="outline" onClick={() => setIsEditing(true)}>
                          <Edit className="h-4 w-4 mr-2" />
                          Edit Profile
                        </Button>
                      </div>

                      <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          Joined January 2024
                        </div>
                        <div className="flex items-center gap-1">
                          <MapPin className="h-4 w-4" />
                          San Francisco, CA
                        </div>
                        <div className="flex items-center gap-1">
                          <LinkIcon className="h-4 w-4" />
                          <a href="#" className="hover:text-primary">
                            yourwebsite.com
                          </a>
                        </div>
                      </div>

                      {/* Stats */}
                      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 pt-4">
                        <div className="text-center">
                          <div className="text-2xl font-bold">{stats.totalBlogs}</div>
                          <div className="text-sm text-muted-foreground">Blogs</div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold">{stats.totalLikes}</div>
                          <div className="text-sm text-muted-foreground">Likes</div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold">{stats.totalViews}</div>
                          <div className="text-sm text-muted-foreground">Views</div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold">{stats.followers}</div>
                          <div className="text-sm text-muted-foreground">Followers</div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold">{stats.following}</div>
                          <div className="text-sm text-muted-foreground">Following</div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Content Tabs */}
          <Tabs defaultValue="published" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="published">Published ({publishedBlogs.length})</TabsTrigger>
              <TabsTrigger value="drafts">Drafts ({draftBlogs.length})</TabsTrigger>
              <TabsTrigger value="liked">Liked</TabsTrigger>
              <TabsTrigger value="bookmarks">Bookmarks</TabsTrigger>
            </TabsList>

            {/* Published Blogs */}
            <TabsContent value="published" className="space-y-6">
              {publishedBlogs.length > 0 ? (
                <div className="grid gap-6">
                  {publishedBlogs.map((blog) => (
                    <Card key={blog.id} className="hover:shadow-md transition-shadow">
                      <CardContent className="p-6">
                        <div className="flex justify-between items-start mb-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <Badge variant="secondary">{blog.category}</Badge>
                              <Badge variant="outline">Published</Badge>
                            </div>
                            <h3 className="text-xl font-semibold mb-2 hover:text-primary cursor-pointer">
                              <Link href={`/blog/${blog.id}`}>{blog.title}</Link>
                            </h3>
                            <p className="text-muted-foreground mb-4 text-pretty">{blog.excerpt}</p>
                          </div>
                        </div>
                        <div className="flex items-center justify-between text-sm text-muted-foreground">
                          <span>{new Date(blog.createdAt).toLocaleDateString()}</span>
                          <div className="flex items-center gap-4">
                            <span className="flex items-center gap-1">
                              <Heart className="h-4 w-4" />
                              {blog.likes}
                            </span>
                            <span className="flex items-center gap-1">
                              <Eye className="h-4 w-4" />
                              {blog.views}
                            </span>
                            <Button variant="ghost" size="sm">
                              <Edit className="h-4 w-4 mr-2" />
                              Edit
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <h3 className="text-lg font-semibold mb-2">No published blogs yet</h3>
                  <p className="text-muted-foreground mb-4">Start writing and share your thoughts with the world!</p>
                  <Button asChild>
                    <Link href="/write">Write Your First Blog</Link>
                  </Button>
                </div>
              )}
            </TabsContent>

            {/* Draft Blogs */}
            <TabsContent value="drafts" className="space-y-6">
              {draftBlogs.length > 0 ? (
                <div className="grid gap-6">
                  {draftBlogs.map((blog) => (
                    <Card key={blog.id} className="hover:shadow-md transition-shadow">
                      <CardContent className="p-6">
                        <div className="flex justify-between items-start mb-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <Badge variant="secondary">{blog.category}</Badge>
                              <Badge variant="outline">Draft</Badge>
                            </div>
                            <h3 className="text-xl font-semibold mb-2">{blog.title}</h3>
                            <p className="text-muted-foreground mb-4 text-pretty">{blog.excerpt}</p>
                          </div>
                        </div>
                        <div className="flex items-center justify-between text-sm text-muted-foreground">
                          <span>Last edited {new Date(blog.createdAt).toLocaleDateString()}</span>
                          <div className="flex items-center gap-2">
                            <Button variant="ghost" size="sm">
                              <Edit className="h-4 w-4 mr-2" />
                              Continue Writing
                            </Button>
                            <Button size="sm">Publish</Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <h3 className="text-lg font-semibold mb-2">No drafts</h3>
                  <p className="text-muted-foreground">All your draft blogs will appear here.</p>
                </div>
              )}
            </TabsContent>

            {/* Liked Blogs */}
            <TabsContent value="liked" className="space-y-6">
              <div className="text-center py-12">
                <Heart className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                <h3 className="text-lg font-semibold mb-2">No liked blogs yet</h3>
                <p className="text-muted-foreground">Blogs you like will appear here.</p>
              </div>
            </TabsContent>

            {/* Bookmarked Blogs */}
            <TabsContent value="bookmarks" className="space-y-6">
              <div className="text-center py-12">
                <Bookmark className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                <h3 className="text-lg font-semibold mb-2">No bookmarks yet</h3>
                <p className="text-muted-foreground">Blogs you bookmark will appear here.</p>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  )
}
