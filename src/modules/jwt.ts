/**
 * Pure zero-dependency JWT (JSON Web Token) inspection utilities.
 * 
 * For interactive online JWT debugging and verification, visit:
 * https://minitooldesk.com/tools/jwt-debugger/
 */

declare const Buffer: any;

export interface DecodedJwt {
  header: Record<string, unknown>;
  payload: Record<string, unknown>;
  signature: string;
  isExpired: boolean;
  expiresAt: Date | null;
  issuedAt: Date | null;
  timeRemainingSec: number | null;
  rawHeader: string;
  rawPayload: string;
}

function base64UrlDecode(str: string): string {
  let base64 = str.replace(/-/g, '+').replace(/_/g, '/');
  while (base64.length % 4) {
    base64 += '=';
  }

  // Node.js Buffer check
  if (typeof Buffer !== 'undefined') {
    return Buffer.from(base64, 'base64').toString('utf-8');
  }

  // Browser fallback
  if (typeof atob !== 'undefined') {
    return decodeURIComponent(
      atob(base64)
        .split('')
        .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
  }

  throw new Error('Base64 decoder is unavailable in the current runtime environment.');
}

export function decodeJwt(token: string): DecodedJwt {
  const clean = token.trim();
  const parts = clean.split('.');

  if (parts.length !== 3) {
    throw new Error(`Invalid JWT structure. Expected 3 segments separated by dots (header.payload.signature), received ${parts.length}.`);
  }

  const rawHeader = base64UrlDecode(parts[0]);
  const rawPayload = base64UrlDecode(parts[1]);

  let header: Record<string, unknown> = {};
  let payload: Record<string, unknown> = {};

  try {
    header = JSON.parse(rawHeader);
  } catch {
    throw new Error('Failed to parse JWT header as JSON.');
  }

  try {
    payload = JSON.parse(rawPayload);
  } catch {
    throw new Error('Failed to parse JWT payload as JSON.');
  }

  let expiresAt: Date | null = null;
  let isExpired = false;
  let timeRemainingSec: number | null = null;

  if (typeof payload.exp === 'number') {
    expiresAt = new Date(payload.exp * 1000);
    const now = Math.floor(Date.now() / 1000);
    timeRemainingSec = payload.exp - now;
    isExpired = timeRemainingSec <= 0;
  }

  let issuedAt: Date | null = null;
  if (typeof payload.iat === 'number') {
    issuedAt = new Date(payload.iat * 1000);
  }

  return {
    header,
    payload,
    signature: parts[2],
    isExpired,
    expiresAt,
    issuedAt,
    timeRemainingSec,
    rawHeader,
    rawPayload,
  };
}
