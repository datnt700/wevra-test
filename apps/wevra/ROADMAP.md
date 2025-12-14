# 🗺️ Wevra Product Roadmap

**Vision:** Transform financial education into an engaging, gamified journey
that builds lasting money habits.

---

## 📍 Current Status: Phase 1 - Foundation (In Progress)

### ✅ Completed Milestones

#### 🎯 M1: Core Infrastructure (Complete)

- [x] Next.js 15 app with App Router
- [x] PostgreSQL database with Docker
- [x] Prisma ORM setup
- [x] Auth.js integration (credentials + Google OAuth)
- [x] Protected route middleware
- [x] TypeScript + ESLint configuration
- [x] Emotion styling system

#### 🧭 M2: Onboarding Quiz System (Complete)

- [x] 10-question comprehensive financial assessment
- [x] Question types: multiple choice, scale, text input
- [x] Smart scoring algorithm (1-4 points per question)
- [x] Stage detection: STARTER → STABILIZER → BUILDER → GROWER
- [x] Quiz results page with personalized recommendations
- [x] Quiz analytics engine (`analyzeQuiz.ts`)

#### 🎮 M3: Progression Framework (Complete)

- [x] 4 Stages × 5 Levels = 20 total levels
- [x] XP system (250 XP per level)
- [x] XP rewards: Quiz=100, Lesson=50, Challenge=25, Habit=10
- [x] 8 milestone achievements (levels 2, 5, 7, 10, 13, 15, 18, 20)
- [x] Level 1 - Awareness complete (5 tasks, Money Mirror milestone)
- [x] Journey route structure (`/journey`)
- [x] Progression types and configuration system

#### 🔐 M4: Authentication System (Complete)

- [x] Credentials login (email/password with bcrypt)
- [x] Google OAuth integration
- [x] Session management (JWT + database)
- [x] Middleware route protection
- [x] Test user seeded
- [x] Login/logout flow

#### 🎨 M5: User Interface Foundation (Complete)

- [x] Homepage with "Get Started" CTA
- [x] Quiz UI with themed components
- [x] Journey dashboard skeleton
- [x] User layout with sidebar (Journey, Community)
- [x] Theme colors (semantic, not gray-based)
- [x] Responsive inputs with light backgrounds

---

## 🚀 Phase 1: MVP Launch (Current Phase)

**Goal:** Launch functional financial education platform with core gamification.

### 🎯 M6: Reward System - XP & Coins (Next Up)

**Status:** 🔄 In Progress

- [ ] Database schema for UserProgress, Transactions
- [ ] Coin treasury system
- [ ] XP award engine
- [ ] Coin award engine
- [ ] Visual treasury UI component
- [ ] Reward animations (confetti, +XP/+Coins notifications)
- [ ] Profile page with XP/Coin display
- [ ] Transaction history

**Acceptance Criteria:**

- Users can view XP and Coin balances
- Completing quiz awards 100 XP + 50 Coins
- Treasury page shows all transactions
- Visual feedback on rewards

---

### 🎯 M7: Level 1-5 Content (Awareness Island)

**Status:** 📋 Planned **Dependencies:** M6

**Tasks:**

- [ ] Level 1: Awareness (✅ Config done, need implementation)
  - [ ] Task completion functionality
  - [ ] XP/Coin rewards on completion
  - [ ] Money Mirror milestone unlock
  - [ ] AI insight display
- [ ] Level 2: Tracking - "The First Week"
  - [ ] 4 tasks: Daily expense log, categorize spending, reflection, first
        insight
  - [ ] Milestone: "Week One Warrior" 🏅
- [ ] Level 3: Patterns - "Your Money Story"
  - [ ] 5 tasks: Identify patterns, emotional triggers, habit analysis
  - [ ] Milestone: "Pattern Pioneer" 🔍
- [ ] Level 4: Reality Check - "The Truth Hurts"
  - [ ] 4 tasks: Calculate true expenses, compare income vs spending
  - [ ] Milestone: "Reality Rebel" 💪
- [ ] Level 5: Small Wins - "First Victories"
  - [ ] 5 tasks: Save €10, no-spend day, automation setup
  - [ ] Milestone: "Momentum Master" 🎯 (+100 XP bonus)

**XP Distribution:** ~1,250 XP (completes Stage 1)

---

### 🎯 M8: Habit Tracking System

**Status:** 📋 Planned **Dependencies:** M6

- [ ] Database: HabitTracking model updates
- [ ] Daily habit checklist UI
- [ ] Streak counter (consecutive days)
- [ ] Habit types: SAVE, BUDGET, LEARN, TRACK_EXPENSES, REVIEW_FINANCES,
      NO_IMPULSE_BUY
- [ ] Streak rewards (7-day, 30-day, 90-day milestones)
- [ ] Calendar view of completed habits
- [ ] Push notifications for habit reminders

