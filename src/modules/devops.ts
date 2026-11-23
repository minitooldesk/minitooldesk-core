/**
 * DevOps and containerization utilities.
 * 
 * For interactive online tools, visit:
 * https://minitooldesk.com/tools/docker-run-to-compose/
 * https://minitooldesk.com/tools/chmod-calculator/
 */

export interface ParsedDockerRun {
  serviceName: string;
  image: string;
  command: string[];
  containerName?: string;
  restart?: string;
  ports: string[];
  volumes: string[];
  environment: Record<string, string>;
  networks: string[];
  privileged?: boolean;
  hostname?: string;
  workdir?: string;
  user?: string;
  memLimit?: string;
  cpus?: string;
  entrypoint?: string;
  labels: Record<string, string>;
}

export function tokenizeCommand(cmd: string): string[] {
  const cleanCmd = cmd.replace(/\\\r?\n/g, ' ').trim();
  const tokens: string[] = [];
  let current = '';
  let inDoubleQuote = false;
  let inSingleQuote = false;
  let escapeNext = false;

  for (let i = 0; i < cleanCmd.length; i++) {
    const char = cleanCmd[i];

    if (escapeNext) {
      current += char;
      escapeNext = false;
      continue;
    }

    if (char === '\\' && !inSingleQuote) {
      escapeNext = true;
      continue;
    }

    if (char === '"' && !inSingleQuote) {
      inDoubleQuote = !inDoubleQuote;
      continue;
    }

    if (char === "'" && !inDoubleQuote) {
      inSingleQuote = !inSingleQuote;
      continue;
    }

    if (/\s/.test(char) && !inDoubleQuote && !inSingleQuote) {
      if (current.length > 0) {
        tokens.push(current);
        current = '';
      }
    } else {
      current += char;
    }
  }

  if (current.length > 0) {
    tokens.push(current);
  }

  return tokens;
}

