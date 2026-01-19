export type CtcApiResponse<T = unknown> =
  | { ok: true; data?: T }
  | { ok: false; error: string };
