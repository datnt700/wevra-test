-- CreateEnum
CREATE TYPE "UserStage" AS ENUM ('STARTER', 'STABILIZER', 'BUILDER', 'GROWER');

-- CreateEnum
CREATE TYPE "LessonType" AS ENUM ('ARTICLE', 'VIDEO', 'INTERACTIVE', 'QUIZ');

-- CreateEnum
CREATE TYPE "ChallengeType" AS ENUM ('SAVE_MONEY', 'TRACK_SPENDING', 'NO_SPEND', 'LEARN', 'REFLECT', 'AUTOMATE', 'BUDGET');

-- CreateEnum
CREATE TYPE "ChallengeStatus" AS ENUM ('IN_PROGRESS', 'COMPLETED', 'FAILED', 'ABANDONED');

-- CreateEnum
CREATE TYPE "AchievementType" AS ENUM ('TOTAL_POINTS', 'STREAK', 'LESSONS_COMPLETED', 'CHALLENGES_COMPLETED', 'STAGE_REACHED', 'SPECIAL');

-- CreateEnum
CREATE TYPE "GoalCategory" AS ENUM ('EMERGENCY_FUND', 'SAVE', 'INVEST', 'DEBT_PAYOFF', 'RETIREMENT', 'OTHER');

-- CreateEnum
CREATE TYPE "GoalStatus" AS ENUM ('ACTIVE', 'COMPLETED', 'PAUSED', 'CANCELLED');

-- CreateEnum
CREATE TYPE "HabitType" AS ENUM ('SAVE', 'BUDGET', 'LEARN', 'TRACK_EXPENSES', 'REVIEW_FINANCES', 'NO_IMPULSE_BUY');

-- CreateTable
CREATE TABLE "accounts" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "providerAccountId" TEXT NOT NULL,
    "refresh_token" TEXT,
    "access_token" TEXT,
    "expires_at" INTEGER,
    "token_type" TEXT,
    "scope" TEXT,
    "id_token" TEXT,
    "session_state" TEXT,

    CONSTRAINT "accounts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sessions" (
    "id" TEXT NOT NULL,
    "sessionToken" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "sessions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "verification_tokens" (
    "identifier" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL
);

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "email" TEXT,
    "emailVerified" TIMESTAMP(3),
    "password" TEXT,
    "name" TEXT,
    "image" TEXT,
    "onboardingCompleted" BOOLEAN NOT NULL DEFAULT false,
    "currentStage" "UserStage" NOT NULL DEFAULT 'STARTER',
    "totalPoints" INTEGER NOT NULL DEFAULT 0,
    "streak" INTEGER NOT NULL DEFAULT 0,
    "lastActiveDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "quiz_results" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "answers" JSONB NOT NULL,
    "financialAwareness" INTEGER NOT NULL DEFAULT 0,
    "habitDiscipline" INTEGER NOT NULL DEFAULT 0,
    "motivation" INTEGER NOT NULL DEFAULT 0,
    "recommendedStage" "UserStage" NOT NULL,
    "recommendations" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "quiz_results_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "lessons" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "stage" "UserStage" NOT NULL,
    "order" INTEGER NOT NULL,
    "duration" INTEGER NOT NULL,
    "type" "LessonType" NOT NULL DEFAULT 'ARTICLE',
    "points" INTEGER NOT NULL DEFAULT 10,
    "isPublished" BOOLEAN NOT NULL DEFAULT true,
    "isPremium" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "lessons_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_lessons" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "lessonId" TEXT NOT NULL,
    "completed" BOOLEAN NOT NULL DEFAULT false,
    "progress" INTEGER NOT NULL DEFAULT 0,
    "timeSpent" INTEGER NOT NULL DEFAULT 0,
    "pointsEarned" INTEGER NOT NULL DEFAULT 0,
    "startedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "completedAt" TIMESTAMP(3),

    CONSTRAINT "user_lessons_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "challenges" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "lessonId" TEXT,
    "stage" "UserStage" NOT NULL,
    "type" "ChallengeType" NOT NULL,
    "targetValue" INTEGER,
    "duration" INTEGER,
    "points" INTEGER NOT NULL DEFAULT 50,
    "isPremium" BOOLEAN NOT NULL DEFAULT false,
    "isPublished" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "challenges_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_challenges" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "challengeId" TEXT NOT NULL,
    "status" "ChallengeStatus" NOT NULL DEFAULT 'IN_PROGRESS',
    "progress" INTEGER NOT NULL DEFAULT 0,
    "currentValue" INTEGER NOT NULL DEFAULT 0,
    "pointsEarned" INTEGER NOT NULL DEFAULT 0,
    "startedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "completedAt" TIMESTAMP(3),
    "failedAt" TIMESTAMP(3),

    CONSTRAINT "user_challenges_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "achievements" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "icon" TEXT NOT NULL,
    "type" "AchievementType" NOT NULL,
    "requiredValue" INTEGER NOT NULL,
    "isPremium" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "achievements_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_achievements" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "achievementId" TEXT NOT NULL,
    "unlockedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "user_achievements_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "financial_goals" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "targetAmount" DOUBLE PRECISION NOT NULL,
    "currentAmount" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "category" "GoalCategory" NOT NULL,
    "deadline" TIMESTAMP(3),
    "status" "GoalStatus" NOT NULL DEFAULT 'ACTIVE',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "completedAt" TIMESTAMP(3),

    CONSTRAINT "financial_goals_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "habit_tracking" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "habit" "HabitType" NOT NULL,
    "date" DATE NOT NULL,
    "completed" BOOLEAN NOT NULL DEFAULT true,
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "habit_tracking_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "accounts_provider_providerAccountId_key" ON "accounts"("provider", "providerAccountId");

