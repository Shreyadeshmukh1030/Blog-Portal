"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Trophy, Crown, Medal, TrendingUp, Heart, PenTool, Flame, Star } from "lucide-react"
import Link from "next/link"
import { useAuth } from "@/contexts/auth-context"

interface LeaderboardUser {
  id: string
  name: string
  avatar: string
  level: number
  xp: number
  rank: number
  stats: {
    posts: number
    likes: number
    comments: number
    trending: number
    streak: number
  }
  badges: {
    id: string
    name: string
    icon: string
    rarity: "common" | "rare" | "epic" | "legendary"
  }[]
}

const mockLeaderboard: LeaderboardUser[] = [
  {
    id: "1",
    name: "Sarah Chen",
    avatar: "/woman-developer.png",
    level: 15,
    xp: 2450,
    rank: 1,
    stats: { posts: 24, likes: 1250, comments: 89, trending: 8, streak: 15 },
    badges: [
      { id: "legendary-writer", name: "Legendary Writer", icon: "👑", rarity: "legendary" },
      { id: "trendsetter", name: "Trendsetter", icon: "🔥", rarity: "rare" },
      { id: "space-explorer", name: "Space Explorer", icon: "🚀", rarity: "epic" },
    ],
  },
  {
    id: "2",
    name: "Dr. Alex Cosmos",
    avatar: "/placeholder.svg",
    level: 12,
    xp: 2100,
    rank: 2,
    stats: { posts: 18, likes: 980, comments: 67, trending: 6, streak: 12 },
    badges: [
      { id: "space-explorer", name: "Space Explorer", icon: "🚀", rarity: "epic" },
      { id: "streak-master", name: "Streak Master", icon: "⚡", rarity: "epic" },
    ],
  },
  {
    id: "3",
    name: "Elena Rodriguez",
    avatar: "/woman-designer.png",
    level: 11,
    xp: 1890,
    rank: 3,
    stats: { posts: 16, likes: 850, comments: 45, trending: 5, streak: 8 },
    badges: [
      { id: "social-butterfly", name: "Social Butterfly", icon: "🦋", rarity: "rare" },
      { id: "first-post", name: "First Steps", icon: "✍️", rarity: "common" },
    ],
  },
  {
    id: "4",
    name: "Marcus Green",
    avatar: "/placeholder-molnk.png",
    level: 10,
    xp: 1650,
    rank: 4,
    stats: { posts: 14, likes: 720, comments: 38, trending: 4, streak: 6 },
    badges: [{ id: "trendsetter", name: "Trendsetter", icon: "🔥", rarity: "rare" }],
  },
  {
    id: "5",
    name: "Dr. James Wilson",
    avatar: "/placeholder-tnmbv.png",
    level: 9,
    xp: 1420,
    rank: 5,
    stats: { posts: 12, likes: 650, comments: 32, trending: 3, streak: 4 },
    badges: [{ id: "first-post", name: "First Steps", icon: "✍️", rarity: "common" }],
  },
  {
    id: "6",
    name: "Prof. Luna Star",
    avatar: "/placeholder.svg",
    level: 8,
    xp: 1200,
    rank: 6,
    stats: { posts: 10, likes: 580, comments: 28, trending: 2, streak: 3 },
    badges: [{ id: "space-explorer", name: "Space Explorer", icon: "🚀", rarity: "epic" }],
  },
  {
    id: "7",
    name: "David Kumar",
    avatar: "/placeholder.svg",
    level: 7,
    xp: 980,
    rank: 7,
    stats: { posts: 8, likes: 420, comments: 22, trending: 1, streak: 2 },
    badges: [{ id: "first-post", name: "First Steps", icon: "✍️", rarity: "common" }],
  },
  {
    id: "8",
    name: "Maya Chen",
    avatar: "/placeholder.svg",
    level: 6,
    xp: 750,
    rank: 8,
    stats: { posts: 6, likes: 320, comments: 18, trending: 1, streak: 1 },
    badges: [{ id: "social-butterfly", name: "Social Butterfly", icon: "🦋", rarity: "rare" }],
  },
]

