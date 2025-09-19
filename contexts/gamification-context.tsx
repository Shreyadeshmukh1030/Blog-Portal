"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { useAuth } from "./auth-context"

interface Badge {
  id: string
  name: string
  description: string
  icon: string
  rarity: "common" | "rare" | "epic" | "legendary"
  unlockedAt?: string
}

interface Quest {
  id: string
  title: string
  description: string
  type: "daily" | "weekly" | "achievement"
  target: number
  current: number
  reward: {
    xp: number
    badge?: string
  }
  completed: boolean
  expiresAt?: string
}

interface UserStats {
  xp: number
  level: number
  streak: number
  lastActiveDate: string
  badges: Badge[]
  completedQuests: string[]
  totalPosts: number
  totalLikes: number
  totalComments: number
  trendingPosts: number
}

interface GamificationContextType {
  userStats: UserStats
  availableQuests: Quest[]
  addXP: (amount: number, reason: string) => void
  unlockBadge: (badgeId: string) => void
  completeQuest: (questId: string) => void
  updateStreak: () => void
  checkLevelUp: () => boolean
  getNextLevelXP: () => number
}

const defaultStats: UserStats = {
  xp: 0,
  level: 1,
  streak: 0,
  lastActiveDate: new Date().toISOString().split("T")[0],
  badges: [],
  completedQuests: [],
  totalPosts: 0,
  totalLikes: 0,
  totalComments: 0,
  trendingPosts: 0,
}

const allBadges: Badge[] = [
  {
    id: "first-post",
    name: "First Steps",
    description: "Published your first blog post",
    icon: "✍️",
    rarity: "common",
  },
  {
    id: "trendsetter",
    name: "Trendsetter",
    description: "Had a blog post hit trending",
    icon: "🔥",
    rarity: "rare",
  },
  {
    id: "social-butterfly",
    name: "Social Butterfly",
    description: "Received 100 likes across all posts",
    icon: "🦋",
    rarity: "rare",
  },
  {
    id: "streak-master",
    name: "Streak Master",
    description: "Maintained a 7-day writing streak",
    icon: "⚡",
    rarity: "epic",
  },
  {
    id: "space-explorer",
    name: "Space Explorer",
    description: "Published 5 space-related blog posts",
    icon: "🚀",
    rarity: "epic",
  },
  {
    id: "legendary-writer",
    name: "Legendary Writer",
    description: "Reached level 10",
    icon: "👑",
    rarity: "legendary",
  },
]

const GamificationContext = createContext<GamificationContextType | undefined>(undefined)

export function GamificationProvider({ children }: { children: ReactNode }) {
  const { user, isAuthenticated } = useAuth()
  const [userStats, setUserStats] = useState<UserStats>(defaultStats)
  const [availableQuests, setAvailableQuests] = useState<Quest[]>([])

  useEffect(() => {
    if (isAuthenticated && user) {
      const savedStats = localStorage.getItem(`gamification_${user.id}`)
      if (savedStats) {
        setUserStats(JSON.parse(savedStats))
      }
      generateDailyQuests()
    }
  }, [isAuthenticated, user])

  const saveStats = (stats: UserStats) => {
    if (user) {
      localStorage.setItem(`gamification_${user.id}`, JSON.stringify(stats))
    }
  }

  const generateDailyQuests = () => {
    const today = new Date().toISOString().split("T")[0]
    const dailyQuests: Quest[] = [
      {
        id: "daily-post",
        title: "Daily Writer",
        description: "Publish 1 blog post today",
        type: "daily",
        target: 1,
        current: 0,
        reward: { xp: 50 },
        completed: false,
        expiresAt: today,
      },
      {
        id: "daily-likes",
        title: "Spread the Love",
        description: "Like 5 blog posts today",
        type: "daily",
        target: 5,
        current: 0,
        reward: { xp: 25 },
        completed: false,
        expiresAt: today,
      },
      {
        id: "daily-comments",
        title: "Community Engagement",
        description: "Comment on 3 blog posts today",
        type: "daily",
        target: 3,
        current: 0,
        reward: { xp: 30 },
        completed: false,
        expiresAt: today,
      },
    ]
    setAvailableQuests(dailyQuests)
  }

  const addXP = (amount: number, reason: string) => {
    setUserStats((prev) => {
      const newStats = {
        ...prev,
        xp: prev.xp + amount,
      }
      saveStats(newStats)
      return newStats
    })
  }

  const unlockBadge = (badgeId: string) => {
    const badge = allBadges.find((b) => b.id === badgeId)
    if (!badge) return

    setUserStats((prev) => {
      if (prev.badges.some((b) => b.id === badgeId)) return prev

      const newBadge = { ...badge, unlockedAt: new Date().toISOString() }
      const newStats = {
        ...prev,
        badges: [...prev.badges, newBadge],
      }
      saveStats(newStats)
      return newStats
    })
  }

  const completeQuest = (questId: string) => {
    setAvailableQuests((prev) =>
      prev.map((quest) => (quest.id === questId ? { ...quest, completed: true, current: quest.target } : quest)),
    )

    const quest = availableQuests.find((q) => q.id === questId)
    if (quest) {
      addXP(quest.reward.xp, `Completed quest: ${quest.title}`)
      if (quest.reward.badge) {
        unlockBadge(quest.reward.badge)
      }
    }
  }

  const updateStreak = () => {
    const today = new Date().toISOString().split("T")[0]
    const yesterday = new Date(Date.now() - 86400000).toISOString().split("T")[0]

    setUserStats((prev) => {
      let newStreak = prev.streak

      if (prev.lastActiveDate === yesterday) {
        newStreak = prev.streak + 1
      } else if (prev.lastActiveDate !== today) {
        newStreak = 1
      }

      const newStats = {
        ...prev,
        streak: newStreak,
        lastActiveDate: today,
      }

      // Check for streak badges
      if (newStreak >= 7 && !prev.badges.some((b) => b.id === "streak-master")) {
        unlockBadge("streak-master")
      }

      saveStats(newStats)
      return newStats
    })
  }

  const checkLevelUp = (): boolean => {
    const newLevel = Math.floor(userStats.xp / 100) + 1
    if (newLevel > userStats.level) {
      setUserStats((prev) => {
        const newStats = { ...prev, level: newLevel }
        saveStats(newStats)
        return newStats
      })

      if (newLevel >= 10) {
        unlockBadge("legendary-writer")
      }

      return true
    }
    return false
  }

  const getNextLevelXP = (): number => {
    return userStats.level * 100 - userStats.xp
  }

  return (
    <GamificationContext.Provider
      value={{
        userStats,
        availableQuests,
        addXP,
        unlockBadge,
        completeQuest,
        updateStreak,
        checkLevelUp,
        getNextLevelXP,
      }}
    >
      {children}
    </GamificationContext.Provider>
  )
}

export function useGamification() {
  const context = useContext(GamificationContext)
  if (context === undefined) {
    throw new Error("useGamification must be used within a GamificationProvider")
  }
  return context
}
