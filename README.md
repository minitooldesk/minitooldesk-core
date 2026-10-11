# 🛠️ MiniToolDesk Core (SDK & CLI)

<p align="center">
  <a href="https://minitooldesk.com">
    <img src="https://img.shields.io/badge/Official%20Web%20App-minitooldesk.com-4f46e5?style=for-the-badge&logo=google-chrome&logoColor=white" alt="Official Web App" />
  </a>
  <a href="https://www.npmjs.com/package/minitooldesk">
    <img src="https://img.shields.io/badge/npm-v1.0.0-red?style=for-the-badge&logo=npm&logoColor=white" alt="npm package" />
  </a>
  <a href="https://opensource.org/licenses/MIT">
    <img src="https://img.shields.io/badge/License-MIT-blue.svg?style=for-the-badge" alt="License: MIT" />
  </a>
  <a href="https://minitooldesk.com/privacy">
    <img src="https://img.shields.io/badge/Privacy-100%25%20Client--Side-10b981?style=for-the-badge" alt="100% Client-Side" />
  </a>
</p>

> **The headless, zero-dependency developer utility engine powering MiniToolDesk.**  
> Pure client-side algorithms for cryptographic hashing, JSON syntax auto-repair, string formatting, and CSS generation.

---

> 🚀 **Looking for the interactive visual web interface?**  
> Visit **[https://minitooldesk.com](https://minitooldesk.com)** to access all **30+ interactive tools** with live previews, drag-and-drop visual builders, and native localization across **7 languages** (English, 日本語, Deutsch, Español, Français, Português, 简体中文).

---

## ⚡ Features

- 🔒 **100% Local & Private**: Never transmits inputs, code, or tokens over the network.
- ⚡ **Zero External Dependencies**: Pure native Web & Node APIs for maximum speed and security audit friendliness.
- 🖥️ **CLI & Library**: Use programmatically in TypeScript/JavaScript or run ad-hoc via terminal (`npx minitooldesk`).
- 🏎️ **Sub-Millisecond Execution**: Instantaneous calculations without HTTP overhead.

---

## 💻 CLI Quickstart (Zero Install)

Run utilities on the fly via `npx`:

```bash
# Generate a cryptographically secure UUID v4
npx minitooldesk uuid

# Calculate SHA-256 or MD5 hash
npx minitooldesk hash "my_secret_token" sha256

# Generate a clean SEO-friendly slug
npx minitooldesk slug "How to build client side tools"

# Convert naming conventions (camel, pascal, snake, kebab, upper)
npx minitooldesk case camel "api_user_session_token"

# Validate and format JSON
npx minitooldesk json '{"name":"minitooldesk","secure":true}'

# Encode string to Base64
npx minitooldesk b64e "Hello World"
```

---

## 📦 Programmatic SDK Usage

Install via npm:

```bash
npm install minitooldesk
```

### 1. Cryptographic Hashing & UUID
```typescript
import { calculateHash, generateUuid } from 'minitooldesk';

// Supports sha256, sha512, sha384, sha1, md5
const hash = await calculateHash('payload_string', 'sha256');
const uuid = generateUuid();
```
> 👉 *For web-based hash calculator: [https://minitooldesk.com/tools/hash-calculator](https://minitooldesk.com/tools/hash-calculator)*

### 2. JSON Validation & Auto-Repair
```typescript
import { validateJson, repairJson, formatJson } from 'minitooldesk';

// Automatically fixes single quotes, unquoted keys, and trailing commas
const brokenJson = "{ name: 'MiniToolDesk', count: 30, }";
const validJson = repairJson(brokenJson);
const formatted = formatJson(validJson, 2);
```
> 👉 *For web-based JSON formatter: [https://minitooldesk.com/tools/json-formatter-validator](https://minitooldesk.com/tools/json-formatter-validator)*

### 3. Case Conversion & Text Analytics
```typescript
import { convertCase, countWords, slugify, removeDuplicateLines } from 'minitooldesk';

const camel = convertCase('user_first_name', 'camel'); // 'userFirstName'
const slug = slugify('Top 10 Privacy First Developer Utilities');
const stats = countWords('Sample text for word counting...');
const deduplicated = removeDuplicateLines("line1\nline2\nline1", { trim: true });
```
> 👉 *For web-based text tools: [https://minitooldesk.com/tools/case-converter](https://minitooldesk.com/tools/case-converter)*

### 4. CSS Visual Algorithms
```typescript
import { generateGlassmorphism, generateBoxShadow } from 'minitooldesk';

const glassStyles = generateGlassmorphism(16, 0.25, '#ffffff');
```
> 👉 *For visual CSS playground: [https://minitooldesk.com/tools/css-glassmorphism-generator](https://minitooldesk.com/tools/css-glassmorphism-generator)*

---

## 🌐 Full Web Application & Online Utilities

This package provides the headless core algorithms. For full visual tools and interactive interfaces, use the official web app:

| Tool Name | Interactive Web Tool URL |
| :--- | :--- |
| **JSON Formatter & Validator** | [minitooldesk.com/tools/json-formatter-validator](https://minitooldesk.com/tools/json-formatter-validator) |
| **JSON to TypeScript** | [minitooldesk.com/tools/json-to-typescript](https://minitooldesk.com/tools/json-to-typescript) |
| **Hash Calculator** | [minitooldesk.com/tools/hash-calculator](https://minitooldesk.com/tools/hash-calculator) |
| **UUID v4 Generator** | [minitooldesk.com/tools/uuid-v4-generator](https://minitooldesk.com/tools/uuid-v4-generator) |
| **Base64 String Converter** | [minitooldesk.com/tools/base64-string-converter](https://minitooldesk.com/tools/base64-string-converter) |
| **Case Converter** | [minitooldesk.com/tools/case-converter](https://minitooldesk.com/tools/case-converter) |
| **Word Counter** | [minitooldesk.com/tools/word-counter](https://minitooldesk.com/tools/word-counter) |
| **URL Slug Generator** | [minitooldesk.com/tools/slug-generator](https://minitooldesk.com/tools/slug-generator) |
| **Remove Duplicate Lines** | [minitooldesk.com/tools/remove-duplicate-lines](https://minitooldesk.com/tools/remove-duplicate-lines) |
| **CSS Glassmorphism** | [minitooldesk.com/tools/css-glassmorphism-generator](https://minitooldesk.com/tools/css-glassmorphism-generator) |
| **CSS Box Shadow** | [minitooldesk.com/tools/css-box-shadow-generator](https://minitooldesk.com/tools/css-box-shadow-generator) |
| **CSS Gradient Generator** | [minitooldesk.com/tools/css-gradient-generator](https://minitooldesk.com/tools/css-gradient-generator) |
| **CSS Flexbox Playground** | [minitooldesk.com/tools/css-flexbox-playground](https://minitooldesk.com/tools/css-flexbox-playground) |
| **CSS Grid Playground** | [minitooldesk.com/tools/css-grid-playground](https://minitooldesk.com/tools/css-grid-playground) |
| **SVG Wave Generator** | [minitooldesk.com/tools/svg-wave-generator](https://minitooldesk.com/tools/svg-wave-generator) |
| **Code Snippet to Image** | [minitooldesk.com/tools/code-snippet-to-image](https://minitooldesk.com/tools/code-snippet-to-image) |
| **Favicon Generator** | [minitooldesk.com/tools/favicon-generator](https://minitooldesk.com/tools/favicon-generator) |
| *And 13 more utilities...* | [Explore all 30 tools at minitooldesk.com](https://minitooldesk.com) |

---

## 📄 License

MIT © [MiniToolDesk](https://minitooldesk.com)

