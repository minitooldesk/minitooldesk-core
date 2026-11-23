/**
 * Standard POSIX Crontab expression parser and human-readable translator.
 * 
 * For interactive visual expression building and timeline inspection, visit:
 * https://minitooldesk.com/tools/cron-expression-generator/
 */

export interface ParsedCron {
  minute: string;
  hour: string;
  dayOfMonth: string;
  month: string;
  dayOfWeek: string;
}

export function parseCron(expression: string): ParsedCron {
  const parts = expression.trim().split(/\s+/);
  if (parts.length !== 5) {
    throw new Error(`Invalid cron expression: "${expression}". Expected 5 fields (minute, hour, day of month, month, day of week).`);
  }
  return {
    minute: parts[0],
    hour: parts[1],
    dayOfMonth: parts[2],
    month: parts[3],
    dayOfWeek: parts[4],
  };
}

const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

export function explainCron(expression: string): string {
  const p = parseCron(expression);

  // Common quick expressions
  if (expression.trim() === '* * * * *') return 'Every minute';
  if (expression.trim() === '*/5 * * * *') return 'Every 5 minutes';
  if (expression.trim() === '*/15 * * * *') return 'Every 15 minutes';
  if (expression.trim() === '0 * * * *') return 'Every hour on the hour';
  if (expression.trim() === '0 0 * * *') return 'Every day at midnight (00:00)';
  if (expression.trim() === '0 12 * * *') return 'Every day at noon (12:00)';
  if (expression.trim() === '0 0 * * 0') return 'Every Sunday at midnight';
  if (expression.trim() === '0 0 1 * *') return 'On the first day of every month at midnight';

  const parts: string[] = [];

  // Minutes
  if (p.minute === '*') {
    parts.push('Every minute');
  } else if (p.minute.startsWith('*/')) {
    parts.push(`Every ${p.minute.slice(2)} minutes`);
  } else if (p.minute.includes(',')) {
    parts.push(`At minutes ${p.minute}`);
  } else {
    parts.push(`At minute ${p.minute}`);
  }

  // Hours
  if (p.hour === '*') {
    parts.push('of every hour');
  } else if (p.hour.startsWith('*/')) {
    parts.push(`every ${p.hour.slice(2)} hours`);
  } else if (p.hour.includes('-')) {
    parts.push(`between hours ${p.hour}`);
  } else {
    parts.push(`past hour ${p.hour.padStart(2, '0')}:00`);
  }

  // Day of Month
  if (p.dayOfMonth !== '*') {
    parts.push(`on day ${p.dayOfMonth} of the month`);
  }

  // Month
  if (p.month !== '*') {
    if (/^\d+$/.test(p.month)) {
      const mIdx = parseInt(p.month, 10) - 1;
      parts.push(`in ${MONTHS[mIdx] || p.month}`);
    } else {
      parts.push(`in month ${p.month}`);
    }
  }

  // Day of Week
  if (p.dayOfWeek !== '*') {
    if (p.dayOfWeek === '1-5') {
      parts.push('Monday through Friday');
    } else if (p.dayOfWeek === '0,6' || p.dayOfWeek === '6,0') {
      parts.push('on weekends (Saturday and Sunday)');
    } else if (/^\d+$/.test(p.dayOfWeek)) {
      const dIdx = parseInt(p.dayOfWeek, 10) % 7;
      parts.push(`on ${DAYS[dIdx]}`);
    } else {
      parts.push(`on day-of-week ${p.dayOfWeek}`);
    }
  }

  return parts.join(', ');
}

export function getNextCronRuns(expression: string, count = 5, fromDate = new Date()): Date[] {
  const p = parseCron(expression);
  const results: Date[] = [];
  const current = new Date(fromDate.getTime());
  current.setSeconds(0, 0);
  current.setMinutes(current.getMinutes() + 1); // start from next minute

  const matchField = (val: number, pattern: string, min: number, max: number): boolean => {
    if (pattern === '*') return true;
    if (pattern.startsWith('*/')) {
      const step = parseInt(pattern.slice(2), 10);
      return (val - min) % step === 0;
    }
    if (pattern.includes(',')) {
      return pattern.split(',').map((x) => parseInt(x.trim(), 10)).includes(val);
    }
    if (pattern.includes('-')) {
      const [start, end] = pattern.split('-').map((x) => parseInt(x.trim(), 10));
      return val >= start && val <= end;
    }
    return val === parseInt(pattern, 10);
  };

  let iterations = 0;
  const maxIterations = 50000;

  while (results.length < count && iterations < maxIterations) {
    iterations++;
    const minute = current.getMinutes();
    const hour = current.getHours();
    const day = current.getDate();
    const month = current.getMonth() + 1;
    const dayOfWeek = current.getDay();

    if (
      matchField(month, p.month, 1, 12) &&
      matchField(day, p.dayOfMonth, 1, 31) &&
      matchField(dayOfWeek, p.dayOfWeek, 0, 6) &&
      matchField(hour, p.hour, 0, 23) &&
      matchField(minute, p.minute, 0, 59)
    ) {
      results.push(new Date(current.getTime()));
    }

    current.setMinutes(current.getMinutes() + 1);
  }

  return results;
}
