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
    content: `# Mental Health in the Digital Age

In our increasingly connected world, the relationship between technology and mental health has become more complex than ever. While digital tools offer unprecedented opportunities for connection and support, they also present unique challenges to our psychological well-being.

## The Digital Paradox

We live in an age of constant connectivity, yet many people report feeling more isolated than ever. Social media platforms promise connection but often deliver comparison and anxiety. The always-on nature of digital communication creates pressure to be constantly available and responsive.

### Common Digital Mental Health Challenges

**1. Social Media Anxiety**
The curated nature of social media feeds can lead to unrealistic comparisons and feelings of inadequacy. The pressure to present a perfect online persona can be exhausting and inauthentic.

**2. Information Overload**
The constant stream of news, notifications, and updates can overwhelm our cognitive capacity and contribute to stress and anxiety.

**3. Digital Addiction**
Compulsive use of smartphones, social media, and other digital platforms can interfere with sleep, relationships, and productivity.

**4. Cyberbullying and Online Harassment**
The anonymity and distance provided by digital platforms can sometimes enable harmful behaviors that impact mental health.

## Strategies for Digital Wellness

### Set Boundaries
- Establish phone-free zones and times
- Use app timers to limit social media usage
- Create a digital sunset routine before bed

### Curate Your Digital Environment
- Unfollow accounts that make you feel bad about yourself
- Follow accounts that inspire and educate
- Use privacy settings to control your online experience

### Practice Mindful Technology Use
- Be intentional about when and why you use devices
- Take regular breaks from screens
- Engage in offline activities that bring joy

### Seek Support When Needed
- Don't hesitate to reach out to mental health professionals
- Use technology positively by accessing mental health apps and resources
- Connect with supportive online communities

## The Positive Side of Digital Mental Health

Technology isn't inherently harmful to mental health. When used mindfully, digital tools can:
- Provide access to mental health resources and therapy
- Connect us with supportive communities
- Offer meditation and mindfulness apps
- Enable remote work and flexible lifestyles

## Moving Forward

The key to maintaining mental health in the digital age is finding balance. We need to harness the benefits of technology while protecting ourselves from its potential harms. This requires ongoing awareness, intentional choices, and sometimes, the courage to disconnect.

*How do you maintain your mental health in our digital world? Share your strategies and experiences.*`,
    author: { name: "Dr. James Wilson", avatar: "/placeholder-tnmbv.png" },
    category: "Health",
    likes: 298,
    createdAt: "2024-01-12",
    readTime: 10,
    trending: true,
    featuredImage: "/mental-health-digital-wellness.jpg",
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
    content: `# Black Holes: Windows to the Universe

Black holes represent some of the most extreme and fascinating objects in our universe. These cosmic giants, with gravitational fields so strong that nothing—not even light—can escape once it crosses the event horizon, continue to challenge our understanding of physics and reality itself.

## What Are Black Holes?

A black hole is a region of spacetime where gravity is so strong that nothing can escape from it. They form when massive stars collapse at the end of their lives, creating a singularity—a point where density becomes infinite and spacetime curvature becomes extreme.

### Types of Black Holes

**Stellar Black Holes**
Formed from collapsed stars, typically 3-20 times the mass of our Sun.

**Intermediate Black Holes**
Rare objects with masses between stellar and supermassive black holes.

**Supermassive Black Holes**
Found at the centers of galaxies, with masses millions to billions of times that of the Sun.

**Primordial Black Holes**
Theoretical black holes that could have formed in the early universe.

## Recent Discoveries

### Event Horizon Telescope
In 2019, we got our first direct image of a black hole's event horizon, specifically M87*, located 55 million light-years away. This groundbreaking achievement confirmed many theoretical predictions about black holes.

### Gravitational Waves
The detection of gravitational waves by LIGO has opened a new window into black hole research, allowing us to "hear" black holes merging across the cosmos.

### Sagittarius A*
In 2022, we captured the first image of Sagittarius A*, the supermassive black hole at the center of our own Milky Way galaxy.

## What Black Holes Teach Us

### Spacetime and Gravity
Black holes provide extreme laboratories for testing Einstein's theory of general relativity. They demonstrate how massive objects warp spacetime and how this warping manifests as gravity.

### Information Paradox
The black hole information paradox challenges our understanding of quantum mechanics and general relativity, asking whether information that falls into a black hole is truly lost forever.

### Time Dilation
Near black holes, time passes differently due to extreme gravitational time dilation—a phenomenon that has practical implications for space travel and our understanding of time itself.

## The Future of Black Hole Research

As our technology advances, we'll be able to study black holes in even greater detail. Future space-based telescopes and gravitational wave detectors will provide new insights into these cosmic mysteries.

### Potential Applications
- Testing fundamental physics
- Understanding galaxy formation and evolution
- Exploring the nature of spacetime
- Advancing our knowledge of quantum gravity

## Conclusion

Black holes continue to be among the most active areas of astrophysical research. Each new discovery brings us closer to understanding not just these exotic objects, but the fundamental nature of our universe itself.

*What aspect of black holes fascinates you most? Share your thoughts on these cosmic mysteries.*`,
    author: { name: "Prof. Luna Star", avatar: "/placeholder.svg" },
    category: "Space",
    likes: 367,
    createdAt: "2024-01-15",
    readTime: 9,
    trending: true,
    featuredImage: "/black-hole-event-horizon-space.jpg",
  },
  {
    id: "7",
    title: "Building Scalable Microservices",
    excerpt: "Best practices for designing and implementing microservice architectures that scale.",
    content: `# Building Scalable Microservices

Microservices architecture has become the go-to approach for building large-scale, distributed applications. By breaking down monolithic applications into smaller, independent services, organizations can achieve better scalability, maintainability, and team autonomy.

## Core Principles of Microservices

### Single Responsibility
Each microservice should have a single, well-defined responsibility and should be able to be developed, deployed, and scaled independently.

### Decentralized Governance
Teams should have the autonomy to choose the best technologies and practices for their specific services.

### Failure Isolation
Services should be designed to handle failures gracefully and not cascade failures to other services.

### Data Ownership
Each service should own its data and not share databases with other services.

## Design Patterns for Scalability

### API Gateway Pattern
Use an API gateway to handle cross-cutting concerns like authentication, rate limiting, and request routing.

### Circuit Breaker Pattern
Implement circuit breakers to prevent cascading failures and provide fallback mechanisms.

### Event-Driven Architecture
Use asynchronous messaging to decouple services and improve system resilience.

### Database Per Service
Each microservice should have its own database to ensure loose coupling and independent scaling.

## Implementation Best Practices

### Service Discovery
Implement service discovery mechanisms to allow services to find and communicate with each other dynamically.

### Load Balancing
Use load balancers to distribute traffic across multiple instances of services.

### Monitoring and Observability
Implement comprehensive logging, metrics, and tracing to understand system behavior.

### Containerization
Use containers to package and deploy services consistently across environments.

## Challenges and Solutions

### Distributed System Complexity
Managing distributed systems is inherently complex. Use tools like service meshes to handle communication complexity.

### Data Consistency
Implement eventual consistency patterns and use distributed transaction patterns like Saga when needed.

### Testing
Develop comprehensive testing strategies including unit tests, integration tests, and contract testing.

### Security
Implement security at multiple layers including network security, service-to-service authentication, and data encryption.

## Technology Stack Considerations

### Programming Languages
Choose languages that fit your team's expertise and the service's requirements.

### Databases
Select databases based on the specific needs of each service (SQL, NoSQL, time-series, etc.).

### Message Brokers
Use message brokers like Apache Kafka or RabbitMQ for asynchronous communication.

### Orchestration
Consider using Kubernetes for container orchestration and service management.

## Conclusion

Building scalable microservices requires careful planning, the right tools, and a deep understanding of distributed systems principles. While the complexity is higher than monolithic applications, the benefits in terms of scalability, maintainability, and team productivity can be substantial.

*What challenges have you faced when implementing microservices? Share your experiences and solutions.*`,
    author: { name: "David Kumar", avatar: "/placeholder.svg" },
    category: "Technology",
    likes: 278,
    createdAt: "2024-01-14",
    readTime: 11,
    trending: false,
    featuredImage: "/microservices-architecture-diagram.jpg",
  },
  {
    id: "8",
    title: "The Psychology of Color in Design",
    excerpt: "How color choices influence user behavior and emotional responses in digital interfaces.",
    content: `# The Psychology of Color in Design

Color is one of the most powerful tools in a designer's arsenal. It can evoke emotions, influence behavior, and create memorable experiences. Understanding the psychology behind color choices is essential for creating effective digital interfaces that resonate with users.

## The Science of Color Psychology

Color psychology is the study of how colors affect human behavior and emotions. While individual responses to color can vary based on personal experiences and cultural background, there are some universal patterns that designers can leverage.

### How Colors Affect the Brain

When we see color, our brains process it in the limbic system, which is responsible for emotions and memory. This immediate emotional response happens before conscious thought, making color a powerful tool for creating instant impressions.

## Color Meanings and Associations

### Red
- **Emotions**: Energy, passion, urgency, excitement
- **Use Cases**: Call-to-action buttons, sale notifications, error messages
- **Brands**: Coca-Cola, Netflix, YouTube

### Blue
- **Emotions**: Trust, stability, professionalism, calm
- **Use Cases**: Corporate websites, financial services, healthcare
- **Brands**: Facebook, LinkedIn, IBM

### Green
- **Emotions**: Growth, nature, success, harmony
- **Use Cases**: Environmental sites, financial success indicators, health apps
- **Brands**: Spotify, WhatsApp, Starbucks

### Yellow
- **Emotions**: Optimism, creativity, attention, caution
- **Use Cases**: Highlighting important information, creative platforms
- **Brands**: McDonald's, Snapchat, IKEA

### Purple
- **Emotions**: Luxury, creativity, mystery, spirituality
- **Use Cases**: Premium products, creative platforms, beauty brands
- **Brands**: Twitch, Yahoo, Hallmark

### Orange
- **Emotions**: Enthusiasm, creativity, warmth, affordability
- **Use Cases**: E-commerce, food delivery, creative tools
- **Brands**: Amazon, Firefox, Fanta

## Practical Applications in UI/UX Design

### Creating Visual Hierarchy
Use color contrast and saturation to guide users' attention to the most important elements on your interface.

### Establishing Brand Identity
Consistent color usage across all touchpoints helps build brand recognition and trust.

### Improving Usability
Use color coding to help users understand different types of content or actions (e.g., green for success, red for errors).

### Cultural Considerations
Be aware that color meanings can vary significantly across cultures. What represents luck in one culture might represent mourning in another.

## Color Accessibility

### Contrast Ratios
Ensure sufficient contrast between text and background colors to meet WCAG accessibility guidelines.

### Color Blindness
Don't rely solely on color to convey important information. Use additional visual cues like icons or text labels.

### Testing Tools
Use tools like Color Oracle or Stark to test your designs for color accessibility.

## Best Practices for Color Selection

### Start with Purpose
Define what emotions and actions you want to evoke before choosing colors.

### Limit Your Palette
Use a limited color palette (3-5 colors) to maintain consistency and avoid overwhelming users.

### Test with Real Users
Conduct user testing to validate that your color choices are having the intended effect.

### Consider Context
The same color can have different meanings in different contexts within your application.

## Conclusion

Color psychology is a powerful tool that can significantly impact user experience and business outcomes. By understanding how colors affect emotions and behavior, designers can create more effective and engaging digital experiences.

*How do you approach color selection in your designs? Share your experiences and insights.*`,
    author: { name: "Maya Chen", avatar: "/placeholder.svg" },
    category: "Design",
    likes: 203,
    createdAt: "2024-01-13",
    readTime: 7,
    trending: false,
    featuredImage: "/color-psychology-design-wheel.jpg",
  },
  {
    id: "9",
    title: "Meditation for Busy Professionals",
    excerpt: "Simple mindfulness techniques that fit into your hectic schedule and reduce stress.",
    content: `# Meditation for Busy Professionals

In today's fast-paced professional world, stress and burnout have become increasingly common. While the benefits of meditation are well-documented, many busy professionals struggle to find time for traditional meditation practices. This guide offers practical, time-efficient mindfulness techniques that can be integrated into even the busiest schedules.

## Why Meditation Matters for Professionals

### Stress Reduction
Regular meditation practice can significantly reduce cortisol levels and help manage work-related stress.

### Improved Focus
Meditation enhances concentration and attention span, leading to better productivity and decision-making.

### Better Emotional Regulation
Mindfulness practices help develop emotional intelligence and improve workplace relationships.

### Enhanced Creativity
Meditation can unlock creative thinking and problem-solving abilities.

## Quick Meditation Techniques for Busy Schedules

### 1. The 2-Minute Morning Reset
Start your day with a brief mindfulness practice:
- Sit comfortably and close your eyes
- Take 5 deep breaths, focusing on the sensation
- Set an intention for the day
- Open your eyes and begin your day mindfully

### 2. Desk Meditation (5 minutes)
Perfect for office environments:
- Sit upright in your chair
- Place feet flat on the floor
- Focus on your breath for 5 minutes
- If thoughts arise, gently return attention to breathing

### 3. Walking Meditation
Turn your commute or lunch break into meditation time:
- Walk at a normal pace
- Focus on the sensation of your feet touching the ground
- Notice your surroundings without judgment
- Breathe naturally and stay present

### 4. Micro-Meditations (30 seconds - 2 minutes)
Use these throughout the day:
- Before important meetings: 3 deep breaths
- Between tasks: 30-second body scan
- During breaks: mindful drinking of coffee or tea
- Before difficult conversations: brief centering practice

## Technology-Assisted Meditation

### Meditation Apps
- Headspace: Guided meditations for workplace stress
- Calm: Daily calm sessions and sleep stories
- Insight Timer: Free meditations with timer features
- Ten Percent Happier: Practical meditation for skeptics

### Wearable Reminders
Use smartwatch notifications to remind yourself to take mindful moments throughout the day.

## Creating a Sustainable Practice

### Start Small
Begin with just 2-3 minutes daily and gradually increase duration.

### Be Consistent
Regular short practices are more beneficial than occasional long sessions.

### Find Your Optimal Time
Experiment with different times of day to find what works best for your schedule.

### Use Triggers
Link meditation to existing habits (e.g., after your morning coffee, before lunch).

## Overcoming Common Obstacles

### "I Don't Have Time"
Remember that even 2 minutes can make a difference. Quality over quantity.

### "My Mind Is Too Busy"
A busy mind is normal. The goal isn't to stop thoughts but to observe them without judgment.

### "I Keep Forgetting"
Set phone reminders or use meditation apps with notification features.

### "I Don't See Results"
Benefits often accumulate gradually. Keep a meditation journal to track subtle changes.

## Workplace Integration

### Meeting Meditation
Start meetings with a brief moment of silence or deep breathing.

### Mindful Transitions
Use the time between meetings for brief mindfulness practices.

### Stress Response Protocol
Develop a go-to meditation technique for high-stress situations.

## Conclusion

Meditation doesn't require hours of sitting in silence. By incorporating brief, practical mindfulness techniques into your daily routine, you can experience the benefits of meditation while maintaining your professional responsibilities. The key is consistency and finding practices that fit naturally into your lifestyle.

*What meditation techniques have worked best for your busy schedule? Share your experiences and tips.*`,
    author: { name: "Zen Master Kim", avatar: "/placeholder.svg" },
    category: "Health",
    likes: 156,
    createdAt: "2024-01-12",
    readTime: 6,
    trending: false,
    featuredImage: "/meditation-mindfulness-professional.jpg",
  },
  {
    id: "10",
    title: "The Space Economy: Trillion Dollar Opportunity",
    excerpt: "How commercial space ventures are creating new industries and economic opportunities.",
    content: `# The Space Economy: Trillion Dollar Opportunity

The space economy is experiencing unprecedented growth, with commercial space ventures leading the charge into what many consider the next great economic frontier. From satellite internet to space tourism, asteroid mining to orbital manufacturing, the opportunities are as vast as space itself.

## Current State of the Space Economy

### Market Size and Growth
The global space economy was valued at approximately $469 billion in 2023 and is projected to reach over $1 trillion by 2040. This growth is driven by decreasing launch costs, technological advances, and increasing private investment.

### Key Sectors
- **Satellite Services**: Communications, Earth observation, navigation
- **Launch Services**: Rocket manufacturing and launch operations
- **Space Tourism**: Suborbital and orbital passenger flights
- **Space Manufacturing**: Zero-gravity production facilities
- **Resource Extraction**: Asteroid and lunar mining

## Revolutionary Technologies Driving Growth

### Reusable Rockets
SpaceX's Falcon 9 and other reusable launch systems have dramatically reduced the cost of reaching orbit, making space more accessible than ever before.

### Small Satellites
CubeSats and other small satellite technologies have democratized space access, allowing smaller companies and even universities to launch space missions.

### Advanced Propulsion
New propulsion technologies, including ion drives and nuclear propulsion, are enabling more efficient and longer-duration space missions.

### In-Space Manufacturing
Zero-gravity environments offer unique advantages for manufacturing certain materials and products that are impossible to create on Earth.

## Emerging Business Models

### Space as a Service (SaaS)
Companies are offering space-based services including data analytics, Earth monitoring, and communication services.

### Space Tourism
Virgin Galactic, Blue Origin, and SpaceX are pioneering commercial space tourism, making space accessible to civilians.

### Orbital Platforms
Companies are developing orbital platforms for manufacturing, research, and even entertainment.

### Space Logistics
New companies are emerging to provide cargo delivery, satellite servicing, and orbital debris removal services.

## Investment and Funding Trends

### Venture Capital
Space startups raised over $17 billion in 2023, with investors increasingly confident in the commercial viability of space ventures.

### Government Partnerships
Public-private partnerships are becoming more common, with governments leveraging commercial capabilities for national space programs.

### International Collaboration
Cross-border investments and partnerships are accelerating space technology development and market expansion.

## Challenges and Opportunities

### Regulatory Framework
The space industry needs clear, consistent regulations that promote innovation while ensuring safety and sustainability.

### Space Debris
The growing amount of space debris poses risks that need to be addressed through better tracking and removal technologies.

### Skilled Workforce
The industry needs more skilled workers, creating opportunities for education and training programs.

### Sustainability
Long-term success requires sustainable practices to preserve the space environment for future generations.

## Future Prospects

### Lunar Economy
The Moon represents a significant economic opportunity for resource extraction, research facilities, and as a stepping stone to Mars.

### Mars Colonization
Long-term plans for Mars colonization could create entirely new economic ecosystems and industries.

### Asteroid Mining
The potential wealth in asteroid resources could dwarf Earth's entire economy, though significant technical challenges remain.

### Space-Based Solar Power
Orbital solar power stations could provide clean energy to Earth while creating new space-based industries.

## Getting Involved

### Career Opportunities
The space industry offers diverse career paths in engineering, business, law, finance, and many other fields.

### Investment Opportunities
From public space companies to private startups, there are numerous ways to invest in the space economy.

### Educational Pathways
Universities are expanding space-related programs, and online courses make space education more accessible.

## Conclusion

The space economy represents one of the most significant economic opportunities of our time. As technology continues to advance and costs continue to fall, we're likely to see exponential growth in space-based industries and services. The question isn't whether the space economy will reach a trillion dollars, but how quickly it will get there.

*What aspect of the space economy excites you most? Share your thoughts on this cosmic opportunity.*`,
    author: { name: "Elon Starship", avatar: "/placeholder.svg" },
    category: "Space",
    likes: 512,
    createdAt: "2024-01-11",
    readTime: 14,
    trending: true,
    featuredImage: "/space-economy-commercial-satellites.jpg",
  },
  {
    id: "11",
    title: "Remote Work Revolution",
    excerpt: "How distributed teams are reshaping the future of work and company culture.",
    content: `# Remote Work Revolution

The shift towards remote work has fundamentally reshaped how we think about employment, productivity, and company culture. Distributed teams are no longer a niche phenomenon but a mainstream reality, offering both unprecedented flexibility and unique challenges.

## The Rise of Distributed Teams

### Key Drivers
- **Technological Advancements**: Improved internet infrastructure, collaboration tools, and cloud computing.
- **Employee Demand**: Desire for work-life balance, reduced commute times, and greater autonomy.
- **Cost Savings**: Reduced overhead for companies (office space, utilities) and employees (commuting, work attire).
- **Global Talent Pool**: Access to a wider range of skilled professionals regardless of geographical location.

## Benefits of Remote Work

### For Employees
- **Flexibility**: Ability to manage personal commitments and work on their own schedule.
- **Autonomy**: Greater control over their work environment and methods.
- **Reduced Stress**: Elimination of stressful commutes and office politics.
- **Improved Work-Life Balance**: More time for family, hobbies, and personal well-being.

### For Employers
- **Increased Productivity**: Many studies show remote workers are more productive.
- **Access to Talent**: Ability to hire the best candidates globally.
- **Reduced Costs**: Lower operational expenses related to physical office spaces.
- **Higher Employee Retention**: Offering remote work can be a significant perk.

## Challenges of Remote Work

### Communication and Collaboration
- **Lack of Spontaneous Interaction**: Missing out on informal "water cooler" conversations.
- **Misinterpretation**: Difficulty conveying tone and nuance in written communication.
- **Tool Overload**: Managing multiple communication and collaboration platforms.

### Company Culture and Team Cohesion
- **Building Rapport**: Harder to foster strong team bonds and a sense of belonging.
- **Onboarding New Employees**: Integrating new hires into the company culture remotely.
- **Maintaining Morale**: Ensuring employees feel connected and valued.

### Productivity and Accountability
- **Distractions at Home**: Balancing work with household responsibilities.
- **Time Management**: Difficulty in separating work and personal life.
- **Performance Monitoring**: Shifting from presenteeism to results-based evaluation.

## Strategies for Successful Remote Work

### Invest in the Right Tools
- **Communication**: Slack, Microsoft Teams, Zoom
- **Project Management**: Asana, Trello, Jira
- **Collaboration**: Google Workspace, Notion, Miro

### Foster a Strong Remote Culture
- **Regular Virtual Social Events**: Coffee breaks, team lunches, game nights.
- **Clear Communication Guidelines**: Establish norms for response times and preferred channels.
- **Recognition and Appreciation**: Actively acknowledge contributions and successes.
- **Leadership Training**: Equip managers to lead distributed teams effectively.

### Promote Work-Life Balance
- **Encourage Boundaries**: Advise employees to set clear work hours.
- **Flexible Schedules**: Allow for asynchronous work where possible.
- **Mental Health Support**: Provide resources and promote well-being.

### Effective Onboarding
- **Structured Remote Onboarding Process**: Clear checklists, virtual introductions, and mentorship.
- **Culture Immersion**: Share company values and mission through virtual sessions.

## The Future of Work

Remote and hybrid models are likely to remain a significant part of the future of work. Companies that embrace flexibility, invest in their remote infrastructure, and prioritize employee well-being will be best positioned for success. The "office" is no longer a place but a concept, enabling a more distributed, diverse, and dynamic workforce.

*What are your biggest challenges or successes with remote work? Share your insights.*`,
    author: { name: "Remote Rachel", avatar: "/placeholder.svg" },
    category: "Business",
    likes: 189,
    createdAt: "2024-01-10",
    readTime: 8,
    trending: false,
    featuredImage: "/remote-work-home-office.jpg",
  },
  {
    id: "12",
    title: "Digital Nomad Paradise: Bali Edition",
    excerpt: "A complete guide to living and working remotely from the Island of the Gods.",
    content: `# Digital Nomad Paradise: Bali Edition

Bali, the "Island of the Gods," has long been a magnet for travelers seeking spiritual retreats, vibrant culture, and stunning natural beauty. In recent years, it has also emerged as a premier destination for digital nomads, offering a unique blend of affordability, community, and inspiring landscapes.

## Why Bali for Digital Nomads?

### Affordability
Compared to many Western countries, Bali offers a significantly lower cost of living, making it an attractive option for those working remotely. Accommodation, food, and transportation are all budget-friendly.

### Vibrant Community
Bali boasts a large and active digital nomad community. Co-working spaces, meetups, and social events make it easy to connect with like-minded individuals.

### Infrastructure
While not always perfect, Bali has decent internet speeds in many areas, especially in popular hubs like Canggu and Ubud. Numerous co-working spaces offer reliable connectivity and a professional environment.

### Lifestyle and Culture
From yoga retreats and surfing to exploring ancient temples and lush rice paddies, Bali offers a rich cultural experience and a relaxed lifestyle that many digital nomads crave.

## Popular Digital Nomad Hubs in Bali

### Canggu
Known for its trendy cafes, surf breaks, yoga studios, and bustling co-working scene. It's a popular choice for younger nomads and those seeking a lively atmosphere.

### Ubud
The cultural heart of Bali, Ubud offers a more serene and spiritual vibe. It's ideal for those interested in yoga, wellness, and a slower pace of life, with many beautiful co-working spaces nestled among the rice fields.

### Seminyak
Offers a more upscale experience with boutique shops, fine dining, and stylish beach clubs. It's a good option for those who prefer a bit more luxury.

## Practical Tips for Digital Nomads in Bali

### Visa Requirements
Research the latest visa regulations for your nationality. Many nomads opt for a Visa on Arrival (VOA) and extend it, or explore longer-term business visa options.

### Accommodation
Options range from affordable guesthouses and homestays to private villas and apartments. Booking platforms like Airbnb and local Facebook groups are useful resources.

### Internet Connectivity
While improving, internet speeds can vary. Consider getting a local SIM card with a data plan or investing in a portable Wi-Fi hotspot for reliable connectivity.

### Transportation
Scooters are the most common mode of transport. Ensure you have an international driving permit and always wear a helmet. Ride-sharing apps like Gojek and Grab are also widely available.

### Health and Safety
- **Vaccinations**: Consult your doctor about recommended vaccinations.
- **Travel Insurance**: Essential for covering medical emergencies.
- **Food and Water**: Stick to bottled water and be mindful of street food hygiene.
- **Sun Protection**: Bali is tropical; use sunscreen and stay hydrated.

### Co-working Spaces
Bali has a growing number of excellent co-working spaces, offering reliable internet, networking opportunities, and a dedicated work environment. Popular options include Dojo, Tropical Nomad, and Hubud.

## Embracing the Bali Lifestyle

Beyond work, immerse yourself in what makes Bali special:
- **Learn to surf**: Many schools cater to beginners.
- **Practice yoga and meditation**: Ubud is a global hub for wellness.
- **Explore the island**: Visit waterfalls, temples, and rice terraces.
- **Savor the local cuisine**: Try authentic Balinese dishes.
- **Connect with the community**: Attend local events and meetups.

## Conclusion

Bali offers a compelling combination of affordability, community, and an inspiring lifestyle that makes it an ideal destination for digital nomads. By planning ahead and embracing the local culture, you can create a fulfilling and productive remote work experience on the Island of the Gods.

*What are your favorite spots or tips for digital nomads in Bali? Share your experiences!*`,
    author: { name: "Nomad Nick", avatar: "/placeholder.svg" },
    category: "Travel",
    likes: 234,
    createdAt: "2024-01-09",
    readTime: 10,
    trending: false,
    featuredImage: "/bali-digital-nomad-workspace.jpg",
  },
]

