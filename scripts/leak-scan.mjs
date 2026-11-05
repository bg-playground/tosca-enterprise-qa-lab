// Repo leak scan: fails on Tosca workspace artifacts, Tricentis credential-shaped
// values, and obvious secrets in tracked files. Runs with gitleaks in CI.
import { execSync } from 'node:child_process';
import { readFileSync } from 'node:fs';

class LeakScan {
  static FORBIDDEN_EXT = /\.(tsu|tsd|tcd|tws)$/i; // Tosca subset/workspace exports
  static RULES = [
    ['tricentis-credential', /tricentis[\w.-]*(?:token|secret|password|apikey|api_key|client_secret)\s*[:=]\s*['"]?[A-Za-z0-9+/_\-]{8,}/i],
    ['tosca-server-url-with-creds', /https?:\/\/[^\s:@/]+:[^\s@/]+@[^\s]*tosca/i],
    ['private-key', /-----BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY-----/],
    ['github-token', /\bgh[pousr]_[A-Za-z0-9]{30,}\b/],
    ['aws-access-key', /\bAKIA[0-9A-Z]{16}\b/],
    ['openai-key', /\bsk-[A-Za-z0-9_-]{20,}\b/],
    ['generic-secret-assignment', /\b(?:password|passwd|secret|api[_-]?key|token)\s*[:=]\s*['"][^'"\s]{12,}['"]/i],
  ];
  static files() { return execSync('git ls-files -co --exclude-standard', { encoding: 'utf8' }).split('\n').filter(Boolean); }
  static scanText(name, text) {
    const hits = [];
    if (LeakScan.FORBIDDEN_EXT.test(name)) hits.push([name, 'tosca-workspace-file']);
    for (const [rule, re] of LeakScan.RULES) if (re.test(text)) hits.push([name, rule]);
    return hits;
  }
  static selfTest() {
    const bad = [
      ['x.tsu', ''],
      ['a.env', 'TRICENTIS_API_TOKEN=' + 'abcd1234efgh5678'],
      ['b.ts', 'const k = "' + 'gh' + 'p_' + 'a'.repeat(36) + '"'],
    ];
    for (const [n, t] of bad) if (!LeakScan.scanText(n, t).length) throw new Error(`self-test missed ${n}`);
    if (LeakScan.scanText('ok.md', 'Modules map to page objects.').length) throw new Error('self-test false positive');
  }
  static run() {
    LeakScan.selfTest();
    const self = 'scripts/leak-scan.mjs';
    const hits = LeakScan.files().flatMap(f => f === self ? [] : LeakScan.scanText(f, (() => { try { return readFileSync(f, 'utf8'); } catch { return ''; } })()));
    if (hits.length) { for (const [f, r] of hits) console.error(`LEAK ${r}: ${f}`); process.exit(1); }
    console.log(`leak-scan: clean (${LeakScan.files().length} files, self-test passed)`);
  }
}
LeakScan.run();