-- CreateIndex
CREATE UNIQUE INDEX "sessions_sessionToken_key" ON "sessions"("sessionToken");

-- CreateIndex
CREATE UNIQUE INDEX "verification_tokens_identifier_token_key" ON "verification_tokens"("identifier", "token");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE INDEX "lessons_stage_order_idx" ON "lessons"("stage", "order");

-- CreateIndex
CREATE INDEX "user_lessons_userId_completed_idx" ON "user_lessons"("userId", "completed");

-- CreateIndex
CREATE UNIQUE INDEX "user_lessons_userId_lessonId_key" ON "user_lessons"("userId", "lessonId");

-- CreateIndex
CREATE INDEX "challenges_stage_type_idx" ON "challenges"("stage", "type");

-- CreateIndex
CREATE INDEX "user_challenges_userId_status_idx" ON "user_challenges"("userId", "status");

-- CreateIndex
CREATE UNIQUE INDEX "user_challenges_userId_challengeId_key" ON "user_challenges"("userId", "challengeId");

-- CreateIndex
CREATE INDEX "user_achievements_userId_unlockedAt_idx" ON "user_achievements"("userId", "unlockedAt");

-- CreateIndex
CREATE UNIQUE INDEX "user_achievements_userId_achievementId_key" ON "user_achievements"("userId", "achievementId");

-- CreateIndex
CREATE INDEX "financial_goals_userId_status_idx" ON "financial_goals"("userId", "status");

-- CreateIndex
CREATE INDEX "habit_tracking_userId_date_idx" ON "habit_tracking"("userId", "date");

-- CreateIndex
CREATE UNIQUE INDEX "habit_tracking_userId_habit_date_key" ON "habit_tracking"("userId", "habit", "date");

-- AddForeignKey
ALTER TABLE "accounts" ADD CONSTRAINT "accounts_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sessions" ADD CONSTRAINT "sessions_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "quiz_results" ADD CONSTRAINT "quiz_results_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_lessons" ADD CONSTRAINT "user_lessons_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_lessons" ADD CONSTRAINT "user_lessons_lessonId_fkey" FOREIGN KEY ("lessonId") REFERENCES "lessons"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "challenges" ADD CONSTRAINT "challenges_lessonId_fkey" FOREIGN KEY ("lessonId") REFERENCES "lessons"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_challenges" ADD CONSTRAINT "user_challenges_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_challenges" ADD CONSTRAINT "user_challenges_challengeId_fkey" FOREIGN KEY ("challengeId") REFERENCES "challenges"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_achievements" ADD CONSTRAINT "user_achievements_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_achievements" ADD CONSTRAINT "user_achievements_achievementId_fkey" FOREIGN KEY ("achievementId") REFERENCES "achievements"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "financial_goals" ADD CONSTRAINT "financial_goals_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "habit_tracking" ADD CONSTRAINT "habit_tracking_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
