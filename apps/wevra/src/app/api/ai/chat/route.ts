import { NextRequest } from 'next/server';
import { ChatOpenAI } from '@langchain/openai';

/**
 * POST /api/quiz/validate
 * Validate free-text answers for the onboarding quiz
 */
export async function POST(request: NextRequest) {
  try {
    const { text } = await request.json();

    if (!text || typeof text !== 'string') {
      return new Response(JSON.stringify({ ok: false, reason: 'Answer is required.' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Validate environment variables
    if (!process.env.OPENAI_API_KEY) {
      return new Response(JSON.stringify({ ok: false, reason: 'AI services not configured.' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Initialize LLM (no streaming needed)
    const llm = new ChatOpenAI({
      modelName: 'gpt-4o-mini',
      temperature: 0,
      streaming: false,
      openAIApiKey: process.env.OPENAI_API_KEY,
    });

    // Build system instruction
    const systemPrompt = `
You validate a user's free-text answer for a financial onboarding quiz.

Return ONLY a JSON object:
- {"ok": true}
- {"ok": false, "reason": "<short reason>"}

Be permissive: accept general or high-level answers (e.g., "I want to save more", "better manage money", "reduce spending", "invest for the future") even if they lack details.

Rules for invalid answers:
- Too short (less than 2 words)
- Only filler with no meaning ("idk", "ok", "yes", "no", "maybe", etc.)
- Only emojis
- Nonsense or random characters
- Profanity or hate
- Clearly irrelevant content (unrelated to money, goals, habits, or personal situation)

Do NOT rewrite the user's answer.
Do NOT give suggestions.
Return ONLY JSON, no explanation.
`;

    // Generate result
    const result = await llm.invoke([
      {
        role: 'system',
        content: systemPrompt,
      },
      {
        role: 'user',
        content: text,
      },
    ]);

    const raw = typeof result?.content === 'string' ? result.content.trim() : '';

    // Try parsing JSON safely
    try {
      const json = JSON.parse(raw);
      return new Response(JSON.stringify(json), {
        headers: { 'Content-Type': 'application/json' },
      });
    } catch (e) {
      console.error('Validation parse error:', raw);

      return new Response(
        JSON.stringify({
          ok: false,
          reason: 'Please rewrite your answer more clearly.',
        }),
        { headers: { 'Content-Type': 'application/json' } }
      );
    }
  } catch (error) {
    console.error('Quiz Validation Error:', error);

    return new Response(
      JSON.stringify({
        ok: false,
        reason: 'Failed to validate answer.',
        details:
          process.env.NODE_ENV === 'development' && error instanceof Error
            ? error.message
            : undefined,
      }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
}
