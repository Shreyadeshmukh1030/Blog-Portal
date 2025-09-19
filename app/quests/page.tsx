"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Target, Gift, Zap, Trophy, Clock, CheckCircle, Lock, Sparkles, Box, Star } from "lucide-react"
import Link from "next/link"
import { useAuth } from "@/contexts/auth-context"
import { useGamification } from "@/contexts/gamification-context"

interface Quest {
  id: string
  title: string
  description: string
  type: "daily" | "weekly" | "achievement" | "puzzle"
  difficulty: "easy" | "medium" | "hard" | "legendary"
  target: number
  current: number
  reward: {
    xp: number
    badge?: string
    lootBox?: string
  }
  completed: boolean
  expiresAt?: string
  puzzle?: {
    question: string
    options: string[]
    correctAnswer: number
  }
}

interface LootBox {
  id: string
  name: string
  rarity: "common" | "rare" | "epic" | "legendary"
  description: string
  contents: {
    type: "xp" | "badge" | "theme" | "avatar"
    value: string | number
    rarity: "common" | "rare" | "epic" | "legendary"
  }[]
  cost?: number
  unlocked: boolean
}

const mockQuests: Quest[] = [
  {
    id: "daily-writer",
    title: "Daily Writer",
    description: "Publish 1 blog post today",
    type: "daily",
    difficulty: "easy",
    target: 1,
    current: 0,
    reward: { xp: 50 },
    completed: false,
    expiresAt: "2024-01-20T23:59:59Z",
  },
  {
    id: "social-butterfly",
    title: "Social Butterfly",
    description: "Like 10 blog posts today",
    type: "daily",
    difficulty: "easy",
    target: 10,
    current: 3,
    reward: { xp: 25 },
    completed: false,
    expiresAt: "2024-01-20T23:59:59Z",
  },
  {
    id: "space-puzzle",
    title: "Space Knowledge Quiz",
    description: "Answer this space-related question correctly",
    type: "puzzle",
    difficulty: "medium",
    target: 1,
    current: 0,
    reward: { xp: 100, lootBox: "space-explorer" },
    completed: false,
    puzzle: {
      question: "What is the closest star to Earth (other than the Sun)?",
      options: ["Alpha Centauri", "Proxima Centauri", "Sirius", "Vega"],
      correctAnswer: 1,
    },
  },
  {
    id: "weekly-streak",
    title: "Weekly Warrior",
    description: "Maintain a 7-day writing streak",
    type: "weekly",
    difficulty: "hard",
    target: 7,
    current: 3,
    reward: { xp: 200, badge: "streak-master", lootBox: "epic-writer" },
    completed: false,
    expiresAt: "2024-01-27T23:59:59Z",
  },
  {
    id: "trending-master",
    title: "Trending Master",
    description: "Get 3 blog posts trending",
    type: "achievement",
    difficulty: "legendary",
    target: 3,
    current: 1,
    reward: { xp: 500, badge: "trendsetter", lootBox: "legendary-creator" },
    completed: false,
  },
]

const mockLootBoxes: LootBox[] = [
  {
    id: "starter-box",
    name: "Starter Box",
    rarity: "common",
    description: "A basic loot box for new writers",
    contents: [
      { type: "xp", value: 50, rarity: "common" },
      { type: "theme", value: "Ocean Blue", rarity: "common" },
    ],
    cost: 100,
    unlocked: true,
  },
  {
    id: "space-explorer",
    name: "Space Explorer Box",
    rarity: "rare",
    description: "Cosmic rewards for space enthusiasts",
    contents: [
      { type: "xp", value: 150, rarity: "rare" },
      { type: "avatar", value: "Astronaut", rarity: "rare" },
      { type: "theme", value: "Galaxy Dark", rarity: "rare" },
    ],
    unlocked: false,
  },
  {
    id: "epic-writer",
    name: "Epic Writer Box",
    rarity: "epic",
    description: "Premium rewards for dedicated writers",
    contents: [
      { type: "xp", value: 300, rarity: "epic" },
      { type: "badge", value: "Epic Writer", rarity: "epic" },
      { type: "theme", value: "Golden Sunset", rarity: "epic" },
    ],
    unlocked: false,
  },
  {
    id: "legendary-creator",
    name: "Legendary Creator Box",
    rarity: "legendary",
    description: "The ultimate reward for master creators",
    contents: [
      { type: "xp", value: 500, rarity: "legendary" },
      { type: "badge", value: "Legendary Creator", rarity: "legendary" },
      { type: "avatar", value: "Crown Avatar", rarity: "legendary" },
      { type: "theme", value: "Royal Purple", rarity: "legendary" },
    ],
    unlocked: false,
  },
]