**Habits:**

- 💰 Daily saving (10 Coins/day)
- 📊 Track expenses (10 Coins/day)
- 📚 Read financial content (15 Coins)
- 🚫 No impulse buy (20 Coins)
- 📈 Review finances (25 Coins)

---

### 🎯 M9: Financial Goals System

**Status:** 📋 Planned **Dependencies:** M6

- [ ] Create goal flow (amount, deadline, category)
- [ ] Goal categories: EMERGENCY_FUND, SAVE, INVEST, DEBT_PAYOFF, RETIREMENT
- [ ] Progress tracking UI
- [ ] Manual contribution updates
- [ ] Goal completion rewards (50-200 XP based on amount)
- [ ] Visual progress ring/bar
- [ ] Goal milestones (25%, 50%, 75%, 100%)

---

### 🎯 M10: Challenges System

**Status:** 📋 Planned **Dependencies:** M6, M8

- [ ] Challenge types implementation
  - [ ] SAVE_MONEY: Save X amount in Y days
  - [ ] TRACK_SPENDING: Track for X consecutive days
  - [ ] NO_SPEND: No unnecessary spending for X days
  - [ ] LEARN: Complete X lessons
  - [ ] REFLECT: Write financial reflections
- [ ] Active challenges dashboard
- [ ] Challenge acceptance flow
- [ ] Progress tracking
- [ ] Completion rewards (25-100 XP, 10-50 Coins)
- [ ] Challenge library/marketplace

**Example Challenges:**

- "Save €100 in 30 days" → 100 XP, 50 Coins
- "No coffee shops for 7 days" → 50 XP, 25 Coins
- "Track every expense for 14 days" → 75 XP, 35 Coins

---

## 🌟 Phase 2: Content & Engagement (Q2 2025)

**Goal:** Rich educational content + community features.

### 🎯 M11: Lessons System

**Status:** 📋 Planned

- [ ] Lesson database seeding (20-30 lessons)
- [ ] Lesson types: ARTICLE, VIDEO, INTERACTIVE, QUIZ
- [ ] Lesson completion tracking
- [ ] Lesson content rendering (markdown/rich text)
- [ ] Stage-based lesson progression
- [ ] Lesson rewards (50 XP, 20 Coins per lesson)
- [ ] Quiz-based lessons for validation

**Content Pillars:**

- 🌱 Awareness: What is money? Tracking basics
- 💪 Consistency: Budgeting, saving habits
- 🚀 Growth: Investing 101, compound interest
- 🏆 Mastery: Tax optimization, wealth strategies

---

### 🎯 M12: Achievement System

**Status:** 📋 Planned **Dependencies:** M6-M11

- [ ] 8 milestone achievements implementation
- [ ] Achievement unlock notifications
- [ ] Badge collection UI
- [ ] Special achievements:
  - [ ] "First Steps" - Complete quiz
  - [ ] "Week Warrior" - 7-day streak
  - [ ] "Money Mirror" - Complete Level 1
  - [ ] "Saver Starter" - First €10 saved
  - [ ] "Consistent Champion" - 30-day streak
  - [ ] "Island Explorer" - Complete Stage 1
  - [ ] "Goal Getter" - Complete first goal
  - [ ] "Master Mind" - Reach Level 20

---

### 🎯 M13: Community Features

**Status:** 📋 Planned

- [ ] Community page implementation
- [ ] User profiles (public/private)
- [ ] Discussion forum/feed
- [ ] Share progress posts
- [ ] Commenting system
- [ ] Like/react functionality
- [ ] Follow/friend system
- [ ] Leaderboards:
  - [ ] Weekly XP leaders
  - [ ] Streak champions
  - [ ] Monthly savers

---

### 🎯 M14: Roadmap Visual UI

**Status:** 📋 Planned **Dependencies:** M7

- [ ] Island-based visual progression
- [ ] Interactive map/journey view
- [ ] 4 Islands:
  - 🌱 Awareness Island (Levels 1-5)
  - 💪 Consistency Path (Levels 6-10)
  - 🚀 Growth Trail (Levels 11-15)
  - 🏆 Mastery Peak (Levels 16-20)
- [ ] Locked/unlocked visual states
- [ ] Progress paths between levels
- [ ] Animated level completion
- [ ] Milestone markers on map

---

## 💰 Phase 3: Monetization & Scale (Q3 2025)

**Goal:** Generate revenue while maintaining user value.

### 🎯 M15: Coin Marketplace

**Status:** 💡 Concept

- [ ] Redeem coins for rewards
- [ ] Partner integrations (gift cards)
- [ ] Premium lesson access (coin-gated)
- [ ] Cosmetic purchases (avatars, themes)
- [ ] Coin → real value conversion (with KYC)
- [ ] Affiliate product recommendations
- [ ] Subscription tier with coin bonuses

