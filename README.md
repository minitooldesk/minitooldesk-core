# 🛠️ MiniToolDesk Core (SDK & CLI)

<p align="center">
  <a href="https://minitooldesk.com/">
    <img src="https://img.shields.io/badge/Official%20Web%20App-minitooldesk.com-4f46e5?style=for-the-badge&logo=google-chrome&logoColor=white" alt="Official Web App" />
  </a>
  <a href="https://www.npmjs.com/package/minitooldesk">
    <img src="https://img.shields.io/badge/npm-v1.0.0-red?style=for-the-badge&logo=npm&logoColor=white" alt="npm package" />
  </a>
  <a href="https://opensource.org/licenses/MIT">
    <img src="https://img.shields.io/badge/License-MIT-blue.svg?style=for-the-badge" alt="License: MIT" />
  </a>
  <a href="https://minitooldesk.com/privacy/">
    <img src="https://img.shields.io/badge/Privacy-100%25%20Client--Side-10b981?style=for-the-badge" alt="100% Client-Side" />
  </a>
</p>

> **The headless, zero-dependency developer utility engine powering MiniToolDesk.**  
> Pure client-side algorithms for cryptographic hashing, JSON syntax auto-repair, string formatting, and CSS generation.

---

> 🚀 **Looking for the interactive visual web interface?**  
> Visit **[https://minitooldesk.com/](https://minitooldesk.com/)** to access all **30+ interactive tools** with live previews, drag-and-drop visual builders, and native localization across **7 languages** (English, 日本語, Deutsch, Español, Français, Português, 简体中文).

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
# Convert a docker run command to Docker Compose YAML
npx minitooldesk compose "docker run -d --name db -p 5432:5432 -v pgdata:/var/lib/postgresql/data postgres:16-alpine"

# Calculate IPv4 CIDR subnet (mask, wildcard, usable IP range, total hosts)
npx minitooldesk subnet 10.0.0.0/16

# Explain crontab schedule and view the next 5 run times
npx minitooldesk cron "*/15 9-17 * * 1-5"

# Decode and inspect JWT header, payload claims, and expiration
npx minitooldesk jwt "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."

# Calculate Linux chmod permissions (e.g., 755 or rwxr-xr-x)
npx minitooldesk chmod 755 deploy.sh

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
> 👉 *For web-based hash calculator: [https://minitooldesk.com/tools/hash-calculator/](https://minitooldesk.com/tools/hash-calculator/)*

### 2. JSON Validation & Auto-Repair
```typescript
import { validateJson, repairJson, formatJson } from 'minitooldesk';

// Automatically fixes single quotes, unquoted keys, and trailing commas
const brokenJson = "{ name: 'MiniToolDesk', count: 30, }";
const validJson = repairJson(brokenJson);
const formatted = formatJson(validJson, 2);
```
> 👉 *For web-based JSON formatter: [https://minitooldesk.com/tools/json-formatter-validator/](https://minitooldesk.com/tools/json-formatter-validator/)*

### 3. Case Conversion & Text Analytics
```typescript
import { convertCase, countWords, slugify, removeDuplicateLines } from 'minitooldesk';

const camel = convertCase('user_first_name', 'camel'); // 'userFirstName'
const slug = slugify('Top 10 Privacy First Developer Utilities');
const stats = countWords('Sample text for word counting...');
const deduplicated = removeDuplicateLines("line1\nline2\nline1", { trim: true });
```
> 👉 *For web-based text tools: [https://minitooldesk.com/tools/case-converter/](https://minitooldesk.com/tools/case-converter/)*

### 4. CSS Visual Algorithms
```typescript
import { generateGlassmorphism, generateBoxShadow } from 'minitooldesk';

const glassStyles = generateGlassmorphism(16, 0.25, '#ffffff');
```
> 👉 *For visual CSS playground: [https://minitooldesk.com/tools/css-glassmorphism-generator/](https://minitooldesk.com/tools/css-glassmorphism-generator/)*

### 5. Docker Run to Docker Compose & Chmod
```typescript
import { dockerRunToCompose, calculateChmod } from 'minitooldesk';

// Convert docker run command to Compose specification
const composeYaml = dockerRunToCompose(
  'docker run -d --name web -p 80:80 -v ./html:/usr/share/nginx/html nginx:alpine'
);

// Calculate octal and symbolic permissions
const chmod = calculateChmod('755', 'entrypoint.sh');
// { octal: '755', symbolic: 'rwxr-xr-x', command: 'chmod 755 entrypoint.sh' }
```
> 👉 *For interactive tools: [https://minitooldesk.com/tools/docker-run-to-compose/](https://minitooldesk.com/tools/docker-run-to-compose/) | [https://minitooldesk.com/tools/chmod-calculator/](https://minitooldesk.com/tools/chmod-calculator/)*

### 6. IPv4 CIDR & Subnet Calculator
```typescript
import { calculateSubnet } from 'minitooldesk';

const subnet = calculateSubnet('192.168.1.0/24');
// {
//   netmask: '255.255.255.0',
//   networkAddress: '192.168.1.0',
//   broadcastAddress: '192.168.1.255',
//   firstUsableIp: '192.168.1.1',
//   lastUsableIp: '192.168.1.254',
//   usableHosts: 254
// }
```
> 👉 *For web-based CIDR tool: [https://minitooldesk.com/tools/cidr-subnet-calculator/](https://minitooldesk.com/tools/cidr-subnet-calculator/)*

### 7. Zero-Dependency JWT Inspector
```typescript
import { decodeJwt } from 'minitooldesk';

const tokenData = decodeJwt('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...');
// { header, payload, isExpired, expiresAt, timeRemainingSec }
```
> 👉 *For web-based JWT debugger: [https://minitooldesk.com/tools/jwt-debugger/](https://minitooldesk.com/tools/jwt-debugger/)*

### 8. Crontab Schedule Parser & Human Translator
```typescript
import { explainCron, getNextCronRuns } from 'minitooldesk';

const explanation = explainCron('*/15 9-17 * * 1-5');
// 'Every 15 minutes, between hours 9-17, Monday through Friday'

const nextExecutions = getNextCronRuns('0 2 * * *', 5);
```
> 👉 *For visual cron builder: [https://minitooldesk.com/tools/cron-expression-generator/](https://minitooldesk.com/tools/cron-expression-generator/)*

---

## 🌐 Full Web Application & Online Utilities Directory

This package provides the headless core algorithms and zero-dependency CLI. For visual interactive tools with real-time UI, previews, and 7-language localization, access the official web applications below:

### 🚀 DevOps & Cloud Infrastructure
| Tool Name | Interactive Web Tool URL |
| :--- | :--- |
| **Docker Run to Docker Compose** | [minitooldesk.com/tools/docker-run-to-compose/](https://minitooldesk.com/tools/docker-run-to-compose/) |
| **Docker Compose to Kubernetes** | [minitooldesk.com/tools/compose-to-k8s/](https://minitooldesk.com/tools/compose-to-k8s/) |
| **Cloud-Init Config Generator** | [minitooldesk.com/tools/cloud-init-generator/](https://minitooldesk.com/tools/cloud-init-generator/) |
| **Systemd Service Unit Generator** | [minitooldesk.com/tools/systemd-service-generator/](https://minitooldesk.com/tools/systemd-service-generator/) |
| **Crontab Expression Generator** | [minitooldesk.com/tools/cron-expression-generator/](https://minitooldesk.com/tools/cron-expression-generator/) |
| **Kafka Cluster Capacity Calculator** | [minitooldesk.com/tools/kafka-capacity-calculator/](https://minitooldesk.com/tools/kafka-capacity-calculator/) |
| **Kubernetes Resource Sizing** | [minitooldesk.com/tools/k8s-resource-calculator/](https://minitooldesk.com/tools/k8s-resource-calculator/) |
| **Nginx Server Config Generator** | [minitooldesk.com/tools/nginx-config-generator/](https://minitooldesk.com/tools/nginx-config-generator/) |
| **Caddyfile Configuration Builder** | [minitooldesk.com/tools/caddyfile-builder/](https://minitooldesk.com/tools/caddyfile-builder/) |
| **HAProxy Configuration Builder** | [minitooldesk.com/tools/haproxy-config-builder/](https://minitooldesk.com/tools/haproxy-config-builder/) |
| **Dockerfile Generator** | [minitooldesk.com/tools/dockerfile-generator/](https://minitooldesk.com/tools/dockerfile-generator/) |
| **GitHub Actions Workflow Builder** | [minitooldesk.com/tools/github-actions-builder/](https://minitooldesk.com/tools/github-actions-builder/) |
| **GitLab CI Pipeline Builder** | [minitooldesk.com/tools/gitlab-ci-generator/](https://minitooldesk.com/tools/gitlab-ci-generator/) |
| **Linux Chmod Permission Calculator** | [minitooldesk.com/tools/chmod-calculator/](https://minitooldesk.com/tools/chmod-calculator/) |

### 🔒 Security, Web & Networking
| Tool Name | Interactive Web Tool URL |
| :--- | :--- |
| **CIDR & Subnet Calculator** | [minitooldesk.com/tools/cidr-subnet-calculator/](https://minitooldesk.com/tools/cidr-subnet-calculator/) |
| **IP Range to CIDR Converter** | [minitooldesk.com/tools/ip-range-to-cidr/](https://minitooldesk.com/tools/ip-range-to-cidr/) |
| **JWT Debugger & Security Inspector** | [minitooldesk.com/tools/jwt-debugger/](https://minitooldesk.com/tools/jwt-debugger/) |
| **Content Security Policy (CSP) Builder** | [minitooldesk.com/tools/csp-policy-builder/](https://minitooldesk.com/tools/csp-policy-builder/) |
| **DNS Record Builder** | [minitooldesk.com/tools/dns-record-builder/](https://minitooldesk.com/tools/dns-record-builder/) |
| **Cryptographic Hash Calculator** | [minitooldesk.com/tools/hash-calculator/](https://minitooldesk.com/tools/hash-calculator/) |
| **UUID v4 Generator** | [minitooldesk.com/tools/uuid-v4-generator/](https://minitooldesk.com/tools/uuid-v4-generator/) |
| **Base64 String Converter** | [minitooldesk.com/tools/base64-string-converter/](https://minitooldesk.com/tools/base64-string-converter/) |
| **HTML Entity Encoder / Decoder** | [minitooldesk.com/tools/html-entity-encoder/](https://minitooldesk.com/tools/html-entity-encoder/) |

### 💻 Code, Schema & Query Transformers
| Tool Name | Interactive Web Tool URL |
| :--- | :--- |
| **JSON Formatter & Auto-Repair** | [minitooldesk.com/tools/json-formatter-validator/](https://minitooldesk.com/tools/json-formatter-validator/) |
| **JSON to TypeScript Interfaces** | [minitooldesk.com/tools/json-to-typescript/](https://minitooldesk.com/tools/json-to-typescript/) |
| **JSON to Zod Schema** | [minitooldesk.com/tools/json-to-zod/](https://minitooldesk.com/tools/json-to-zod/) |
| **JSON to Go Struct** | [minitooldesk.com/tools/json-to-go/](https://minitooldesk.com/tools/json-to-go/) |
| **JSON to Python Pydantic** | [minitooldesk.com/tools/json-to-python-pydantic/](https://minitooldesk.com/tools/json-to-python-pydantic/) |
| **JSON to Protocol Buffers (Protobuf)** | [minitooldesk.com/tools/json-to-protobuf/](https://minitooldesk.com/tools/json-to-protobuf/) |
| **JSON to Rust Serde Structs** | [minitooldesk.com/tools/json-to-rust/](https://minitooldesk.com/tools/json-to-rust/) |
| **GraphQL Schema to TypeScript** | [minitooldesk.com/tools/graphql-to-typescript/](https://minitooldesk.com/tools/graphql-to-typescript/) |
| **YAML to JSON / JSON to YAML** | [minitooldesk.com/tools/yaml-json-converter/](https://minitooldesk.com/tools/yaml-json-converter/) |
| **SQL Formatter & Pretty-Printer** | [minitooldesk.com/tools/sql-formatter/](https://minitooldesk.com/tools/sql-formatter/) |
| **cURL Command to Code Converter** | [minitooldesk.com/tools/curl-converter/](https://minitooldesk.com/tools/curl-converter/) |
| **Text Diff & Comparison Checker** | [minitooldesk.com/tools/diff-checker/](https://minitooldesk.com/tools/diff-checker/) |
| **Regex Tester & Visualizer** | [minitooldesk.com/tools/regex-tester/](https://minitooldesk.com/tools/regex-tester/) |

### 🎨 Design, CSS & Frontend Visual Tools
| Tool Name | Interactive Web Tool URL |
| :--- | :--- |
| **Code Snippet to Image (Canvas)** | [minitooldesk.com/tools/code-snippet-to-image/](https://minitooldesk.com/tools/code-snippet-to-image/) |
| **Image Compressor (100% Client-Side)** | [minitooldesk.com/tools/image-compressor/](https://minitooldesk.com/tools/image-compressor/) |
| **Favicon Generator & Exporter** | [minitooldesk.com/tools/favicon-generator/](https://minitooldesk.com/tools/favicon-generator/) |
| **CSS Smooth Box Shadow Generator** | [minitooldesk.com/tools/css-box-shadow-generator/](https://minitooldesk.com/tools/css-box-shadow-generator/) |
| **CSS Glassmorphism Generator** | [minitooldesk.com/tools/css-glassmorphism-generator/](https://minitooldesk.com/tools/css-glassmorphism-generator/) |
| **CSS Mesh & Linear Gradient Generator** | [minitooldesk.com/tools/css-gradient-generator/](https://minitooldesk.com/tools/css-gradient-generator/) |
| **CSS Flexbox Visual Playground** | [minitooldesk.com/tools/css-flexbox-playground/](https://minitooldesk.com/tools/css-flexbox-playground/) |
| **CSS Grid Visual Playground** | [minitooldesk.com/tools/css-grid-playground/](https://minitooldesk.com/tools/css-grid-playground/) |
| **SVG Wave & Shape Generator** | [minitooldesk.com/tools/svg-wave-generator/](https://minitooldesk.com/tools/svg-wave-generator/) |
| **Case Converter (camel, snake, kebab)** | [minitooldesk.com/tools/case-converter/](https://minitooldesk.com/tools/case-converter/) |
| **Word & Character Counter** | [minitooldesk.com/tools/word-counter/](https://minitooldesk.com/tools/word-counter/) |
| **SEO URL Slug Generator** | [minitooldesk.com/tools/slug-generator/](https://minitooldesk.com/tools/slug-generator/) |
| **Remove Duplicate Lines** | [minitooldesk.com/tools/remove-duplicate-lines/](https://minitooldesk.com/tools/remove-duplicate-lines/) |
| **Lorem Ipsum Dummy Text Generator** | [minitooldesk.com/tools/lorem-ipsum-generator/](https://minitooldesk.com/tools/lorem-ipsum-generator/) |

### 📊 Popular Calculators & Practical Estimation
| Tool Name | Interactive Web Tool URL |
| :--- | :--- |
| **Loan & Amortization Calculator** | [minitooldesk.com/calculators/loan-calculator/](https://minitooldesk.com/calculators/loan-calculator/) |
| **Personal Loan Payoff Calculator** | [minitooldesk.com/calculators/personal-loan-calculator/](https://minitooldesk.com/calculators/personal-loan-calculator/) |
| **Mortgage Payoff & Extra Payments** | [minitooldesk.com/calculators/mortgage-payoff-calculator/](https://minitooldesk.com/calculators/mortgage-payoff-calculator/) |
| **Compound Interest & Savings Simulator** | [minitooldesk.com/calculators/compound-interest-calculator/](https://minitooldesk.com/calculators/compound-interest-calculator/) |
| **Calorie Deficit & Weight Loss Timeline** | [minitooldesk.com/calculators/calorie-deficit-weight-loss-calculator/](https://minitooldesk.com/calculators/calorie-deficit-weight-loss-calculator/) |
| **BMI Body Mass Index Calculator** | [minitooldesk.com/calculators/bmi-calculator/](https://minitooldesk.com/calculators/bmi-calculator/) |
| **Home Appliance Electricity Cost Calculator** | [minitooldesk.com/calculators/electricity-cost-calculator/](https://minitooldesk.com/calculators/electricity-cost-calculator/) |
| **VAT / TVA / Sales Tax Calculator** | [minitooldesk.com/calculators/vat-calculator/](https://minitooldesk.com/calculators/vat-calculator/) |
| *And 40+ more utilities...* | [Explore all tools at minitooldesk.com](https://minitooldesk.com/) |

---

## 📄 License

MIT © [MiniToolDesk](https://minitooldesk.com/)