const categories = ["All", "Technology", "Lifestyle", "Design", "Health", "Business", "Travel", "Space"]

export default function HomePage() {
  const { user, isAuthenticated, logout } = useAuth()
  const [blogs, setBlogs] = useState<BlogPost[]>(() => {
    if (typeof window !== "undefined") {
      const publishedBlogs = JSON.parse(localStorage.getItem("publishedBlogs") || "[]")
      return [...publishedBlogs, ...mockBlogs]
    }
    return mockBlogs
  })

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
    const handleStorageChange = () => {
      const publishedBlogs = JSON.parse(localStorage.getItem("publishedBlogs") || "[]")
      setBlogs([...publishedBlogs, ...mockBlogs])
    }

    window.addEventListener("storage", handleStorageChange)
    return () => window.removeEventListener("storage", handleStorageChange)
  }, [])

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

        <section className="mb-16">
          <div className="flex items-center gap-3 mb-8">
            <div className="p-2 rounded-lg bg-gradient-to-br from-primary to-accent">
              <Star className="h-5 w-5 text-primary-foreground" />
            </div>
            <h3 className="text-3xl font-bold gradient-text">Explore Blogs</h3>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card
              className="group card-hover glass-effect border-0 overflow-hidden cursor-pointer"
              onClick={() => setSelectedCategory("Technology")}
            >
              <div className="relative h-32 overflow-hidden">
                <img
                  src="/ai-coding-futuristic-technology.jpg"
                  alt="Technology"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-3 left-3">
                  <h4 className="text-white font-semibold">Technology</h4>
                  <p className="text-white/80 text-sm">
                    {blogs.filter((b) => b.category === "Technology").length} posts
                  </p>
                </div>
              </div>
            </Card>

            <Card
              className="group card-hover glass-effect border-0 overflow-hidden cursor-pointer"
              onClick={() => setSelectedCategory("Space")}
            >
              <div className="relative h-32 overflow-hidden">
                <img
                  src="/mars-planet-red-surface-space-exploration.jpg"
                  alt="Space"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-3 left-3">
                  <h4 className="text-white font-semibold flex items-center gap-1">
                    <Rocket className="h-4 w-4" />
                    Space
                  </h4>
                  <p className="text-white/80 text-sm">{blogs.filter((b) => b.category === "Space").length} posts</p>
                </div>
              </div>
            </Card>

            <Card
              className="group card-hover glass-effect border-0 overflow-hidden cursor-pointer"
              onClick={() => setSelectedCategory("Design")}
            >
              <div className="relative h-32 overflow-hidden">
                <img
                  src="/minimalist-design-clean-modern.jpg"
                  alt="Design"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-3 left-3">
                  <h4 className="text-white font-semibold">Design</h4>
                  <p className="text-white/80 text-sm">{blogs.filter((b) => b.category === "Design").length} posts</p>
                </div>
              </div>
            </Card>

            <Card
              className="group card-hover glass-effect border-0 overflow-hidden cursor-pointer"
              onClick={() => setSelectedCategory("Health")}
            >
              <div className="relative h-32 overflow-hidden">
                <img
                  src="/mental-health-digital-wellness.jpg"
                  alt="Health"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-3 left-3">
                  <h4 className="text-white font-semibold">Health</h4>
                  <p className="text-white/80 text-sm">{blogs.filter((b) => b.category === "Health").length} posts</p>
                </div>
              </div>
            </Card>
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
                        <Heart
                          className={`h-4 w-4 transition-all duration-200 ${
                            likedBlogs.has(blog.id) ? "fill-red-500 text-red-500 scale-110" : ""
                          }`}
                        />
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