**Example Redemptions:**

- 500 Coins → €5 Amazon Gift Card
- 200 Coins → Premium Lesson Pack
- 1000 Coins → Custom Avatar Pack
- 2000 Coins → 1-month Premium (free)

---

### 🎯 M16: Premium Tier

**Status:** 💡 Concept

**Free Tier:**

- ✅ All core lessons
- ✅ Basic habit tracking
- ✅ Community access
- ✅ XP & Coin system
- ❌ Limited challenges (3 active)
- ❌ No AI-powered insights

**Premium Tier (€9.99/month):**

- ✅ All Free features
- ✅ Unlimited challenges
- ✅ AI-powered insights & recommendations
- ✅ Advanced analytics dashboard
- ✅ Priority support
- ✅ 2x Coin earning rate
- ✅ Exclusive premium lessons
- ✅ Custom goal templates
- ✅ Export reports

---

### 🎯 M17: AI-Powered Features

**Status:** 💡 Concept **Dependencies:** Premium tier

- [ ] AI financial coach chatbot
- [ ] Personalized mission generation
- [ ] Smart challenge recommendations
- [ ] Spending pattern analysis
- [ ] Budget optimization suggestions
- [ ] Custom learning paths
- [ ] Predictive goal tracking

---

### 🎯 M18: Mobile App

**Status:** 💡 Concept

- [ ] React Native app (iOS + Android)
- [ ] Push notifications
- [ ] Offline-first habit tracking
- [ ] Quick expense logging
- [ ] Widget support
- [ ] Biometric login
- [ ] Share progress to social media

---

## 🔮 Phase 4: Innovation & Expansion (Q4 2025+)

### 🎯 M19: Advanced Features

- [ ] Group challenges (compete with friends)
- [ ] Financial calculator tools
- [ ] Budget templates
- [ ] Expense categorization AI
- [ ] Receipt scanning
- [ ] Bank account integration (read-only)
- [ ] Investment tracking
- [ ] Net worth dashboard

---

### 🎯 M20: Platform Expansion

- [ ] Multi-language support (EN, FR, ES, DE)
- [ ] Regional content customization
- [ ] Partner ecosystem (financial advisors)
- [ ] Corporate wellness program
- [ ] Educational institution partnerships
- [ ] B2B SaaS offering

---

## 📊 Success Metrics

### 🎯 Phase 1 MVP (3 months)

- **Users:** 100 beta testers
- **Retention:** 40% Week 1 → Week 4
- **Engagement:** 3+ sessions/week
- **Quiz Completion:** 80% of new users
- **Habit Streak:** 30% achieve 7-day streak

### 🎯 Phase 2 Growth (6 months)

- **Users:** 1,000 active users
- **Retention:** 50% monthly
- **Premium Conversion:** 5-10%
- **Community Posts:** 50/week
- **Lesson Completions:** 500/week

### 🎯 Phase 3 Scale (12 months)

- **Users:** 10,000 active users
- **Revenue:** €10k MRR
- **Premium Users:** 500+
- **Referral Rate:** 15%
- **App Store Rating:** 4.5+

---

## 🧭 Development Principles

1. **User Value First:** Every feature must provide clear user benefit
2. **Gamification Balance:** Fun but not gimmicky — real financial education
3. **Progressive Disclosure:** Don't overwhelm new users
4. **Mobile-First Design:** Most users will engage on mobile
5. **Data Privacy:** Transparent about data usage, never sell user data
6. **Accessibility:** WCAG 2.1 AA compliance
7. **Performance:** Fast load times, offline support where possible

---

## 📅 Timeline Summary

| Phase       | Duration    | Key Deliverable                               |
| ----------- | ----------- | --------------------------------------------- |
| **Phase 1** | Months 1-3  | Functional MVP with XP/Coins, habits, goals   |
| **Phase 2** | Months 4-6  | Full content library, community, achievements |
| **Phase 3** | Months 7-12 | Monetization, premium tier, mobile app        |
| **Phase 4** | Month 13+   | Advanced features, partnerships, scale        |

---

## 🎯 Next Sprint (Current)

**Sprint Goal:** Implement basic reward system (M6)

**This Week:**

1. ✅ Create ROADMAP.md
2. 🔄 Update Prisma schema for UserProgress, CoinTransactions
3. 🔄 Create coin treasury UI
4. 🔄 Implement XP/Coin award engine
5. 🔄 Add reward animations
6. 🔄 Build profile page with stats

**Next Week:**

- Complete Level 1 task functionality
- Implement habit tracking system
- Build financial goals UI

---

**Last Updated:** November 3, 2025 **Current Milestone:** M6 - Reward System
**Next Milestone:** M7 - Level 1-5 Content
