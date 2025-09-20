"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Heart,
  Share2,
  Search,
  TrendingUp,
  Clock,
  User,
  PenTool,
  LogOut,
  Settings,
  Rocket,
  Zap,
  Trophy,
  Star,
  Swords,
  Target,
} from "lucide-react"
import Link from "next/link"
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
  }
  category: string
  likes: number
  createdAt: string
  readTime: number
  trending: boolean
  featuredImage?: string
}

const mockBlogs: BlogPost[] = [
  {
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
    author: { name: "Sarah Chen", avatar: "/woman-developer.png" },
    category: "Technology",
    likes: 234,
    createdAt: "2024-01-15",
    readTime: 8,
    trending: true,
    featuredImage: "/ai-coding-futuristic-technology.jpg",
  },
  {
    id: "2",
    title: "Sustainable Living: Small Changes, Big Impact",
    excerpt: "Discover simple lifestyle changes that can make a significant difference for our planet.",
    content: `# Sustainable Living: Small Changes, Big Impact

Living sustainably doesn't require a complete lifestyle overhaul. Small, consistent changes in our daily routines can collectively make a significant impact on our planet's health and future.

## Why Sustainable Living Matters

Climate change, pollution, and resource depletion are pressing global challenges that require immediate action. While governments and corporations play crucial roles, individual actions matter too. Every sustainable choice we make contributes to a larger movement toward environmental responsibility.

## Simple Changes for Big Impact

### 1. Reduce Energy Consumption
- Switch to LED light bulbs
- Unplug electronics when not in use
- Use programmable thermostats
- Air-dry clothes instead of using the dryer

### 2. Minimize Water Waste
- Fix leaky faucets promptly
- Take shorter showers
- Collect rainwater for gardening
- Use water-efficient appliances

### 3. Sustainable Transportation
- Walk, bike, or use public transport
- Carpool or rideshare when possible
- Work from home when feasible
- Consider electric or hybrid vehicles

### 4. Conscious Consumption
- Buy only what you need
- Choose quality over quantity
- Support local and sustainable brands
- Reduce single-use plastics

## The Ripple Effect

When we adopt sustainable practices, we inspire others to do the same. Our choices influence our families, friends, and communities, creating a ripple effect that extends far beyond our individual impact.

## Getting Started

Start small and be consistent. Pick one or two changes that feel manageable and gradually incorporate more sustainable practices into your routine. Remember, progress is more important than perfection.

*What sustainable changes have you made in your life? Share your tips and experiences!*`,
    author: { name: "Marcus Green", avatar: "/placeholder-molnk.png" },
    category: "Lifestyle",
    likes: 189,
    createdAt: "2024-01-14",
    readTime: 6,
    trending: true,
    featuredImage: "/sustainable-living-green-environment.jpg",
  },
  {
    id: "3",
    title: "The Art of Minimalist Design",
    excerpt: "Understanding the principles behind effective minimalist design and how to apply them.",
    content: `# The Art of Minimalist Design

Minimalist design is more than just a trend—it's a philosophy that emphasizes clarity, functionality, and intentionality. In our increasingly complex digital world, minimalism offers a refreshing approach to creating meaningful user experiences.

## Core Principles of Minimalist Design

### 1. Less is More
Every element should serve a purpose. Remove anything that doesn't contribute to the user's goals or the overall message.

### 2. White Space is Your Friend
White space (or negative space) isn't empty space—it's a powerful design tool that improves readability, creates focus, and provides visual breathing room.

### 3. Typography Matters
Choose fonts carefully and limit yourself to 2-3 typefaces maximum. Good typography can carry a minimalist design.

### 4. Color with Purpose
Use a limited color palette. Each color should have meaning and contribute to the overall hierarchy and user experience.

## Benefits of Minimalist Design

- **Improved User Experience**: Fewer distractions lead to better focus
- **Faster Loading Times**: Less content means faster websites
- **Better Mobile Experience**: Simplified designs work better on small screens
- **Timeless Appeal**: Minimalist designs age better than trendy alternatives

## Common Mistakes to Avoid

- Confusing minimalism with boring design
- Removing too much functionality
- Ignoring accessibility in favor of aesthetics
- Not considering the target audience

## Implementing Minimalist Design

Start by auditing your current design. Ask yourself: "Does this element serve the user's needs?" If not, consider removing it. Focus on creating clear hierarchies and guiding users toward their goals with intention.

*How has minimalist design influenced your work? Share your thoughts and examples!*`,
    author: { name: "Elena Rodriguez", avatar: "/woman-designer.png" },
    category: "Design",
    likes: 156,
    createdAt: "2024-01-13",
    readTime: 5,
    trending: false,
    featuredImage: "/minimalist-design-clean-modern.jpg",
  },
  {
    id: "4",
    title: "Mental Health in the Digital Age",
    excerpt: "Navigating the challenges of maintaining mental wellness in our hyper-connected world.",
    content: "Full content here...",
    author: { name: "Dr. James Wilson", avatar: "/placeholder-tnmbv.png" },
    category: "Health",
    likes: 298,
    createdAt: "2024-01-12",
    readTime: 10,
    trending: true,
    featuredImage: "/placeholder.svg?key=tnmbv",
  },
  {
    id: "5",
    title: "Journey to Mars: The Next Frontier",
    excerpt: "Exploring humanity's ambitious plans to establish a permanent presence on the Red Planet.",
    content: `# Journey to Mars: The Next Frontier

Mars has captured human imagination for centuries, but today, the dream of reaching the Red Planet is closer to reality than ever before. With advancing technology and renewed international interest, we stand on the brink of becoming a multi-planetary species.

## Why Mars?

Mars presents the most viable option for human colonization beyond Earth. Its day length is similar to Earth's, it has seasons, polar ice caps, and evidence suggests it once had liquid water. While challenging, Mars offers the best chance for establishing a self-sustaining human settlement.

## Current Missions and Progress

### NASA's Artemis Program
NASA's plan to return to the Moon serves as a stepping stone to Mars, testing technologies and procedures needed for the longer journey.

### SpaceX's Starship
Elon Musk's SpaceX is developing Starship, designed specifically for Mars missions with the capability to carry up to 100 people.

### International Collaboration
Countries like China, UAE, and European nations are contributing to Mars exploration through rovers, orbiters, and planned human missions.

## Challenges Ahead

### Technical Challenges
- Radiation exposure during the 6-9 month journey
- Landing large payloads on Mars
- In-situ resource utilization (ISRU)
- Life support systems for extended missions

### Human Factors
- Psychological effects of isolation
- Medical emergencies far from Earth
- Social dynamics in confined spaces
- Adaptation to Martian gravity

## The Timeline

Most experts predict the first human mission to Mars will occur in the 2030s. However, establishing a permanent settlement will likely take several decades and require unprecedented international cooperation.

## Implications for Humanity

A successful Mars colony would represent humanity's greatest achievement, ensuring our species' survival and opening unlimited possibilities for exploration and discovery.

*Do you think humans will successfully colonize Mars? What challenges concern you most?*`,
    author: { name: "Dr. Alex Cosmos", avatar: "/placeholder.svg" },
    category: "Space",
    likes: 445,
    createdAt: "2024-01-16",
    readTime: 12,
    trending: true,
    featuredImage: "/mars-planet-red-surface-space-exploration.jpg",
  },
  {
    id: "6",
    title: "Black Holes: Windows to the Universe",
    excerpt: "Unraveling the mysteries of these cosmic giants and what they teach us about spacetime.",
    content: "Full content here...",
    author: { name: "Prof. Luna Star", avatar: "/placeholder.svg" },
    category: "Space",
    likes: 367,
    createdAt: "2024-01-15",
    readTime: 9,
    trending: true,
    featuredImage: "/placeholder.svg?key=lunastar",
  },
  {
    id: "7",
    title: "Building Scalable Microservices",
    excerpt: "Best practices for designing and implementing microservice architectures that scale.",
    content: "Full content here...",
    author: { name: "David Kumar", avatar: "/placeholder.svg" },
    category: "Technology",
    likes: 278,
    createdAt: "2024-01-14",
    readTime: 11,
    trending: false,
    featuredImage: "/placeholder.svg?key=davidkumar",
  },
  {
    id: "8",
    title: "The Psychology of Color in Design",
    excerpt: "How color choices influence user behavior and emotional responses in digital interfaces.",
    content: "Full content here...",
    author: { name: "Maya Chen", avatar: "/placeholder.svg" },
    category: "Design",
    likes: 203,
    createdAt: "2024-01-13",
    readTime: 7,
    trending: false,
    featuredImage: "/placeholder.svg?key=maya",
  },
  {
    id: "9",
    title: "Meditation for Busy Professionals",
    excerpt: "Simple mindfulness techniques that fit into your hectic schedule and reduce stress.",
    content: "Full content here...",
    author: { name: "Zen Master Kim", avatar: "/placeholder.svg" },
    category: "Health",
    likes: 156,
    createdAt: "2024-01-12",
    readTime: 6,
    trending: false,
    featuredImage: "/placeholder.svg?key=zenmaster",
  },
  {
    id: "10",
    title: "The Space Economy: Trillion Dollar Opportunity",
    excerpt: "How commercial space ventures are creating new industries and economic opportunities.",
    content: "Full content here...",
    author: { name: "Elon Starship", avatar: "/placeholder.svg" },
    category: "Space",
    likes: 512,
    createdAt: "2024-01-11",
    readTime: 14,
    trending: true,
    featuredImage: "/placeholder.svg?key=elonstarship",
  },
  {
    id: "11",
    title: "Remote Work Revolution",
    excerpt: "How distributed teams are reshaping the future of work and company culture.",
    content: "Full content here...",
    author: { name: "Remote Rachel", avatar: "/placeholder.svg" },
    category: "Business",
    likes: 189,
    createdAt: "2024-01-10",
    readTime: 8,
    trending: false,
    featuredImage: "/placeholder.svg?key=remoterachel",
  },
  {
    id: "12",
    title: "Digital Nomad Paradise: Bali Edition",
    excerpt: "A complete guide to living and working remotely from the Island of the Gods.",
    content: "Full content here...",
    author: { name: "Nomad Nick", avatar: "/placeholder.svg" },
    category: "Travel",
    likes: 234,
    createdAt: "2024-01-09",
    readTime: 10,
    trending: false,
    featuredImage: "/placeholder.svg?key=nomadnick",
  },
]

