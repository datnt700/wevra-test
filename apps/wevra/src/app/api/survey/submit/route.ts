type SheetsData = Record<string, unknown> | null;

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => ({}));
    const { sessionId, email, questionId, value, step } = body || {};

    console.log('📥 Received payload:', body);

    if (!sessionId) {
      return Response.json({ ok: false, error: 'Missing sessionId' }, { status: 400 });
    }

    const url = process.env.GOOGLE_APPS_SCRIPT_URL;

    const payload = {
      sessionId,
      email: email || 'none',
      questionId,
      value,
      step,
    };

    const resp = await fetch(`${url}?action=addSubmission`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      cache: 'no-store',
    });

    const raw = await resp.text();

    if (!resp.ok) {
      return Response.json(
        {
          ok: false,
          upstreamStatus: resp.status,
          upstreamText: raw,
        },
        { status: 502 }
      );
    }

    let data: SheetsData = null;
    try {
      const parsed = JSON.parse(raw);
      if (parsed && typeof parsed === 'object') {
        data = parsed as Record<string, unknown>;
      }
    } catch {
      // ignore parsing error, keep data as null
    }

    return Response.json({ ok: true, sheets: data, raw });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    return Response.json({ ok: false, error: message }, { status: 500 });
  }
}