const allBadges = [
  { id: "first-post", name: "First Steps", icon: "✍️", rarity: "common", description: "Published your first blog post" },
  {
    id: "social-butterfly",
    name: "Social Butterfly",
    icon: "🦋",
    rarity: "rare",
    description: "Received 100 likes across all posts",
  },
  { id: "trendsetter", name: "Trendsetter", icon: "🔥", rarity: "rare", description: "Had a blog post hit trending" },
  {
    id: "streak-master",
    name: "Streak Master",
    icon: "⚡",
    rarity: "epic",
    description: "Maintained a 7-day writing streak",
  },
  {
    id: "space-explorer",
    name: "Space Explorer",
    icon: "🚀",
    rarity: "epic",
    description: "Published 5 space-related blog posts",
  },
  {
    id: "legendary-writer",
    name: "Legendary Writer",
    icon: "👑",
    rarity: "legendary",
    description: "Reached level 10",
  },
  {
    id: "battle-winner",
    name: "Battle Winner",
    icon: "⚔️",
    rarity: "epic",
    description: "Won a Battle Arena competition",
  },
  { id: "quest-master", name: "Quest Master", icon: "🎯", rarity: "rare", description: "Completed 50 quests" },
  {
    id: "community-hero",
    name: "Community Hero",
    icon: "🌟",
    rarity: "legendary",
    description: "Helped 100 fellow writers",
  },
]

