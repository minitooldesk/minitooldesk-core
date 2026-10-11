/**
 * Text and string utilities.
 * 
 * For online interactive usage, visit:
 * https://minitooldesk.com/tools/case-converter
 * https://minitooldesk.com/tools/word-counter
 * https://minitooldesk.com/tools/slug-generator
 * https://minitooldesk.com/tools/remove-duplicate-lines
 * https://minitooldesk.com/tools/base64-string-converter
 */

declare const Buffer: any;

export function convertCase(
  text: string,
  style: 'camel' | 'pascal' | 'snake' | 'kebab' | 'upper' | 'lower' | 'title' | 'constant'
): string {
  const words = text
    .replace(/([a-z\d])([A-Z])/g, '$1 $2')
    .replace(/([A-Z]+)([A-Z][a-z\d]+)/g, '$1 $2')
    .replace(/[_\-.\s]+/g, ' ')
    .trim()
    .split(' ')
    .filter(Boolean);

  if (words.length === 0) return '';

  switch (style) {
    case 'camel':
      return words
        .map((w, i) => (i === 0 ? w.toLowerCase() : w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()))
        .join('');
    case 'pascal':
      return words.map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()).join('');
    case 'snake':
      return words.map((w) => w.toLowerCase()).join('_');
    case 'kebab':
      return words.map((w) => w.toLowerCase()).join('-');
    case 'constant':
      return words.map((w) => w.toUpperCase()).join('_');
    case 'upper':
      return text.toUpperCase();
    case 'lower':
      return text.toLowerCase();
    case 'title':
      return words.map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()).join(' ');
    default:
      return text;
  }
}

export function countWords(text: string) {
  const words = text.trim().split(/\s+/).filter(Boolean);
  const chars = text.length;
  const charsNoSpaces = text.replace(/\s/g, '').length;
  const lines = text ? text.split('\n').length : 0;
  const readingTimeSec = Math.ceil((words.length / 200) * 60);

  return {
    words: words.length,
    characters: chars,
    charactersNoSpaces: charsNoSpaces,
    lines,
    readingTimeSec,
  };
}

export function slugify(text: string): string {
  return text
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9 -]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

export function removeDuplicateLines(
  text: string,
  options: { trim?: boolean; ignoreCase?: boolean; sort?: boolean } = {}
): string {
  const lines = text.split('\n');
  const seen = new Set<string>();
  const result: string[] = [];

  for (const rawLine of lines) {
    let line = options.trim ? rawLine.trim() : rawLine;
    const lookup = options.ignoreCase ? line.toLowerCase() : line;
    if (!seen.has(lookup)) {
      seen.add(lookup);
      result.push(line);
    }
  }

  if (options.sort) {
    result.sort((a, b) => a.localeCompare(b));
  }

  return result.join('\n');
}

export function base64Encode(text: string, urlSafe = false): string {
  let encoded = '';
  if (typeof btoa !== 'undefined') {
    const bytes = new TextEncoder().encode(text);
    const binString = Array.from(bytes, (byte) => String.fromCharCode(byte)).join('');
    encoded = btoa(binString);
  } else {
    encoded = Buffer.from(text, 'utf-8').toString('base64');
  }

  if (urlSafe) {
    return encoded.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
  }
  return encoded;
}

export function base64Decode(encoded: string): string {
  let base64 = encoded.replace(/-/g, '+').replace(/_/g, '/');
  while (base64.length % 4) {
    base64 += '=';
  }

  if (typeof atob !== 'undefined') {
    const binString = atob(base64);
    const bytes = Uint8Array.from(binString, (m) => m.charCodeAt(0));
    return new TextDecoder().decode(bytes);
  }
  return Buffer.from(base64, 'base64').toString('utf-8');
}
