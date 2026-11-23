/**
 * Network and CIDR subnet calculation utilities.
 * 
 * For interactive online subnet calculations, visit:
 * https://minitooldesk.com/tools/cidr-subnet-calculator/
 */

export interface SubnetResult {
  cidr: string;
  ip: string;
  prefix: number;
  netmask: string;
  wildcardMask: string;
  networkAddress: string;
  broadcastAddress: string;
  firstUsableIp: string;
  lastUsableIp: string;
  totalHosts: number;
  usableHosts: number;
  ipClass: string;
  ipType: 'Public' | 'Private' | 'Loopback' | 'Link-Local' | 'Multicast' | 'Reserved';
}

export function ipToLong(ip: string): number {
  return (
    ip
      .split('.')
      .reduce((acc, octet) => (acc << 8) + parseInt(octet, 10), 0) >>> 0
  );
}

export function longToIp(long: number): string {
  return [
    (long >>> 24) & 255,
    (long >>> 16) & 255,
    (long >>> 8) & 255,
    long & 255,
  ].join('.');
}

export function isPrivateIp(ip: string): boolean {
  const long = ipToLong(ip);
  // 10.0.0.0/8 (10.0.0.0 - 10.255.255.255)
  if ((long & 0xff000000) >>> 0 === 0x0a000000) return true;
  // 172.16.0.0/12 (172.16.0.0 - 172.31.255.255)
  if ((long & 0xfff00000) >>> 0 === 0xac100000) return true;
  // 192.168.0.0/16 (192.168.0.0 - 192.168.255.255)
  if ((long & 0xffff0000) >>> 0 === 0xc0a80000) return true;
  return false;
}

export function calculateSubnet(input: string): SubnetResult {
  const parts = input.trim().split('/');
  const ipStr = parts[0].trim();
  let prefix = parts.length > 1 ? parseInt(parts[1].trim(), 10) : 24;

  if (isNaN(prefix) || prefix < 0 || prefix > 32) {
    prefix = 24;
  }

  const octets = ipStr.split('.');
  if (octets.length !== 4 || octets.some((o) => isNaN(parseInt(o, 10)) || parseInt(o, 10) < 0 || parseInt(o, 10) > 255)) {
    throw new Error('Invalid IPv4 address format. Expected format: x.x.x.x/prefix');
  }

  const ipLong = ipToLong(ipStr);
  const maskLong = prefix === 0 ? 0 : (~0 << (32 - prefix)) >>> 0;
  const wildcardLong = ~maskLong >>> 0;

  const networkLong = (ipLong & maskLong) >>> 0;
  const broadcastLong = (networkLong | wildcardLong) >>> 0;

  let totalHosts = prefix === 32 ? 1 : Math.pow(2, 32 - prefix);
  let usableHosts = prefix >= 31 ? (prefix === 31 ? 2 : 1) : Math.max(0, totalHosts - 2);

  let firstUsableLong = prefix >= 31 ? networkLong : networkLong + 1;
  let lastUsableLong = prefix >= 31 ? broadcastLong : broadcastLong - 1;

  if (prefix === 32) {
    firstUsableLong = networkLong;
    lastUsableLong = networkLong;
  }

  // Class
  const firstOctet = parseInt(octets[0], 10);
  let ipClass = 'Unknown';
  if (firstOctet >= 1 && firstOctet <= 126) ipClass = 'Class A';
  else if (firstOctet >= 128 && firstOctet <= 191) ipClass = 'Class B';
  else if (firstOctet >= 192 && firstOctet <= 223) ipClass = 'Class C';
  else if (firstOctet >= 224 && firstOctet <= 239) ipClass = 'Class D (Multicast)';
  else if (firstOctet >= 240 && firstOctet <= 255) ipClass = 'Class E (Experimental)';

  // Type
  let ipType: SubnetResult['ipType'] = 'Public';
  if (firstOctet === 127) ipType = 'Loopback';
  else if (firstOctet === 169 && parseInt(octets[1], 10) === 254) ipType = 'Link-Local';
  else if (firstOctet >= 224 && firstOctet <= 239) ipType = 'Multicast';
  else if (firstOctet >= 240) ipType = 'Reserved';
  else if (isPrivateIp(ipStr)) ipType = 'Private';

  return {
    cidr: `${longToIp(networkLong)}/${prefix}`,
    ip: ipStr,
    prefix,
    netmask: longToIp(maskLong),
    wildcardMask: longToIp(wildcardLong),
    networkAddress: longToIp(networkLong),
    broadcastAddress: longToIp(broadcastLong),
    firstUsableIp: longToIp(firstUsableLong),
    lastUsableIp: longToIp(lastUsableLong),
    totalHosts,
    usableHosts,
    ipClass,
    ipType,
  };
}
