import type { QuizAnswer, QuizResult } from '../_types';
import {
  XP_REWARDS,
  getStartingLevelFromQuizStage,
  getXPForLevel,
  getTitleFromLevel,
} from '../../journey/_constants/progression';

export function analyzeQuizResults(answers: QuizAnswer[]): QuizResult {
  const scores = answers.map((answer) => calculateQuestionScore(answer));
  const totalScore = scores.reduce((sum, score) => sum + score, 0);
  const averageScore = scores.length > 0 ? totalScore / scores.length : 0;
  const stage = determineStage(averageScore);

  // Debug logging
  console.log('🔍 Quiz Analysis Debug:');
  console.log('Answers received:', answers);
  console.log('Individual scores:', scores);
  console.log('Total score:', totalScore);
  console.log('Average score:', averageScore);
  console.log('Determined stage:', stage);

  const profile = {
    financialAwareness: calculateAwarenessScore(answers),
    habitDiscipline: calculateDisciplineScore(answers),
    motivation: calculateMotivationScore(answers),
  };

  const recommendations = generateRecommendations(stage, answers);
  const nextSteps = generateNextSteps(stage);
  const roadmapPreview = generateRoadmapPreview(stage);

  // Calculate progression data
  const startingLevel = getStartingLevelFromQuizStage(stage);
  const completionXP = XP_REWARDS.QUIZ_COMPLETE;
  const currentXP = completionXP; // Initial XP from quiz
  const xpToNextLevel = getXPForLevel(startingLevel + 1) - currentXP;
  const title = getTitleFromLevel(startingLevel);

  const progression = {
    level: startingLevel,
    currentXP,
    xpToNextLevel,
    title,
    completionReward: completionXP,
  };

  console.log('🎮 Progression assigned:', progression);

  return {
    stage,
    profile,
    recommendations,
    nextSteps,
    roadmapPreview,
    progression,
  };
}

function calculateQuestionScore(answer: QuizAnswer): number {
  const questionId = answer.questionId;

  if (answer.points !== undefined) {
    console.log(`  ${questionId}: Using points from answer = ${answer.points}`);
    return answer.points;
  }

  if (questionId === 'q9-commitment' && typeof answer.value === 'number') {
    const hours = answer.value;
    let score = 1;
    if (hours < 0.25) score = 1;
    else if (hours < 1) score = 2;
    else if (hours < 2) score = 3;
    else score = 4;
    console.log(`  ${questionId}: Hours = ${hours} → Score = ${score}`);
    return score;
  }

  if (questionId === 'q7-reflection' || questionId === 'q10-success') {
    const score = analyzeTextAnswer(answer.value as string);
    console.log(`  ${questionId}: Text = "${answer.value}" → Score = ${score}`);
    return score;
  }

  console.log(`  ${questionId}: Default score = 2`);
  return 2;
}

function analyzeTextAnswer(text: string): number {
  const lowerText = text.toLowerCase();

  const growerKeywords = [
    'investing',
    'investment',
    'portfolio',
    'diversify',
    'compound',
    'wealth',
    'passive income',
    'financial independence',
    'assets',
    'roi',
    'returns',
    'equity',
    'optimization',
    'strategy',
  ];

  const builderKeywords = [
    'growth',
    'plan',
    'goal',
    'invest',
    'future',
    'retirement',
    'save more',
    'build wealth',
    'long-term',
    'financial freedom',
  ];

  const stabilizerKeywords = [
    'consistent',
    'system',
    'automate',
    'track',
    'routine',
    'habit',
    'budget',
    'stick to',
    'discipline',
    'regular',
    'monthly',
  ];

  const starterKeywords = [
    'saving',
    'start',
    'begin',
    'learn',
    'basic',
    'understand',
    'how to',
    'not worrying',
    'security',
    'bills',
    'emergency',
  ];

  if (growerKeywords.some((kw) => lowerText.includes(kw))) return 4;
  if (builderKeywords.some((kw) => lowerText.includes(kw))) return 3;
  if (stabilizerKeywords.some((kw) => lowerText.includes(kw))) return 2;
  if (starterKeywords.some((kw) => lowerText.includes(kw))) return 1;

  return 2;
}

function determineStage(avgScore: number): 'STARTER' | 'STABILIZER' | 'BUILDER' | 'GROWER' {
  if (avgScore >= 3.5) return 'GROWER';
  if (avgScore >= 2.5) return 'BUILDER';
  if (avgScore >= 1.6) return 'STABILIZER';
  return 'STARTER';
}

function calculateAwarenessScore(answers: QuizAnswer[]): number {
  const q1 = answers.find((a) => a.questionId === 'q1-mindset');
  const q3 = answers.find((a) => a.questionId === 'q3-confidence');
  const q7 = answers.find((a) => a.questionId === 'q7-reflection');

  const scores: number[] = [];
  if (q1?.points) scores.push(((q1.points - 1) / 3) * 100);
  if (q3?.points) scores.push(((q3.points - 1) / 3) * 100);
  if (q7) scores.push(((calculateQuestionScore(q7) - 1) / 3) * 100);

  return scores.length > 0 ? Math.round(scores.reduce((sum, s) => sum + s, 0) / scores.length) : 0;
}