export function parseDockerRun(cmd: string): ParsedDockerRun {
  const tokens = tokenizeCommand(cmd);

  const result: ParsedDockerRun = {
    serviceName: 'app',
    image: '',
    command: [],
    ports: [],
    volumes: [],
    environment: {},
    networks: [],
    labels: {},
  };

  let idx = 0;
  if (tokens[0] === 'docker') idx++;
  if (tokens[idx] === 'run') idx++;

  while (idx < tokens.length) {
    const token = tokens[idx];

    if (token === '-d' || token === '--detach' || token === '-it' || token === '--rm') {
      idx++;
      continue;
    }

    if ((token === '--name' || token === '-n') && idx + 1 < tokens.length) {
      result.containerName = tokens[idx + 1];
      result.serviceName = tokens[idx + 1].toLowerCase().replace(/[^a-z0-9_-]/g, '-');
      idx += 2;
      continue;
    }
    if (token.startsWith('--name=')) {
      const val = token.slice(7);
      result.containerName = val;
      result.serviceName = val.toLowerCase().replace(/[^a-z0-9_-]/g, '-');
      idx++;
      continue;
    }

    if ((token === '-p' || token === '--publish') && idx + 1 < tokens.length) {
      result.ports.push(tokens[idx + 1]);
      idx += 2;
      continue;
    }
    if (token.startsWith('-p=') || token.startsWith('--publish=')) {
      result.ports.push(token.split('=')[1]);
      idx++;
      continue;
    }

    if ((token === '-v' || token === '--volume') && idx + 1 < tokens.length) {
      result.volumes.push(tokens[idx + 1]);
      idx += 2;
      continue;
    }
    if (token.startsWith('-v=') || token.startsWith('--volume=')) {
      result.volumes.push(token.split('=')[1]);
      idx++;
      continue;
    }

    if ((token === '-e' || token === '--env') && idx + 1 < tokens.length) {
      const pair = tokens[idx + 1];
      const eq = pair.indexOf('=');
      if (eq !== -1) {
        result.environment[pair.slice(0, eq)] = pair.slice(eq + 1);
      } else {
        result.environment[pair] = '';
      }
      idx += 2;
      continue;
    }
    if (token.startsWith('-e=') || token.startsWith('--env=')) {
      const pair = token.slice(token.indexOf('=') + 1);
      const eq = pair.indexOf('=');
      if (eq !== -1) {
        result.environment[pair.slice(0, eq)] = pair.slice(eq + 1);
      } else {
        result.environment[pair] = '';
      }
      idx++;
      continue;
    }

    if (token === '--restart' && idx + 1 < tokens.length) {
      result.restart = tokens[idx + 1];
      idx += 2;
      continue;
    }
    if (token.startsWith('--restart=')) {
      result.restart = token.slice(10);
      idx++;
      continue;
    }

    if ((token === '--net' || token === '--network') && idx + 1 < tokens.length) {
      result.networks.push(tokens[idx + 1]);
      idx += 2;
      continue;
    }
    if (token.startsWith('--net=') || token.startsWith('--network=')) {
      result.networks.push(token.split('=')[1]);
      idx++;
      continue;
    }

    if ((token === '-h' || token === '--hostname') && idx + 1 < tokens.length) {
      result.hostname = tokens[idx + 1];
      idx += 2;
      continue;
    }

    if ((token === '-u' || token === '--user') && idx + 1 < tokens.length) {
      result.user = tokens[idx + 1];
      idx += 2;
      continue;
    }

    if ((token === '-w' || token === '--workdir') && idx + 1 < tokens.length) {
      result.workdir = tokens[idx + 1];
      idx += 2;
      continue;
    }

    if (token === '--privileged') {
      result.privileged = true;
      idx++;
      continue;
    }

    if ((token === '-m' || token === '--memory') && idx + 1 < tokens.length) {
      result.memLimit = tokens[idx + 1];
      idx += 2;
      continue;
    }

    if (token === '--cpus' && idx + 1 < tokens.length) {
      result.cpus = tokens[idx + 1];
      idx += 2;
      continue;
    }

    if (token === '--entrypoint' && idx + 1 < tokens.length) {
      result.entrypoint = tokens[idx + 1];
      idx += 2;
      continue;
    }

    if (token.startsWith('-')) {
      if (idx + 1 < tokens.length && !tokens[idx + 1].startsWith('-')) {
        idx += 2;
      } else {
        idx++;
      }
      continue;
    }

    if (!result.image) {
      result.image = token;
      idx++;
      while (idx < tokens.length) {
        result.command.push(tokens[idx]);
        idx++;
      }
      break;
    }

    idx++;
  }

  if (!result.serviceName || result.serviceName === 'app') {
    if (result.image) {
      const imgClean = result.image.split(':')[0].split('/').pop() || 'app';
      result.serviceName = imgClean.replace(/[^a-zA-Z0-9_-]/g, '-');
    }
  }

  return result;
}

function toYamlValue(val: string): string {
  if (/^[a-zA-Z0-9_.-]+$/.test(val) && !/^(true|false|yes|no|null|on|off)$/i.test(val)) {
    return val;
  }
  return `"${val.replace(/"/g, '\\"')}"`;
}