export default function LeaderboardPage() {
  const { user, isAuthenticated } = useAuth()
  const [selectedTab, setSelectedTab] = useState("overall")
  const [leaderboard, setLeaderboard] = useState<LeaderboardUser[]>(mockLeaderboard)

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Crown className="h-6 w-6 text-yellow-500" />
      case 2:
        return <Medal className="h-6 w-6 text-gray-400" />
      case 3:
        return <Medal className="h-6 w-6 text-amber-600" />
      default:
        return <span className="text-lg font-bold text-muted-foreground">#{rank}</span>
    }
  }

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case "common":
        return "bg-gray-500"
      case "rare":
        return "bg-blue-500"
      case "epic":
        return "bg-purple-500"
      case "legendary":
        return "bg-yellow-500"
      default:
        return "bg-gray-500"
    }
  }

  const sortedLeaderboard = [...leaderboard].sort((a, b) => {
    switch (selectedTab) {
      case "posts":
        return b.stats.posts - a.stats.posts
      case "likes":
        return b.stats.likes - a.stats.likes
      case "trending":
        return b.stats.trending - a.stats.trending
      case "streak":
        return b.stats.streak - a.stats.streak
      default:
        return b.xp - a.xp
    }
  })

  const currentUserRank = sortedLeaderboard.findIndex((u) => u.id === user?.id) + 1

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b glass-effect sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Link href="/" className="flex items-center gap-2">
                <div className="p-2 rounded-xl bg-gradient-to-br from-yellow-500 to-orange-500 animate-glow">
                  <Trophy className="h-6 w-6 text-white" />
                </div>
                <h1 className="text-2xl font-bold gradient-text">Leaderboard</h1>
              </Link>
            </div>
            <Button asChild variant="outline" className="glass-effect border-0 bg-transparent">
              <Link href="/">Back to Home</Link>
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <section className="text-center mb-12 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/10 via-orange-500/10 to-red-500/10 rounded-3xl blur-3xl animate-float"></div>
          <div className="relative">
            <h2 className="text-5xl md:text-6xl font-bold mb-6 text-balance">
              <span className="gradient-text">Top</span>
              <br />
              <span className="text-foreground">Writers</span>
            </h2>
            <p className="text-xl text-muted-foreground mb-8 text-pretty max-w-3xl mx-auto leading-relaxed">
              See how you rank among the community's best writers. Compete for the top spot and earn exclusive badges!
            </p>
            {isAuthenticated && currentUserRank > 0 && (
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-effect">
                <Trophy className="h-5 w-5 text-primary" />
                <span className="font-semibold">Your Rank: #{currentUserRank}</span>
              </div>
            )}
          </div>
        </section>

        {/* Leaderboard Tabs */}
        <Tabs value={selectedTab} onValueChange={setSelectedTab} className="mb-8">
          <TabsList className="grid w-full grid-cols-5 glass-effect">
            <TabsTrigger value="overall" className="flex items-center gap-2">
              <Trophy className="h-4 w-4" />
              Overall
            </TabsTrigger>
            <TabsTrigger value="posts" className="flex items-center gap-2">
              <PenTool className="h-4 w-4" />
              Posts
            </TabsTrigger>
            <TabsTrigger value="likes" className="flex items-center gap-2">
              <Heart className="h-4 w-4" />
              Likes
            </TabsTrigger>
            <TabsTrigger value="trending" className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4" />
              Trending
            </TabsTrigger>
            <TabsTrigger value="streak" className="flex items-center gap-2">
              <Flame className="h-4 w-4" />
              Streak
            </TabsTrigger>
          </TabsList>

          <TabsContent value={selectedTab} className="mt-6">
            <div className="space-y-4 mb-12">
              {sortedLeaderboard.map((user, index) => (
                <Card
                  key={user.id}
                  className={`glass-effect border-0 card-hover ${index < 3 ? "ring-2 ring-primary/20" : ""}`}
                >
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center justify-center w-12 h-12 rounded-full bg-muted/50">
                          {getRankIcon(index + 1)}
                        </div>
                        <Avatar className="h-12 w-12">
                          <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                          <AvatarFallback className="bg-gradient-to-br from-primary to-accent text-primary-foreground">
                            {user.name.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <h3 className="font-semibold text-lg">{user.name}</h3>
                          <div className="flex items-center gap-2">
                            <Badge className="bg-gradient-to-r from-primary to-accent text-primary-foreground border-0">
                              Level {user.level}
                            </Badge>
                            <span className="text-sm text-muted-foreground">{user.xp} XP</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-6 text-sm">
                        <div className="text-center">
                          <div className="font-bold text-primary">{user.stats.posts}</div>
                          <div className="text-muted-foreground">Posts</div>
                        </div>
                        <div className="text-center">
                          <div className="font-bold text-red-500">{user.stats.likes}</div>
                          <div className="text-muted-foreground">Likes</div>
                        </div>
                        <div className="text-center">
                          <div className="font-bold text-orange-500">{user.stats.trending}</div>
                          <div className="text-muted-foreground">Trending</div>
                        </div>
                        <div className="text-center">
                          <div className="font-bold text-blue-500">{user.stats.streak}</div>
                          <div className="text-muted-foreground">Streak</div>
                        </div>
                      </div>

                      <div className="flex items-center gap-1">
                        {user.badges.slice(0, 3).map((badge) => (
                          <div
                            key={badge.id}
                            className="w-8 h-8 rounded-full bg-muted/50 flex items-center justify-center text-lg"
                            title={badge.name}
                          >
                            {badge.icon}
                          </div>
                        ))}
                        {user.badges.length > 3 && (
                          <div className="w-8 h-8 rounded-full bg-muted/50 flex items-center justify-center text-xs font-semibold">
                            +{user.badges.length - 3}
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {/* Badges Collection */}
        <section>
          <div className="flex items-center gap-3 mb-8">
            <div className="p-2 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500">
              <Star className="h-5 w-5 text-white" />
            </div>
            <h3 className="text-3xl font-bold gradient-text">Badge Collection</h3>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {allBadges.map((badge) => (
              <Card key={badge.id} className="glass-effect border-0 card-hover">
                <CardHeader className="text-center">
                  <div className="mx-auto mb-3 w-16 h-16 rounded-full bg-muted/50 flex items-center justify-center text-3xl">
                    {badge.icon}
                  </div>
                  <CardTitle className="text-lg text-balance">{badge.name}</CardTitle>
                  <Badge className={`${getRarityColor(badge.rarity)} text-white border-0 mx-auto`}>
                    {badge.rarity}
                  </Badge>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground text-center text-pretty">{badge.description}</p>
                  <div className="mt-4 text-center">
                    <div className="text-xs text-muted-foreground">
                      Earned by {Math.floor(Math.random() * 50) + 10} writers
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </main>
    </div>
  )
}
