import { NextRequest } from 'next/server';
import { ChatOpenAI } from '@langchain/openai';
import { locales, defaultLocale, type Locale } from '@/i18n/config'; // đường dẫn tùy project
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
export async function POST(request: NextRequest) {
  try {
    const { text, locale: rawLocale } = await request.json();

    if (!text || typeof text !== 'string') {
      return new Response(JSON.stringify({ ok: false, reason: 'Answer is required.' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    let resolved: Locale;

    if (rawLocale && locales.includes(rawLocale as Locale)) {
      resolved = rawLocale as Locale;
    } else {
      const acceptLang = request.headers.get('accept-language') || '';
      const first = acceptLang.split(',')[0]?.trim(); // "fr-FR"
      const lang = first?.split('-')[0]?.toLowerCase(); // "fr"

      if (lang && locales.includes(lang as Locale)) {
        resolved = lang as Locale;
      } else {
        resolved = defaultLocale;
      }
    }

    const secrets = JSON.parse(process.env.secrets ?? '{}');
    const apiKey = secrets.OPENAI_API_KEY ?? process.env.OPENAI_API_KEY;
    if (!apiKey) {
      return new Response(JSON.stringify({ ok: false, reason: 'AI services not configured.' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const llm = new ChatOpenAI({
      modelName: 'gpt-4o-mini',
      temperature: 0,
      streaming: false,
      openAIApiKey: apiKey,
    });

    const systemPrompt = `
You validate a user's free-text answer for an onboarding question.

User locale: "${resolved}".

Goal:
- Be permissive. Accept short, general, high-level answers if they clearly express an obstacle, goal, habit, or personal situation.
- Accept answers in ANY language.

Return ONLY a JSON object:
- {"ok": true}
- {"ok": false, "reason": "<short reason>"}

WHEN ok=false:
- Write "reason" in this language:
  - "en" → English
  - "fr" → French
  - "vi" → Vietnamese
- If locale is not en/fr/vi, write reason in English.

VALID ANSWERS (ok=true):
- Any meaningful phrase, even if generic or short.
- Examples that MUST be accepted:
  - "Je ne sais pas par où commencer"
  - "Pas le temps"
  - "Manque de discipline"
  - "Trop de dépenses"
  - "I want to save more"
  - "No budget"
  - "Không có kỷ luật"
  - "Không biết bắt đầu từ đâu"

INVALID ANSWERS (ok=false):
- Empty or whitespace only.
- Only emojis.
- Only punctuation/symbols: "?", "??", "...", "----"
- Random/gibberish characters with no meaning.
- Pure filler/acknowledgement with no info:
  - "ok", "okay", "yes", "no", "oui", "non", "d'accord"
  - "idk", "jsp", "je sais pas", "không biết", "k"
  (These are invalid ONLY when they do not add any meaningful context.)
- Profanity / hateful content.

IMPORTANT:
- Do NOT rewrite the user's answer.
- Do NOT give suggestions.
- Only decide if it is acceptable or not.
- Return ONLY valid JSON.
`;
    console.log('OPENAI_API_KEY exists?', !!process.env.OPENAI_API_KEY);
    console.log('OPENAI_API_KEY length:', process.env.OPENAI_API_KEY?.length ?? 0);
    const result = await llm.invoke([
      { role: 'system', content: systemPrompt },
      { role: 'user', content: text },
    ]);

    let raw = '';
    if (typeof result?.content === 'string') {
      raw = result.content.trim();
    } else if (Array.isArray(result?.content)) {
      raw = result.content
        .map((c: any) => (typeof c === 'string' ? c : (c?.text ?? '')))
        .join('')
        .trim();
    } else {
      raw = String(result?.content || '');
    }

    console.log('🟦 Raw LLM output:', raw);

    try {
      const parsed = JSON.parse(raw);
      return new Response(JSON.stringify(parsed), {
        headers: { 'Content-Type': 'application/json' },
      });
    } catch {
      return new Response(
        JSON.stringify({
          ok: false,
          reason:
            resolved === 'fr'
              ? 'Réécris ta réponse plus clairement, s’il te plaît.'
              : resolved === 'vi'
                ? 'Hãy viết lại câu trả lời rõ hơn một chút nhé.'
                : 'Please rewrite your answer more clearly.',
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
