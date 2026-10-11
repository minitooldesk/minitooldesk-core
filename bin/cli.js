#!/usr/bin/env node

/**
 * MiniToolDesk CLI
 * Official Zero-Dependency Developer Utility Tool
 *
 * Web: https://minitooldesk.com
 * License: MIT
 */

const crypto = require('crypto');

const args = process.argv.slice(2);
const command = args[0];

function printBanner() {
  console.log('\x1b[36m%s\x1b[0m', '──────────────────────────────────────────────────────────');
  console.log('\x1b[1m\x1b[34m%s\x1b[0m', ' 🛠️  MiniToolDesk CLI — 100% Client-Side Developer Utilities');
  console.log('\x1b[90m%s\x1b[0m', '    Zero Server Storage • Instant Execution');
  console.log('\x1b[36m%s\x1b[0m', '──────────────────────────────────────────────────────────\n');
}

function printFooter() {
  console.log('\n\x1b[90m%s\x1b[0m', '──────────────────────────────────────────────────────────');
  console.log('\x1b[32m%s\x1b[0m', ' ✨ For 30+ visual GUI tools & live previews in 7 languages:');
  console.log('\x1b[4m\x1b[36m%s\x1b[0m', ' 👉 https://minitooldesk.com\n');
}

function printHelp() {
  printBanner();
  console.log('Usage: npx minitooldesk <command> [arguments]\n');
  console.log('Commands:');
  console.log('  hash <string> [algo]    Calculate SHA-256, SHA-512, MD5 hash');
  console.log('  uuid                    Generate a cryptographically secure UUID v4');
  console.log('  slug <text>             Convert text to an SEO-friendly URL slug');
  console.log('  case <style> <text>     Convert case (camel, pascal, snake, kebab, upper)');
  console.log('  json <raw_json>         Validate and pretty-print JSON');
  console.log('  b64e <text>             Encode string to Base64');
  console.log('  b64d <encoded>          Decode Base64 string');
  console.log('  words <text>            Count words, characters, and reading time\n');
  console.log('Examples:');
  console.log('  npx minitooldesk uuid');
  console.log('  npx minitooldesk hash "secret_token" sha256');
  console.log('  npx minitooldesk slug "How to build client side tools"');
  printFooter();
}

async function run() {
  if (!command || command === '--help' || command === '-h' || command === 'help') {
    printHelp();
    return;
  }

  printBanner();

  try {
    switch (command) {
      case 'uuid': {
        const id = crypto.randomUUID();
        console.log('\x1b[1mUUID v4:\x1b[0m');
        console.log(`\x1b[33m${id}\x1b[0m`);
        break;
      }

      case 'hash': {
        const input = args[1] || '';
        const algo = (args[2] || 'sha256').toLowerCase();
        const hash = crypto.createHash(algo).update(input).digest('hex');
        console.log(`\x1b[1m${algo.toUpperCase()} Hash for "${input}":\x1b[0m`);
        console.log(`\x1b[33m${hash}\x1b[0m`);
        break;
      }

      case 'slug': {
        const input = args.slice(1).join(' ');
        const slug = input
          .normalize('NFKD')
          .replace(/[\u0300-\u036f]/g, '')
          .toLowerCase()
          .trim()
          .replace(/[^a-z0-9 -]/g, '')
          .replace(/\s+/g, '-')
          .replace(/-+/g, '-');
        console.log('\x1b[1mURL Slug:\x1b[0m');
        console.log(`\x1b[33m${slug}\x1b[0m`);
        break;
      }

      case 'case': {
        const style = args[1] || 'camel';
        const input = args.slice(2).join(' ');
        const words = input
          .replace(/([a-z\d])([A-Z])/g, '$1 $2')
          .replace(/([A-Z]+)([A-Z][a-z\d]+)/g, '$1 $2')
          .replace(/[_\-.\s]+/g, ' ')
          .trim()
          .split(' ')
          .filter(Boolean);

        let out = '';
        if (style === 'camel') {
          out = words.map((w, i) => (i === 0 ? w.toLowerCase() : w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())).join('');
        } else if (style === 'pascal') {
          out = words.map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()).join('');
        } else if (style === 'snake') {
          out = words.map((w) => w.toLowerCase()).join('_');
        } else if (style === 'kebab') {
          out = words.map((w) => w.toLowerCase()).join('-');
        } else {
          out = words.map((w) => w.toUpperCase()).join('_');
        }
        console.log(`\x1b[1mConverted (${style}):\x1b[0m`);
        console.log(`\x1b[33m${out}\x1b[0m`);
        break;
      }

      case 'json': {
        const input = args.slice(1).join(' ');
        const parsed = JSON.parse(input);
        console.log('\x1b[1mFormatted JSON:\x1b[0m');
        console.log('\x1b[32m%s\x1b[0m', JSON.stringify(parsed, null, 2));
        break;
      }

      case 'b64e': {
        const input = args.slice(1).join(' ');
        const encoded = Buffer.from(input, 'utf-8').toString('base64');
        console.log('\x1b[1mBase64 Encoded:\x1b[0m');
        console.log(`\x1b[33m${encoded}\x1b[0m`);
        break;
      }

      case 'b64d': {
        const input = args[1] || '';
        const decoded = Buffer.from(input, 'base64').toString('utf-8');
        console.log('\x1b[1mBase64 Decoded:\x1b[0m');
        console.log(`\x1b[33m${decoded}\x1b[0m`);
        break;
      }

      case 'words': {
        const input = args.slice(1).join(' ');
        const words = input.trim().split(/\s+/).filter(Boolean);
        console.log('\x1b[1mText Statistics:\x1b[0m');
        console.log(`  Words:       \x1b[33m${words.length}\x1b[0m`);
        console.log(`  Characters:  \x1b[33m${input.length}\x1b[0m`);
        console.log(`  Est. Read:   \x1b[33m${Math.ceil((words.length / 200) * 60)} seconds\x1b[0m`);
        break;
      }

      default:
        console.log(`\x1b[31mUnknown command: "${command}"\x1b[0m`);
        printHelp();
        return;
    }
  } catch (err) {
    console.error(`\x1b[31mError: ${err.message}\x1b[0m`);
  }

  printFooter();
}

run();

