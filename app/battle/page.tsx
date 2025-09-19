"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Swords, Trophy, Clock, Users, ThumbsUp, Zap, Crown, Timer, Target, Flame } from "lucide-react"
import Link from "next/link"
import { useAuth } from "@/contexts/auth-context"

interface Battle {
  id: string
  topic: string
  description: string
  status: "upcoming" | "active" | "voting" | "completed"
  startTime: string
  endTime: string
  votingEndTime: string
  participants: {
    id: string
    name: string
    avatar: string
    blogId?: string
    votes: number
  }[]
  maxParticipants: number
  prize: {
    xp: number
    badge?: string
  }
  timeRemaining?: string
}

const mockBattles: Battle[] = [
  {
    id: "1",
    topic: "The Future of AI in Education",
    description: "Write about how artificial intelligence will transform learning and teaching in the next decade.",
    status: "active",
    startTime: "2024-01-20T10:00:00Z",
    endTime: "2024-01-20T22:00:00Z",
    votingEndTime: "2024-01-21T22:00:00Z",
    participants: [
      {
        id: "1",
        name: "Sarah Chen",
        avatar: "/woman-developer.png",
        blogId: "ai-education-future",
        votes: 23,
      },
      {
        id: "2",
        name: "Marcus Green",
        avatar: "/placeholder-molnk.png",
        blogId: "ai-learning-revolution",
        votes: 18,
      },
    ],
    maxParticipants: 5,
    prize: {
      xp: 200,
      badge: "battle-winner",
    },
    timeRemaining: "4h 32m",
  },
  {
    id: "2",
    topic: "Space Tourism: Dream or Reality?",
    description: "Explore the current state and future prospects of commercial space travel for everyday people.",
    status: "voting",
    startTime: "2024-01-19T10:00:00Z",
    endTime: "2024-01-19T22:00:00Z",
    votingEndTime: "2024-01-20T22:00:00Z",
    participants: [
      {
        id: "3",
        name: "Dr. Alex Cosmos",
        avatar: "/placeholder.svg",
        blogId: "space-tourism-reality",
        votes: 45,
      },
      {
        id: "4",
        name: "Luna Star",
        avatar: "/placeholder.svg",
        blogId: "commercial-space-future",
        votes: 38,
      },
      {
        id: "5",
        name: "Rocket Riley",
        avatar: "/placeholder.svg",
        blogId: "space-travel-dreams",
        votes: 29,
      },
    ],
    maxParticipants: 5,
    prize: {
      xp: 200,
      badge: "space-warrior",
    },
    timeRemaining: "18h 15m",
  },
  {
    id: "3",
    topic: "Sustainable Cities of Tomorrow",
    description: "Design the perfect eco-friendly city that balances technology, nature, and human needs.",
    status: "upcoming",
    startTime: "2024-01-21T10:00:00Z",
    endTime: "2024-01-21T22:00:00Z",
    votingEndTime: "2024-01-22T22:00:00Z",
    participants: [],
    maxParticipants: 4,
    prize: {
      xp: 150,
      badge: "eco-champion",
    },
    timeRemaining: "1d 8h",
  },
  {
    id: "4",
    topic: "The Art of Minimalism",
    description: "Explore how minimalist principles can improve our digital and physical lives.",
    status: "completed",
    startTime: "2024-01-18T10:00:00Z",
    endTime: "2024-01-18T22:00:00Z",
    votingEndTime: "2024-01-19T22:00:00Z",
    participants: [
      {
        id: "6",
        name: "Elena Rodriguez",
        avatar: "/woman-designer.png",
        blogId: "minimalist-life",
        votes: 67,
      },
      {
        id: "7",
        name: "Zen Master",
        avatar: "/placeholder.svg",
        blogId: "simple-living",
        votes: 42,
      },
    ],
    maxParticipants: 3,
    prize: {
      xp: 150,
      badge: "minimalist-master",
    },
  },
]

