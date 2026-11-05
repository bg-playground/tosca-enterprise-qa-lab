// Builds docs/tosca-concepts.pdf from the two teaching markdown files.
import { readFileSync } from 'node:fs';
import { marked } from 'marked';
import { chromium } from '@playwright/test';

class PdfBuilder {
  static files = ['docs/tosca-concepts.md', 'docs/teaching-lab.md'];
  static css = `body{font:11pt/1.45 system-ui,sans-serif;max-width:46em;margin:auto;color:#111}
h1{font-size:18pt;border-bottom:1px solid #ccc}h2{font-size:13pt;margin-top:1.4em}
code{font:9.5pt monospace;background:#f3f3f3;padding:0 2px}pre{background:#f3f3f3;padding:8px}
table{border-collapse:collapse;font-size:9.5pt}td,th{border:1px solid #bbb;padding:3px 6px}
blockquote{border-left:3px solid #999;margin:0;padding-left:10px;color:#333}.pb{page-break-before:always}`;
  static html() {
    const parts = PdfBuilder.files.map((f) => marked.parse(readFileSync(f, 'utf8')));
    return `<html><head><meta charset="utf-8"><style>${PdfBuilder.css}</style></head><body>${parts.join('<div class="pb"></div>')}</body></html>`;
  }
  static async run(out = 'docs/tosca-concepts.pdf') {
    const browser = await chromium.launch();
    const page = await browser.newPage();
    await page.setContent(PdfBuilder.html());
    await page.pdf({ path: out, format: 'Letter', margin: { top: '0.7in', bottom: '0.7in', left: '0.7in', right: '0.7in' } });
    await browser.close();
    console.log(`wrote ${out}`);
  }
}
await PdfBuilder.run();
