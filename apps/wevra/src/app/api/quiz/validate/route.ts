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
    const api = process.env.OPENAI_API_KEY;
    console.log('API KEY:', api);
    if (!process.env.OPENAI_API_KEY) {
      return new Response(JSON.stringify({ ok: false, reason: 'AI services not configured.' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const llm = new ChatOpenAI({
      modelName: 'gpt-4o-mini',
      temperature: 0,
      streaming: false,
      openAIApiKey: process.env.OPENAI_API_KEY,
    });

    const systemPrompt = `
You validate a user's free-text answer for a financial onboarding quiz.

Your job is to determine whether the answer is valid, meaningful, and appropriate for the question.
Return ONLY a JSON object:

- {"ok": true}
- {"ok": false, "reason": "<short reason>"}

GENERAL RULES FOR VALID ANSWERS:
✓ The response is meaningful, relevant, and written in natural language
✓ It expresses a real thought, feeling, belief, or situation
✓ It can be short (e.g., "Lack of discipline", "No time")
✓ It can be longer (up to 150 characters) for reflective questions (e.g., “Financial success means freedom and peace of mind”)
✓ It fits the spirit of personal finance self-reflection
✓ Full sentences are NOT required

INVALID ANSWERS (mark ok=false):
✗ Too vague ("yes", "ok", "maybe", "idk")
✗ Only emojis
✗ Random characters or nonsense
✗ Profanity or insults
✗ Completely irrelevant to personal life, goals, or feelings
✗ Not enough meaningful information (e.g., 1–2 meaningless words)

IMPORTANT:
• Do NOT rewrite or fix the user's answer.
• Do NOT give suggestions.
• Only judge if it's acceptable.
• Return ONLY valid JSON.
`;

    const result = await llm.invoke([
      { role: 'system', content: systemPrompt },
      { role: 'user', content: text },
    ]);

    // ---------------------------
    // NORMALIZE LANGCHAIN RESULT
    // ---------------------------
    let raw = '';

    if (typeof result?.content === 'string') {
      raw = result.content.trim();
    } else if (Array.isArray(result?.content)) {
      // LangChain sometimes returns array chunks
      raw = result.content
        .map((c: any) => (typeof c === 'string' ? c : (c?.text ?? '')))
        .join('')
        .trim();
    } else {
      raw = String(result?.content || '');
    }

    console.log('🟦 Raw LLM output:', raw);

    // SAFE JSON PARSE
    try {
      const parsed = JSON.parse(raw);
      return new Response(JSON.stringify(parsed), {
        headers: { 'Content-Type': 'application/json' },
      });
    } catch (err) {
      console.error('❌ Failed to parse LLM JSON:', raw);

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
      }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
}
