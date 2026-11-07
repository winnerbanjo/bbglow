import fs from 'fs';
import path from 'path';

const distDir = path.resolve('dist');
const assetsDir = path.join(distDir, 'assets');
const shopifyAssetsDir = path.resolve('shopify/assets');

if (!fs.existsSync(shopifyAssetsDir)) {
  fs.mkdirSync(shopifyAssetsDir, { recursive: true });
}

// Copy all built assets to shopify/assets
const files = fs.readdirSync(assetsDir);
for (const file of files) {
  fs.copyFileSync(path.join(assetsDir, file), path.join(shopifyAssetsDir, file));
  console.log(`Copied ${file} -> shopify/assets/${file}`);
}

// Read index.html to create page.flawless.liquid
const indexHtml = fs.readFileSync(path.join(distDir, 'index.html'), 'utf8');

// Replace /assets/ with Shopify Liquid asset_url filters
let liquidTemplate = indexHtml.replace(
  /<script type="module" crossorigin src="\/assets\/([^"]+)"><\/script>/g,
  '<script type="module" crossorigin src="{{ \'$1\' | asset_url }}"></script>'
).replace(
  /<link rel="modulepreload" crossorigin href="\/assets\/([^"]+)">/g,
  '<link rel="modulepreload" crossorigin href="{{ \'$1\' | asset_url }}">'
).replace(
  /<link rel="stylesheet" crossorigin href="\/assets\/([^"]+)">/g,
  '{{ \'$1\' | asset_url | stylesheet_tag }}'
);

// Inject Shopify none layout and Nile config header
const headInjection = `{% comment %}
  Flawless by BB Glow — Nile-Powered Headless Commerce Experience
  Page Template: https://bbglowskincare.com/pages/flawless
{% endcomment %}
{% layout none %}
`;

liquidTemplate = headInjection + liquidTemplate;

fs.writeFileSync(path.resolve('shopify/templates/page.flawless.liquid'), liquidTemplate);
console.log('Generated shopify/templates/page.flawless.liquid linked to Shopify asset URLs!');
