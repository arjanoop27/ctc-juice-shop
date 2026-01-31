export async function notifyChallengeSolved(token: string, challengeId: string): Promise<void> {
  if (!token) throw new Error("token required");
  if (!challengeId) throw new Error("challengeId required");

  const baseUrl = "http://localhost:4000/";
  const endpointPath = "ctc/api/metrics/challenge/solved";
  const timeoutMs = Number("2500");
  const url = new URL(endpointPath, baseUrl).toString();

  const controller = new AbortController();
  const t = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        "X-Source-App": "juice-shop-be",
      },
      body: JSON.stringify({
        challengeId,
        solvedAt: new Date().toISOString(),
      }),
      signal: controller.signal,
    });

    if (!(res.status >= 200 && res.status < 300) && res.status !== 409) {
      const text = await res.text().catch(() => "");
      throw new Error(`ctc-bff returned ${res.status}: ${text}`);
    }
  } finally {
    clearTimeout(t);
  }
}