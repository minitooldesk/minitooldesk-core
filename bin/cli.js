#!/usr/bin/env node

/**
 * MiniToolDesk CLI
 * Official Zero-Dependency Developer Utility Tool
 *
 * Web: https://minitooldesk.com/
 * License: MIT
 */

const crypto = require('crypto');
const core = require('../dist/index.js');

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
  console.log('\x1b[4m\x1b[36m%s\x1b[0m', ' 👉 https://minitooldesk.com/\n');
}

function printHelp() {
  printBanner();
  console.log('Usage: npx minitooldesk <command> [arguments]\n');
  console.log('Commands:');
  console.log('  compose <docker_run>    Convert "docker run" command to Docker Compose YAML');
  console.log('  subnet <cidr>           Calculate IPv4 CIDR subnet (hosts, mask, usable range)');
  console.log('  cron <expression>       Translate cron expression and show next 5 run times');
  console.log('  jwt <token>             Decode and inspect JWT payload, headers & expiration');
  console.log('  chmod <perm> [path]     Calculate chmod permissions (e.g., 755 or rwxr-xr-x)');
  console.log('  hash <string> [algo]    Calculate SHA-256, SHA-512, MD5 hash');
  console.log('  uuid                    Generate a cryptographically secure UUID v4');
  console.log('  slug <text>             Convert text to an SEO-friendly URL slug');
  console.log('  case <style> <text>     Convert case (camel, pascal, snake, kebab, upper)');
  console.log('  json <raw_json>         Validate and pretty-print JSON');
  console.log('  b64e <text>             Encode string to Base64');
  console.log('  b64d <encoded>          Decode Base64 string');
  console.log('  words <text>            Count words, characters, and reading time\n');
  console.log('Examples:');
  console.log('  npx minitooldesk compose "docker run -d -p 80:80 nginx:alpine"');
  console.log('  npx minitooldesk subnet 10.0.0.0/16');
  console.log('  npx minitooldesk cron "*/15 * * * *"');
  console.log('  npx minitooldesk chmod 755 app.sh');
  console.log('  npx minitooldesk uuid');
  console.log('  npx minitooldesk hash "secret_token" sha256');
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

      case 'compose':
      case 'docker2compose': {
        const input = args.slice(1).join(' ');
        if (!input) {
          console.log('\x1b[31mError: Please provide a docker run command.\x1b[0m');
          console.log('Example: npx minitooldesk compose "docker run -d -p 80:80 nginx:alpine"');
          break;
        }
        const yaml = core.dockerRunToCompose(input);
        console.log('\x1b[1mGenerated Docker Compose YAML:\x1b[0m\n');
        console.log('\x1b[32m%s\x1b[0m', yaml);
        break;
      }

      case 'chmod': {
        const input = args[1] || '755';
        const targetPath = args[2] || 'filename';
        const res = core.calculateChmod(input, targetPath);
        console.log('\x1b[1mChmod Permissions:\x1b[0m');
        console.log(`  Octal:    \x1b[33m${res.octal}\x1b[0m`);
        console.log(`  Symbolic: \x1b[33m${res.symbolic}\x1b[0m`);
        console.log(`  Command:  \x1b[32m${res.command}\x1b[0m`);
        break;
      }

      case 'subnet':
      case 'cidr': {
        const input = args[1] || '192.168.1.0/24';
        const sub = core.calculateSubnet(input);
        console.log(`\x1b[1mSubnet Calculation for "${sub.cidr}":\x1b[0m`);
        console.log(`  Netmask:          \x1b[33m${sub.netmask}\x1b[0m`);
        console.log(`  Wildcard Mask:    \x1b[33m${sub.wildcardMask}\x1b[0m`);
        console.log(`  Network Address:  \x1b[33m${sub.networkAddress}\x1b[0m`);
        console.log(`  Broadcast Address:\x1b[33m${sub.broadcastAddress}\x1b[0m`);
        console.log(`  Usable Range:     \x1b[32m${sub.firstUsableIp} - ${sub.lastUsableIp}\x1b[0m`);
        console.log(`  Usable Hosts:     \x1b[32m${sub.usableHosts.toLocaleString()}\x1b[0m (Total: ${sub.totalHosts.toLocaleString()})`);
        console.log(`  IP Class / Type:  \x1b[36m${sub.ipClass} / ${sub.ipType}\x1b[0m`);
        break;
      }

      case 'jwt': {
        const token = args[1] || '';
        if (!token) {
          console.log('\x1b[31mError: Please provide a JWT token string.\x1b[0m');
          break;
        }
        const decoded = core.decodeJwt(token);
        console.log('\x1b[1mDecoded JWT Header:\x1b[0m');
        console.log('\x1b[36m%s\x1b[0m', JSON.stringify(decoded.header, null, 2));
        console.log('\x1b[1mDecoded JWT Payload:\x1b[0m');
        console.log('\x1b[32m%s\x1b[0m', JSON.stringify(decoded.payload, null, 2));
        if (decoded.expiresAt) {
          console.log('\x1b[1mExpiration Status:\x1b[0m');
          console.log(`  Expires At:       \x1b[33m${decoded.expiresAt.toISOString()}\x1b[0m`);
          console.log(`  Is Expired:       ${decoded.isExpired ? '\x1b[31mYES\x1b[0m' : '\x1b[32mNO\x1b[0m'}`);
          if (decoded.timeRemainingSec !== null) {
            console.log(`  Time Remaining:   \x1b[33m${decoded.timeRemainingSec}s\x1b[0m`);
          }
        }
        break;
      }

      case 'cron': {
        const expr = args.slice(1).join(' ') || '* * * * *';
        const explanation = core.explainCron(expr);
        console.log(`\x1b[1mCron Schedule for "${expr}":\x1b[0m`);
        console.log(`  \x1b[32m${explanation}\x1b[0m\n`);
        const nextRuns = core.getNextCronRuns(expr, 5);
        console.log('\x1b[1mNext 5 Scheduled Runs:\x1b[0m');
        nextRuns.forEach((date, i) => {
          console.log(`  ${i + 1}. \x1b[33m${date.toISOString().replace('T', ' ').slice(0, 19)} UTC\x1b[0m`);
        });
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