export default function QuestsPage() {
  const { user, isAuthenticated } = useAuth()
  const { userStats, completeQuest, addXP } = useGamification()
  const [quests, setQuests] = useState<Quest[]>(mockQuests)
  const [lootBoxes, setLootBoxes] = useState<LootBox[]>(mockLootBoxes)
  const [selectedTab, setSelectedTab] = useState("daily")
  const [openLootBox, setOpenLootBox] = useState<LootBox | null>(null)

  const getDifficultyColor = (difficulty: Quest["difficulty"]) => {
    switch (difficulty) {
      case "easy":
        return "bg-green-500"
      case "medium":
        return "bg-yellow-500"
      case "hard":
        return "bg-orange-500"
      case "legendary":
        return "bg-purple-500"
      default:
        return "bg-gray-500"
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

  const completeQuestHandler = (questId: string) => {
    setQuests((prev) =>
      prev.map((quest) => (quest.id === questId ? { ...quest, completed: true, current: quest.target } : quest)),
    )

    const quest = quests.find((q) => q.id === questId)
    if (quest) {
      addXP(quest.reward.xp, `Completed quest: ${quest.title}`)
      if (quest.reward.lootBox) {
        setLootBoxes((prev) => prev.map((box) => (box.id === quest.reward.lootBox ? { ...box, unlocked: true } : box)))
      }
    }
  }

  const answerPuzzle = (questId: string, answerIndex: number) => {
    const quest = quests.find((q) => q.id === questId)
    if (quest?.puzzle && answerIndex === quest.puzzle.correctAnswer) {
      completeQuestHandler(questId)
    }
  }

  const openLootBoxHandler = (lootBox: LootBox) => {
    if (lootBox.cost && userStats.xp < lootBox.cost) return

    setOpenLootBox(lootBox)

    // Deduct cost if applicable
    if (lootBox.cost) {
      addXP(-lootBox.cost, `Opened ${lootBox.name}`)
    }

    // Add rewards
    lootBox.contents.forEach((item) => {
      if (item.type === "xp") {
        addXP(item.value as number, `Loot box reward`)
      }
    })
  }

  const filteredQuests = quests.filter((quest) => {
    switch (selectedTab) {
      case "daily":
        return quest.type === "daily"
      case "weekly":
        return quest.type === "weekly"
      case "achievements":
        return quest.type === "achievement"
      case "puzzles":
        return quest.type === "puzzle"
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
                  <Target className="h-6 w-6 text-primary-foreground" />
                </div>
                <h1 className="text-2xl font-bold gradient-text">Quests & Rewards</h1>
              </Link>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 px-3 py-1 rounded-full glass-effect">
                <Zap className="h-4 w-4 text-primary" />
                <span className="font-semibold">{userStats.xp} XP</span>
              </div>
              <Button asChild variant="outline" className="glass-effect border-0 bg-transparent">
                <Link href="/">Back to Home</Link>
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <section className="text-center mb-12 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-green-500/10 via-blue-500/10 to-purple-500/10 rounded-3xl blur-3xl animate-float"></div>
          <div className="relative">
            <h2 className="text-5xl md:text-6xl font-bold mb-6 text-balance">
              <span className="gradient-text">Complete</span>
              <br />
              <span className="text-foreground">Quests</span>
            </h2>
            <p className="text-xl text-muted-foreground mb-8 text-pretty max-w-3xl mx-auto leading-relaxed">
              Take on daily challenges, solve puzzles, and unlock amazing rewards. Earn XP, badges, and exclusive loot
              boxes!
            </p>
          </div>
        </section>

        {/* Quest Tabs */}
        <Tabs value={selectedTab} onValueChange={setSelectedTab} className="mb-8">
          <TabsList className="grid w-full grid-cols-4 glass-effect">
            <TabsTrigger value="daily" className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              Daily
            </TabsTrigger>
            <TabsTrigger value="weekly" className="flex items-center gap-2">
              <Target className="h-4 w-4" />
              Weekly
            </TabsTrigger>
            <TabsTrigger value="achievements" className="flex items-center gap-2">
              <Trophy className="h-4 w-4" />
              Achievements
            </TabsTrigger>
            <TabsTrigger value="puzzles" className="flex items-center gap-2">
              <Sparkles className="h-4 w-4" />
              Puzzles
            </TabsTrigger>
          </TabsList>

          <TabsContent value={selectedTab} className="mt-6">
            <div className="grid gap-6 mb-12">
              {filteredQuests.map((quest) => (
                <Card key={quest.id} className="glass-effect border-0 card-hover">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <Badge className={`${getDifficultyColor(quest.difficulty)} text-white border-0`}>
                            {quest.difficulty}
                          </Badge>
                          {quest.expiresAt && (
                            <Badge variant="outline" className="glass-effect border-0">
                              <Clock className="h-3 w-3 mr-1" />
                              Expires in 18h
                            </Badge>
                          )}
                          {quest.completed && (
                            <Badge className="bg-green-500 text-white border-0">
                              <CheckCircle className="h-3 w-3 mr-1" />
                              Completed
                            </Badge>
                          )}
                        </div>
                        <CardTitle className="text-xl mb-2 text-balance">{quest.title}</CardTitle>
                        <p className="text-muted-foreground text-pretty leading-relaxed">{quest.description}</p>
                      </div>
                      <div className="text-right ml-4">
                        <div className="text-2xl font-bold gradient-text">+{quest.reward.xp} XP</div>
                        {quest.reward.lootBox && <div className="text-sm text-muted-foreground">+ Loot Box</div>}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {/* Progress */}
                      {quest.type !== "puzzle" && (
                        <div>
                          <div className="flex justify-between text-sm mb-2">
                            <span>Progress</span>
                            <span>
                              {quest.current}/{quest.target}
                            </span>
                          </div>
                          <Progress value={(quest.current / quest.target) * 100} className="h-2" />
                        </div>
                      )}

                      {/* Puzzle */}
                      {quest.puzzle && !quest.completed && (
                        <div className="space-y-3">
                          <h4 className="font-semibold">{quest.puzzle.question}</h4>
                          <div className="grid gap-2">
                            {quest.puzzle.options.map((option, index) => (
                              <Button
                                key={index}
                                variant="outline"
                                className="justify-start glass-effect border-0 bg-transparent"
                                onClick={() => answerPuzzle(quest.id, index)}
                              >
                                {String.fromCharCode(65 + index)}. {option}
                              </Button>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Action Button */}
                      {quest.current >= quest.target && !quest.completed && quest.type !== "puzzle" && (
                        <Button
                          onClick={() => completeQuestHandler(quest.id)}
                          className="w-full bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90"
                        >
                          <Trophy className="h-4 w-4 mr-2" />
                          Claim Reward
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {/* Loot Boxes Section */}
        <section>
          <div className="flex items-center gap-3 mb-8">
            <div className="p-2 rounded-lg bg-gradient-to-br from-yellow-500 to-orange-500">
              <Gift className="h-5 w-5 text-white" />
            </div>
            <h3 className="text-3xl font-bold gradient-text">Loot Boxes</h3>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {lootBoxes.map((lootBox) => (
              <Card key={lootBox.id} className="glass-effect border-0 card-hover">
                <CardHeader className="text-center">
                  <div className="mx-auto mb-3 p-4 rounded-full bg-gradient-to-br from-yellow-500 to-orange-500">
                    <Box className="h-8 w-8 text-white" />
                  </div>
                  <CardTitle className="text-lg text-balance">{lootBox.name}</CardTitle>
                  <Badge className={`${getRarityColor(lootBox.rarity)} text-white border-0 mx-auto`}>
                    {lootBox.rarity}
                  </Badge>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4 text-center text-pretty">{lootBox.description}</p>

                  <div className="space-y-2 mb-4">
                    <h5 className="font-semibold text-sm">Contains:</h5>
                    {lootBox.contents.map((item, index) => (
                      <div key={index} className="flex items-center justify-between text-xs">
                        <span>{item.type === "xp" ? `${item.value} XP` : item.value}</span>
                        <Badge
                          variant="outline"
                          className={`${getRarityColor(item.rarity)} text-white border-0 text-xs`}
                        >
                          {item.rarity}
                        </Badge>
                      </div>
                    ))}
                  </div>

                  <Button
                    onClick={() => openLootBoxHandler(lootBox)}
                    disabled={!lootBox.unlocked || (lootBox.cost && userStats.xp < lootBox.cost)}
                    className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600"
                  >
                    {!lootBox.unlocked ? (
                      <>
                        <Lock className="h-4 w-4 mr-2" />
                        Locked
                      </>
                    ) : lootBox.cost ? (
                      <>
                        <Zap className="h-4 w-4 mr-2" />
                        Open ({lootBox.cost} XP)
                      </>
                    ) : (
                      <>
                        <Gift className="h-4 w-4 mr-2" />
                        Open
                      </>
                    )}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </main>

      {/* Loot Box Opening Modal */}
      {openLootBox && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <Card className="glass-effect border-0 max-w-md w-full mx-4">
            <CardHeader className="text-center">
              <div className="mx-auto mb-3 p-4 rounded-full bg-gradient-to-br from-yellow-500 to-orange-500 animate-glow">
                <Star className="h-8 w-8 text-white" />
              </div>
              <CardTitle className="text-2xl gradient-text">Congratulations!</CardTitle>
              <p className="text-muted-foreground">You opened {openLootBox.name}</p>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 mb-6">
                {openLootBox.contents.map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                    <span className="font-medium">{item.type === "xp" ? `+${item.value} XP` : item.value}</span>
                    <Badge className={`${getRarityColor(item.rarity)} text-white border-0`}>{item.rarity}</Badge>
                  </div>
                ))}
              </div>
              <Button
                onClick={() => setOpenLootBox(null)}
                className="w-full bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90"
              >
                Awesome!
              </Button>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