function calculateDisciplineScore(answers: QuizAnswer[]): number {
  const q2 = answers.find((a) => a.questionId === 'q2-frequency');
  const q4 = answers.find((a) => a.questionId === 'q4-savings');
  const q9 = answers.find((a) => a.questionId === 'q9-commitment');

  const scores: number[] = [];
  if (q2?.points) scores.push(((q2.points - 1) / 3) * 100);
  if (q4?.points) scores.push(((q4.points - 1) / 3) * 100);
  if (q9) scores.push(((calculateQuestionScore(q9) - 1) / 3) * 100);

  return scores.length > 0 ? Math.round(scores.reduce((sum, s) => sum + s, 0) / scores.length) : 0;
}

function calculateMotivationScore(answers: QuizAnswer[]): number {
  const q5 = answers.find((a) => a.questionId === 'q5-goal');
  const q6 = answers.find((a) => a.questionId === 'q6-emotion');
  const q8 = answers.find((a) => a.questionId === 'q8-learning');
  const q10 = answers.find((a) => a.questionId === 'q10-success');

  const scores: number[] = [];
  if (q5?.points) scores.push(((q5.points - 1) / 3) * 100);
  if (q6?.points) scores.push(((q6.points - 1) / 3) * 100);
  if (q8?.points) scores.push(((q8.points - 1) / 3) * 100);
  if (q10) scores.push(((calculateQuestionScore(q10) - 1) / 3) * 100);

  return scores.length > 0 ? Math.round(scores.reduce((sum, s) => sum + s, 0) / scores.length) : 0;
}

function generateRecommendations(stage: string, answers: QuizAnswer[]): string[] {
  const base = {
    STARTER: [
      'Start tracking your spending for 30 days to build awareness',
      'Take our "Money Mindset 101" course to build confidence',
      'Set your first small saving goal (€50-100)',
      'Join the Starter community for support and accountability',
    ],
    STABILIZER: [
      'Build an emergency fund covering 3 months of expenses',
      'Automate your savings with recurring transfers',
      'Complete the "Budgeting Mastery" course to strengthen habits',
      'Join our 30-day consistency challenge',
    ],
    BUILDER: [
      'Explore investment options (index funds, ETFs)',
      'Set up automatic investment contributions',
      'Take the "Investing 101" course to build knowledge',
      'Create a 12-month wealth-building roadmap',
    ],
    GROWER: [
      'Optimize your portfolio allocation and tax strategy',
      'Explore advanced strategies (real estate, passive income)',
      'Consider becoming a mentor for other users',
      'Join our Grower mastermind community',
    ],
  };

  const recs = base[stage as keyof typeof base] || base.STARTER;

  const q1 = answers.find((a) => a.questionId === 'q1-mindset');
  if (q1?.value === 'avoid') {
    recs.push('Work on money anxiety with our "Financial Confidence" mini-course');
  }

  const q4 = answers.find((a) => a.questionId === 'q4-savings');
  if (q4?.value === 'rarely') {
    recs.push('Start with micro-saves: save €1 every day for 30 days');
  }

  return recs.slice(0, 5);
}

function generateNextSteps(stage: string): string[] {
  const steps = {
    STARTER: [
      'Create your free Wevra account',
      'Complete the "Awareness Path" introduction',
      'Set your first financial goal',
      'Join the beginner community',
    ],
    STABILIZER: [
      'Follow the "Consistency Path" roadmap',
      'Set up your emergency fund tracker',
      'Complete week 1: Spending audit',
      'Join the savings challenge',
    ],
    BUILDER: [
      'Start the "Growth Path" journey',
      'Complete "Investing Fundamentals" module',
      'Set up your investment tracker',
      'Join the Builder community',
    ],
    GROWER: [
      'Explore the "Wealth Path" advanced modules',
      'Optimize your current strategies',
      'Connect with other Growers',
      'Consider mentoring opportunities',
    ],
  };

  return steps[stage as keyof typeof steps] || steps.STARTER;
}

function generateRoadmapPreview(stage: string): { current: string; next: string[] } {
  const roadmaps = {
    STARTER: {
      current: 'Awareness Path  Learn money basics, build habits, and develop confidence',
      next: [
        'Money Mindset Foundations',
        'Tracking & Awareness',
        'First Savings Goal',
        'Building Motivation',
      ],
    },
    STABILIZER: {
      current: 'Consistency Path  Build reliable systems and automate small wins',
      next: [
        'Emergency Fund Building',
        'Budget Automation',
        'Habit Stacking',
        'Debt Management (if needed)',
      ],
    },
    BUILDER: {
      current: 'Growth Path  Start investing, set goals, and optimize',
      next: ['Investment Fundamentals', 'Portfolio Setup', 'Goal Planning', 'Income Optimization'],
    },
    GROWER: {
      current: 'Wealth Path  Strategy, scaling, and financial independence',
      next: ['Advanced Investing', 'Tax Optimization', 'Passive Income Streams', 'Legacy Planning'],
    },
  };

  return roadmaps[stage as keyof typeof roadmaps];
}
