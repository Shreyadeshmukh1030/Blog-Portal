"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Facebook, Twitter, Linkedin, Mail, MessageCircle, Copy, Check } from "lucide-react"

interface ShareModalProps {
  isOpen: boolean
  onClose: () => void
  blog: {
    id: string
    title: string
    excerpt: string
    author: {
      name: string
    }
  }
}

export function ShareModal({ isOpen, onClose, blog }: ShareModalProps) {
  const [copied, setCopied] = useState(false)
  const shareUrl = `${typeof window !== "undefined" ? window.location.origin : ""}/blog/${blog.id}`

  const shareText = `Check out "${blog.title}" by ${blog.author.name} on BlogPortal`

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error("Failed to copy link:", err)
    }
  }

  const shareOptions = [
    {
      name: "Twitter",
      icon: Twitter,
      url: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`,
      color: "hover:bg-blue-50 hover:text-blue-600 dark:hover:bg-blue-900/20",
    },
    {
      name: "Facebook",
      icon: Facebook,
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
      color: "hover:bg-blue-50 hover:text-blue-700 dark:hover:bg-blue-900/20",
    },
    {
      name: "LinkedIn",
      icon: Linkedin,
      url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`,
      color: "hover:bg-blue-50 hover:text-blue-800 dark:hover:bg-blue-900/20",
    },
    {
      name: "WhatsApp",
      icon: MessageCircle,
      url: `https://wa.me/?text=${encodeURIComponent(`${shareText} ${shareUrl}`)}`,
      color: "hover:bg-green-50 hover:text-green-600 dark:hover:bg-green-900/20",
    },
    {
      name: "Email",
      icon: Mail,
      url: `mailto:?subject=${encodeURIComponent(blog.title)}&body=${encodeURIComponent(`${shareText}\n\n${shareUrl}`)}`,
      color: "hover:bg-gray-50 hover:text-gray-600 dark:hover:bg-gray-900/20",
    },
  ]

  const handleSocialShare = (url: string) => {
    window.open(url, "_blank", "width=600,height=400")
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Share this blog</DialogTitle>
          <DialogDescription>Share "{blog.title}" with your network</DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Social Share Options */}
          <div className="grid grid-cols-2 gap-3">
            {shareOptions.map((option) => (
              <Button
                key={option.name}
                variant="outline"
                className={`flex items-center gap-2 h-12 ${option.color}`}
                onClick={() => handleSocialShare(option.url)}
              >
                <option.icon className="h-4 w-4" />
                {option.name}
              </Button>
            ))}
          </div>

          {/* Copy Link */}
          <div className="space-y-2">
            <Label htmlFor="share-url">Share link</Label>
            <div className="flex gap-2">
              <Input id="share-url" value={shareUrl} readOnly className="flex-1" />
              <Button variant="outline" size="icon" onClick={handleCopyLink} className={copied ? "text-green-600" : ""}>
                {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              </Button>
            </div>
            {copied && <p className="text-sm text-green-600">Link copied to clipboard!</p>}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
