"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Zap, Trophy } from "lucide-react"

interface XPNotificationProps {
  xp: number
  reason: string
  badge?: string
  onClose: () => void
}

export function XPNotification({ xp, reason, badge, onClose }: XPNotificationProps) {
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false)
      setTimeout(onClose, 300)
    }, 3000)

    return () => clearTimeout(timer)
  }, [onClose])

  return (
    <div
      className={`fixed top-20 right-4 z-50 transition-all duration-300 ${visible ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"}`}
    >
      <Card className="p-4 glass-effect border-0 bg-gradient-to-r from-primary/20 to-accent/20">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-full bg-gradient-to-r from-primary to-accent">
            <Zap className="h-4 w-4 text-primary-foreground" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-semibold text-primary">+{xp} XP</span>
              {badge && (
                <Badge variant="outline" className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white border-0">
                  <Trophy className="h-3 w-3 mr-1" />
                  New Badge!
                </Badge>
              )}
            </div>
            <p className="text-sm text-muted-foreground">{reason}</p>
          </div>
        </div>
      </Card>
    </div>
  )
}
