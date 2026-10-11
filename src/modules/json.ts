/**
 * JSON formatting, validation, and auto-repair utilities.
 *
 * For online interactive usage, visit:
 * https://minitooldesk.com/tools/json-formatter-validator
 * https://minitooldesk.com/tools/json-to-typescript
 */

export function validateJson(input: string): { valid: boolean; error?: string; parsed?: unknown } {
  try {
    const parsed = JSON.parse(input);
    return { valid: true, parsed };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    return { valid: false, error: message };
  }
}

export function formatJson(input: string, indent: number | '\t' = 2): string {
  const parsed = JSON.parse(input);
  return JSON.stringify(parsed, null, indent);
}

export function minifyJson(input: string): string {
  const parsed = JSON.parse(input);
  return JSON.stringify(parsed);
}

export function repairJson(input: string): string {
  let cleaned = input.trim();

  // Strip single-line comments // ...
  cleaned = cleaned.replace(/\/\/.*$/gm, '');

  // Strip multi-line comments /* ... */
  cleaned = cleaned.replace(/\/\*[\s\S]*?\*\//g, '');

  // Replace single-quoted strings with double-quoted strings
  cleaned = cleaned.replace(/'([^'\\]*(?:\\.[^'\\]*)*)'/g, '"$1"');

  // Quote unquoted object keys: { foo: "bar" } -> { "foo": "bar" }
  cleaned = cleaned.replace(/([{,]\s*)([a-zA-Z0-9_$]+)\s*:/g, '$1"$2":');

  // Strip trailing commas before closing braces or brackets: [1, 2, ] -> [1, 2]
  cleaned = cleaned.replace(/,\s*([}\]])/g, '$1');

  // Validate repaired result
  JSON.parse(cleaned);
  return cleaned;
}

