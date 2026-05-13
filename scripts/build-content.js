import { mkdir, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { emotionalInsights, giftCategories, surprisePlans } from '../src/data/gifts.js';

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const outputPath = resolve(root, 'public/content-summary.json');

const summary = {
  generatedAt: new Date().toISOString(),
  giftCategoryCount: giftCategories.length,
  surprisePlanCount: surprisePlans.length,
  emotionalInsightCount: emotionalInsights.length,
  giftCategories: giftCategories.map((gift) => ({
    title: gift.title,
    tag: gift.tag,
    budget: gift.budget,
    items: gift.items,
    fit: gift.fit,
  })),
  recommendedFormula: '主礼物 + 氛围礼物 + 手写表达 + 一段低压力约会',
};

await mkdir(dirname(outputPath), { recursive: true });
await writeFile(outputPath, `${JSON.stringify(summary, null, 2)}\n`, 'utf8');

console.log(`Content summary generated: ${outputPath}`);