export default function BattleArenaPage() {
  const { user, isAuthenticated } = useAuth()
  const [battles, setBattles] = useState<Battle[]>(mockBattles)
  const [selectedTab, setSelectedTab] = useState("active")

  const getStatusColor = (status: Battle["status"]) => {
    switch (status) {
      case "upcoming":
        return "bg-blue-500"
      case "active":
        return "bg-green-500"
      case "voting":
        return "bg-orange-500"
      case "completed":
        return "bg-gray-500"
      default:
        return "bg-gray-500"
    }
  }

  const getStatusIcon = (status: Battle["status"]) => {
    switch (status) {
      case "upcoming":
        return <Timer className="h-4 w-4" />
      case "active":
        return <Swords className="h-4 w-4" />
      case "voting":
        return <ThumbsUp className="h-4 w-4" />
      case "completed":
        return <Trophy className="h-4 w-4" />
      default:
        return <Target className="h-4 w-4" />
    }
  }

  const joinBattle = (battleId: string) => {
    if (!isAuthenticated || !user) return

    setBattles((prev) =>
      prev.map((battle) => {
        if (battle.id === battleId && battle.participants.length < battle.maxParticipants) {
          return {
            ...battle,
            participants: [
              ...battle.participants,
              {
                id: user.id,
                name: user.name,
                avatar: user.avatar || "/placeholder.svg",
                votes: 0,
              },
            ],
          }
        }
        return battle
      }),
    )
  }

  const vote = (battleId: string, participantId: string) => {
    if (!isAuthenticated) return

    setBattles((prev) =>
      prev.map((battle) => {
        if (battle.id === battleId) {
          return {
            ...battle,
            participants: battle.participants.map((p) => (p.id === participantId ? { ...p, votes: p.votes + 1 } : p)),
          }
        }
        return battle
      }),
    )
  }

  const filteredBattles = battles.filter((battle) => {
    switch (selectedTab) {
      case "active":
        return battle.status === "active"
      case "voting":
        return battle.status === "voting"
      case "upcoming":
        return battle.status === "upcoming"
      case "completed":
        return battle.status === "completed"
      default:
        return true
    }
  })

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b glass-effect sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Link href="/" className="flex items-center gap-2">
                <div className="p-2 rounded-xl bg-gradient-to-br from-primary to-accent animate-glow">
                  <Swords className="h-6 w-6 text-primary-foreground" />
                </div>
                <h1 className="text-2xl font-bold gradient-text">Battle Arena</h1>
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
          <div className="absolute inset-0 bg-gradient-to-r from-red-500/10 via-orange-500/10 to-yellow-500/10 rounded-3xl blur-3xl animate-float"></div>
          <div className="relative">
            <h2 className="text-5xl md:text-6xl font-bold mb-6 text-balance">
              <span className="gradient-text">Battle</span>
              <br />
              <span className="text-foreground">Arena</span>
            </h2>
            <p className="text-xl text-muted-foreground mb-8 text-pretty max-w-3xl mx-auto leading-relaxed">
              Compete with fellow writers on the same topic. Write your best piece, let the community vote, and claim
              victory!
            </p>
            <div className="flex items-center justify-center gap-8 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Flame className="h-5 w-5 text-orange-500" />
                <span>Epic Battles</span>
              </div>
              <div className="flex items-center gap-2">
                <Trophy className="h-5 w-5 text-yellow-500" />
                <span>Win Badges</span>
              </div>
              <div className="flex items-center gap-2">
                <Zap className="h-5 w-5 text-blue-500" />
                <span>Earn XP</span>
              </div>
            </div>
          </div>
        </section>

        {/* Battle Tabs */}
        <Tabs value={selectedTab} onValueChange={setSelectedTab} className="mb-8">
          <TabsList className="grid w-full grid-cols-4 glass-effect">
            <TabsTrigger value="active" className="flex items-center gap-2">
              <Swords className="h-4 w-4" />
              Active
            </TabsTrigger>
            <TabsTrigger value="voting" className="flex items-center gap-2">
              <ThumbsUp className="h-4 w-4" />
              Voting
            </TabsTrigger>
            <TabsTrigger value="upcoming" className="flex items-center gap-2">
              <Timer className="h-4 w-4" />
              Upcoming
            </TabsTrigger>
            <TabsTrigger value="completed" className="flex items-center gap-2">
              <Trophy className="h-4 w-4" />
              Completed
            </TabsTrigger>
          </TabsList>

          <TabsContent value={selectedTab} className="mt-6">
            <div className="grid gap-6">
              {filteredBattles.map((battle) => (
                <Card key={battle.id} className="glass-effect border-0 card-hover">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <Badge className={`${getStatusColor(battle.status)} text-white border-0`}>
                            {getStatusIcon(battle.status)}
                            {battle.status.charAt(0).toUpperCase() + battle.status.slice(1)}
                          </Badge>
                          {battle.timeRemaining && (
                            <Badge variant="outline" className="glass-effect border-0">
                              <Clock className="h-3 w-3 mr-1" />
                              {battle.timeRemaining}
                            </Badge>
                          )}
                        </div>
                        <CardTitle className="text-2xl mb-2 text-balance">{battle.topic}</CardTitle>
                        <p className="text-muted-foreground text-pretty leading-relaxed">{battle.description}</p>
                      </div>
                      <div className="text-right ml-4">
                        <div className="text-2xl font-bold gradient-text">+{battle.prize.xp} XP</div>
                        <div className="text-sm text-muted-foreground">Prize Pool</div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {/* Participants */}
                      <div>
                        <div className="flex items-center justify-between mb-3">
                          <h4 className="font-semibold flex items-center gap-2">
                            <Users className="h-4 w-4" />
                            Participants ({battle.participants.length}/{battle.maxParticipants})
                          </h4>
                          {battle.status === "active" && battle.participants.length < battle.maxParticipants && (
                            <Button
                              size="sm"
                              onClick={() => joinBattle(battle.id)}
                              disabled={!isAuthenticated || battle.participants.some((p) => p.id === user?.id)}
                              className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90"
                            >
                              <Swords className="h-4 w-4 mr-1" />
                              Join Battle
                            </Button>
                          )}
                        </div>

                        {battle.participants.length > 0 ? (
                          <div className="space-y-3">
                            {battle.participants.map((participant, index) => (
                              <div
                                key={participant.id}
                                className="flex items-center justify-between p-3 rounded-lg bg-muted/50"
                              >
                                <div className="flex items-center gap-3">
                                  <div className="relative">
                                    <Avatar className="h-10 w-10">
                                      <AvatarImage
                                        src={participant.avatar || "/placeholder.svg"}
                                        alt={participant.name}
                                      />
                                      <AvatarFallback>{participant.name.charAt(0)}</AvatarFallback>
                                    </Avatar>
                                    {index === 0 && battle.status === "completed" && (
                                      <Crown className="absolute -top-2 -right-2 h-5 w-5 text-yellow-500" />
                                    )}
                                  </div>
                                  <div>
                                    <div className="font-medium">{participant.name}</div>
                                    {participant.blogId && (
                                      <Link
                                        href={`/blog/${participant.blogId}`}
                                        className="text-sm text-primary hover:underline"
                                      >
                                        View Entry
                                      </Link>
                                    )}
                                  </div>
                                </div>

                                <div className="flex items-center gap-3">
                                  {battle.status === "voting" && (
                                    <Button
                                      size="sm"
                                      variant="outline"
                                      onClick={() => vote(battle.id, participant.id)}
                                      disabled={!isAuthenticated}
                                      className="glass-effect border-0"
                                    >
                                      <ThumbsUp className="h-4 w-4 mr-1" />
                                      Vote
                                    </Button>
                                  )}
                                  {(battle.status === "voting" || battle.status === "completed") && (
                                    <div className="text-right">
                                      <div className="font-bold text-primary">{participant.votes}</div>
                                      <div className="text-xs text-muted-foreground">votes</div>
                                    </div>
                                  )}
                                </div>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <div className="text-center py-8 text-muted-foreground">
                            <Swords className="h-12 w-12 mx-auto mb-2 opacity-50" />
                            <p>No participants yet. Be the first to join!</p>
                          </div>
                        )}
                      </div>

                      {/* Progress Bar for Participants */}
                      <div>
                        <div className="flex justify-between text-sm mb-2">
                          <span>Participants</span>
                          <span>
                            {battle.participants.length}/{battle.maxParticipants}
                          </span>
                        </div>
                        <Progress value={(battle.participants.length / battle.maxParticipants) * 100} className="h-2" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {filteredBattles.length === 0 && (
          <div className="text-center py-12">
            <Swords className="h-16 w-16 mx-auto mb-4 text-muted-foreground opacity-50" />
            <h3 className="text-xl font-semibold mb-2">No battles in this category</h3>
            <p className="text-muted-foreground">Check back later for new battles to join!</p>
          </div>
        )}
      </main>
    </div>
  )
}