const categories = ["All", "Technology", "Lifestyle", "Design", "Health", "Business", "Travel", "Space"]

export default function HomePage() {
  const { user, isAuthenticated, logout } = useAuth()
  const [blogs, setBlogs] = useState<BlogPost[]>(mockBlogs)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [filteredBlogs, setFilteredBlogs] = useState<BlogPost[]>(mockBlogs)
  const [shareModalBlog, setShareModalBlog] = useState<BlogPost | null>(null)
  const [likedBlogs, setLikedBlogs] = useState<Set<string>>(new Set())

  useEffect(() => {
    if (isAuthenticated && user) {
      const userLikedBlogs = JSON.parse(localStorage.getItem(`likedBlogs_${user.id}`) || "[]")
      setLikedBlogs(new Set(userLikedBlogs))
    }
  }, [isAuthenticated, user])

  useEffect(() => {
    let filtered = blogs

    if (searchTerm) {
      filtered = filtered.filter(
        (blog) =>
          blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          blog.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
          blog.author.name.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    if (selectedCategory !== "All") {
      filtered = filtered.filter((blog) => blog.category === selectedCategory)
    }

    setFilteredBlogs(filtered)
  }, [searchTerm, selectedCategory, blogs])

  const trendingBlogs = blogs.filter((blog) => blog.trending).slice(0, 6)

  const handleLike = (blogId: string) => {
    if (!isAuthenticated) {
      return
    }

    const isCurrentlyLiked = likedBlogs.has(blogId)
    const newLikedBlogs = new Set(likedBlogs)

    if (isCurrentlyLiked) {
      newLikedBlogs.delete(blogId)
    } else {
      newLikedBlogs.add(blogId)
    }

    setLikedBlogs(newLikedBlogs)
    setBlogs((prev) =>
      prev.map((blog) =>
        blog.id === blogId ? { ...blog, likes: isCurrentlyLiked ? blog.likes - 1 : blog.likes + 1 } : blog,
      ),
    )

    if (user) {
      localStorage.setItem(`likedBlogs_${user.id}`, JSON.stringify([...newLikedBlogs]))
    }
  }

  const handleShare = (blog: BlogPost) => {
    setShareModalBlog(blog)
  }

  const truncateText = (text: string, maxLength = 120) => {
    if (text.length <= maxLength) return text
    return text.slice(0, maxLength) + "..."
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b glass-effect sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-gradient-to-br from-primary to-accent animate-glow">
                <Rocket className="h-6 w-6 text-primary-foreground" />
              </div>
              <h1 className="text-2xl font-bold gradient-text">BlogPortal</h1>
            </div>
            <div className="flex items-center gap-4">
              <ThemeToggle />
              {isAuthenticated ? (
                <>
                  <Button
                    asChild
                    className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90"
                  >
                    <Link href="/write">
                      <PenTool className="h-4 w-4 mr-2" />
                      Write Blog
                    </Link>
                  </Button>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="rounded-full">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={user?.avatar || "/placeholder.svg"} alt={user?.name} />
                          <AvatarFallback className="bg-gradient-to-br from-primary to-accent text-primary-foreground">
                            {user?.name?.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="glass-effect">
                      <DropdownMenuItem asChild>
                        <Link href="/profile">
                          <User className="h-4 w-4 mr-2" />
                          Profile
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link href="/quests">
                          <Target className="h-4 w-4 mr-2" />
                          Quests
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link href="/leaderboard">
                          <Trophy className="h-4 w-4 mr-2" />
                          Leaderboard
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link href="/battle">
                          <Swords className="h-4 w-4 mr-2" />
                          Battle Arena
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Settings className="h-4 w-4 mr-2" />
                        Settings
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={logout}>
                        <LogOut className="h-4 w-4 mr-2" />
                        Sign Out
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </>
              ) : (
                <>
                  <Button variant="outline" asChild className="glass-effect bg-transparent">
                    <Link href="/auth/login">Sign In</Link>
                  </Button>
                  <Button
                    asChild
                    className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90"
                  >
                    <Link href="/auth/signup">Sign Up</Link>
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <section className="text-center mb-16 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10 rounded-3xl blur-3xl animate-float"></div>
          <div className="relative">
            <h2 className="text-5xl md:text-7xl font-bold mb-6 text-balance">
              <span className="gradient-text">Share Your</span>
              <br />
              <span className="text-foreground">Stories</span>
            </h2>
            <p className="text-xl text-muted-foreground mb-8 text-pretty max-w-3xl mx-auto leading-relaxed">
              Discover amazing stories, share your thoughts, and connect with writers from around the world. Earn XP,
              unlock badges, and compete in our Battle Arena!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
              <Button
                size="lg"
                asChild
                className="flex-1 bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90"
              >
                <Link href="/write">
                  <Zap className="h-5 w-5 mr-2" />
                  Start Writing
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="flex-1 glass-effect bg-transparent">
                <Star className="h-5 w-5 mr-2" />
                Explore Blogs
              </Button>
            </div>
          </div>
        </section>

        <section className="mb-16">
          <div className="flex items-center gap-3 mb-8">
            <div className="p-2 rounded-lg bg-gradient-to-br from-primary to-accent">
              <TrendingUp className="h-5 w-5 text-primary-foreground" />
            </div>
            <h3 className="text-3xl font-bold gradient-text">Trending Now</h3>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {trendingBlogs.map((blog, index) => (
              <Card
                key={blog.id}
                className={`group card-hover glass-effect border-0 overflow-hidden ${index === 0 ? "md:col-span-2 lg:col-span-1" : ""}`}
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={blog.featuredImage || "/placeholder.svg?height=200&width=400&query=blog post"}
                    alt={blog.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                  <div className="absolute top-3 left-3 flex gap-2">
                    <Badge
                      variant="secondary"
                      className={`${blog.category === "Space" ? "bg-gradient-to-r from-purple-500 to-blue-500 text-white" : "bg-white/90 text-gray-900"}`}
                    >
                      {blog.category === "Space" && <Rocket className="h-3 w-3 mr-1" />}
                      {blog.category}
                    </Badge>
                    <Badge
                      variant="outline"
                      className="text-xs bg-gradient-to-r from-orange-500 to-red-500 text-white border-0"
                    >
                      <TrendingUp className="h-3 w-3 mr-1" />
                      Trending
                    </Badge>
                  </div>
                </div>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg group-hover:text-primary transition-colors text-balance leading-tight">
                    <Link href={`/blog/${blog.id}`}>{blog.title}</Link>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-sm mb-4 text-pretty leading-relaxed">
                    {truncateText(blog.excerpt)}
                    {blog.excerpt.length > 120 && (
                      <Link href={`/blog/${blog.id}`} className="text-primary hover:underline ml-1">
                        Read More
                      </Link>
                    )}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Avatar className="h-6 w-6">
                        <AvatarImage src={blog.author.avatar || "/placeholder.svg"} alt={blog.author.name} />
                        <AvatarFallback className="text-xs">{blog.author.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <span className="text-sm text-muted-foreground">{blog.author.name}</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {blog.readTime}m
                      </span>
                      <button
                        onClick={(e) => {
                          e.preventDefault()
                          handleLike(blog.id)
                        }}
                        className={`flex items-center gap-1 transition-all duration-200 hover:scale-110 ${
                          likedBlogs.has(blog.id) ? "text-red-500 animate-pulse" : "hover:text-red-500"
                        }`}
                        disabled={!isAuthenticated}
                      >
                        <Heart className={`h-4 w-4 ${likedBlogs.has(blog.id) ? "fill-current" : ""}`} />
                        {blog.likes}
                      </button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section className="mb-12">
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search blogs, authors, or topics..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 glass-effect border-0"
              />
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category)}
                className={`${
                  selectedCategory === category
                    ? "bg-gradient-to-r from-primary to-accent text-primary-foreground"
                    : "glass-effect border-0"
                } ${category === "Space" ? "hover:bg-gradient-to-r hover:from-purple-500 hover:to-blue-500" : ""}`}
              >
                {category === "Space" && <Rocket className="h-3 w-3 mr-1" />}
                {category}
              </Button>
            ))}
          </div>
        </section>

        <section>
          <h3 className="text-3xl font-bold mb-8 gradient-text">Latest Blogs</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredBlogs.map((blog) => (
              <Card key={blog.id} className="group card-hover glass-effect border-0 overflow-hidden">
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={blog.featuredImage || "/placeholder.svg?height=200&width=400&query=blog post"}
                    alt={blog.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                  <div className="absolute top-3 left-3 flex gap-2">
                    <Badge
                      variant="secondary"
                      className={`${blog.category === "Space" ? "bg-gradient-to-r from-purple-500 to-blue-500 text-white" : "bg-white/90 text-gray-900"}`}
                    >
                      {blog.category === "Space" && <Rocket className="h-3 w-3 mr-1" />}
                      {blog.category}
                    </Badge>
                    {blog.trending && (
                      <Badge
                        variant="outline"
                        className="text-xs bg-gradient-to-r from-orange-500 to-red-500 text-white border-0"
                      >
                        <TrendingUp className="h-3 w-3 mr-1" />
                        Trending
                      </Badge>
                    )}
                  </div>
                </div>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg group-hover:text-primary transition-colors text-balance leading-tight">
                    <Link href={`/blog/${blog.id}`}>{blog.title}</Link>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-sm mb-4 text-pretty leading-relaxed">
                    {truncateText(blog.excerpt)}
                    {blog.excerpt.length > 120 && (
                      <Link href={`/blog/${blog.id}`} className="text-primary hover:underline ml-1">
                        Read More
                      </Link>
                    )}
                  </p>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <Avatar className="h-6 w-6">
                        <AvatarImage src={blog.author.avatar || "/placeholder.svg"} alt={blog.author.name} />
                        <AvatarFallback className="text-xs">{blog.author.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <span className="text-sm text-muted-foreground">{blog.author.name}</span>
                    </div>
                    <span className="text-xs text-muted-foreground">
                      {new Date(blog.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Clock className="h-3 w-3" />
                      {blog.readTime} min read
                    </span>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleLike(blog.id)}
                        className={`flex items-center gap-1 text-sm transition-all duration-200 hover:scale-110 ${
                          likedBlogs.has(blog.id)
                            ? "text-red-500 animate-pulse"
                            : "text-muted-foreground hover:text-red-500"
                        }`}
                        disabled={!isAuthenticated}
                      >
                        <Heart className={`h-4 w-4 ${likedBlogs.has(blog.id) ? "fill-current" : ""}`} />
                        {blog.likes}
                      </button>
                      <button
                        onClick={() => handleShare(blog)}
                        className="flex items-center gap-1 text-sm text-muted-foreground hover:text-primary transition-colors"
                      >
                        <Share2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </main>

      <footer className="border-t mt-20 py-12 glass-effect">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="p-2 rounded-xl bg-gradient-to-br from-primary to-accent">
              <Rocket className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="text-lg font-bold gradient-text">BlogPortal</span>
          </div>
          <p className="text-muted-foreground">
            Share your stories with the world. Earn XP, unlock achievements, and join the community!
          </p>
        </div>
      </footer>

      {shareModalBlog && (
        <ShareModal isOpen={!!shareModalBlog} onClose={() => setShareModalBlog(null)} blog={shareModalBlog} />
      )}
    </div>
  )
}