export function dockerRunToCompose(cmd: string, version: 'compose-spec' | '3.8' = 'compose-spec'): string {
  if (!cmd.trim()) return '';

  const parsed = parseDockerRun(cmd);
  if (!parsed.image) {
    return '# Error: Could not detect Docker image in the command.\n# Example: docker run -d -p 80:80 nginx:alpine';
  }

  const lines: string[] = [];

  if (version === '3.8') {
    lines.push("version: '3.8'");
  }

  lines.push('services:');
  lines.push(`  ${parsed.serviceName}:`);
  lines.push(`    image: ${parsed.image}`);

  if (parsed.containerName && parsed.containerName !== parsed.serviceName) {
    lines.push(`    container_name: ${parsed.containerName}`);
  }

  if (parsed.restart) {
    lines.push(`    restart: ${parsed.restart}`);
  }

  if (parsed.privileged) {
    lines.push('    privileged: true');
  }

  if (parsed.hostname) {
    lines.push(`    hostname: ${parsed.hostname}`);
  }

  if (parsed.user) {
    lines.push(`    user: ${toYamlValue(parsed.user)}`);
  }

  if (parsed.workdir) {
    lines.push(`    working_dir: ${parsed.workdir}`);
  }

  if (parsed.entrypoint) {
    lines.push(`    entrypoint: ${toYamlValue(parsed.entrypoint)}`);
  }

  if (parsed.ports.length > 0) {
    lines.push('    ports:');
    parsed.ports.forEach((p) => {
      lines.push(`      - "${p}"`);
    });
  }

  const envKeys = Object.keys(parsed.environment);
  if (envKeys.length > 0) {
    lines.push('    environment:');
    envKeys.forEach((k) => {
      const v = parsed.environment[k];
      if (v) {
        lines.push(`      - ${k}=${toYamlValue(v)}`);
      } else {
        lines.push(`      - ${k}`);
      }
    });
  }

  if (parsed.volumes.length > 0) {
    lines.push('    volumes:');
    parsed.volumes.forEach((v) => {
      lines.push(`      - ${v}`);
    });
  }

  if (parsed.networks.length > 0) {
    lines.push('    networks:');
    parsed.networks.forEach((n) => {
      lines.push(`      - ${n}`);
    });
  }

  if (parsed.command.length > 0) {
    lines.push(`    command: ${parsed.command.map(toYamlValue).join(' ')}`);
  }

  if (parsed.networks.length > 0) {
    lines.push('');
    lines.push('networks:');
    parsed.networks.forEach((n) => {
      lines.push(`  ${n}:`);
    });
  }

  return lines.join('\n');
}

export interface ChmodResult {
  octal: string;
  symbolic: string;
  command: string;
}

export function calculateChmod(octalOrSymbolic: string, targetPath = 'filename'): ChmodResult {
  const clean = octalOrSymbolic.trim();

  // If octal digits like 755 or 0644
  if (/^[0-7]{3,4}$/.test(clean)) {
    const digits = clean.length === 4 ? clean.slice(1) : clean;
    const mapDigit = (d: number) => {
      return (d & 4 ? 'r' : '-') + (d & 2 ? 'w' : '-') + (d & 1 ? 'x' : '-');
    };
    const s1 = mapDigit(parseInt(digits[0], 10));
    const s2 = mapDigit(parseInt(digits[1], 10));
    const s3 = mapDigit(parseInt(digits[2], 10));
    const symbolic = `${s1}${s2}${s3}`;
    return {
      octal: digits,
      symbolic,
      command: `chmod ${digits} ${targetPath}`,
    };
  }

  // If symbolic like rwxr-xr-x or -rwxr-xr-x
  let sym = clean.startsWith('-') ? clean.slice(1) : clean;
  if (/^[r-][w-][x-][r-][w-][x-][r-][w-][x-]$/.test(sym)) {
    const calcDigit = (s: string) => {
      return (s[0] === 'r' ? 4 : 0) + (s[1] === 'w' ? 2 : 0) + (s[2] === 'x' ? 1 : 0);
    };
    const o = calcDigit(sym.slice(0, 3));
    const g = calcDigit(sym.slice(3, 6));
    const other = calcDigit(sym.slice(6, 9));
    const octal = `${o}${g}${other}`;
    return {
      octal,
      symbolic: sym,
      command: `chmod ${octal} ${targetPath}`,
    };
  }

  throw new Error(`Invalid chmod notation: "${clean}". Expected octal (e.g., 755) or symbolic (e.g., rwxr-xr-x).`);
}
