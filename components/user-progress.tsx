"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { useGamification } from "@/contexts/gamification-context"
import { Zap, Trophy, Target, Flame } from "lucide-react"

export function UserProgress() {
  const { userStats, getNextLevelXP } = useGamification()
  const nextLevelXP = getNextLevelXP()
  const currentLevelXP = userStats.xp - (userStats.level - 1) * 100
  const progressPercentage = (currentLevelXP / 100) * 100

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

  return (
    <div className="space-y-6">
      {/* Level and XP */}
      <Card className="glass-effect border-0">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-gradient-to-br from-primary to-accent">
              <Zap className="h-4 w-4 text-primary-foreground" />
            </div>
            Level {userStats.level}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>{currentLevelXP} / 100 XP</span>
              <span>{nextLevelXP} XP to next level</span>
            </div>
            <Progress value={progressPercentage} className="h-2" />
          </div>
        </CardContent>
      </Card>

      {/* Streak */}
      <Card className="glass-effect border-0">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-gradient-to-br from-orange-500 to-red-500">
              <Flame className="h-4 w-4 text-white" />
            </div>
            Writing Streak
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold gradient-text">{userStats.streak} days</div>
          <p className="text-sm text-muted-foreground">Keep writing daily to maintain your streak!</p>
        </CardContent>
      </Card>

      {/* Stats */}
      <Card className="glass-effect border-0">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-gradient-to-br from-green-500 to-blue-500">
              <Target className="h-4 w-4 text-white" />
            </div>
            Your Stats
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-primary">{userStats.totalPosts}</div>
              <div className="text-sm text-muted-foreground">Posts</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-red-500">{userStats.totalLikes}</div>
              <div className="text-sm text-muted-foreground">Likes</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-blue-500">{userStats.totalComments}</div>
              <div className="text-sm text-muted-foreground">Comments</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-orange-500">{userStats.trendingPosts}</div>
              <div className="text-sm text-muted-foreground">Trending</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Badges */}
      <Card className="glass-effect border-0">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-gradient-to-br from-yellow-500 to-orange-500">
              <Trophy className="h-4 w-4 text-white" />
            </div>
            Badges ({userStats.badges.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          {userStats.badges.length > 0 ? (
            <div className="grid grid-cols-2 gap-3">
              {userStats.badges.map((badge) => (
                <div key={badge.id} className="flex items-center gap-2 p-2 rounded-lg bg-muted/50">
                  <span className="text-2xl">{badge.icon}</span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1">
                      <span className="font-medium text-sm truncate">{badge.name}</span>
                      <Badge
                        variant="outline"
                        className={`text-xs ${getRarityColor(badge.rarity)} text-white border-0`}
                      >
                        {badge.rarity}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground truncate">{badge.description}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-muted-foreground text-center py-4">
              No badges yet. Start writing to earn your first badge!
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
